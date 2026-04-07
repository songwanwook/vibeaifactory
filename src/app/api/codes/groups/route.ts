import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const query = `
      SELECT 
        GroupName as groupName, 
        GroupCode as groupCode, 
        COUNT(*) as count 
      FROM code_tbl 
      GROUP BY GroupName, GroupCode
    `
    const [rows]: any = await pool.query(query)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch code groups:', error)
    return NextResponse.json({ error: 'Failed to fetch code groups' }, { status: 500 })
  }
}
