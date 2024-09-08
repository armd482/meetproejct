interface VisualizerProps {
  volume: number;
  isExpand: boolean;
}

export default function Visualizer({ volume, isExpand }: VisualizerProps) {
  const convertValue = (value: number) => {
    if (value >= 20) {
      return 12;
    }
    if (value <= 6) {
      return (value / 6) * 6;
    }
    return ((value - 7) / (19 - 7)) * (12 - 6) + 6;
  };
  return (
    <div
      className='flex size-[26px] items-center justify-center gap-[2px] rounded-full'
      style={{ backgroundColor: 'rgba(26, 115, 232, 0.9)' }}
    >
      <div
        className={`w-1 rounded-full bg-white  ${isExpand && 'transition-all duration-150 ease-out'} `}
        style={{ height: `${4 + convertValue(volume) / 2}px` }}
      />
      <div
        className={`w-1 rounded-full bg-white  ${isExpand && 'transition-all duration-75 ease-out'} `}
        style={{ height: `${4 + convertValue(volume)}px` }}
      />
      <div
        className={`w-1 rounded-full bg-white  ${isExpand && 'transition-all delay-75 duration-100 ease-out'} `}
        style={{ height: `${4 + convertValue(volume) / 2}px` }}
      />
    </div>
  );
}
