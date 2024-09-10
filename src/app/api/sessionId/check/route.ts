import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';

/* 해당 세션 있는 지 여부 확인 */
export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ message: 'sessionId를 입력해주세요' }, { status: 400 });
  }

  try {
    const db = (await connectDB).db('session');
    const result = await db.collection('session').findOne({ sessionId });
    if (result) {
      return NextResponse.json({ data: true });
    }
    return NextResponse.json({ data: false });
  } catch {
    return NextResponse.json({ message: '데이터 베이스 연결에 실패하였습니다' }, { status: 500 });
  }
}
