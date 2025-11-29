// types.ts (at project root)

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

export interface MaintenanceRequest {
  id: string
  roomNumber: string
  category: Category
  priority: Priority
  description: string
  createdBy: string
  createdAt: string | Date
  status: Status
  assignedTo?: string
  resolvedAt?: string | Date
}
