import "./styles/predict-btn.css";

export default function PredictBtn({ disabled, onClick }) {
  return (
    <button className="predict-btn" onClick={onClick} disabled={disabled}>
      <span className="predict-btn-txt">predict</span>
    </button>
  );
}
