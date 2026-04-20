import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const [rows]: any = await pool.query(`
      SELECT 
        id, 
        title, 
        start_dt as start, 
        end_dt as end, 
        all_day, 
        category, 
        color, 
        memo, 
        ev_type
      FROM schedule_event
      ORDER BY start_dt ASC
    `)

    // JSON 직렬화를 위해 필요한 데이터 변환 (all_day를 boolean으로)
    const events = rows.map((row: any) => ({
      ...row,
      all_day: !!row.all_day,
      id: row.id.toString() // BigInt 호환성
    }))

    return NextResponse.json(events)
  } catch (error) {
    console.error('Failed to fetch schedule events:', error)
    return NextResponse.json({ error: 'Failed to fetch schedule events' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, start, end, all_day, category, color, memo, ev_type } = body

    const query = `
      INSERT INTO schedule_event (
        title, start_dt, end_dt, all_day, category, color, memo, created_at, ev_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)
    `
    const params = [
      title, 
      start, 
      end || null, 
      all_day ? 1 : 0, 
      category || null, 
      color, 
      memo || '', 
      ev_type || 'HUMAN'
    ]

    const [result]: any = await pool.query(query, params)
    
    return NextResponse.json({ 
      success: true, 
      id: result.insertId.toString() 
    })
  } catch (error) {
    console.error('Failed to create schedule event:', error)
    return NextResponse.json({ error: 'Failed to create schedule event' }, { status: 500 })
  }
}
