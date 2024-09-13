'use client';

import { useEffect, useState, useRef } from 'react';

const useVolume = (stream: MediaStream | null | undefined) => {
  const animationRef = useRef<number | null>(null);
  const [volume, setVolume] = useState(0);
  const [isExpand, setIsExpand] = useState(false);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!stream || stream.getAudioTracks().length === 0) {
      return;
    }

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    dataArrayRef.current = dataArray;

    const updateVolume = () => {
      animationRef.current = requestAnimationFrame(updateVolume);
      if (!dataArrayRef.current) {
        return;
      }
      analyser.getByteFrequencyData(dataArrayRef.current);

      const sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
      const avg = sum / dataArray.length;

      setVolume((prev) => {
        setIsExpand(avg > prev);
        return avg;
      });
    };

    updateVolume();

    return () => {
      audioContext.close();
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [stream]);

  return { volume, isExpand };
};

export default useVolume;
