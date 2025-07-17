/*
 * @Author: leroy
 * @Date: 2025-04-18 10:05:34
 * @LastEditTime: 2025-07-17 09:36:26
 * @Description: 健康检查
 */
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'ok' });
}
