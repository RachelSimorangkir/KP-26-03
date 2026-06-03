import { BrowserRouter, Routes, Route } from "react-router-dom";
import KenaikanPangkat from "../pages/KenaikanPangkat";

function Home() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Home Berhasil</h1>

      <a href="/kenaikan-pangkat">
        Buka Kenaikan Pangkat
      </a>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/kenaikan-pangkat"
          element={<KenaikanPangkat />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;