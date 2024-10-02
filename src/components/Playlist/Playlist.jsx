import { IoCloseSharp } from "react-icons/io5";
import { MdQueueMusic } from "react-icons/md";
import { useMusicContext } from "../../context/MusicContext";
import { songs } from "../../data/data";
import Duration from "../Duration";
import "./Playlist.css";

const Playlist = () => {
  const { handleSelectSong, currentSongIndex, showPlaylist, setShowPlaylist } =
    useMusicContext();
  return (
    <div className={`list ${showPlaylist ? "show" : ""}`}>
      <div className="header">
        <div>
          <MdQueueMusic />
          <span>Music list</span>
        </div>
        <IoCloseSharp
          onClick={() => setShowPlaylist(false)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <ul>
        {songs.map((song, index) => (
          <li
            key={index}
            className={`${currentSongIndex === index ? "playing" : ""}`}
            onClick={() => handleSelectSong(index)}
          >
            <div className="row">
              <span>{song.songTitle}</span>
              <p>{song.artistName}</p>
            </div>
            <Duration songUrl={song.url} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
