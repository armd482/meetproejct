import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { postCheckSessionId } from '../api/mongoAPI';
import Provider from './Provider';

export default async function Page() {
  const headerList = headers();
  const domain = headerList.get('x-pathname');
  const origin = headerList.get('x-origin');

  if (!domain || !origin) {
    redirect('/landing');
  }

  const isValidSessionId = await postCheckSessionId(domain.slice(1), origin);

  if (!isValidSessionId) {
    redirect('/landing');
  }
  return <Provider />;
}
