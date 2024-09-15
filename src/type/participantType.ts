export interface ParticipantDataType {
  _id: string;
  userName: string;
  sessionId: string;
}

export interface UserListType {
  id: string;
  name: string;
  color: string;
  isMicOn: boolean;
  isVideoOn: boolean;
  stream: MediaStream;
}
