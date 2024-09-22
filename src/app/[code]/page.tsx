import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/connectDB';
import Provider from './Provider';

export default async function Page() {
  const headerList = headers();
  const domain = headerList.get('x-pathname');

  if (!domain) {
    redirect('/landing');
  }

  const checkSessionId = async () => {
    const sessionId = domain.slice(1);
    if (!sessionId) {
      return false;
    }
    try {
      const db = (await connectDB).db('session');
      const result = await db.collection('session').findOne({ sessionId });
      if (!result) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  const isValidSessionId = await checkSessionId();

  if (!isValidSessionId) {
    redirect('/landing');
  }
  return <Provider />;
}
