import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import { ErrorResponse } from '@/type/errorType';
import { ObjectId } from 'mongodb';

/* 세션 생성 */
export async function POST(req: Request) {
  const { sessionId } = await req.json();
  try {
    const db = (await connectDB).db('session');
    try {
      await db.collection('session').insertOne({ _id: new ObjectId(), sessionId });
    } catch (error) {
      const e = error as ErrorResponse;
      if (e.code === 121) {
        return NextResponse.json({ message: e.errmsg }, { status: 400 });
      }
      if (e.code === 11000) {
        return NextResponse.json({ message: '중복된 키 값 저장' }, { status: 400 });
      }
      return NextResponse.json({ message: '값을 넣을 수 없습니다' }, { status: 500 });
    }

    return NextResponse.json({ message: '값이 저장되었습니다', sessionId });
  } catch {
    return NextResponse.json({ message: '데이터 베이스 연결에 실패하였습니다' }, { status: 500 });
  }
}

/* 해당 세션 삭제, 세션 참가자 모두 삭제 */
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');
  try {
    const db = (await connectDB).db('session');
    try {
      await db.collection('session').deleteOne({ sessionId });
      await db.collection('participant').deleteMany({ sessionId });
      return NextResponse.json({ message: '값을 삭제하였습니다', sessionId });
    } catch (error) {
      return NextResponse.json({ message: '값을 찾을 수 없습니다' }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ message: '데이터 베이스 연결에 실패하였습니다' }, { status: 500 });
  }
}
