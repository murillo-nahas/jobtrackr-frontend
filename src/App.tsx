import { BrowserRouter, Route, Routes } from "react-router";

import List from "./pages/applications/List";
import Form from "./pages/applications/Form";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<List />} />
        <Route path="/applications/new" element={<Form />} />
        <Route path="/applications/:id/edit" element={<Form />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
