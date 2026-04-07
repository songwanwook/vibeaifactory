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
