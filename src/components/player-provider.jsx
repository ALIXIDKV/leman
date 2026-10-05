import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getSongs, LS } from "@/lib/storage";
import { assetUrl } from "@/lib/utils";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const songs = useMemo(getSongs, []);
  const audioRef = useRef(null);
  const indexRef = useRef(-1);
  const [index, setIndexState] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const setIndex = useCallback((i) => {
    indexRef.current = i;
    setIndexState(i);
  }, []);

  const save = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    try {
      localStorage.setItem(LS.PLAYER, JSON.stringify({ index: indexRef.current, time: a.currentTime || 0, playing: !a.paused }));
    } catch {
      /* abaikan */
    }
  }, []);

  const openYoutube = useCallback(
    (s) => {
      const q = s.query || `${s.artist || ""} ${s.title || ""}`.trim();
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`, "_blank", "noopener");
    },
    []
  );

  useEffect(() => {
    const a = new Audio();
    a.preload = "none";
    audioRef.current = a;

    const onTime = () => {
      setProgress(a.duration ? a.currentTime / a.duration : 0);
      save();
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => {
      setPlaying(false);
      save();
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      setIndex(-1);
      save();
    };
    const onError = () => {
      const s = songs[indexRef.current];
      setPlaying(false);
      setIndex(-1);
      if (s) openYoutube(s); // file lagu tidak ketemu -> cari di YouTube
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);
    a.addEventListener("error", onError);
    window.addEventListener("pagehide", save);

    // lanjutkan posisi terakhir (browser bisa memblokir autoplay -> tinggal tap play)
    try {
      const saved = JSON.parse(localStorage.getItem(LS.PLAYER) || "null");
      const s = saved && songs[saved.index];
      if (s && s.src) {
        setIndex(saved.index);
        a.src = assetUrl(s.src);
        a.addEventListener(
          "loadedmetadata",
          () => {
            a.currentTime = saved.time || 0;
            if (saved.playing) a.play().catch(() => {});
          },
          { once: true }
        );
        a.load();
      }
    } catch {
      /* abaikan */
    }

    return () => {
      a.pause();
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
      a.removeEventListener("error", onError);
      window.removeEventListener("pagehide", save);
    };
  }, [songs, save, setIndex, openYoutube]);

  const toggle = useCallback(
    (i) => {
      const a = audioRef.current;
      const s = songs[i];
      if (!a || !s) return;
      if (!s.src) return openYoutube(s);
      if (indexRef.current === i) {
        if (a.paused) a.play().catch(() => {});
        else a.pause();
        return;
      }
      setIndex(i);
      setProgress(0);
      a.src = assetUrl(s.src);
      a.currentTime = 0;
      a.play().catch(() => {});
    },
    [songs, setIndex, openYoutube]
  );

  const value = useMemo(() => ({ songs, index, playing, progress, toggle }), [songs, index, playing, progress, toggle]);
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer harus dipakai di dalam <PlayerProvider>");
  return ctx;
}
