import { ReactNode } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { RescueRequest, UserProfile } from '../types';
import { MapPin, Users, Dog, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapTabProps {
  rescues: RescueRequest[];
  volunteers: UserProfile[];
}

export default function MapTab({ rescues, volunteers }: MapTabProps) {
  // Default center (San Francisco)
  const center: [number, number] = [37.7749, -122.4194];

  return (
    <div className="relative h-[calc(100vh-144px)] w-full overflow-hidden rounded-2xl border border-brand-border">
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Rescue Markers */}
        {rescues.map((rescue) => (
          <Marker 
            key={rescue.id} 
            position={[rescue.location.lat, rescue.location.lng]}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[140px] space-y-1">
                <h4 className="font-black text-brand-primary text-sm m-0 leading-tight uppercase tracking-tight">{rescue.animalType}</h4>
                <p className="text-[10px] text-brand-dim font-black tracking-widest uppercase m-0">{rescue.condition}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-[9px] text-brand-text font-black uppercase tracking-tighter">DISPATCHED</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Volunteer Markers (Simulated) */}
        {volunteers.map((v, i) => (
          <Marker 
            key={i} 
            position={[center[0] + (Math.random() - 0.5) * 0.05, center[1] + (Math.random() - 0.5) * 0.05]}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[120px]">
                <h4 className="font-extrabold text-sm m-0 tracking-tight">{v.displayName}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                   <div className="w-1.5 h-1.5 bg-brand-secondary rounded-full" />
                   <span className="text-[9px] text-brand-secondary font-black uppercase tracking-widest">VOLUNTEER</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend (Overlay) */}
      <div className="absolute bottom-6 left-6 z-[1000] bg-brand-bg/95 backdrop-blur-md p-4 rounded-2xl border border-brand-border space-y-3 shadow-2xl min-w-[160px]">
        <h4 className="text-[10px] font-black text-brand-dim tracking-[0.2em] uppercase mb-4 px-1">Active Grid</h4>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-brand-sos rounded-full shadow-[0_0_8px_var(--color-brand-sos)]" />
            <span className="text-[10px] font-black uppercase tracking-widest">Distress</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-brand-secondary rounded-full shadow-[0_0_8px_var(--color-brand-secondary)]" />
            <span className="text-[10px] font-black uppercase tracking-widest">Rescuers</span>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] flex gap-2">
        <MapFilter icon={<Dog className="w-3.5 h-3.5" />} label="RESCUES" active />
        <MapFilter icon={<Users className="w-3.5 h-3.5" />} label="VOLUNTEERS" />
      </div>

      <div className="absolute bottom-6 right-6 z-[1000] text-brand-dim text-[10px] font-black tracking-widest uppercase bg-brand-bg/80 backdrop-blur-sm px-3 py-1 rounded-full border border-brand-border">
         Live Grid v2.6.0
      </div>
    </div>
  );
}

function MapFilter({ icon, label, active }: { icon: ReactNode; label: string; active?: boolean }) {
  return (
    <button className={cn(
      "px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold border transition-all shadow-lg",
      active 
        ? "bg-brand-orange border-brand-orange text-white" 
        : "bg-brand-card/90 backdrop-blur-md border-brand-slate/20 text-brand-slate hover:border-brand-orange/50"
    )}>
      {icon}
      {label}
    </button>
  );
}
