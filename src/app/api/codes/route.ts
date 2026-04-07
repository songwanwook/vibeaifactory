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
