export interface Exhibition {
  id: number;
  name: string;
  logo: string; // image url/base64
  startDate: Date;
  endDate: Date;
  address: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  isActive: boolean; // for toggle
}
