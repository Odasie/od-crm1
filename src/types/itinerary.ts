export type ItineraryComponent = {
  id: string;
  type: 'accommodation' | 'transfer' | 'meal' | 'activity' | 'guide' | 'free-time';
  title: string;
};

export type Day = {
  id: string;
  date: Date;
  components: ItineraryComponent[];
};