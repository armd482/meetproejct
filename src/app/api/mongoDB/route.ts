import { connectDB } from '@/lib/dbPromise';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const value = await req.json();
  try {
    const db = (await connectDB).db('session');
    try {
      await db.collection('session').insertOne(value);
    } catch (error) {
      return NextResponse.json({ message: '중복된 값' }, { status: 400 });
    }

    return NextResponse.json({ message: '값이 저장되었습니다', value });
  } catch {
    return NextResponse.json(
      { message: '데이터 베이스 연결에 실패하였습니다' },
      { status: 500 },
    );
  }
}
