import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const projNo = searchParams.get('projNo')
    const blockName = searchParams.get('blockName')
    const assyName = searchParams.get('assyName')

    let query = 'SELECT * FROM cad_cell_tbl WHERE 1=1'
    const params: any[] = []

    if (projNo) {
      query += ' AND ProjNo LIKE ?'
      params.push(`%${projNo}%`)
    }
    if (blockName) {
      query += ' AND BlockName LIKE ?'
      params.push(`%${blockName}%`)
    }
    if (assyName) {
      query += ' AND AssyName LIKE ?'
      params.push(`%${assyName}%`)
    }

    query += ' ORDER BY ProjNo ASC, CAST(CellNo AS UNSIGNED) ASC'

    const [rows]: any = await pool.query(query, params)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch cad cells:', error)
    return NextResponse.json({ error: 'Failed to fetch cad cells' }, { status: 500 })
  }
}
