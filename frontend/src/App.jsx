import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import './App.css';

// Constants & Hooks
import { categoryConfig } from './constants/campusData';
import { useGeolocation } from './hooks/useGeolocation';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LegendPanel from './components/sidebar/LegendPanel';
import DirectionsPanel from './components/routing/DirectionsPanel';
import NavigationBanner from './components/routing/NavigationBanner';
import MapControls from './components/map/MapControls';
import CompassWidget from './components/map/CompassWidget';
import LocationPopup from './components/map/LocationPopup';

export default function App() {
  const [seceLocations, setSeceLocations] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Fetch Live Data from Node.js Backend ONLY
  useEffect(() => {
    fetch('http://localhost:5000/api/landmarks')
      .then(response => {
        if (!response.ok) throw new Error('Failed to connect to database');
        return response.json();
      })
      .then(data => {
        setSeceLocations(data);
        setIsDataLoading(false);
      })
      .catch(error => {
        console.error("Backend fetch failed:", error);
        alert("Cannot connect to the SECE Campus Database. Is the backend running on port 5000?");
        setIsDataLoading(false);
      });
  }, []);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isRoutingOpen, setIsRoutingOpen] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(17);
  const [mapType, setMapType] = useState('satellite'); 
  const [isLocating, setIsLocating] = useState(false);

  // Routing State
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [routeInstructions, setRouteInstructions] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const allCategories = useMemo(() => Object.keys(categoryConfig), []);
  const [activeCategories, setActiveCategories] = useState(allCategories);

  // Custom Hook
  const { userLocation, userLocationRef, locationStatus, compassHeading, setLocationStatus } = useGeolocation();

  // Map Refs
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const routingControlRef = useRef(null);
  const tileLayerRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // 1. Load Leaflet Scripts
  useEffect(() => {
    if (window.L) return setLeafletLoaded(true);
    const link = document.createElement('link');
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => {
      const rCss = document.createElement('link');
      rCss.href = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css';
      rCss.rel = 'stylesheet';
      document.head.appendChild(rCss);

      const rJs = document.createElement('script');
      rJs.src = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js';
      rJs.async = true;
      rJs.onload = () => setLeafletLoaded(true);
      document.head.appendChild(rJs);
    };
    document.head.appendChild(script);

    return () => { if (mapRef.current) mapRef.current.remove(); };
  }, []);

  // 2. Initialize Map
  useEffect(() => {
    if (!leafletLoaded || !mapContainer.current || mapRef.current) return;
    const campusBounds = window.L.latLngBounds([10.8230, 77.0560], [10.8330, 77.0640]);

    const map = window.L.map(mapContainer.current, {
      zoomControl: false, maxBounds: campusBounds, maxBoundsViscosity: 1.0, minZoom: 15.5 
    }).setView([10.8270, 77.0605], 17);
    
    window.L.control.zoom({ position: 'bottomright' }).addTo(map);
    map.on('click', () => setSelectedLocation(null));
    map.on('zoomend', () => setCurrentZoom(map.getZoom()));
    mapRef.current = map;
  }, [leafletLoaded]);

  // 3. Tile Layer
  useEffect(() => {
    if (!mapRef.current || !window.L) return;
    if (tileLayerRef.current) mapRef.current.removeLayer(tileLayerRef.current);

    const tileUrl = mapType === 'street' 
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' 
      : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

    tileLayerRef.current = window.L.tileLayer(tileUrl, { maxZoom: 20 }).addTo(mapRef.current);
    tileLayerRef.current.bringToBack();
  }, [mapType, leafletLoaded]);

  // 4. Update User Marker
  useEffect(() => {
    if (!mapRef.current || !window.L || !userLocation) return;
    if (!userMarkerRef.current) {
      const userIconHtml = `<div class="relative flex h-6 w-6 justify-center items-center"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span><span class="relative inline-flex rounded-full h-4 w-4 bg-purple-600 border-2 border-gray-900 shadow-md"></span></div>`;
      const customUserIcon = window.L.divIcon({ className: 'bg-transparent border-none', html: userIconHtml, iconSize: [24, 24], iconAnchor: [12, 12] });
      userMarkerRef.current = window.L.marker([userLocation.lat, userLocation.lng], { icon: customUserIcon, zIndexOffset: 1000 }).addTo(mapRef.current);
    } else {
      userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
    }
  }, [userLocation, leafletLoaded]);

  // 5. Routing Machine Engine
  useEffect(() => {
    if (!mapRef.current || !window.L || !window.L.Routing || seceLocations.length === 0) return;
    if (routingControlRef.current) mapRef.current.removeControl(routingControlRef.current);

    if (fromId && toId && fromId !== toId) {
      let fromLatLng = null, toLatLng = null;

      if (fromId === 'current' && userLocationRef.current) fromLatLng = window.L.latLng(userLocationRef.current.lat, userLocationRef.current.lng);
      else { const loc = seceLocations.find(l => l.id === fromId); if (loc) fromLatLng = window.L.latLng(loc.lat, loc.lng); }

      if (toId === 'current' && userLocationRef.current) toLatLng = window.L.latLng(userLocationRef.current.lat, userLocationRef.current.lng);
      else { const loc = seceLocations.find(l => l.id === toId); if (loc) toLatLng = window.L.latLng(loc.lat, loc.lng); }

      if (fromLatLng && toLatLng) {
        const control = window.L.Routing.control({
          waypoints: [fromLatLng, toLatLng],
          routeWhileDragging: false, show: false, addWaypoints: false, fitSelectedRoutes: false, showAlternatives: false, 
          lineOptions: { styles: [{ color: '#a855f7', opacity: 0.9, weight: 6, lineCap: 'round' }] },
          altLineOptions: { styles: [{ opacity: 0 }] }, createMarker: () => null 
        });

        control.on('routesfound', function(e) {
          if (e.routes && e.routes[0].instructions) {
            setRouteInstructions(e.routes[0].instructions);
            setRouteCoordinates(e.routes[0].coordinates || []);
            setActiveStep(0);
            setIsRoutingOpen(false); 
          }
        });
        routingControlRef.current = control.addTo(mapRef.current);
        mapRef.current.flyToBounds(window.L.latLngBounds([fromLatLng, toLatLng]), { padding: [80, 80], maxZoom: 18, animate: true });
      }
    }
  }, [fromId, toId, leafletLoaded, seceLocations]);

  // 6. Navigation GPS Tracker
  useEffect(() => {
    if (!window.L || !userLocation || routeInstructions.length === 0 || routeCoordinates.length === 0) return;
    if (activeStep < routeInstructions.length - 1) {
      const nextPoint = routeCoordinates[routeInstructions[activeStep + 1].index];
      if (nextPoint && window.L.latLng(userLocation.lat, userLocation.lng).distanceTo(window.L.latLng(nextPoint.lat, nextPoint.lng)) <= 25) {
        setActiveStep(prev => prev + 1);
      }
    }
  }, [userLocation, activeStep, routeInstructions, routeCoordinates]);

  // 7. Place Custom Markers
  const filteredLocations = useMemo(() => seceLocations.filter(loc => activeCategories.includes(loc.category)), [activeCategories, seceLocations]);
  useEffect(() => {
    if (!mapRef.current || !window.L) return;
    Object.values(markersRef.current).forEach(marker => mapRef.current.removeLayer(marker));
    markersRef.current = {};

    filteredLocations.forEach(loc => {
      const color = categoryConfig[loc.category]?.color || '#a855f7';
      const emoji = categoryConfig[loc.category]?.emoji || '📍';
      const iconHtml = `
        <div style="position:relative; cursor:pointer; transform-origin:bottom; transition:transform 0.2s;" class="hover:scale-110 group">
          <div class="zoom-label" style="position:absolute; bottom:42px; left:50%; transform:translateX(-50%); background:rgba(17,24,39,0.95); padding:4px 8px; border-radius:12px; font-size:11px; font-weight:800; white-space:nowrap; color:#e5e7eb; box-shadow:0 4px 6px rgba(0,0,0,0.3); border: 1px solid ${color}60; pointer-events:none; z-index:3;">
            ${loc.name}
            ${loc.floorInfo ? `<div style="font-size:9px; color:#a855f7; margin-top:2px;">📍 ${loc.floorInfo}</div>` : ''}
          </div>
          <div style="width:34px; height:34px; border-radius:50%; background-color:${color}; display:flex; align-items:center; justify-content:center; font-size:16px; box-shadow:0 3px 6px rgba(0,0,0,0.5); border:2px solid #1f2937; position:relative; z-index:2;">${emoji}</div>
          <div style="position:absolute; bottom:-6px; left:50%; transform:translateX(-50%); width:0; height:0; border-left:6px solid transparent; border-right:6px solid transparent; border-top:8px solid ${color}; z-index:1;"></div>
        </div>`;
      
      const marker = window.L.marker([loc.lat, loc.lng], { icon: window.L.divIcon({ className: 'bg-transparent border-none', html: iconHtml, iconSize: [34, 44], iconAnchor: [17, 44] }) })
        .addTo(mapRef.current)
        .on('click', (e) => { window.L.DomEvent.stopPropagation(e); setSelectedLocation(loc); mapRef.current.flyTo([loc.lat, loc.lng], 18, { animate: true }); });
      markersRef.current[loc.id] = marker;
    });
  }, [filteredLocations, seceLocations]);


  // Helper Functions
  const snapToUserLocation = () => {
    if (locationStatus === 'denied') return alert("Location access is denied. Please enable it in your browser settings.");
    setIsLocating(true);
    if (userLocation && mapRef.current) { mapRef.current.flyTo([userLocation.lat, userLocation.lng], 18, { animate: true }); setIsLocating(false); }
    else navigator.geolocation.getCurrentPosition(pos => { mapRef.current.flyTo([pos.coords.latitude, pos.coords.longitude], 18, { animate: true }); setIsLocating(false); }, () => setIsLocating(false), { enableHighAccuracy: true });
  };

  const clearRoute = () => {
    setFromId(''); setToId(''); setRouteInstructions([]); setRouteCoordinates([]); setActiveStep(0);
    if (routingControlRef.current) { mapRef.current.removeControl(routingControlRef.current); routingControlRef.current = null; }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  const toggleCategory = (cat) => {
    setActiveCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
    if (selectedLocation?.category === cat) setSelectedLocation(null);
  };

  const startNavigation = (id) => {
    clearRoute(); setToId(id); setSelectedLocation(null);
    if (userLocationRef.current && !fromId) setFromId('current');
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 overflow-hidden font-sans text-gray-200">
      <style>{`.zoom-label { opacity: ${currentZoom >= 17 ? '1' : '0'}; transform: ${currentZoom >= 17 ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)'}; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); visibility: ${currentZoom >= 17 ? 'visible' : 'hidden'}; }`}</style>
      
      <Navbar isCategoriesOpen={isCategoriesOpen} setIsCategoriesOpen={setIsCategoriesOpen} isRoutingOpen={isRoutingOpen} setIsRoutingOpen={setIsRoutingOpen} />

      {/* Dark Mode Loading Overlay */}
      {isDataLoading && (
        <div className="absolute inset-0 z-[3000] bg-gray-900/90 backdrop-blur-md flex flex-col items-center justify-center">
          <Loader2 size={48} className="text-purple-500 animate-spin mb-4" />
          <h2 className="text-xl font-bold text-white">Connecting to Database...</h2>
          <p className="text-gray-400 text-sm mt-2">Fetching live campus data from backend</p>
        </div>
      )}

      {locationStatus === 'denied' && (
        <div className="bg-red-900/30 border-b border-red-800 text-red-400 px-4 py-2 text-xs font-semibold flex justify-center space-x-2 z-[1500]">
          <span>⚠️ Location access denied. Enable in browser settings for live routing.</span>
          <button onClick={() => setLocationStatus('dismissed')} className="hover:text-red-300 ml-2 bg-red-900/50 p-1 rounded-full"><X size={12} /></button>
        </div>
      )}

      <div className="flex-1 relative">
        <NavigationBanner 
          routeInstructions={routeInstructions} 
          activeStep={activeStep} 
          setActiveStep={setActiveStep} 
          clearRoute={clearRoute}
          seceLocations={seceLocations} 
          toId={toId}
        />
        
        <CompassWidget compassHeading={compassHeading} />
        
        <LegendPanel isCategoriesOpen={isCategoriesOpen} setIsCategoriesOpen={setIsCategoriesOpen} allCategories={allCategories} categoryConfig={categoryConfig} activeCategories={activeCategories} toggleCategory={toggleCategory} />
        
        <DirectionsPanel seceLocations={seceLocations} isRoutingOpen={isRoutingOpen} setIsRoutingOpen={setIsRoutingOpen} fromId={fromId} setFromId={setFromId} toId={toId} setToId={setToId} clearRoute={clearRoute} routeInstructions={routeInstructions} />
        
        <MapControls mapType={mapType} setMapType={setMapType} snapToUserLocation={snapToUserLocation} isLocating={isLocating} userLocation={userLocation} />
        
        <div ref={mapContainer} className="w-full h-full z-[1] bg-gray-800" />

        <LocationPopup selectedLocation={selectedLocation} routeInstructions={routeInstructions} categoryConfig={categoryConfig} setSelectedLocation={setSelectedLocation} startNavigation={startNavigation} />
      </div>

      <Footer locationCount={seceLocations.length} />
    </div>
  );
}