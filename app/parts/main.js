import Button from "../components/button";
import "./main.css";
import AudioRecorder from "./audio-recorder";

export default function Main({ theme }) {
  return (
    <main className="main-part">
      <div className="main-title">Test Speech Emotion</div>
      <AudioRecorder theme={ theme } />
    </main>
  )
}