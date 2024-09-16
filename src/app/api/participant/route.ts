import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import { ErrorResponse } from '@/type/errorType';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  const { sessionId, userId, userName, color } = await req.json();
  if (!sessionId || !userId || !userName || !color) {
    return NextResponse.json(
      { message: '넣으려는 값에 필수적인 값(sessionId, userId, userName, color)이 빠져있습니다' },
      { status: 400 },
    );
  }
  try {
    const db = (await connectDB).db('session');
    try {
      await db.collection('participant').insertOne({ _id: new ObjectId(), sessionId, userId, userName, color });
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
    return NextResponse.json({
      message: '값이 저장되었습니다',
      data: { sessionId, userName },
    });
  } catch {
    return NextResponse.json({ message: '데이터 베이스 연결에 실패하였습니다' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');
  if (!sessionId) {
    return NextResponse.json({ message: '찾으려는 sessionID의 값이 필요합니다' }, { status: 404 });
  }
  try {
    const db = (await connectDB).db('session');
    try {
      const result = await db.collection('participant').find({ sessionId }).toArray();
      return NextResponse.json({ data: result });
    } catch (error) {
      return NextResponse.json({ message: '값을 찾을 수 없습니다' }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ message: '데이터 베이스 연결에 실패하였습니다' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { sessionId, userId } = await req.json();
  if (!sessionId || !userId) {
    return NextResponse.json({ message: '삭제하려는 세션ID와 userName값이 필요합니다' }, { status: 400 });
  }
  try {
    const db = (await connectDB).db('session');
    try {
      const result = await db.collection('participant').deleteOne({ sessionId, userId });
      if (result.deletedCount === 0) {
        return NextResponse.json(
          { message: '해당 sessionId와 userId를 갖는 데이터가 존재하지 않습니다' },
          { status: 404 },
        );
      }
      return NextResponse.json({ message: '값이 성공적으로 삭제되었습니다' });
    } catch (error) {
      return NextResponse.json({ message: '값을 삭제할 수 없습니다' }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ message: '데이터 베이스 연결에 실패하였습니다' }, { status: 500 });
  }
}
