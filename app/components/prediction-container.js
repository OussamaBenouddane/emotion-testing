import "./styles/prediction-container.css";

export default function Prediction({ status, result }) {
  let content = "";
  let content2 = "prediction";

  if (status === "processing") {
    content2 = "processing...";
  } else if (status === "done") {
    content = result;
    content2 = "predicted";
  }

  return (
    <div className="prediction-container">
      <div className="prediction-title">{content2}</div>
      <div className="prediction-result">{content}</div>
    </div>
  );
}
