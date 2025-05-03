import "./styles/feature.css";

export default function Feature({ name, plot }) {
  return <div className="extracted-features">
    <div className="feature-title">{name}</div>
    <div className="feature-plot">{plot}</div>
  </div>;
}