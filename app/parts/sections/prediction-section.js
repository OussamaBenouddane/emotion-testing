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
  return (
    <div className="operation-card">
      <CardTitle>test</CardTitle>
      <SelectField value={selectedModel} onChange={onModelChange} />
      <PredictBtn disabled={!isRecorded} onClick={onPredict} />
      <Prediction status={predictionStatus} result={emotion} />
    </div>
  );
}

