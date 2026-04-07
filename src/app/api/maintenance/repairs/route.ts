import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const query = 'SELECT * FROM repair_tbl ORDER BY RepairDateTime DESC, CAST(RepairNo AS UNSIGNED) DESC'
    const [rows]: any = await pool.query(query)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch repairs:', error)
    return NextResponse.json({ error: 'Failed to fetch repairs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      RepairNo, BreakdnNo, RobotNo, RepairDateTime, 
      RepairPart, RepairCost, RepairDesc 
    } = body

    // 중복 체크
    const [existing]: any = await pool.query('SELECT RepairNo FROM repair_tbl WHERE RepairNo = ?', [RepairNo])
    if (existing.length > 0) {
      return NextResponse.json({ error: '이미 등록된 수리번호입니다.' }, { status: 400 })
    }

    const query = `
      INSERT INTO repair_tbl (
        RepairNo, BreakdnNo, RobotNo, RepairDateTime, 
        RepairPart, RepairCost, RepairDesc
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `
    const params = [
      RepairNo, BreakdnNo, RobotNo, RepairDateTime, 
      RepairPart, RepairCost, RepairDesc
    ]

    await pool.query(query, params)
    return NextResponse.json({ message: '등록되었습니다.' })
  } catch (error) {
    console.error('Failed to register repair:', error)
    return NextResponse.json({ error: 'Failed to register repair' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { 
      RepairNo, BreakdnNo, RobotNo, RepairDateTime, 
      RepairPart, RepairCost, RepairDesc 
    } = body

    const query = `
      UPDATE repair_tbl SET 
        BreakdnNo = ?, 
        RobotNo = ?, 
        RepairDateTime = ?, 
        RepairPart = ?, 
        RepairCost = ?, 
        RepairDesc = ?
      WHERE RepairNo = ?
    `
    const params = [
      BreakdnNo, RobotNo, RepairDateTime, 
      RepairPart, RepairCost, RepairDesc, RepairNo
    ]

    const [result]: any = await pool.query(query, params)
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: '수정할 이력을 찾을 수 없습니다.' }, { status: 404 })
    }

    return NextResponse.json({ message: '수정되었습니다.' })
  } catch (error) {
    console.error('Failed to update repair:', error)
    return NextResponse.json({ error: 'Failed to update repair' }, { status: 500 })
  }
}
