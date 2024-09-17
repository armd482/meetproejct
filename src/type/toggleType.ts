export type ToggleType = 'caption' | 'emoji' | 'handsUp' | 'screen';
export type ToggleStatusType = Record<ToggleType, boolean | 'disable'>;

export type EmojiType =
  | 'clap'
  | 'curious'
  | 'heart'
  | 'laughter'
  | 'partyPoper'
  | 'sad'
  | 'surprice'
  | 'thumbDown'
  | 'thumbUp';
