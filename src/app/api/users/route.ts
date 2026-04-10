import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const company = searchParams.get('company')
    const search = searchParams.get('search')

    let query = `
      SELECT 
        EmployeeNumber as employeeNumber, 
        UserName as userName, 
        CompanyName as companyName, 
        DepartName as departName, 
        SectionName as sectionName,
        TeamName as teamName,
        ClassName as className,
        HireDate as hireDate,
        Position as position,
        JobGrade as jobGrade,
        Email as email, 
        PhoneNumber as phoneNumber,
        AccessLevel as accessLevel 
      FROM user_tbl 
    `
    const params: any[] = []
    const conditions: string[] = []

    if (company && company !== 'all') {
      conditions.push(`CompanyName = ?`)
      params.push(company)
    }

    if (search) {
      conditions.push(`(UserName LIKE ? OR EmployeeNumber LIKE ?)`)
      params.push(`%${search}%`, `%${search}%`)
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ')
    }

    query += ` ORDER BY EmployeeNumber ASC`

    const [rows]: any = await pool.query(query, params)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      employeeNumber, userName, companyName, departName, 
      sectionName, teamName, className, hireDate, 
      position, jobGrade, email, phoneNumber, 
      passwordHash, accessLevel 
    } = body

    if (!employeeNumber || !userName) {
      return NextResponse.json({ error: '사번과 성명은 필수 항목입니다.' }, { status: 400 })
    }

    // 중복 체크
    const [existing]: any = await pool.query('SELECT EmployeeNumber FROM user_tbl WHERE EmployeeNumber = ?', [employeeNumber])
    if (existing.length > 0) {
      return NextResponse.json({ error: '이미 존재하는 사번입니다.' }, { status: 400 })
    }

    const query = `
      INSERT INTO user_tbl (
        EmployeeNumber, UserName, CompanyName, DepartName, SectionName, 
        TeamName, ClassName, HireDate, Position, JobGrade, 
        Email, PhoneNumber, PasswordHash, AccessLevel
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const params = [
      employeeNumber, userName, companyName || 'HD현대미포', departName || null, sectionName || null,
      teamName || null, className || null, hireDate || null, position || null, jobGrade || null,
      email || null, phoneNumber || null, passwordHash || '1234', accessLevel || 'Level1'
    ]

    await pool.query(query, params)
    return NextResponse.json({ message: '신규 사용자가 등록되었습니다.' }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to create user:', error)
    return NextResponse.json({ error: '사용자 등록 실패: ' + error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { 
      employeeNumber, userName, companyName, departName, 
      sectionName, teamName, className, hireDate, 
      position, jobGrade, email, phoneNumber, accessLevel 
    } = body

    if (!employeeNumber) {
      return NextResponse.json({ error: '사번이 누락되었습니다.' }, { status: 400 })
    }

    const query = `
      UPDATE user_tbl SET 
        UserName = ?, CompanyName = ?, DepartName = ?, SectionName = ?, 
        TeamName = ?, ClassName = ?, HireDate = ?, Position = ?, 
        JobGrade = ?, Email = ?, PhoneNumber = ?, AccessLevel = ?
      WHERE EmployeeNumber = ?
    `
    const params = [
      userName, companyName, departName || null, sectionName || null, teamName || null,
      className || null, hireDate || null, position || null, jobGrade || null, email || null, 
      phoneNumber || null, accessLevel, employeeNumber
    ]

    const [result]: any = await pool.query(query, params)
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: '수정할 사용자를 찾을 수 없습니다.' }, { status: 404 })
    }

    return NextResponse.json({ message: '사용자 정보가 수정되었습니다.' })
  } catch (error: any) {
    console.error('Failed to update user:', error)
    return NextResponse.json({ error: '사용자 수정 실패: ' + error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const employeeNumber = searchParams.get('employeeNumber')

    if (!employeeNumber) {
      return NextResponse.json({ error: '사번이 누락되었습니다.' }, { status: 400 })
    }

    const [result]: any = await pool.query('DELETE FROM user_tbl WHERE EmployeeNumber = ?', [employeeNumber])
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: '삭제할 사용자를 찾을 수 없습니다.' }, { status: 404 })
    }

    return NextResponse.json({ message: '사용자가 삭제되었습니다.' })
  } catch (error: any) {
    console.error('Failed to delete user:', error)
    return NextResponse.json({ error: '사용자 삭제 실패: ' + error.message }, { status: 500 })
  }
}
