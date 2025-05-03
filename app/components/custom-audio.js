"use client";
import { useRef, useState } from "react";
import "./styles/custom-audio.css";

export default function CustomAudioPlayer({ src, onRedo }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleMetadataLoaded = () => {
    const audio = audioRef.current;
    if (audio && isFinite(audio.duration)) {
      setDuration(audio.duration);
    }
  };

  const formatTime = (time) => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="recorder-state">
      <div className="custom-audio-container">
        <audio
          ref={audioRef}
          src={src}
          key={src}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onCanPlayThrough={handleMetadataLoaded}
          onLoadedData={handleMetadataLoaded}
          onEnded={() => setIsPlaying(false)}
        />

        <button className="audio-btn" onClick={togglePlay}>
          {isPlaying ? "❚❚" : "▶"}
        </button>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="time-info">
          {formatTime(currentTime)}
        </div>
      </div>

      <button className="reset-btn" onClick={onRedo}>
        <img src="/assets/reset.png" width="20px" height="20px" />
      </button>
    </div>
  );
}
