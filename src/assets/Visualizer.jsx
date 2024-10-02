import React, { useEffect, useRef } from "react";

const AudioVisualizer = ({ audioRef }) => {
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyserRef.current = analyser;

    if (audioRef.current) {
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
    }

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = "rgba(0, 0, 0, 0.2)";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
        canvasCtx.fillRect(
          x,
          canvas.height - barHeight / 2,
          barWidth,
          barHeight / 2
        );
        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      audioContext.close();
    };
  }, [audioRef]);

  return <canvas ref={canvasRef} width={800} height={400}></canvas>;
};

export default AudioVisualizer;
