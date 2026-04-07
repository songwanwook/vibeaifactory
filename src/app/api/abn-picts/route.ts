import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const projNo = searchParams.get('projNo')
    const blockName = searchParams.get('blockName')
    const robotNo = searchParams.get('robotNo')

    let query = 'SELECT * FROM abn_pict_tbl WHERE 1=1'
    const params: any[] = []

    if (projNo) {
      query += ' AND ProjNo LIKE ?'
      params.push(`%${projNo}%`)
    }
    if (blockName) {
      query += ' AND BlockName LIKE ?'
      params.push(`%${blockName}%`)
    }
    if (robotNo) {
      query += ' AND RobotNo LIKE ?'
      params.push(`%${robotNo}%`)
    }

    query += ' ORDER BY ErrDate DESC, ErrNum DESC'

    const [rows]: any = await pool.query(query, params)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch abn picts:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
