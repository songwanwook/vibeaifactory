import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const [rows]: any = await pool.query('SELECT * FROM robot_tbl ORDER BY RobotNo ASC')
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch robots:', error)
    return NextResponse.json({ error: 'Failed to fetch robots' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      RobotNo, RobotName, Maker, ModelName, SerialNo, 
      Weight, PurchDate, InspectDate, MaintPeriod 
    } = body

    // 1. 중복 체크
    const [existing]: any = await pool.query('SELECT RobotNo FROM robot_tbl WHERE RobotNo = ?', [RobotNo])
    if (existing.length > 0) {
      return NextResponse.json({ error: '이미 등록된 번호입니다.' }, { status: 400 })
    }

    // 2. 등록
    const query = `
      INSERT INTO robot_tbl (
        RobotNo, RobotName, Maker, ModelName, SerialNo, 
        Weight, PurchDate, InspectDate, MaintPeriod,
        WeldID, WeldModelName, ControllerSerialNo, RobotStatus
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'NA', 'NA', '0', '미가동')
    `
    const params = [
      RobotNo, RobotName, Maker, ModelName, SerialNo, 
      Weight, PurchDate, InspectDate || null, MaintPeriod || null
    ]

    await pool.query(query, params)
    return NextResponse.json({ message: '등록되었습니다.' })
  } catch (error) {
    console.error('Failed to register robot:', error)
    return NextResponse.json({ error: 'Failed to register robot' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { 
      RobotNo, RobotName, Maker, ModelName, SerialNo, 
      Weight, PurchDate, InspectDate, MaintPeriod 
    } = body

    const query = `
      UPDATE robot_tbl SET 
        RobotName = ?, 
        Maker = ?, 
        ModelName = ?, 
        SerialNo = ?, 
        Weight = ?, 
        PurchDate = ?, 
        InspectDate = ?, 
        MaintPeriod = ?
      WHERE RobotNo = ?
    `
    const params = [
      RobotName, Maker, ModelName, SerialNo, 
      Weight, PurchDate, InspectDate || null, MaintPeriod || null,
      RobotNo
    ]

    const [result]: any = await pool.query(query, params)
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: '수정할 로봇을 찾을 수 없습니다.' }, { status: 404 })
    }

    return NextResponse.json({ message: '수정되었습니다.' })
  } catch (error) {
    console.error('Failed to update robot:', error)
    return NextResponse.json({ error: 'Failed to update robot' }, { status: 500 })
  }
}
