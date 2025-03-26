import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CoinPage from "./pages/CoinPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/coin/:id" element={<CoinPage />} />
      </Routes>
    </Router>
  );
}

export default App;
