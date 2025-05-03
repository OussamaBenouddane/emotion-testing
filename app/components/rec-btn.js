import "./styles/rec-btn.css";

export default function RecButton( { onClick } ) {
  return (
    <button className="record-btn" onClick={onClick}>
      <img src="/assets/microphone-white.png" width="20px" height="20px" />
      <span className="btn-txt">record audio</span>
    </button>
  );
}