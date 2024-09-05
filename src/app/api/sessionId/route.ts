import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import { ErrorResponse } from '@/type/errorType';

export async function POST(req: Request) {
  const { sessionId } = await req.json();
  try {
    const db = (await connectDB).db('session');
    try {
      await db.collection('session').insertOne({ sessionId });
    } catch (error) {
      const e = error as ErrorResponse;
      if (e.code === 121) {
        return NextResponse.json({ message: e.errmsg }, { status: 400 });
      }
      if (e.code === 11000) {
        return NextResponse.json(
          { message: '중복된 키 값 저장' },
          { status: 400 },
        );
      }
      return NextResponse.json(
        { message: '값을 넣을 수 없습니다' },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: '값이 저장되었습니다', sessionId });
  } catch {
    return NextResponse.json(
      { message: '데이터 베이스 연결에 실패하였습니다' },
      { status: 500 },
    );
  }
}
