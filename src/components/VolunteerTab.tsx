import { 
  Trophy, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Users,
  Award,
  ChevronRight,
  Settings,
  Activity,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function VolunteerTab() {
  const stats = [
    { label: 'Saved', value: '12', icon: Trophy, color: 'brand-orange' },
    { label: 'Assisted', value: '45', icon: Users, color: 'brand-green' },
    { label: 'Points', value: '1.2k', icon: Award, color: 'brand-glow' }
  ];

  return (
    <div className="p-4 flex flex-col gap-6 pb-20">
      {/* Volunteer Profile Summary */}
      <section className="bg-brand-card rounded-2xl p-6 border border-brand-border relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-brand-bg border-4 border-brand-primary p-0.5 overflow-hidden">
            <img 
              src="https://picsum.photos/seed/volunteer1/200" 
              alt="Profile" 
              className="w-full h-full rounded-xl object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-extrabold tracking-tight">Alex Johnson</h2>
              <div className="bg-brand-secondary/20 p-1 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
              </div>
            </div>
            <p className="text-brand-dim text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse" />
              Volunteer Level 4
            </p>
          </div>
          <button className="ml-auto p-2 bg-brand-bg/50 rounded-full text-brand-dim hover:text-brand-primary transition-colors border border-brand-border">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-brand-bg/80 p-4 rounded-2xl border border-brand-border flex flex-col items-center gap-1 group hover:border-brand-primary/30 transition-all">
              <span className={cn("text-xl font-black tracking-tight", `text-${stat.color}`)}>{stat.value}</span>
              <span className="text-[9px] font-black text-brand-dim tracking-widest uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Assignment Status */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-brand-dim tracking-[0.2em] uppercase px-1">
          Current Assignment
        </h3>
        <div className="bg-brand-card rounded-2xl p-6 border border-brand-primary shadow-[0_0_20px_rgba(234,88,12,0.1)]">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-brand-primary animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-black text-brand-primary tracking-widest uppercase">EN ROUTE</span>
                <p className="text-[10px] text-brand-dim font-bold uppercase">Arrival: 8 mins</p>
              </div>
            </div>
            <button className="p-2 text-brand-dim hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <h4 className="font-extrabold text-lg mb-1 tracking-tight">Injured Golden Retriever</h4>
          <p className="text-xs text-brand-dim font-medium flex items-center gap-1.5 mb-6">
            <MapPin className="w-3.5 h-3.5 text-brand-primary" />
            221B Baker St, London
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button className="px-4 py-3 bg-brand-secondary text-brand-bg rounded-xl font-black text-[10px] uppercase tracking-widest transition-transform active:scale-95 shadow-lg shadow-brand-secondary/10">
              ARRIVED
            </button>
            <button className="px-4 py-3 bg-brand-card border border-brand-border text-brand-text rounded-xl font-black text-[10px] uppercase tracking-widest transition-transform active:scale-95">
              UPDATE STATUS
            </button>
          </div>
        </div>
      </section>

      {/* Training & Badges */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-brand-slate tracking-widest uppercase">
            Training Progress
          </h3>
          <button className="text-[10px] font-bold text-brand-orange">VIEW ALL</button>
        </div>
        <div className="space-y-2">
          <TrainingItem title="Emergency First Aid" progress={85} />
          <TrainingItem title="Wild Animal Handling" progress={40} />
          <TrainingItem title="Communication Tech" progress={100} completed />
        </div>
      </section>
    </div>
  );
}

function TrainingItem({ title, progress, completed }: { title: string; progress: number; completed?: boolean }) {
  return (
    <div className="bg-brand-card rounded-2xl p-5 border border-brand-border hover:border-brand-primary/30 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-brand-primary" />
          </div>
          <h4 className="text-sm font-extrabold tracking-tight">{title}</h4>
        </div>
        <span className={cn(
          "text-[10px] font-black tracking-widest",
          completed ? "text-brand-secondary" : "text-brand-primary"
        )}>
          {completed ? 'COMPLETED' : `${progress}%`}
        </span>
      </div>
      <div className="w-full bg-brand-bg h-2 rounded-full overflow-hidden border border-brand-border">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full transition-all duration-1000 bg-linear-to-r shadow-[0_0_8px_rgba(234,88,12,0.3)]",
            completed ? "from-brand-secondary to-brand-success" : "from-brand-primary to-brand-warning"
          )}
        />
      </div>
    </div>
  );
}
