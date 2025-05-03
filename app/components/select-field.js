import "./styles/select-field.css";

export default function SelectField({ value, onChange }) {
  return (
    <div className="custom-select-wrapper">
      <select className="custom-select" value={value} onChange={onChange}>
        <option value={0}>Wav2Vec2</option>
        <option value={1}>CNN Transformer</option>
        <option value={2}>CNN LSTM</option>
      </select>
    </div>
  );
}

