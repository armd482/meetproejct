import { Subscriber } from 'openvidu-browser';
import { useEffect, useRef } from 'react';

interface OtherAudioStreamProps {
  otherSubscriber: [string, Subscriber][];
  color: string;
  name: string;
}

export default function OtherAudioStream({ otherSubscriber, color, name }: OtherAudioStreamProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const destinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);

  useEffect(() => {
    if (!audioContextRef.current) {
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
    }

    if (!destinationRef.current) {
      const destination = audioContextRef.current.createMediaStreamDestination();
      destinationRef.current = destination;
    }

    const currentSources = new Set<MediaStreamAudioSourceNode>();

    otherSubscriber.forEach((entity) => {
      const mediaStream = entity[1].stream.getMediaStream();
      if (mediaStream) {
        const audioTrack = mediaStream.getAudioTracks();
        if (audioTrack.length > 0 && audioContextRef.current && destinationRef.current) {
          const audioSource = audioContextRef.current.createMediaStreamSource(new MediaStream(audioTrack));
          audioSource.connect(destinationRef.current);
          currentSources.add(audioSource);
        }
      }
    });

    if (audioRef.current) {
      audioRef.current.srcObject = destinationRef.current.stream;
    }

    return () => {
      if (destinationRef.current) {
        currentSources.forEach((sourceNode) => {
          sourceNode.disconnect(destinationRef.current!);
        });
        currentSources.clear();
      }
    };
  }, [otherSubscriber]);

  return (
    <div className='relative flex size-full flex-col items-center justify-center overflow-hidden rounded-lg'>
      <div className='absolute left-0 top-0 z-20 size-full bg-[#3C4043]'>
        <div
          className='absolute left-1/2 top-1/2 flex aspect-square h-2/5 -translate-x-1/2 -translate-y-1/2 items-center justify-center truncate rounded-full font-bold text-white'
          style={{ backgroundColor: color, fontSize: '150%' }}
        >
          {name}
        </div>
        <p className='absolute bottom-3 left-1/2 -translate-x-1/2 text-white' style={{ fontSize: '100%' }}>
          {`외 ${otherSubscriber.length - 1}명`}
        </p>
      </div>
      <audio ref={audioRef} autoPlay />
    </div>
  );
}
