import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Navbar } from "react-bootstrap";

function App() {
  const [trackes, setTrackes] = useState([]);
  const [keyword, setkeyWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getTracks = async () => {
    try {
      setIsLoading(true);
      const fetchData = await fetch(
        `https://v1.nocodeapi.com/siddique/spotify/veMOAJvuyeefDkpr/search?q=${keyword}&type=track`
      );
      const data = await fetchData.json();
      console.log(data);
      setTrackes(data.tracks.items || []);
      localStorage.setItem(
        "savedTracks",
        JSON.stringify(data.tracks.items || [])
      );
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim() !== "") {
      getTracks();
    }
  };

  useEffect(() => {
    const storedTracks = localStorage.getItem("savedTracks");
    if (storedTracks) {
      setTrackes(JSON.parse(storedTracks));
    }
  }, []);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#" className="d-flex">
            Spotify music
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="navbarScroll"
            className="d-flex justify-content-center"
          >
            <Form className="d-flex">
              <Form.Control
                value={keyword}
                onChange={(e) => setkeyWord(e.target.value)}
                type="search"
                placeholder="Search"
                className="me-2 w-75"
                aria-label="Search"
              />
              <Button variant="outline-success" onClick={handleSearch}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="text-center">{isLoading && <p>Loading...</p>}</div>

      <div className="container mt-5">
        <div className="row g-2">
          {trackes.map((track) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div key={track.id} className="col">
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={track.album.images[1].url} />
                  <Card.Body>
                    <Card.Title>{track.name}</Card.Title>
                    <Card.Text>Artists: {track.artists[0].name}</Card.Text>
                    <Card.Text>
                      Release date: {track.album.release_date}
                    </Card.Text>
                    <audio
                      src={track.preview_url}
                      controls
                      className="w-100"
                      loop
                      preload="20" // This will preload the audio for faster playback
                    ></audio>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
