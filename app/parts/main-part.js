"use client";

import { useState } from "react";
import useRecorder from "../hooks/useRecorder";
import CardTitle from "../components/card-title";
import RecButton from "../components/rec-btn";
import RecordState from "../components/record-state";
import CustomAudioPlayer from "../components/custom-audio";
import Feature from "../components/feature";
import PredictionSection from "./sections/prediction-section";
import "./styles/main-part.css";

export default function Main() {
  const {
    isRecording,
    audioUrl,
    startRecording,
    stopRecording,
    resetRecording,
    audioBlob, // assuming audioBlob is returned by your recorder hook
  } = useRecorder();

  const isRecorded = Boolean(audioUrl);
  const [predictionStatus, setPredictionStatus] = useState("idle");
  const [emotion, setEmotion] = useState("");
  const [selectedModel, setSelectedModel] = useState(0);

  const handlePredict = async () => {
    if (!audioBlob) {
      console.error("No audio blob found.");
      return;
    };

    setPredictionStatus("processing");

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");

    console.log("Selected model:", selectedModel);
    console.log("Sending audio blob:", audioBlob);
    console.log("Predicting...");

    try {
      const response = await fetch(
        `http://localhost:8000/predict/?model_choice=${selectedModel}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Response from backend:", data);
      if (data.label) {
        setEmotion(data.label);
        setPredictionStatus("done");
      } else {
        throw new Error(data.error || "Prediction failed.");
      }
    } catch (err) {
      console.error(err);
      setEmotion("Error");
      setPredictionStatus("done");
    }
  };

  const handleReset = () => {
    resetRecording();
    setPredictionStatus("idle");
    setEmotion("");
  };

  return (
    <div className="main-part">
      <div className="operation-card">
        <CardTitle>extraction</CardTitle>

        {!isRecording && !isRecorded && <RecButton onClick={startRecording} />}
        {isRecording && <RecordState onClick={stopRecording} />}
        {isRecorded && (
          <CustomAudioPlayer src={audioUrl} onRedo={handleReset} />
        )}

        <Feature name="mfcc" plot="s" />
        <Feature name="spectogram" plot="s" />
      </div>

      <div className="operation-card">
        <PredictionSection
          isRecorded={isRecorded}
          onPredict={handlePredict}
          predictionStatus={predictionStatus}
          emotion={emotion}
          selectedModel={selectedModel}
          onModelChange={(e) => setSelectedModel(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
