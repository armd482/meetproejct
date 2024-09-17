import Image, { StaticImageData } from 'next/image';

interface EmojiButtonProps {
  src: StaticImageData;
  name: string;
  onClick: () => void;
}
export default function EmojiButton({ src, name, onClick }: EmojiButtonProps) {
  const handleButtonClick = () => {
    onClick();
  };
  return (
    <button
      type='button'
      onClick={handleButtonClick}
      className='flex size-10 items-center justify-center rounded-full bg-[#2C2C2C] hover:bg-[#333333] active:bg-[#454646]'
    >
      <Image alt={name} src={src} width={24} height={24} />
    </button>
  );
}
