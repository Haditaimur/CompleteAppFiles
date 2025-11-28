import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, XCircle, User, Wrench, Bell, Filter, Search, Plus, Edit2, Trash2, Eye, Download, BarChart3, TrendingUp, Home } from 'lucide-react';

const HotelMaintenanceApp = () => {
  // Sample data
  const initialMaintenanceTickets = [
    {
      id: 1,
      roomNumber: '305',
      category: 'Plumbing',
      priority: 'High',
      status: 'In Progress',
      description: 'Leaking faucet in bathroom',
      reportedBy: 'Front Desk',
      assignedTo: 'John Smith',
      createdAt: '2025-11-27 09:30',
      updatedAt: '2025-11-27 14:15',
      estimatedCompletion: '2025-11-28 10:00'
    },
    {
      id: 2,
      roomNumber: '412',
      category: 'HVAC',
      priority: 'Medium',
      status: 'Pending',
      description: 'Air conditioning not cooling properly',
      reportedBy: 'Housekeeping',
      assignedTo: 'Maria Garcia',
      createdAt: '2025-11-27 11:45',
      updatedAt: '2025-11-27 11:45',
      estimatedCompletion: '2025-11-28 16:00'
    },
    {
      id: 3,
      roomNumber: '208',
      category: 'Electrical',
      priority: 'High',
      status: 'Completed',
      description: 'Power outlet not working',
      reportedBy: 'Guest',
      assignedTo: 'Robert Chen',
      createdAt: '2025-11-26 16:20',
      updatedAt: '2025-11-27 10:30',
      estimatedCom