import * as image from '@/asset/image';
import EmojiButton from './EmojiButton';

const EMOJI_BUTTON = [
  { name: 'heart', src: image.heartEmoji },
  { name: 'thumbUp', src: image.thumbUpEmoji },
  { name: 'partPoper', src: image.partyPoperEmoji },
  { name: 'clap', src: image.clapEmoji },
  { name: 'laughter', src: image.laughterEmoji },
  { name: 'surprice', src: image.surpriceEmoji },
  { name: 'sad', src: image.sadEmoji },
  { name: 'curious', src: image.curiousEmoji },
  { name: 'thumbDown', src: image.thumbDownEmoji },
];

export default function Emoji() {
  return (
    <div className='flex h-[52px] w-full items-end justify-center'>
      <div className='flex h-10 w-[360px] rounded-full bg-[#2C2C2C]'>
        {EMOJI_BUTTON.map((button) => (
          <EmojiButton key={button.name} {...button} />
        ))}
      </div>
    </div>
  );
}
