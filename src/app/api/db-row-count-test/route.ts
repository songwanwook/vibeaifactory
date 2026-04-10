import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const [[breakdownCount]]: any = await pool.query('SELECT COUNT(*) as count FROM breakdn_tbl')
    const [[repairCount]]: any = await pool.query('SELECT COUNT(*) as count FROM repair_tbl')
    
    return NextResponse.json({
      breakdownRows: breakdownCount.count,
      repairRows: repairCount.count
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
