import ferrariImage from "/ferrari.jpg";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <img src={ferrariImage} alt="Ferrari" className="background-img" />

      <div className="content">
        <h1 className="title">Welcome to F1 Drivers App</h1>
        <p className="subtitle">
          Experience the thrill of Formula 1 like never before.
        </p>

        <button className="go-btn" onClick={() => navigate("/home")}>
          GO!
        </button>

        <div className="objectives-text">
          <h4>What you can do:</h4>
          <ul>
            <li>🔍 Search for different drivers.</li>
            <li>{"📊 Watch drivers' details."}</li>
            <li>⚙️ Apply different filters.</li>
            <li>🔄 Order all the drivers.</li>
            <li>📝 Create a new driver.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Landing;
