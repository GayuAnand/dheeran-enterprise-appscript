export interface IUser {
  Username: string;
}

export interface IMetadata {
  area?: string[],
  deployIds?: string[],
  position?: Record<string, { Latitude: string, Longitude: string, area: string }>,
  sheetsInfo?: Record<string, { label: string, cols?: Record<string, { label: string, data?: Record<string, string> }> }>,
  taskPriority?: ('High' | 'Medium' | 'Low')[],
  taskStatus?: ('Done' | 'Open' | 'Closed')[],
}
