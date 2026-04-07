import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SHOW TABLES');
    return NextResponse.json({ 
      status: 'connected', 
      database: 'hmd_weld_robot_v2',
      tables: rows 
    });
  } catch (error: any) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: error.message,
      code: error.code 
    }, { status: 500 });
  }
}
