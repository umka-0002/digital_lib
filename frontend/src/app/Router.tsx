import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CardListPage } from "../pages/CardListPage";
import { PrivateRoute } from "./PrivateRoute";
// другие импорты...

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* другие роуты */}
      <Route path="/cardlist" element={<PrivateRoute><CardListPage /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>
);