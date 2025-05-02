import "./rec-btn.css";

export default function RecButton() {
  return (
    <button className="record-btn">
      <img src="/assets/microphone.png" alt="record" width="20px" height="20px" />
      <span className="btn-txt">record audio</span>
    </button>
  );
}