export interface Exhibition {
  id: number;
  name: string;
  logo: string; // image url/base64
  startDate: Date;
  endDate: Date;
  location: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  isActive: boolean; // for toggle
}
