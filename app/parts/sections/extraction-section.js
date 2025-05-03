"use client";
import CardTitle from "../../components/card-title";
import RecButton from "../../components/rec-btn";
import RecordState from "../../components/record-state";
import CustomAudioPlayer from "../../components/custom-audio";
import Feature from "../../components/feature";

export default function ExtractionSection({
  isRecording,
  isRecorded,
  audioUrl,
  onStart,
  onStop,
  onReset,
}) {
  return (
    <div className="operation-card">
      <CardTitle>extraction</CardTitle>

      {!isRecording && !isRecorded && <RecButton onClick={onStart} />}
      {isRecording && <RecordState onClick={onStop} />}
      {isRecorded && <CustomAudioPlayer src={audioUrl} onRedo={onReset} />}

      <Feature name="mfcc" plot="s" />
      <Feature name="spectogram" plot="s" />
    </div>
  );
}
