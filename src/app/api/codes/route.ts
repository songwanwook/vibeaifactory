import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 코드 명 (예: 부서코드, 직급코드)
    const search = searchParams.get('search') // 코드 구분 (CodeName) 검색

    let query = `
      SELECT 
        CodeID as codeId, 
        CodeType as codeType, 
        GroupName as groupName, 
        GroupCode as groupCode, 
        CodeName as codeName,
        Remarks1 as remarks1,
        Remarks2 as remarks2
      FROM code_tbl 
    `
    const params: any[] = []
    const conditions: string[] = []

    if (type && type !== 'all') {
      conditions.push(`CodeType = ?`)
      params.push(type)
    }

    if (search) {
      conditions.push(`(CodeName LIKE ? OR GroupName LIKE ?)`)
      params.push(`%${search}%`, `%${search}%`)
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ')
    }

    query += ` ORDER BY CAST(CodeID AS UNSIGNED) ASC`

    const [rows]: any = await pool.query(query, params)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch codes:', error)
    return NextResponse.json({ error: 'Failed to fetch codes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { codeType, groupName, groupCode, codeName, remarks1, remarks2 } = body

    // Get max CodeID
    const [maxResult]: any = await pool.query('SELECT MAX(CAST(CodeID AS UNSIGNED)) as maxId FROM code_tbl')
    const nextId = (maxResult[0].maxId || 0) + 1

    const query = `
      INSERT INTO code_tbl (CodeID, CodeType, GroupName, GroupCode, CodeName, Remarks1, Remarks2)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `
    await pool.query(query, [String(nextId), codeType || '공통', groupName, groupCode, codeName, remarks1 || '', remarks2 || ''])

    return NextResponse.json({ success: true, codeId: String(nextId) })
  } catch (error) {
    console.error('Failed to create code:', error)
    return NextResponse.json({ error: 'Failed to create code' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { codeId, codeType, groupName, groupCode, codeName, remarks1, remarks2 } = body

    const query = `
      UPDATE code_tbl 
      SET CodeType = ?, GroupName = ?, GroupCode = ?, CodeName = ?, Remarks1 = ?, Remarks2 = ?
      WHERE CodeID = ?
    `
    await pool.query(query, [codeType, groupName, groupCode, codeName, remarks1, remarks2, codeId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update code:', error)
    return NextResponse.json({ error: 'Failed to update code' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const codeId = searchParams.get('id')

    if (!codeId) {
      return NextResponse.json({ error: 'CodeID is required' }, { status: 400 })
    }

    await pool.query('DELETE FROM code_tbl WHERE CodeID = ?', [codeId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete code:', error)
    return NextResponse.json({ error: 'Failed to delete code' }, { status: 500 })
  }
}
