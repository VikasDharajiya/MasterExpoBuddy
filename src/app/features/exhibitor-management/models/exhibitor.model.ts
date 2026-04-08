export interface Exhibitor {
  id: number;
  name: string;

  companyName?: string;
  email?: string;
  contact1?: string;
  contact2?: string;
  contactPerson?: string;
  reference?: string;
  notes?: string;

  staffLimit: number;
  exhibitionLimit: number;

  exhibitionIds: number[];
  exhibitionNames?: string[];

  logo: string;
  primaryColor: string;
  secondaryColor: string;
  storageLimit: number;
  status: 'Active' | 'Inactive';

  isActive: boolean;
}
