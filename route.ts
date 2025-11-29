import { NextResponse } from 'next/server'
//import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [total, pending, inProgress, completed] = await Promise.all([
      prisma.maintenanceRequest.count(),
      prisma.maintenanceRequest.count({ where: { status: 'pending' } }),
      prisma.maintenanceRequest.count({ where: { status: 'in-progress' } }),
      prisma.maintenanceRequest.count({ where: { status: 'completed' } }),
    ])

    const stats = {
      total,
      pending,
      inProgress,
      completed,
      byPriority: await prisma.maintenanceRequest.groupBy({
        by: ['priority'],
        _count: true,
      }),
      byCategory: await prisma.maintenanceRequest.groupBy({
        by: ['category'],
        _count: true,
      }),
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
