import CardTitle from "../components/card-title";
import RecButton from "../components/rec-btn";
import SelectField from "../components/select-field";
import Prediction from "../components/prediction-container";
import "./main-part.css";
import Feature from "../components/feature";

export default function Main() {
  return (
    <div className="main-part">
      <div className="operation-card">
        <CardTitle>extraction</CardTitle>
        <RecButton />
        <Feature name="mfcc" plot="s" />
        <Feature name="spectogram" plot="s" />
      </div>

      <div className="operation-card">
        <CardTitle>test</CardTitle>
        <SelectField />
        <RecButton />
        <Prediction />
      </div>
    </div>
  );
}




