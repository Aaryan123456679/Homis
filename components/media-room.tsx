"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { PhoneOff } from "lucide-react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { user } = useUser();
  const [ended, setEnded] = useState(false);

  if (ended) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center gap-y-3">
        <PhoneOff className="h-10 w-10 text-zinc-500" />
        <p className="text-zinc-500 dark:text-zinc-400 font-medium">
          Call ended
        </p>
        <button
          onClick={() => setEnded(false)}
          className="text-xs text-indigo-500 underline hover:text-indigo-400 transition"
        >
          Rejoin
        </button>
      </div>
    );
  }

  const displayName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(" ") ||
      user.emailAddresses?.[0]?.emailAddress ||
      "User"
    : "User";

  const params = [
    `config.startWithAudioMuted=${!audio}`,
    `config.startWithVideoMuted=${!video}`,
    `config.prejoinPageEnabled=false`,
    `config.disableDeepLinking=true`,
    `config.disableLobbyMode=true`,
    `config.startAsModerator=true`,
    `config.lobby.enabled=false`,
    `config.p2p.enabled=false`,
    `interfaceConfig.SHOW_PROMOTIONAL_CLOSE_PAGE=false`,
    `interfaceConfig.SHOW_POWERED_BY=false`,
    `interfaceConfig.SHOW_JITSI_WATERMARK=false`,
    `interfaceConfig.MOBILE_APP_PROMO=false`,
    `interfaceConfig.DISPLAY_WELCOME_FOOTER=false`,
    `userInfo.displayName="${encodeURIComponent(displayName)}"`,
  ].join("&");

  const src = `https://meet.jit.si/${chatId}#${params}`;

  return (
    <div className="flex-1 flex flex-col relative">
      <iframe
        src={src}
        allow="camera; microphone; fullscreen; display-capture; autoplay"
        className="flex-1 w-full border-0"
        title="Video call"
      />
      <button
        onClick={() => setEnded(true)}
        className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-full transition"
      >
        Leave
      </button>
    </div>
  );
};
