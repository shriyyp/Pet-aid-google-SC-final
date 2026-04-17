import { useState } from 'react';
import { 
  AlertCircle, 
  Clock, 
  MapPin, 
  ChevronRight, 
  PhoneCall,
  Activity,
  PawPrint
} from 'lucide-react';
import { cn } from '../lib/utils';
import { RescueRequest, SOSAlert } from '../types';
import { motion } from 'motion/react';

interface RescueTabProps {
  activeRescues: RescueRequest[];
  sosAlerts: SOSAlert[];
  onTriggerSOS: (type: 'emergency' | 'critical-animal') => void;
}

export default function RescueTab({ activeRescues, sosAlerts, onTriggerSOS }: RescueTabProps) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-[400px_1fr] gap-6 p-4 md:p-0 h-full">
      <div className="flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
        {/* SOS Alert Section */}
        <section className="sos-hero-card">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold tracking-wider uppercase text-white drop-shadow-md">SOS Emergency Alert</h2>
            <p className="text-white/90 text-sm font-medium">
              Severe injury reported: Beagle found at 122nd St. Intersection. <strong className="text-brand-warning">3 mins away.</strong>
            </p>
          </div>
          <button 
            onClick={() => onTriggerSOS('emergency')}
            className="mt-4 md:mt-0 px-6 py-3 bg-brand-warning text-black rounded-xl font-black text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95 whitespace-nowrap"
          >
            I'M EN ROUTE
          </button>
        </section>

        {/* SOS Quick Actions (Mobile Context) */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          <button 
            onClick={() => onTriggerSOS('critical-animal')}
            className="flex items-center justify-center gap-2 p-3 bg-brand-critical rounded-xl border border-brand-sos/50"
          >
            <AlertCircle className="w-5 h-5 text-white" />
            <span className="font-bold text-[10px] uppercase">CRITICAL ANIMAL</span>
          </button>
          <button 
            onClick={() => onTriggerSOS('emergency')}
            className="flex items-center justify-center gap-2 p-3 bg-brand-sos rounded-xl"
          >
            <Activity className="w-5 h-5 text-white" />
            <span className="font-bold text-[10px] uppercase">PERSONAL SOS</span>
          </button>
        </div>

        {/* Live SOS Alerts Feed */}
        {sosAlerts.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-[10px] font-black text-brand-dim tracking-[0.2em] uppercase flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-brand-sos rounded-full animate-pulse" />
              Live SOS Alerts
            </h3>
            <div className="space-y-2">
              {sosAlerts.map((alert) => (
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  key={alert.id} 
                  className={cn(
                    "p-3 rounded-2xl flex items-center justify-between border",
                    alert.type === 'emergency' 
                      ? "bg-brand-sos/5 border-brand-sos/30" 
                      : "bg-brand-critical/5 border-brand-critical/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-1.5 rounded-lg",
                      alert.type === 'emergency' ? "bg-brand-sos" : "bg-brand-critical"
                    )}>
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-extrabold text-sm tracking-tight">{alert.userName}</p>
                      <p className="text-[9px] text-brand-dim uppercase font-bold tracking-wider">
                        {alert.type === 'emergency' ? 'Personal Emergency' : 'Critical Animal Distress'}
                      </p>
                    </div>
                  </div>
                  <button className="bg-brand-text text-brand-bg px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                    VIEW
                  </button>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Active Rescues Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-black text-brand-dim tracking-[0.2em] uppercase">
              Active Rescues ({activeRescues.length})
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {activeRescues.length === 0 ? (
              <div className="bg-brand-card/30 rounded-2xl p-8 flex flex-col items-center justify-center border border-dashed border-brand-border">
                <Clock className="w-10 h-10 text-brand-inactive opacity-20 mb-2" />
                <p className="text-brand-dim text-xs font-bold uppercase tracking-wider">No active missions</p>
              </div>
            ) : (
              activeRescues.map((rescue) => (
                <motion.div 
                  layout
                  key={rescue.id}
                  className="rescue-card-dense group hover:ring-2 hover:ring-brand-primary/20 transition-all cursor-pointer"
                >
                  <div className="w-16 h-16 bg-brand-bg/80 rounded-xl overflow-hidden flex-shrink-0 border border-brand-border relative">
                    {rescue.photoUrl ? (
                      <img 
                        src={rescue.photoUrl} 
                        alt={rescue.animalType} 
                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-10">
                        <PawPrint className="w-6 h-6" />
                      </div>
                    )}
                    {rescue.condition === 'critical' && (
                      <div className="absolute top-0 right-0 bg-brand-critical text-white text-[7px] font-black px-1 py-0.5 rounded-bl">SOS</div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-0.5">
                      {rescue.condition === 'critical' && (
                        <span className="bg-brand-critical text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shrink-0">CRITICAL</span>
                      )}
                      <h4 className="font-extrabold text-sm truncate group-hover:text-brand-primary transition-colors">{rescue.animalType}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-brand-dim font-bold">
                      <span className="flex items-center gap-1 truncate">📍 {rescue.location.address}</span>
                      <span className="shrink-0 text-brand-primary">● {new Date(rescue.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  <div className="flex items-center px-1">
                    <ChevronRight className="w-4 h-4 text-brand-inactive group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Map Side View (Desktop Only) */}
      <div className="hidden md:block h-full relative rounded-2xl overflow-hidden border border-brand-border bg-brand-card">
         <div className="absolute inset-0 bg-[radial-gradient(var(--color-brand-inactive)_0.5px,transparent_0.5px)] [background-size:20px_20px] opacity-10 pointer-events-none z-10" />
         <div className="absolute top-6 right-6 z-20 bg-brand-bg/90 backdrop-blur-md p-4 rounded-2xl border border-brand-border w-52 shadow-2xl">
            <p className="text-[10px] font-black text-brand-dim tracking-[0.2em] uppercase mb-4">Volunteers</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-bold">
                <div className="w-2 h-2 bg-brand-secondary rounded-full shadow-[0_0_8px_var(--color-brand-secondary)]" />
                Dr. Sarah (Vet)
              </div>
              <div className="flex items-center gap-3 text-xs font-bold">
                <div className="w-2 h-2 bg-brand-secondary rounded-full shadow-[0_0_8px_var(--color-brand-secondary)]" />
                Mark T. (Driver)
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-brand-inactive">
                <div className="w-2 h-2 bg-brand-warning rounded-full" />
                Elena R. (Away)
              </div>
            </div>
         </div>

         {/* Simulated Map Background */}
         <div className="w-full h-full flex items-center justify-center opacity-20 flex-col gap-4">
            <MapPin className="w-20 h-20 text-brand-dim" />
            <p className="text-brand-dim font-black text-sm uppercase tracking-widest">Interactive Feed Map</p>
         </div>

         <div className="absolute bottom-6 left-6 text-brand-dim text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
            <Activity className="w-3 h-3" />
            PetAid v2.6.0 Dashboard
         </div>
      </div>
    </div>
  );
}
