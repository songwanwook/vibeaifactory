import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const dateStart = searchParams.get('dateStart')
    const dateEnd = searchParams.get('dateEnd')
    const robotNo = searchParams.get('robotNo')
    const finishStatus = searchParams.get('finishStatus')

    let query = `
      SELECT 
        ProdActID as prodActId,
        OrderDate as orderDate,
        ProjNo as projNo,
        BlockName as blockName,
        AssyName as assyName,
        ProdActNo as prodActNo,
        RobotNo as robotNo,
        EmployeeNumber as employeeNumber,
        WorkDetail as workDetail,
        FinishStatus as finishStatus,
        WorkNum as workNum,
        StartDateTime as startDateTime,
        FinishDateTime as finishDateTime
      FROM work_order_tbl
    `
    const params: any[] = []
    const conditions: string[] = []

    if (dateStart && dateEnd) {
      conditions.push(`OrderDate BETWEEN ? AND ?`)
      params.push(dateStart, dateEnd)
    }

    if (robotNo && robotNo !== 'ALL') {
      conditions.push(`RobotNo = ?`)
      params.push(robotNo)
    }

    if (finishStatus && finishStatus !== 'ALL') {
      conditions.push(`FinishStatus = ?`)
      params.push(finishStatus)
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ')
    }

    query += ` ORDER BY OrderDate DESC`

    const [rows]: any = await pool.query(query, params)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch work orders:', error)
    return NextResponse.json({ error: 'Failed to fetch work orders' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { 
      prodActId,
      orderDate,
      robotNo,
      projNo,
      workNum,
      blockName,
      employeeNumber
    } = body

    if (!prodActId) {
      return NextResponse.json({ error: 'ProdActID가 필요합니다.' }, { status: 400 })
    }

    const query = `
      UPDATE work_order_tbl 
      SET 
        OrderDate = ?, 
        RobotNo = ?, 
        ProjNo = ?, 
        WorkNum = ?, 
        BlockName = ?, 
        EmployeeNumber = ? 
      WHERE ProdActID = ?
    `
    const params = [
      orderDate,
      robotNo,
      projNo,
      workNum,
      blockName,
      employeeNumber,
      prodActId
    ]

    await pool.query(query, params)
    
    return NextResponse.json({ message: '작업오더가 성공적으로 수정되었습니다.' })
  } catch (error: any) {
    console.error('Failed to update work order:', error)
    return NextResponse.json({ error: error.message || '작업오더 수정에 실패했습니다.' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ProdActID가 필요합니다.' }, { status: 400 })
    }

    await pool.query(`DELETE FROM work_order_tbl WHERE ProdActID = ?`, [id])
    
    return NextResponse.json({ message: '작업오더가 성공적으로 삭제되었습니다.' })
  } catch (error: any) {
    console.error('Failed to delete work order:', error)
    return NextResponse.json({ error: error.message || '작업오더 삭제에 실패했습니다.' }, { status: 500 })
  }
}
