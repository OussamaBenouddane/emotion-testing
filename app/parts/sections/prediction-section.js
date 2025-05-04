"use client";
import CardTitle from "../../components/card-title";
import SelectField from "../../components/select-field";
import Prediction from "../../components/prediction-container";
import PredictBtn from "../../components/predict-btn";

export default function PredictionSection({
  isRecorded,
  onPredict,
  predictionStatus,
  emotion,
  selectedModel,
  onModelChange,
}) {
  // Map emotion codes to display names if needed
  const emotionMap = {
    "ang": "Angry",
    "hap": "Happy", 
    "neu": "Neutral",
    "sad": "Sad"
  };
  
  // Use the mapped emotion name if available, otherwise use the original value
  const displayEmotion = emotionMap[emotion] || emotion;

  return (
    <div className="operation-card">
      <CardTitle>prediction</CardTitle>
      <SelectField value={selectedModel} onChange={onModelChange} />
      <PredictBtn disabled={!isRecorded || predictionStatus === "processing"} onClick={onPredict} />
      <Prediction status={predictionStatus} result={displayEmotion} />
    </div>
  );
}