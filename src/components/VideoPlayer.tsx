import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  onComplete: () => void;
}

export default function VideoPlayer({ videoId, onComplete }: VideoPlayerProps) {
  const [player, setPlayer] = useState<any>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const storageKey = `video-progress-${videoId}`;
  const completionKey = `video-completed-${videoId}`;

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player('youtube-player', {
        height: '360',
        width: '640',
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
      setPlayer(newPlayer);
    };

    // Check if video was previously completed
    const wasCompleted = localStorage.getItem(completionKey) === 'true';
    setIsCompleted(wasCompleted);

    return () => {
      if (player) {
        saveProgress();
        player.destroy();
      }
    };
  }, [videoId]);

  const onPlayerReady = (event: any) => {
    const savedTime = localStorage.getItem(storageKey);
    if (savedTime) {
      event.target.seekTo(parseFloat(savedTime));
    }
  };

  const onPlayerStateChange = (event: any) => {
    // Save progress periodically when playing
    if (event.data === window.YT.PlayerState.PLAYING) {
      const progressInterval = setInterval(() => {
        if (player) {
          saveProgress();
        }
      }, 5000);

      return () => clearInterval(progressInterval);
    }

    // Check for video completion
    if (event.data === window.YT.PlayerState.ENDED) {
      setIsCompleted(true);
      localStorage.setItem(completionKey, 'true');
      onComplete();
    }
  };

  const saveProgress = () => {
    if (player) {
      const currentTime = player.getCurrentTime();
      localStorage.setItem(storageKey, currentTime.toString());
    }
  };

  return (
    <div className="space-y-4">
      <div id="youtube-player" className="w-full aspect-video rounded-lg overflow-hidden" />
      {isCompleted && (
        <div className="flex items-center justify-center space-x-2 text-green-600">
          <CheckCircle className="w-5 h-5" />
          <span>Course completed!</span>
        </div>
      )}
    </div>
  );
}

// Add YouTube types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}