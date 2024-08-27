interface MeetingPageProps {
  params: Record<string, string>;
}

export default function Page({ params }: MeetingPageProps) {
  return (
    <div>
      <div>{params.key}</div>
    </div>
  );
}
