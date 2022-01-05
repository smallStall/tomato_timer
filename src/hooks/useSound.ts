import { useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";
import { Sound } from "../types/sound"
const PROD_MP3_PATH = "zihou1.mp3";
const PROD_OGG_PATH = "zihou1.mp3";
const TEST_SOUND_PATH = "test1.mp3";
const soundPath = process.env.isProd ? [PROD_MP3_PATH, PROD_OGG_PATH] : [TEST_SOUND_PATH];

export const useSound = (volume: number): Sound => {
  const soundRef = useRef<Howl>();
  const pausedTimeRef = useRef(-1);
  if (volume < 0 || volume > 1) {
    throw new Error("volume error")
  }
  const play = useCallback(() => {
    if (soundRef.current == null) {
      soundRef.current = new Howl({
        src: soundPath,
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
    } else if (!soundRef.current.playing()) { //if sound is paused
      soundRef.current.play(); //If you don't play when you pause, the sound will overlap, and there will be two IntervalTimers.
      //pausedTimeRef.current = -1; Keep the previous pausedTimeRef
    }
    soundRef.current.seek(0);
  }, [volume]);
  const pause = useCallback(() => {
    if (soundRef.current == null) {
      return;
    }
    if(soundRef.current.playing()){ // if sound is playing
      pausedTimeRef.current = soundRef.current.seek();
      soundRef.current.pause();
    }
  }, []);
  const resume = useCallback(() => {
    if (soundRef.current == null) {
      return;
    }
    if (!soundRef.current.playing()) { // if sound is paused
      soundRef.current.play();
    }
    soundRef.current.seek(pausedTimeRef.current);
    pausedTimeRef.current = -1;
  }, []);
  const adjust = useCallback((position: number) => {
    if (soundRef.current == null) {
      return;
    }
    soundRef.current.seek(position);
  }, [])

  useEffect(() => {
    if (soundRef.current != null) {
      soundRef.current.volume(volume);
    }
  }, [volume])
  return { playSound: play, pauseSound: pause, resumeSound: resume, adjustSound: adjust }
}