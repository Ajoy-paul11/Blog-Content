import { BrowserRouter, Routes, Route } from "react-router";
import ContentList from "./pages/ContentList.jsx";
import ContentDetail from "./pages/ContentDetails.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContentList />} />
        <Route path="/content/:id" element={<ContentDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
