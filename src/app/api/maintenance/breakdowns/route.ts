import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const robotNo = searchParams.get('robotNo')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    let query = 'SELECT * FROM breakdn_tbl WHERE 1=1'
    const params: any[] = []

    if (robotNo && robotNo !== 'all' && robotNo.trim() !== '') {
      query += ' AND RobotNo = ?'
      params.push(robotNo)
    }
    if (startDate && startDate.trim() !== '') {
      query += ' AND BreakdnDate >= ?'
      params.push(startDate)
    }
    if (endDate && endDate.trim() !== '') {
      query += ' AND BreakdnDate <= ?'
      params.push(endDate)
    }

    query += ' ORDER BY BreakdnDate DESC, BreakdnNo DESC'

    const [rows]: any = await pool.query(query, params)
    console.log(`[API] Fetched ${rows.length} breakdowns`);
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch breakdowns:', error)
    return NextResponse.json({ error: 'Failed to fetch breakdowns' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      BreakdnNo, RobotNo, BreakdnDate, BreakdnReason, 
      BreakdnDesc, EmployeeNumber 
    } = body

    // 중복 체크
    const [existing]: any = await pool.query('SELECT BreakdnNo FROM breakdn_tbl WHERE BreakdnNo = ?', [BreakdnNo])
    if (existing.length > 0) {
      return NextResponse.json({ error: '이미 등록된 고장번호입니다.' }, { status: 400 })
    }

    const query = `
      INSERT INTO breakdn_tbl (
        BreakdnNo, RobotNo, BreakdnDate, BreakdnReason, 
        BreakdnDesc, EmployeeNumber
      ) VALUES (?, ?, ?, ?, ?, ?)
    `
    const params = [
      BreakdnNo, RobotNo, BreakdnDate, BreakdnReason, 
      BreakdnDesc, EmployeeNumber
    ]

    await pool.query(query, params)
    return NextResponse.json({ message: '등록되었습니다.' })
  } catch (error) {
    console.error('Failed to register breakdown:', error)
    return NextResponse.json({ error: 'Failed to register breakdown' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { 
      BreakdnNo, RobotNo, BreakdnDate, BreakdnReason, 
      BreakdnDesc, EmployeeNumber 
    } = body

    const query = `
      UPDATE breakdn_tbl SET 
        RobotNo = ?, 
        BreakdnDate = ?, 
        BreakdnReason = ?, 
        BreakdnDesc = ?, 
        EmployeeNumber = ?
      WHERE BreakdnNo = ?
    `
    const params = [
      RobotNo, BreakdnDate, BreakdnReason, 
      BreakdnDesc, EmployeeNumber, BreakdnNo
    ]

    const [result]: any = await pool.query(query, params)
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: '수정할 이력을 찾을 수 없습니다.' }, { status: 404 })
    }

    return NextResponse.json({ message: '수정되었습니다.' })
  } catch (error) {
    console.error('Failed to update breakdown:', error)
    return NextResponse.json({ error: 'Failed to update breakdown' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const breakdownNo = searchParams.get('breakdownNo')

    if (!breakdownNo) {
      return NextResponse.json({ error: '고장번호가 필요합니다.' }, { status: 400 })
    }

    // 수리 이력이 있는지 확인 (외래 키 제약 조건 대비)
    const [repairs]: any = await pool.query('SELECT RepairNo FROM repair_tbl WHERE BreakdnNo = ?', [breakdownNo])
    if (repairs.length > 0) {
      return NextResponse.json({ error: '해당 고장에 연결된 수리 이력이 있어 삭제할 수 없습니다.' }, { status: 400 })
    }

    const query = 'DELETE FROM breakdn_tbl WHERE BreakdnNo = ?'
    const [result]: any = await pool.query(query, [breakdownNo])

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: '삭제할 이력을 찾을 수 없습니다.' }, { status: 404 })
    }

    return NextResponse.json({ message: '삭제되었습니다.' })
  } catch (error) {
    console.error('Failed to delete breakdown:', error)
    return NextResponse.json({ error: 'Failed to delete breakdown' }, { status: 500 })
  }
}
