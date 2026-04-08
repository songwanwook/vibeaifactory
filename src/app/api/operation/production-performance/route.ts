import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const vessel = searchParams.get('vessel')

    let query = `
      SELECT 
        AssyName as process,
        100 as target,
        CAST(WorkNum AS UNSIGNED) as actual,
        CONCAT(ROUND((CAST(WorkNum AS UNSIGNED) / 100) * 100, 1), '%') as rate,
        0 as defective,
        EmployeeNumber as worker
      FROM work_order_tbl
    `
    const params: any[] = []
    const conditions: string[] = []

    if (date) {
      conditions.push(`OrderDate = ?`)
      params.push(date)
    }

    if (vessel) {
      conditions.push(`ProjNo = ?`)
      params.push(vessel)
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ')
    }

    query += ` ORDER BY OrderDate DESC`

    const [rows]: any = await pool.query(query, params)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch production performance:', error)
    return NextResponse.json({ error: 'Failed to fetch production performance' }, { status: 500 })
  }
}
