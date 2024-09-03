import Image, { StaticImageData } from 'next/image';

interface EmojiButtonProps {
  src: StaticImageData;
  name: string;
}
export default function EmojiButton({ src, name }: EmojiButtonProps) {
  return (
    <button
      type='button'
      className='flex size-10 items-center justify-center rounded-full bg-[#2C2C2C] hover:bg-[#333333] active:bg-[#454646]'
    >
      <Image alt={name} src={src} width={24} height={24} />
    </button>
  );
}
