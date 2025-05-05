"use client";

import { useState } from "react";
import useRecorder from "../hooks/useRecorder";
import PredictionSection from "./sections/prediction-section";
import "./styles/main-part.css";
import ExtractionSection from "./sections/extraction-section";

export default function Main() {
  const {
    isRecording,
    audioUrl,
    startRecording,
    stopRecording,
    resetRecording,
    audioBlob,
  } = useRecorder();

  const isRecorded = Boolean(audioUrl);
  const [predictionStatus, setPredictionStatus] = useState("idle");
  const [emotion, setEmotion] = useState("");
  const [selectedModel, setSelectedModel] = useState(0);

  const handlePredict = async () => {
    if (!audioBlob) {
      console.error("No audio blob found.");
      return;
    }

    setPredictionStatus("processing");
    setEmotion(""); // Clear previous results

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");

    console.log("Selected model:", selectedModel);
    console.log("Predicting...");

    try {
      const response = await fetch(
        `http://localhost:8000/predict/?model_choice=${selectedModel}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from backend:", data);
      
      if (data.error) {
        console.error("Server error:", data.error);
        setPredictionStatus("idle"); // Reset status on error
        alert(`Error: ${data.error}`);
        return;
      }
      
      if (data.label) {
        setEmotion(data.label);
        setPredictionStatus("done");
      } else {
        throw new Error("No prediction was returned from the server");
      }
    } catch (err) {
      console.error("Prediction error:", err);
      setPredictionStatus("idle");
      alert(`Failed to get prediction: ${err.message}`);
    }
  };

  const handleReset = () => {
    resetRecording();
    setPredictionStatus("idle");
    setEmotion("");
  };

  const handleModelChange = (e) => {
    setSelectedModel(Number(e.target.value));
    // Reset prediction when model changes
    if (predictionStatus === "done") {
      setPredictionStatus("idle");
      setEmotion("");
    }
  };

  return (
    <div className="main-part">
      <div className="operation-card">
        <ExtractionSection
          isRecording={isRecording}
          isRecorded={isRecorded}
          audioUrl={audioUrl}
          audioBlob={audioBlob}
          onStart={startRecording}
          onStop={stopRecording}
          onReset={handleReset}
        />
      </div>

      <PredictionSection
        isRecorded={isRecorded}
        onPredict={handlePredict}
        predictionStatus={predictionStatus}
        emotion={emotion}
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
      />
    </div>
  );
}