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

    const events = rows.map((row: any) => ({
      ...row,
      all_day: !!row.all_day,
      id: row.id.toString()
    }))

    return NextResponse.json(events)
  } catch (error: any) {
    console.error('Detailed GET Error:', {
      message: error.message,
      code: error.code,
      sqlState: error.sqlState,
      stack: error.stack
    })
    return NextResponse.json({ error: 'Failed to fetch schedule events', details: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('POST Body:', body)
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
  } catch (error: any) {
    console.error('Detailed POST Error:', {
      message: error.message,
      code: error.code,
      sqlState: error.sqlState,
      stack: error.stack
    })
    return NextResponse.json({ error: 'Failed to create schedule event', details: error.message }, { status: 500 })
  }
}
