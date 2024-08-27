import { AddMeetingIcon } from '@/asset';

export default function AddNewMeetingButton() {
  return (
    <button
      type='button'
      className='flex h-12 items-center justify-center gap-2 rounded-md bg-[#1a73E8] px-[14px] text-base text-white hover:bg-[#1A6DDE] hover:shadow-md'
    >
      <AddMeetingIcon width={18} height={18} />새 회의
    </button>
  );
}
