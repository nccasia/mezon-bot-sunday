import { create } from 'zustand';

export type User = {
  avatar_url?: string;
  display_name: string;
  id: string;
  username: string;
};

export type UserChannel = {
  user: User;
  id: string;
  channelId: string;
  userChannelId: string;
};

type UserChannelsStore = {
  userChannels: UserChannel[];
  setUserChannels: (userChannels: UserChannel[]) => void;
};

export const useUserChannels = create<UserChannelsStore>(set => ({
  userChannels: [],
  setUserChannels: userChannels => set({ userChannels }),
}));
