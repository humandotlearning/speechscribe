import "./styles/globals.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SpeechToTextUI from "./components/SpeechToTextUI";
import SettingsPage from "./components/settings";

function App() {
  return (
    <Router>
      <main className="container">
        <div className="settings-button">
          <Link to="/settings">
            <button>Settings ⚙️</button>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<SpeechToTextUI />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
