"use client";

import React, { useState, useRef } from "react";
import "./audio-recorder.css";

const AudioRecorder = ({ theme }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [prediction, setPrediction] = useState("processing...");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);

    // Implement prediction logic here
  };

  return (
    <>
      <div className="record-container">
        <h2 className="record-title">Record Audio</h2>
        <div className="record-btn-container">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className={`record-btn ${theme}`}
            >
              Start
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className={`record-btn ${theme}`}
            >
              Stop
            </button>
          )}
        </div>

      </div>
        {audioUrl && (
          <div className="preview-part">
            <div className="preview-container">
              <label className="txt">Preview:</label>
              <audio controls src={audioUrl} className={`preview-audio ${theme}`} />
            </div>
            <div className="predict-part">
              <label className="txt">Prediction:</label>
              <div className="predict-result txt">{prediction}</div>
            </div>
          </div>
        )}
      </>
  );
};

export default AudioRecorder;
