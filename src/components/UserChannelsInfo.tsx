'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useUserChannels } from '@/store/userChannels';

export function UserChannelsInfo() {
  const { userChannels, setUserChannels } = useUserChannels();

  useEffect(() => {
    try {
      const hash = window.location.hash;
      console.log(decodeURIComponent(hash));
      if (hash.includes('userChannels=')) {
        const encodedData = hash.split('userChannels=')[1];
        const decodedData = decodeURIComponent(encodedData);
        const data = JSON.parse(decodedData);
        setUserChannels(data);
      }
    } catch (error) {
      console.error('Error parsing userChannels:', error);
    }
  }, [setUserChannels]);

  if (!userChannels.length) return null;

  return (
    <div className="mt-8 p-4 bg-black/20 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Thông báo sẽ được gửi tới:</h3>
      <div className="space-y-4">
        {userChannels.map(channel => (
          <div key={channel.id} className="flex items-center gap-4">
            {channel.user.avatar_url && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={channel.user.avatar_url}
                  alt={channel.user.display_name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-medium">{channel.user.display_name}</p>
              <p className="text-sm text-yellow-100/70">
                Channel ID: {channel.channelId}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
