import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const orderNo = searchParams.get('orderNo')

    let query = `
      SELECT 
        ProdActID as id,
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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderDate, orderNo, vessel, block, robotNo, worker, actual } = body

    const query = `
      INSERT INTO work_order_tbl 
      (OrderDate, ProdActNo, ProjNo, BlockName, RobotNo, EmployeeNumber, WorkNum, FinishStatus)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'N')
    `
    await pool.query(query, [orderDate, orderNo, vessel, block, robotNo, worker, actual || 0])
    
    return NextResponse.json({ message: '오더가 성공적으로 추가되었습니다.' })
  } catch (error) {
    console.error('Failed to add order:', error)
    return NextResponse.json({ error: '오더 추가에 실패했습니다.' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID가 필요합니다.' }, { status: 400 })

    await pool.query(`DELETE FROM work_order_tbl WHERE ProdActID = ?`, [id])
    
    return NextResponse.json({ message: '오더가 삭제되었습니다.' })
  } catch (error) {
    console.error('Failed to delete order:', error)
    return NextResponse.json({ error: '오더 삭제에 실패했습니다.' }, { status: 500 })
  }
}
