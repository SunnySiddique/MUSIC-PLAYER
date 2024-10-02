import { AnimatePresence, motion } from "framer-motion";
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { useMusicContext } from "../../context/MusicContext";
import { songs } from "../../data/data";
import Playlist from "../Playlist/Playlist";
import TopBar from "../TopBar/TopBar";
import "./MusicPlayer.css";

// Animation variants for image, title, and artist
const imageVariants = {
  initial: { opacity: 0, scale: 0.1 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.6 },
};

const textVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
  transition: { duration: 0.5 },
};

const controlVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
  transition: { duration: 0.5 },
};

const MusicPlayer = () => {
  const {
    toggleMute,
    isPlaying,
    currentSongIndex,
    currentTime,
    duration,
    volume,
    audioRef,
    isMuted,
    isVolume,
    setVolume,
    playPauseHandler,
    nextSongHandler,
    previousSongHandler,
    formatTime,
    handleSliderChange,
  } = useMusicContext();

  const imageURL = songs[currentSongIndex].imageUrl;

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);

    if (newVolume === 0 && !isMuted) {
      toggleMute();
    } else if (newVolume > 0 && isMuted) {
      toggleMute();
    }
  };

  return (
    <>
      <div className="main-div">
        <div>
          <TopBar />
        </div>

        <motion.div>
          <div className="playing-part">
            <AnimatePresence mode="wait">
              <motion.div
                className="img"
                key={currentSongIndex} // Ensure Framer Motion knows when the image changes
                initial="initial"
                animate="animate"
                exit="exit"
                variants={imageVariants}
                transition={imageVariants.transition}
              >
                <motion.img
                  src={imageURL}
                  alt={songs[currentSongIndex].songTitle}
                  className={`${isPlaying ? "playing" : ""}`}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="control-part">
            <AnimatePresence mode="wait">
              <motion.div
                className="song-title"
                key={currentSongIndex}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textVariants}
                transition={{ delay: 0.5 }} // Delays the title appearance
              >
                <motion.h1 className="name">
                  {songs[currentSongIndex].songTitle}
                </motion.h1>
                <motion.h3 className="artist">
                  {songs[currentSongIndex].artistName}
                </motion.h3>
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="control-buttons"
              variants={controlVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="range-slider">
                <motion.div
                  initial={{ opacity: 0, y: 300 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.6 }}
                  className="timer"
                >
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </motion.div>
                <motion.input
                  initial={{ opacity: 0, y: 300 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.8 }}
                  type="range"
                  className="slider"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSliderChange}
                />
              </div>
              <audio ref={audioRef} onEnded={nextSongHandler} hidden />

              <div className="controls">
                <motion.button
                  className="btnC"
                  onClick={previousSongHandler}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    duration: 0.6,
                    delay: 1.4,
                  }}
                >
                  <TbPlayerTrackPrevFilled />
                </motion.button>

                <motion.button
                  className="play-pause btnC"
                  onClick={playPauseHandler}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    duration: 0.6,
                    delay: 1.4,
                  }}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </motion.button>

                <motion.button
                  className="btnC"
                  onClick={nextSongHandler}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    duration: 0.6,
                    delay: 1.4,
                  }}
                >
                  <TbPlayerTrackNextFilled />
                </motion.button>
              </div>
            </motion.div>
          </div>

          <div className={`volume-control ${isVolume ? "active" : ""}`}>
            <div onClick={toggleMute}>
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={handleVolumeChange}
              className="slider"
              style={{ marginTop: 0 }}
            />
            <span>{volume}</span>
          </div>
        </motion.div>

        <div>
          <Playlist />
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
