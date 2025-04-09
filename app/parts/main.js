import Button from "../components/button";
import "./main.css";

export default function Main({ theme }) {
  return (
    <main className="main-part">
      <div className="main-title">Test Speech Emotion</div>
      <Button theme={theme} />
    </main>
  )
}