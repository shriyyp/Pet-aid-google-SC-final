import { 
  ShieldAlert, 
  Phone, 
  MessageSquare, 
  MapPin, 
  HeartHandshake,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function SafetyTab() {
  const emergencyContacts = [
    { name: 'Animal Police / Control', phone: '911', icon: ShieldAlert },
    { name: 'State Wildlife Rescue', phone: '1-800-441-1234', icon: Phone },
    { name: 'PetAid Poison Control', phone: '1888-426-4435', icon: MessageSquare },
  ];

  const safetyTips = [
    { title: 'Approach with Caution', description: 'Injured animals are scared and may bite. Speak softly and move slowly.', icon: Info },
    { title: 'Secure the Area', description: 'If near traffic, try to redirect cars or create a safe barrier if possible.', icon: MapPin },
    { title: 'Use a Towel', description: 'A large towel can help you safely pick up a small animal while protecting yourself.', icon: HeartHandshake },
  ];

  return (
    <div className="flex flex-col gap-8 p-4 md:p-0 max-w-2xl mx-auto">
      <header className="space-y-1">
        <h2 className="text-3xl font-black tracking-tight uppercase">Rescuer Safety Hub</h2>
        <p className="text-brand-dim text-xs font-bold uppercase tracking-[0.2em]">Protocols & Emergency Resources</p>
      </header>

      {/* Immediate Help */}
      <section className="bg-linear-to-br from-brand-sos to-brand-critical rounded-2xl p-6 shadow-sos-hero border-2 border-brand-warning">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="text-white font-black text-xl uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-brand-warning" />
              Urgent Hotline
            </h3>
            <p className="text-sm text-white/80 font-medium">
              Immediate threat to life or property. Always call 911 first.
            </p>
          </div>
        </div>
        <button className="w-full bg-brand-warning text-black py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3">
          <Phone className="w-5 h-5" />
          DISPATCH EMERGENCY SERVICES
        </button>
      </section>

      {/* Emergency Contacts */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-brand-dim tracking-[0.2em] uppercase px-1">
          Priority Contacts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {emergencyContacts.map((contact, i) => (
            <div key={i} className="bg-brand-card rounded-2xl p-4 flex flex-col justify-between border border-brand-border hover:border-brand-primary/30 transition-all group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-brand-bg p-2 rounded-xl text-brand-primary group-hover:bg-brand-primary/10 transition-colors">
                  <contact.icon className="w-5 h-5" />
                </div>
                <button className="p-2 bg-brand-bg rounded-lg text-brand-dim hover:text-brand-secondary transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h4 className="font-extrabold text-sm tracking-tight mb-0.5">{contact.name}</h4>
                <p className="text-[10px] text-brand-dim font-black tracking-widest uppercase">{contact.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Tips */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-brand-dim tracking-[0.2em] uppercase px-1">
          Safety Protocols
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {safetyTips.map((tip, i) => (
            <motion.div 
              whileHover={{ x: 5 }}
              key={i} 
              className="bg-brand-card rounded-2xl p-5 flex gap-5 border border-brand-border group hover:border-brand-secondary/30 transition-all"
            >
              <div className="bg-brand-secondary/10 p-3 h-fit rounded-xl text-brand-secondary group-hover:bg-brand-secondary transition-all group-hover:text-brand-bg">
                <tip.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-base tracking-tight">{tip.title}</h4>
                <p className="text-xs text-brand-dim font-medium leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* External Resources */}
      <section className="bg-brand-card rounded-2xl p-6 border border-brand-border mb-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <HeartHandshake className="w-32 h-32 text-brand-primary" />
        </div>
        <h3 className="text-[10px] font-black text-brand-dim tracking-[0.2em] uppercase mb-6 relative z-10">Librarian Resources</h3>
        <div className="space-y-2 relative z-10">
          <ResourceLink title="Field Guide: Domestic Species" />
          <ResourceLink title="Veterinary First Aid (WHO Standard)" />
          <ResourceLink title="Regional Wildlife Sanctuary Map" />
        </div>
      </section>
    </div>
  );
}

function ResourceLink({ title }: { title: string }) {
  return (
    <button className="w-full flex items-center justify-between text-sm text-brand-slate hover:text-white transition-colors group">
      <span>{title}</span>
      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}
