import { checkKey } from '@/lib/checkKey';
import Meetting from './Meeting';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { PostCheckSessionId } from '../api/mongoAPI';
import Provider from './Provider';

interface MeetingPageProps {
  params: Record<string, string>;
}

export default async function Page({ params }: MeetingPageProps) {
  const headerList = headers();
  const domain = headerList.get('x-pathname');
  const origin = headerList.get('x-origin');

  if (!domain || !origin) {
    redirect('/landing');
  }

  const isValidSessionId = await PostCheckSessionId(domain.slice(1), origin);

  if (!isValidSessionId) {
    redirect('/landing');
  }
  console.log('pathname', domain);
  return <Provider />;
}
