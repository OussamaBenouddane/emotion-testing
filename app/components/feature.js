import "./styles/feature.css";

export default function Feature({ name, plotData, isLoading }) {
  return (
    <div className="extracted-features">
      <div className="feature-title">{name}</div>
      <div className="feature-plot">
        {isLoading ? (
          <div className="loading-indicator">Loading...</div>
        ) : plotData ? (
          <img 
            src={`data:image/png;base64,${plotData}`} 
            alt={`${name} visualization`}
            className="feature-image"
          />
        ) : (
          <div className="no-data">Record audio to see {name}</div>
        )}
      </div>
    </div>
  );
}