export interface MaintenanceRequest {
  id: string
  roomNumber: string
  category: string
  priority: string
  description: string
  status: string
  createdBy: string
  assignedTo?: string | null
  createdAt: string | Date
  updatedAt: string | Date
  resolvedAt?: string | Date | null
  notes?: string | null
}

export type Priority = 'low' | 'medium' | 'high' | 'urgent'
export type Status = 'pending' | 'in-progress' | 'completed' | 'cancelled'
export type Category = 
  | 'plumbing'
  | 'electrical'
  | 'hvac'
  | 'furniture'
  | 'cleaning'
  | 'appliances'
  | 'other'
