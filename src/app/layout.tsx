import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MeetProject',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className='flex h-screen w-screen flex-col'>
        <div id='alert' />
        <div id='modal' />
        <div className='flex-1'>{children}</div>
      </body>
    </html>
  );
}
