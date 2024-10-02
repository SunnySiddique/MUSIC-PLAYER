import { motion } from "framer-motion";
import { FaMusic, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import { useMusicContext } from "../../context/MusicContext";
import "./TopBar.css";

const TopBar = () => {
  const {
    isOptionsVisible,
    toggleOptionsVisibility,
    isMuted,
    toggleMute,
    handleVolume,
    handlePlaylist,
  } = useMusicContext();

  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.button
        className="hdbtn"
        onClick={toggleOptionsVisibility}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <MdNavigateNext style={{ fontSize: "25px" }} />
      </motion.button>

      <motion.div
        className={`options ${isOptionsVisible ? "active2" : ""}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isOptionsVisible ? 1 : 0,
          scale: isOptionsVisible ? 1 : 0.8,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.button
          className="hdbtn"
          onClick={handleVolume}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <FaMusic />
        </motion.button>
        <motion.button
          className="hdbtn"
          onClick={toggleMute}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </motion.button>
      </motion.div>

      <motion.button
        className="hdbtn"
        onClick={handlePlaylist}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <HiMenuAlt3 />
      </motion.button>
    </motion.header>
  );
};

export default TopBar;
