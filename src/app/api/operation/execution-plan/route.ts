import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month')
    const process = searchParams.get('process')

    let query = `
      SELECT 
        ProjNo as vessel,
        BlockName as block,
        AssyName as process,
        StartDateTime as start,
        FinishDateTime as end,
        '보통' as priority,
        CASE 
          WHEN FinishStatus = 'Y' THEN '완료'
          ELSE '진행중'
        END as status
      FROM work_order_tbl
    `
    const params: any[] = []
    const conditions: string[] = []

    if (month) {
      conditions.push(`OrderDate LIKE ?`)
      params.push(`${month}%`)
    }

    if (process && process !== 'all') {
      conditions.push(`AssyName = ?`) // Or match some other logic
      params.push(process)
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ')
    }

    query += ` ORDER BY OrderDate DESC`

    const [rows]: any = await pool.query(query, params)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch execution plan:', error)
    return NextResponse.json({ error: 'Failed to fetch execution plan' }, { status: 500 })
  }
}
