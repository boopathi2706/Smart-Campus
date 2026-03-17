// src/hooks/useGeolocation.js
import { useState, useEffect, useRef } from 'react';

export const useGeolocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle');
  const [compassHeading, setCompassHeading] = useState(0);
  const userLocationRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      setLocationStatus('requesting');
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocationStatus('granted');
          const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
          userLocationRef.current = pos;
          setUserLocation(pos);
        },
        (error) => {
          setLocationStatus('denied');
        },
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
      
      const handleOrientation = (event) => {
        let heading = event.webkitCompassHeading || Math.abs(event.alpha - 360);
        if (heading) setCompassHeading(heading);
      };
      window.addEventListener('deviceorientation', handleOrientation, true);
      
      return () => {
        navigator.geolocation.clearWatch(watchId);
        window.removeEventListener('deviceorientation', handleOrientation, true);
      };
    } else {
      setLocationStatus('unsupported');
    }
  }, []);

  return { userLocation, userLocationRef, locationStatus, compassHeading, setLocationStatus };
};