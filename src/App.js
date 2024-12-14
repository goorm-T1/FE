import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import InputPage from "./pages/InputPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/input" element={<InputPage />} />
      <Route path="/input/:id" element={<UserPage />} />
    </Routes>
  );
}

export default App;
