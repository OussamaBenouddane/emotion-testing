import "./select-field.css";

export default function SelectField() {
  return (
    <div className="custom-select-wrapper">
      <select className="custom-select">
        <option value={0}>Wav2Vec2</option>
        <option value={1}>Option 2</option>
        <option value={2}>Option 3</option>
      </select>
    </div>
  );
}
