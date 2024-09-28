import { connectDB } from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');
  try {
    const db = (await connectDB).db('session');
    try {
      await db.collection('session').deleteOne({ sessionId });
      return NextResponse.json({ message: '값을 삭제하였습니다', sessionId });
    } catch (error) {
      return NextResponse.json({ message: '값을 찾을 수 없습니다' }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ message: '데이터 베이스 연결에 실패하였습니다' }, { status: 500 });
  }
}
