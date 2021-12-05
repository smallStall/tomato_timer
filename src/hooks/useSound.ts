import { useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";
import { Sound } from "../types/sound"

export const useSound = (soundPath: string, volume: number): Sound => {
  const soundRef = useRef<Howl>();
  const pausedTimeRef = useRef(0);
  if (volume < 0 || volume > 1) {
    //throw new Error("volume error")
  }

  const play = useCallback(() => {
    soundRef.current = new Howl({
      src: [soundPath],
      html5: true,
      loop: true,
      preload: false,
      onplayerror: (id, message) => {
        if (!process.env.isProd) {
          alert(id + ":" + message)
        }
      },
    });
    const sound = soundRef.current;
    sound.load();
    sound.once("load", () => {
      if (sound != null) {
        sound.volume(volume);
        sound.play();
      }
    })
  }, [soundPath, volume]);
  const pause = useCallback(() => {
    if (soundRef.current == null) {
      return;
    }
    pausedTimeRef.current = soundRef.current.seek();
    soundRef.current.pause();
  }, []);
  const resume = useCallback(() => {
    if (soundRef.current == null) {
      return;
    }
    soundRef.current.play();
    soundRef.current.seek(pausedTimeRef.current);
  }, []);
  const stop = useCallback(() => {
    if (soundRef.current == null) {
      return;
    }
    soundRef.current.stop();
    soundRef.current.unload();
  }, []);

  useEffect(() => {
    if (soundRef.current != null) {
      soundRef.current.volume(volume);
    }
  }, [volume])
  return { playSound: play, pauseSound: pause, resumeSound: resume, stopSound: stop }
}