import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const orderNo = searchParams.get('orderNo')

    let query = `
      SELECT 
        OrderDate as orderDate,
        ProdActNo as orderNo,
        ProjNo as vessel,
        BlockName as block,
        RobotNo as robotNo,
        EmployeeNumber as worker,
        CAST(WorkNum AS UNSIGNED) as actual,
        CASE 
          WHEN FinishStatus = 'Y' THEN '완료'
          ELSE '진행중'
        END as status
      FROM work_order_tbl
    `
    const params: any[] = []
    const conditions: string[] = []

    if (date) {
      conditions.push(`OrderDate = ?`)
      params.push(date)
    }

    if (orderNo) {
      conditions.push(`ProdActNo LIKE ?`)
      params.push(`%${orderNo}%`)
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
