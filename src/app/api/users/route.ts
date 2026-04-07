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
      employeeNumber, 
      userName, 
      companyName, 
      departName, 
      sectionName,
      teamName,
      className,
      hireDate,
      position,
      jobGrade,
      email, 
      phoneNumber,
      passwordHash,
      accessLevel 
    } = body

    if (!employeeNumber || !userName) {
      return NextResponse.json({ error: 'Employee Number and User Name are required' }, { status: 400 })
    }

    const [result]: any = await pool.query(
      `INSERT INTO user_tbl (
        EmployeeNumber, UserName, CompanyName, DepartName, SectionName, 
        TeamName, ClassName, HireDate, Position, JobGrade, 
        Email, PhoneNumber, PasswordHash, AccessLevel
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        employeeNumber, userName, companyName, departName, sectionName,
        teamName, className, hireDate, position, jobGrade,
        email, phoneNumber, passwordHash || '1234', accessLevel || 'Level1'
      ]
    )

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'Employee Number already exists' }, { status: 400 })
    }
    console.error('Failed to create user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
