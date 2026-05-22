import loveSong from '../assets/music/Teri-Meri-kahani.mp3';
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';

export default function AudioPlayer({
  isJourneyStarted,
}: {
  isJourneyStarted: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto Play when journey starts
  useEffect(() => {
    if (isJourneyStarted && audioRef.current && !isPlaying) {
      audioRef.current.volume = volume;

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Autoplay blocked:', err);
        });
    }
  }, [isJourneyStarted]);

  // Toggle Play / Pause
  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = volume;

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Playback error:', err);
        });
    }
  };

  // Volume Change
  const handleVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVolume = parseFloat(e.target.value);

    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      {/* Real MP3 Audio */}
      <audio
        ref={audioRef}
        src={loveSong}
        loop
      />

      {/* Music Controller */}
      <div
        id="cinematic-music-controller"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 backdrop-blur-xl bg-black/40 border border-white/10 px-4 py-2.5 rounded-full shadow-2xl transition-all duration-300 hover:border-[#D4AF37]/30"
      >
        {/* Play Button */}
        <button
          onClick={togglePlayback}
          className={`relative flex items-center justify-center w-9 h-9 rounded-full text-white cursor-pointer transition-all duration-300 ${
            isPlaying
              ? 'bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/25 text-[#050208]'
              : 'bg-white/10 hover:bg-white/20'
          }`}
          title={isPlaying ? 'Mute Music' : 'Play Music'}
          aria-label="Toggle Soundtrack"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-[#050208] animate-pulse" />

              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>

                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]"></span>
              </span>
            </>
          ) : (
            <VolumeX className="w-4 h-4 text-white/70" />
          )}
        </button>

        {/* Volume Controller */}
        <div className="flex flex-col gap-0.5 min-w-[70px]">
          <div className="flex items-center gap-1.5 justify-between">
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-0.5 font-bold">
              <Music className="w-2.5 h-2.5 text-[#D4AF37]" />
              Sound
            </span>

            <span className="text-[9px] font-mono text-white/50">
              {Math.round(volume * 100)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
          />
        </div>

        {/* Heart Animation */}
        {isPlaying && (
          <div className="flex items-center gap-0.5 pl-1.5 border-l border-white/10 py-1">
            <Heart
              className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 animate-bounce"
              style={{ animationDuration: '1.4s' }}
            />
          </div>
        )}
      </div>
    </>
  );
}