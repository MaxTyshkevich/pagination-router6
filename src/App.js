import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { AboutPage } from "./AboutPage";
import { HomePage } from "./HomePage";
import { NotFoundPage } from "./NotFoundPage";

function App() {
  return (
    <Container className="App" sx={{ mt: 3 }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Container>
  );
}

export default App;
