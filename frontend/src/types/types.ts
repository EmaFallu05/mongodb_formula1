export interface Driver {
  _id?: string;
  driverId: string;
  firstName: string;
  lastName: string;
  code: string;
  country: string;
  dob: string;
}

export interface Team {
  _id?: string;
  teamId: string;
  name: string;
  activeUntil: number | null;
}

export interface Track {
  _id?: string;
  name: string;
  location: string;
  country: string;
  history: number[];
  is_active: boolean;
}
