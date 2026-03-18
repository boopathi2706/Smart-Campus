// src/constants/campusData.js
import { BookOpen, Home, Activity, Cpu, Briefcase, HeartPulse, Coffee, Layers, MapPin } from 'lucide-react';

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