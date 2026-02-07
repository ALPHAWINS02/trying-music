import { useEffect, useRef } from "react";

interface BackgroundMusicProps {
  /** Path to the MP3 file to play (e.g. "/music/welcome.mp3") */
  src: string;
}

/** Resolve asset path with Vite base (required for GitHub Pages subpath) */
function resolveAudioSrc(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${normalized}`;
}

export default function BackgroundMusic({ src }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSrcRef = useRef<string>("");
  const listenerRef = useRef<(() => void) | null>(null);
  const resolvedSrc = resolveAudioSrc(src);

  useEffect(() => {
    // Same track already playing — nothing to do
    if (currentSrcRef.current === resolvedSrc && audioRef.current) return;

    // Clean up any pending interaction listener from a previous track
    if (listenerRef.current) {
      document.removeEventListener("click", listenerRef.current);
      document.removeEventListener("touchstart", listenerRef.current);
      document.removeEventListener("keydown", listenerRef.current);
      listenerRef.current = null;
    }

    // Fade out and stop old track
    const oldAudio = audioRef.current;
    if (oldAudio) {
      fadeOutAndStop(oldAudio);
    }

    // Create and start the new track
    const audio = new Audio(resolvedSrc);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;
    currentSrcRef.current = resolvedSrc;

    const tryPlay = () => {
      // Guard: only play if this audio is still the current one
      if (audioRef.current !== audio) return;

      audio
        .play()
        .then(() => fadeIn(audio))
        .catch(() => {
          // Autoplay blocked — listen for first user gesture
          const resume = () => {
            if (audioRef.current !== audio) {
              cleanup();
              return;
            }
            audio
              .play()
              .then(() => {
                fadeIn(audio);
                cleanup();
              })
              .catch(() => {});
          };

          const cleanup = () => {
            document.removeEventListener("click", resume);
            document.removeEventListener("touchstart", resume);
            document.removeEventListener("keydown", resume);
            if (listenerRef.current === resume) listenerRef.current = null;
          };

          listenerRef.current = resume;
          document.addEventListener("click", resume);
          document.addEventListener("touchstart", resume);
          document.addEventListener("keydown", resume);
        });
    };

    tryPlay();

    return () => {
      // On unmount or before re-run: stop this track
      if (audioRef.current === audio) {
        audio.pause();
        audio.src = "";
        audioRef.current = null;
        currentSrcRef.current = "";
      }
      if (listenerRef.current) {
        document.removeEventListener("click", listenerRef.current);
        document.removeEventListener("touchstart", listenerRef.current);
        document.removeEventListener("keydown", listenerRef.current);
        listenerRef.current = null;
      }
    };
  }, [resolvedSrc]);

  return null; // No UI — music plays silently in the background
}

/** Smoothly fade in from 0 → 1 over ~1 second */
function fadeIn(audio: HTMLAudioElement) {
  audio.volume = 0;
  const id = setInterval(() => {
    if (audio.paused) {
      clearInterval(id);
      return;
    }
    if (audio.volume < 0.95) {
      audio.volume = Math.min(1, audio.volume + 0.05);
    } else {
      audio.volume = 1;
      clearInterval(id);
    }
  }, 50);
}

/** Fade out from current volume → 0, then pause & clear */
function fadeOutAndStop(audio: HTMLAudioElement) {
  const id = setInterval(() => {
    if (audio.volume > 0.05) {
      audio.volume = Math.max(0, audio.volume - 0.08);
    } else {
      audio.volume = 0;
      audio.pause();
      audio.src = "";
      clearInterval(id);
    }
  }, 40);
}
