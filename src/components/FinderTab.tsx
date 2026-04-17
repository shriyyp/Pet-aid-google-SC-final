import { useState, FormEvent } from 'react';
import { 
  Camera, 
  MapPin, 
  Send, 
  CheckCircle2,
  AlertCircle,
  Activity,
  ChevronDown,
  PawPrint
} from 'lucide-react';
import { cn } from '../lib/utils';
import { AnimalCondition } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface FinderTabProps {
  onSubmit: (report: any) => void;
}

export default function FinderTab({ onSubmit }: FinderTabProps) {
  const [animalType, setAnimalType] = useState('');
  const [condition, setCondition] = useState<AnimalCondition>('healthy');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({
        animalType,
        condition,
        description,
        createdAt: new Date().toISOString(),
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setAnimalType('');
        setDescription('');
        setCondition('healthy');
      }, 3000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-10 min-h-[60vh] text-center gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-brand-success/20 p-6 rounded-full"
        >
          <CheckCircle2 className="w-16 h-16 text-brand-success" />
        </motion.div>
        <h2 className="text-2xl font-bold">Report Submitted!</h2>
        <p className="text-brand-slate">
          Nearby volunteers have been notified and a rescue team will be dispatched shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-4 md:p-0 max-w-2xl mx-auto">
      <header className="space-y-1">
        <h2 className="text-3xl font-black tracking-tight">REPORT FOUND ANIMAL</h2>
        <p className="text-brand-dim text-xs font-bold uppercase tracking-[0.2em]">Immediate assistance dispatch</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8 pb-10">
        {/* Photo Upload Simulation */}
        <section className="space-y-3">
           <label className="text-[10px] font-black text-brand-dim tracking-[0.2em] uppercase px-1">Evidence Photo</label>
           <div className="w-full aspect-video bg-brand-card rounded-2xl border-2 border-dashed border-brand-border flex flex-col items-center justify-center gap-3 group hover:border-brand-primary active:bg-brand-primary/5 transition-all cursor-pointer">
             <Camera className="w-10 h-10 text-brand-dim group-hover:text-brand-primary" />
             <p className="text-xs font-bold text-brand-dim uppercase tracking-widest">Tap to capture or upload</p>
           </div>
        </section>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="space-y-3">
             <label className="text-[10px] font-black text-brand-dim tracking-[0.2em] uppercase px-1">Animal Type</label>
             <div className="relative group">
               <PawPrint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dim group-focus-within:text-brand-primary transition-colors" />
               <input 
                 type="text" 
                 value={animalType}
                 onChange={(e) => setAnimalType(e.target.value)}
                 placeholder="e.g., Beagle, Tabby Cat..."
                 className="w-full bg-brand-card border border-brand-border rounded-xl px-12 py-4 text-sm font-bold text-brand-text placeholder:text-brand-dim/50 focus:outline-hidden focus:ring-2 focus:ring-brand-primary/50 transition-all shadow-inner"
                 required
               />
             </div>
          </section>

          <section className="space-y-3">
             <label className="text-[10px] font-black text-brand-dim tracking-[0.2em] uppercase px-1">Location</label>
             <div className="relative group">
               <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dim group-focus-within:text-brand-primary transition-colors" />
               <input 
                 type="text" 
                 placeholder="Detecting location..."
                 className="w-full bg-brand-card border border-brand-border rounded-xl px-12 py-4 text-sm font-bold text-brand-secondary placeholder:text-brand-secondary focus:outline-hidden ring-1 ring-brand-secondary/30 bg-brand-secondary/5"
                 disabled
               />
             </div>
          </section>
        </div>

        {/* Condition Selection */}
        <section className="space-y-4">
           <label className="text-[10px] font-black text-brand-dim tracking-[0.2em] uppercase px-1">Current Condition</label>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
             <ConditionButton 
               active={condition === 'healthy'} 
               onClick={() => setCondition('healthy')}
               label="HEALTHY"
               color="brand-secondary"
             />
             <ConditionButton 
               active={condition === 'distress'} 
               onClick={() => setCondition('distress')}
               label="DISTRESS"
               color="brand-warning"
             />
             <ConditionButton 
               active={condition === 'minor-injury'} 
               onClick={() => setCondition('minor-injury')}
               label="MINOR INJURY"
               color="brand-primary"
             />
             <ConditionButton 
               active={condition === 'critical'} 
               onClick={() => setCondition('critical')}
               label="CRITICAL"
               color="brand-sos"
             />
           </div>
        </section>

        {/* Description */}
        <section className="space-y-3">
           <label className="text-[10px] font-black text-brand-dim tracking-[0.2em] uppercase px-1">Additional Observations</label>
           <textarea 
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             rows={4}
             placeholder="Behavior, visible injuries, exact location details..."
             className="w-full bg-brand-card border border-brand-border rounded-xl p-5 text-sm font-bold text-brand-text placeholder:text-brand-dim/50 focus:outline-hidden focus:ring-2 focus:ring-brand-primary/50 transition-all shadow-inner resize-none"
             required
           />
        </section>

        {/* Action Button */}
        <button 
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full py-5 rounded-2xl font-black text-sm tracking-[0.2em] uppercase shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3",
            isSubmitting ? "bg-brand-inactive cursor-not-allowed" : "bg-brand-primary text-white hover:bg-brand-primary/90"
          )}
        >
          {isSubmitting ? (
            <>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              BROADCASTING...
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5" />
              BROADCAST EMERGENCY REPORT
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function ConditionButton({ 
  active, 
  onClick, 
  label, 
  color 
}: { 
  active: boolean; 
  onClick: () => void; 
  label: string; 
  color: string; 
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3 py-2.5 rounded-xl text-xs font-bold border-2 transition-all",
        active 
          ? `bg-${color} border-${color} text-white` 
          : `bg-brand-card border-brand-slate/10 text-brand-slate hover:border-brand-slate/30`
      )}
    >
      {label}
    </button>
  );
}
