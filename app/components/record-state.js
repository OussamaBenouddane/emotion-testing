import "./styles/record-state.css";

export default function RecordState( { onClick } ) {
  return (
    <div className="recording-state">
      <div className="recording-txt">recording...</div>
      <button className="stop-btn" onClick={onClick}>
        <div className="stop-txt">stop</div>
        <img src="/assets/stop-record.png" width="15px" height="15px" />
      </button>
    </div>
  );
}