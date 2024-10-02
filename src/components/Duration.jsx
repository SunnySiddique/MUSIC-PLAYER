import { useEffect, useState } from "react";
import { useMusicContext } from "../context/MusicContext";

const Duration = ({ songUrl }) => {
  const [duration, setDuration] = useState(0);
  const { formatTime } = useMusicContext();
  useEffect(() => {
    const audio = new Audio(songUrl);

    const handleLoadedMetadata = () => {
      if (audio.duration) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Clean up event listeners on unmount
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [songUrl]);

  return <span className="duration">{formatTime(duration)}</span>;
};

export default Duration;
