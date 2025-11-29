'use client'

import { useState, useEffect } from 'react'
import { 
  Wrench, 
  Plus, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Zap,
  Droplet,
  Wind,
  Lightbulb,
  Armchair,
  Trash2,
  X
} from 'lucide-react'
import { MaintenanceRequest, Priority, Status, Category } from '@/types'

export default function Home() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<MaintenanceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewRequestForm, setShowNewRequestForm] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null)
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  
  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  })

  // New request form
  const [newRequest, setNewRequest] = useState({
    roomNumber: '',
    category: 'plumbing' as Category,
    priority: 'medium' as Priority,
    description: '',
    createdBy: 'Front Desk'
  })

  useEffect(() => {
    fetchRequests()
    fetchStats()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [requests, statusFilter, priorityFilter])

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/requests')
      const data = await response.json()
      setRequests(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching requests:', error)
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const data = await response.json()
      setStats({
        total: data.total,
        pending: data.pending,
        inProgress: data.inProgress,
        completed: data.completed
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const applyFilters = () => {
    let filtered = [...requests]
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.status === statusFilter)
    }
    
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(req => req.priority === priorityFilter)
    }
    
    setFilteredRequests(filtered)
  }

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest)
      })
      
      if (response.ok) {
        setShowNewRequestForm(false)
        setNewRequest({
          roomNumber: '',
          category: 'plumbing',
          priority: 'medium',
          description: '',
          createdBy: 'Front Desk'
        })
        fetchRequests()
        fetchStats()
      }
    } catch (error) {
      console.error('Error creating request:', error)
    }
  }

  const updateRequestStatus = async (id: string, status: Status) => {
    try {
      const response = await fetch(`/api/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      
      if (response.ok) {
        fetchRequests()
        fetchStats()
        if (selectedRequest?.id === id) {
          const updated = await response.json()
          setSelectedRequest(updated)
        }
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const assignRequest = async (id: string, assignedTo: string) => {
    try {
      const response = await fetch(`/api/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignedTo })
      })
      
      if (response.ok) {
        fetchRequests()
        if (selectedRequest?.id === id) {
          const updated = await response.json()
          setSelectedRequest(updated)
        }
      }
    } catch (error) {
      console.error('Error assigning request:', error)
    }
  }

  const deleteRequest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this request?')) return
    
    try {
      const response = await fetch(`/api/requests/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchRequests()
        fetchStats()
        setSelectedRequest(null)
      }
    } catch (error) {
      console.error('Error deleting request:', error)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'plumbing': return <Droplet className="w-4 h-4" />
      case 'electrical': return <Zap className="w-4 h-4" />
      case 'hvac': return <Wind className="w-4 h-4" />
      case 'furniture': return <Armchair className="w-4 h-4" />
      case 'appliances': return <Lightbulb className="w-4 h-4" />
      default: return <Wrench className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-300'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 border-green-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Hotel Maintenance</h1>
                <p className="text-sm text-slate-600">Request Management System</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewRequestForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>New Request</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Requests</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</p>
              </div>
              <div className="bg-slate-100 p-3 rounded-lg">
                <Wrench className="w-6 h-6 text-slate-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">In Progress</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.inProgress}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-slate-200">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <div className="flex-1 flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Maintenance Requests ({filteredRequests.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-slate-600">Loading requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="p-12 text-center">
              <Wrench className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">No maintenance requests found</p>
              <button
                onClick={() => setShowNewRequestForm(true)}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first request
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  onClick={() => setSelectedRequest(request)}
                  className="p-6 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="inline-flex items-center space-x-1 bg-slate-100 px-3 py-1 rounded-full text-sm font-medium text-slate-800">
                          {getCategoryIcon(request.category)}
                          <span className="capitalize">{request.category}</span>
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(request.priority)}`}>
                          {request.priority.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        Room {request.roomNumber}
                      </h3>
                      
                      <p className="text-slate-600 mb-3 line-clamp-2">{request.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>Created: {formatDate(request.createdAt)}</span>
                        {request.assignedTo && (
                          <span>Assigned to: {request.assignedTo}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* New Request Modal */}
      {showNewRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">New Maintenance Request</h2>
              <button
                onClick={() => setShowNewRequestForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Room Number *
                </label>
                <input
                  type="text"
                  required
                  value={newRequest.roomNumber}
                  onChange={(e) => setNewRequest({ ...newRequest, roomNumber: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 101, 205, Suite 302"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={newRequest.category}
                    onChange={(e) => setNewRequest({ ...newRequest, category: e.target.value as Category })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="hvac">HVAC</option>
                    <option value="furniture">Furniture</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="appliances">Appliances</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Priority *
                  </label>
                  <select
                    required
                    value={newRequest.priority}
                    onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value as Priority })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  rows={4}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the maintenance issue in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Reported By
                </label>
                <input
                  type="text"
                  value={newRequest.createdBy}
                  onChange={(e) => setNewRequest({ ...newRequest, createdBy: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name or department"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewRequestForm(false)}
                  className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Request Details</h2>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center space-x-1 bg-slate-100 px-3 py-1 rounded-full text-sm font-medium text-slate-800">
                  {getCategoryIcon(selectedRequest.category)}
                  <span className="capitalize">{selectedRequest.category}</span>
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedRequest.priority)}`}>
                  {selectedRequest.priority.toUpperCase()}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                  {selectedRequest.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Room {selectedRequest.roomNumber}
                </h3>
                <p className="text-slate-600">{selectedRequest.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Created</p>
                  <p className="text-slate-900">{formatDate(selectedRequest.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Reported By</p>
                  <p className="text-slate-900">{selectedRequest.createdBy}</p>
                </div>
                {selectedRequest.assignedTo && (
                  <div>
                    <p className="text-sm font-medium text-slate-500">Assigned To</p>
                    <p className="text-slate-900">{selectedRequest.assignedTo}</p>
                  </div>
                )}
                {selectedRequest.resolvedAt && (
                  <div>
                    <p className="text-sm font-medium text-slate-500">Resolved</p>
                    <p className="text-slate-900">{formatDate(selectedRequest.resolvedAt)}</p>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-4">Actions</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Update Status
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => updateRequestStatus(selectedRequest.id, 'pending')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedRequest.status === 'pending'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => updateRequestStatus(selectedRequest.id, 'in-progress')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedRequest.status === 'in-progress'
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => updateRequestStatus(selectedRequest.id, 'completed')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedRequest.status === 'completed'
                            ? 'bg-green-600 text-white'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        Completed
                      </button>
                      <button
                        onClick={() => updateRequestStatus(selectedRequest.id, 'cancelled')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedRequest.status === 'cancelled'
                            ? 'bg-gray-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        Cancelled
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Assign Technician
                    </label>
                    <select
                      value={selectedRequest.assignedTo || ''}
                      onChange={(e) => assignRequest(selectedRequest.id, e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Unassigned</option>
                      <option value="John Smith">John Smith</option>
                      <option value="Maria Garcia">Maria Garcia</option>
                      <option value="David Chen">David Chen</option>
                      <option value="Sarah Johnson">Sarah Johnson</option>
                      <option value="Mike Wilson">Mike Wilson</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <button
                      onClick={() => deleteRequest(selectedRequest.id)}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Request</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
