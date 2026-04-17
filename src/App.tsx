/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  User as UserIcon, 
  ShieldCheck, 
  Search, 
  PawPrint 
} from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { RescueRequest, SOSAlert, UserProfile } from './types';

// Components
import RescueTab from './components/RescueTab';
import FinderTab from './components/FinderTab';
import MapTab from './components/MapTab';
import VolunteerTab from './components/VolunteerTab';
import SafetyTab from './components/SafetyTab';

type Tab = 'rescue' | 'finder' | 'map' | 'volunteer' | 'safety';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('rescue');
  const [activeRescues, setActiveRescues] = useState<RescueRequest[]>([
    {
      id: '1',
      reporterId: 'u1',
      reporterName: 'John Doe',
      animalType: 'Stray Cat',
      description: 'Found a small kitten shivering in the alley behind the main market. Appears dehydrated.',
      location: { lat: 37.7749, lng: -122.4194, address: 'Central Market Alley, SF' },
      condition: 'distress',
      status: 'in-progress',
      photoUrl: 'https://picsum.photos/seed/kitten1/400/400',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '2',
      reporterId: 'u2',
      reporterName: 'Jane Smith',
      animalType: 'Injured Dog',
      description: 'Large golden retriever with a limp near the park entrance. Needs immediate checkup.',
      location: { lat: 37.7849, lng: -122.4294, address: 'Golden Gate Park North' },
      condition: 'critical',
      status: 'pending',
      photoUrl: 'https://picsum.photos/seed/dog2/400/400',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    }
  ]);

  const [sosAlerts, setSosAlerts] = useState<SOSAlert[]>([]);
  const [volunteers] = useState<UserProfile[]>([
    { uid: 'v1', email: 'v1@test.com', displayName: 'Alex Johnson', role: 'volunteer', isVolunteer: true },
    { uid: 'v2', email: 'v2@test.com', displayName: 'Sam Rivera', role: 'volunteer', isVolunteer: true },
  ]);

  const handleTriggerSOS = (type: 'emergency' | 'critical-animal') => {
    const newAlert: SOSAlert = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'currentUser',
      userName: 'Current User',
      location: { lat: 37.7749, lng: -122.4194 },
      timestamp: new Date().toISOString(),
      type
    };
    setSosAlerts(prev => [newAlert, ...prev]);
    
    // Auto remove after 2 minutes for demo
    setTimeout(() => {
      setSosAlerts(prev => prev.filter(a => a.id !== newAlert.id));
    }, 120000);
  };

  const handleReportAnimal = (report: any) => {
    const newRescue: RescueRequest = {
      id: Math.random().toString(36).substr(2, 9),
      reporterId: 'currentUser',
      reporterName: 'Current User',
      animalType: report.animalType,
      description: report.description,
      location: { lat: 37.7749, lng: -122.4194, address: 'Current Location' },
      condition: report.condition,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setActiveRescues(prev => [newRescue, ...prev]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'rescue':
        return (
          <RescueTab 
            activeRescues={activeRescues} 
            sosAlerts={sosAlerts}
            onTriggerSOS={handleTriggerSOS}
          />
        );
      case 'finder':
        return <FinderTab onSubmit={handleReportAnimal} />;
      case 'map':
        return <MapTab rescues={activeRescues} volunteers={volunteers} />;
      case 'volunteer':
        return <VolunteerTab />;
      case 'safety':
        return <SafetyTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text font-sans">
      {/* Header */}
      <header className="high-density-header">
        <div className="flex items-center gap-3">
          <div className="bg-brand-primary p-2 rounded-lg shadow-lg flex items-center justify-center">
            <PawPrint className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">PetAid</h1>
        </div>
        <div className="flex items-center gap-5">
          <span className="bg-brand-secondary/20 text-brand-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <div className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse" />
            12 Rescuers Nearby
          </span>
          <button className="w-9 h-9 bg-brand-card border-2 border-brand-primary rounded-full transition-colors flex items-center justify-center group overflow-hidden">
            <UserIcon className="w-5 h-5 text-brand-dim group-hover:text-brand-primary" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-16 pb-20 overflow-x-hidden md:px-6 md:py-6">
        <div className="max-w-[1400px] mx-auto h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full h-full"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="high-density-nav pb-safe">
        <NavButton 
          active={activeTab === 'rescue'} 
          onClick={() => setActiveTab('rescue')} 
          icon={<AlertTriangle className="w-6 h-6" />} 
          label="RESCUE" 
        />
        <NavButton 
          active={activeTab === 'finder'} 
          onClick={() => setActiveTab('finder')} 
          icon={<Search className="w-6 h-6" />} 
          label="FINDER" 
        />
        <NavButton 
          active={activeTab === 'map'} 
          onClick={() => setActiveTab('map')} 
          icon={<MapPin className="w-6 h-6" />} 
          label="MAP" 
        />
        <NavButton 
          active={activeTab === 'volunteer'} 
          onClick={() => setActiveTab('volunteer')} 
          icon={<UserIcon className="w-6 h-6" />} 
          label="VOLUNTEER" 
        />
        <NavButton 
          active={activeTab === 'safety'} 
          onClick={() => setActiveTab('safety')} 
          icon={<ShieldCheck className="w-6 h-6" />} 
          label="SAFETY" 
        />
      </nav>
    </div>
  );
}

function NavButton({ 
  active, 
  onClick, 
  icon, 
  label 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: ReactNode; 
  label: string; 
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1.5 transition-all duration-300 relative px-4",
        active ? "text-brand-primary" : "text-brand-inactive hover:text-brand-text"
      )}
    >
      <div className={cn(
        "text-xl transition-all duration-300",
        active && "scale-110 drop-shadow-[0_0_8px_rgba(234,88,12,0.5)]"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-[10px] font-bold tracking-widest transition-opacity duration-300 uppercase",
        active ? "opacity-100" : "opacity-70"
      )}>
        {label}
      </span>
      {active && (
        <motion.div 
          layoutId="tab-underline"
          className="absolute top-0 w-12 h-1 bg-brand-primary rounded-full"
        />
      )}
    </button>
  );
}
