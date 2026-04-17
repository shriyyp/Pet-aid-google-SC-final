export type AnimalCondition = 'healthy' | 'minor-injury' | 'critical' | 'distress';

export interface RescueRequest {
  id: string;
  reporterId: string;
  reporterName: string;
  animalType: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  condition: AnimalCondition;
  status: 'pending' | 'volunteer-assigned' | 'in-progress' | 'completed' | 'cancelled';
  photoUrl?: string;
  createdAt: string;
  volunteerId?: string;
  volunteerName?: string;
}

export interface SOSAlert {
  id: string;
  userId: string;
  userName: string;
  location: {
    lat: number;
    lng: number;
  };
  timestamp: string;
  type: 'emergency' | 'critical-animal';
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'finder' | 'volunteer' | 'admin';
  phoneNumber?: string;
  isVolunteer: boolean;
  activeRescues?: string[];
}
