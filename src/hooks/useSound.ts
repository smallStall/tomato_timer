import { useEffect, useRef, useCallback, MutableRefObject } from "react";
import { Howl } from "howler";
import { Sound } from "../types/sound"
const PROD_MP3_PATH = "zihou1.mp3";
const PROD_OGG_PATH = "zihou1.mp3";
const TEST_SOUND_PATH = "test1.mp3";
const soundPath = process.env.isProd ? [PROD_MP3_PATH, PROD_OGG_PATH] : [TEST_SOUND_PATH];
const startSoundPath = "start.mp3";
const endSoundPath = "end.mp3";

export const useSound = (volume: number): Sound => {
  const soundRef = useRef<Howl>();
  const smallSoundRef = useRef<Howl>();
  const pausedTimeRef = useRef(-1);
  if (volume < 0 || volume > 1) {
    throw new Error("volume error")
  }
  const playSoundCallback = (path: Array<string>, ref: MutableRefObject<Howl | undefined>, isLoop: boolean) => {
    if (ref.current == null) {
      ref.current = new Howl({
        src: path,
        html5: true,
        loop: isLoop,
        preload: false,
        onplayerror: (id, message) => {
          if (!process.env.isProd) {
            alert(id + ":" + message)
          }
        },
      });
      const sound = ref.current;
      sound.load();
      sound.once("load", () => {
        if (sound != null) {
          sound.volume(volume);
          sound.play();
        }
      })
    } else if (!ref.current.playing()) { //if sound is paused
      ref.current.play(); //If you don't play when you pause, the sound will overlap, and there will be two IntervalTimers.
      //pausedTimeRef.current = -1; Keep the previous pausedTimeRef
    }
    ref.current.seek(0);
  }
  const play = useCallback(() => {
    playSoundCallback([startSoundPath], smallSoundRef, false);
    playSoundCallback(soundPath, soundRef, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);
  const playEndSound = useCallback(() => {
    playSoundCallback([endSoundPath], smallSoundRef, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  const pause = useCallback(() => {
    if (soundRef.current == null) {
      return;
    }
    if (soundRef.current.playing()) { // if sound is playing
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
  const stop = useCallback(() => {
    if (soundRef.current == null) {
      return;
    }
    soundRef.current.stop();
  }, [])


  useEffect(() => {
    if (soundRef.current != null) {
      soundRef.current.volume(volume);
    }
  }, [volume])
  return { playSound: play, pauseSound: pause, resumeSound: resume, adjustSound: adjust, stopSound: stop, playEnd: playEndSound }
}