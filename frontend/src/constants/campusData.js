// src/constants/campusData.js
import { BookOpen, Home, Activity, Cpu, Briefcase, HeartPulse, Coffee, Layers, MapPin } from 'lucide-react';

export const seceLocations = [
  { id: '1', name: 'Main Gate', lat: 10.828963926783924, lng: 77.06106932563632, category: 'Entrance' },
  { id: '2', name: 'OAT', lat: 10.828262959883935, lng: 77.060864409078, category: 'Venue' },
  { id: '3', name: 'Main Office', lat: 10.82780196778388, lng: 77.06055188982707, category: 'Admin' },
  { id: '4', name: 'Library', lat: 10.827836965944092, lng: 77.0602053347118, category: 'Academic' },
  { id: '5', name: 'Medical Center', lat: 10.827840898002831, lng: 77.06129823825881, category: 'Health' },
  { id: '6', name: 'Amenity', lat: 10.827358949400596, lng: 77.06127385968371, category: 'Facilities' },
  { id: '7', name: 'Hostel (Boys)', lat: 10.826641780798974, lng: 77.06066267335821, category: 'Housing' },
  { id: '8', name: 'Hostel (Girls)', lat: 10.826412275406506, lng: 77.05952184065451, category: 'Housing' },
  { id: '9', name: 'A-Block (Boys)', lat: 10.826606653800626, lng: 77.06094769029814, category: 'Housing' },
  { id: '10', name: 'C-Block (Boys)', lat: 10.82677043224541, lng: 77.0606543166573, category: 'Housing' },
  { id: '11', name: 'B Block', lat: 10.82649090056009, lng: 77.06047377903218, category: 'Academic' },
  { id: '12', name: 'E Block', lat: 10.826226158229277, lng: 77.06076463647759, category: 'Academic' },
  { id: '13', name: 'D1 Block', lat: 10.82599893283556, lng: 77.06082462014531, category: 'Academic' },
  { id: '14', name: 'D2 Block', lat: 10.825904761332415, lng: 77.06052720294997, category: 'Academic' },
  { id: '15', name: 'F Block', lat: 10.82620072881403, lng: 77.06037458096812, category: 'Academic' },
  { id: '16', name: 'Hand Ball Ground', lat: 10.826266072247478, lng: 77.06148793877774, category: 'Sports' },
  { id: '17', name: 'Basket Ball Ground', lat: 10.82635447804261, lng: 77.0618303598908, category: 'Sports' },
  { id: '18', name: 'Volley Ball Ground (A)', lat: 10.826506305325566, lng: 77.0619242811104, category: 'Sports' },
  { id: '19', name: 'Foot Ball Ground', lat: 10.826627382723915, lng: 77.06237236359551, category: 'Sports' },
  { id: '20', name: 'Girls Hostel A', lat: 10.82619111948656, lng: 77.05944515221171, category: 'Housing' },
  { id: '21', name: 'Girls Hostel B', lat: 10.826352556176655, lng: 77.059243612928, category: 'Housing' },
  { id: '22', name: 'Girls Hostel C', lat: 10.826621617133494, lng: 77.05915164840049, category: 'Housing' },
  { id: '23', name: 'Girls Hostel Ground', lat: 10.825648193845286, lng: 77.05951437637404, category: 'Sports' },
  { id: '24', name: 'Volley Ball (B) Ground', lat: 10.826725842013865, lng: 77.0600022854606, category: 'Sports' },
  { id: '25', name: 'Drone Tech', lat: 10.826886394227428, lng: 77.06110441510674, category: 'Tech' },
  { id: '26', name: 'AIDS Block', lat: 10.827190470163545, lng: 77.06029701226625, category: 'Academic' },
  { id: '27', name: 'Mech Block', lat: 10.827054244185565, lng: 77.0608468387338, category: 'Academic' },
  { id: '28', name: 'Auditorium 1 & 2', lat: 10.827735875127026, lng: 77.06049263569423, category: 'Venue' },
  { id: '29', name: 'CSE Dept', lat: 10.827823686942276, lng: 77.06072875271019, category: 'Academic' },
  { id: '30', name: 'IT Center', lat: 10.827749384638732, lng: 77.0605040976853, category: 'Tech' },
  { id: '31', name: 'Business Zone', lat: 10.827823686942276, lng: 77.06049722049067, category: 'Academic' },
  { id: '32', name: 'Center of Placement Training', lat: 10.827812429018673, lng: 77.06100613289, category: 'Admin' }
];

export const categoryConfig = {
  Academic: { color: '#3b82f6', icon: BookOpen, emoji: '📚' },
  Housing: { color: '#8b5cf6', icon: Home, emoji: '🛏️' },
  Sports: { color: '#10b981', icon: Activity, emoji: '⚽' },
  Tech: { color: '#f59e0b', icon: Cpu, emoji: '💻' },
  Admin: { color: '#64748b', icon: Briefcase, emoji: '🏢' },
  Health: { color: '#ef4444', icon: HeartPulse, emoji: '🏥' },
  Facilities: { color: '#f97316', icon: Coffee, emoji: '☕' },
  Venue: { color: '#ec4899', icon: Layers, emoji: '🏛️' },
  Entrance: { color: '#14b8a6', icon: MapPin, emoji: '🚪' }
};