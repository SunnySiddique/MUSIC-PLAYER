import { audio } from "framer-motion/client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { songs } from "../data/data";

const MusicContext = createContext(null);
export const useMusicContext = () => useContext(MusicContext);

export const AudioProvider = ({ children }) => {
  // toggle states
  const [isActive, setIsActive] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  // song controller
  const [isVolume, setIsVolume] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  // useRef for audio player
  const audioRef = useRef(null);
  // useRef for audio player

  // toggle function
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const toggleOptionsVisibility = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const handleVolume = () => {
    setIsVolume((prev) => !prev);
  };

  const handlePlaylist = () => {
    setShowPlaylist((prev) => !prev);
  };
  // toggle function

  // controller function
  const playPauseHandler = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSongHandler = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
    setCurrentTime(0); // Reset time for the new song
  };

  const previousSongHandler = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
    setIsPlaying(true);
    setCurrentTime(0); // Reset time for the previous song
  };
  // controller function

  // when you will click the progress the song start from there
  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    if (audioRef.current) {
      audioRef.current.play();
    }
    setIsPlaying(true);
  };

  // if the volume will 100 the volume 0 if 100 volume 0
  const toggleMute = () => {
    setIsMuted((prevState) => !prevState);
    setVolume((prevState) => (prevState ? 0 : 100));
  };

  // playlist when user will select any song from playlist this song will play
  const handleSelectSong = (index) => {
    setCurrentSongIndex(index);

    if (audio.current) {
      playPauseHandler();
    }
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // whenever the song will play the slider goes every a second
  useEffect(() => {
    if (audioRef.current) {
      const updateCurrentTime = () => {
        setCurrentTime(audioRef.current.currentTime);
      };

      audioRef.current.addEventListener("timeupdate", updateCurrentTime);
      return () => {
        audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, [audioRef]);

  // Set the audio source when the current song changes (but don't reset playback on pause/play)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSongIndex].url;
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex]); // Only trigger this effect when the song changes

  // the duration formate
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const value = {
    isPlaying,
    currentSongIndex,
    currentTime,
    duration,
    handlePlaylist,
    setShowPlaylist,
    showPlaylist,
    playPauseHandler,
    nextSongHandler,
    handleSelectSong,
    previousSongHandler,
    audioRef,
    isActive,
    isOptionsVisible,
    toggleActiveClass,
    toggleOptionsVisibility,
    formatTime,
    setVolume,
    setCurrentTime,
    volume,
    toggleMute,
    isMuted,
    handleVolume,
    isVolume,
    setCurrentSongIndex,
    handleSliderChange,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};
