export interface Permission {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  category: string;
  createdAt: string;
  updatedAt: string;
}