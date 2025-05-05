"use client";
import { useState, useEffect } from "react";
import CardTitle from "../../components/card-title";
import RecButton from "../../components/rec-btn";
import RecordState from "../../components/record-state";
import CustomAudioPlayer from "../../components/custom-audio";
import Feature from "../../components/feature";

export default function ExtractionSection({
  isRecording,
  isRecorded,
  audioUrl,
  audioBlob, // This is the actual blob of recorded audio
  onStart,
  onStop,
  onReset,
}) {
  const [featureData, setFeatureData] = useState({
    mfcc: null,
    spectrogram: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debug logging - check if we have the audio blob
  useEffect(() => {
    if (audioBlob) {
      console.log("Audio blob is available:", audioBlob.type, audioBlob.size);
    }
  }, [audioBlob]);

  useEffect(() => {
    // Reset features when recording is reset
    if (!isRecorded) {
      setFeatureData({ mfcc: null, spectrogram: null });
      setError(null);
    }
    // When new audio is recorded, fetch the features
    else if (isRecorded && audioBlob) {
      console.log("Audio recorded, extracting features");
      fetchAudioFeatures(audioBlob);
    }
  }, [isRecorded, audioBlob]);

  const fetchAudioFeatures = async (blob) => {
    console.log("Starting feature extraction with blob:", blob.type, blob.size);
    setIsLoading(true);
    setError(null);
    
    try {
      // Create a new FormData object
      const formData = new FormData();
      
      // IMPORTANT: Make sure we send the actual blob and name it appropriately
      formData.append("file", blob);
      
      console.log("Sending feature extraction request to server...");
      
      // Make the request to your FastAPI endpoint
      // Make sure this URL matches exactly what your FastAPI server expects
      const response = await fetch("http://localhost:8000/extract-features/", { // Adjust port if needed
        method: "POST",
        body: formData,
        // Do not set Content-Type header - browser will set it with boundary for FormData
      });
      
      console.log("Response received:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Feature data received:", {
          mfccPresent: !!data.mfcc,
          spectrogramPresent: !!data.spectrogram
        });
        
        setFeatureData({
          mfcc: data.mfcc,
          spectrogram: data.spectrogram
        });
      } else {
        const errorText = await response.text();
        console.error("Server error:", response.status, errorText);
        setError(`Server error: ${response.status}`);
      }
    } catch (error) {
      console.error("Exception in feature extraction:", error);
      setError(`Connection error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="operation-card">
      <CardTitle>extraction</CardTitle>

      {!isRecording && !isRecorded && <RecButton onClick={onStart} />}
      {isRecording && <RecordState onClick={onStop} />}
      {isRecorded && <CustomAudioPlayer src={audioUrl} onRedo={onReset} />}

      {error && (
        <div className="error-message" style={{ color: "red", margin: "10px 0" }}>
          {error}
        </div>
      )}

      <Feature 
        name="MFCC" 
        plotData={featureData.mfcc} 
        isLoading={isLoading} 
      />
      <Feature 
        name="Spectrogram" 
        plotData={featureData.spectrogram} 
        isLoading={isLoading} 
      />
    </div>
  );
}