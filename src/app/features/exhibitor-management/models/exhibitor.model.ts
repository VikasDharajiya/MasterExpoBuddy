export interface Exhibitor {
  id: number;
  name: string;
  staffLimit: number;
  exhibitionLimit: number;
  exhibitionId: number;
  exhibitionName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  storageLimit: number;
  status: 'Active' | 'Inactive';
  isActive: boolean;
}
