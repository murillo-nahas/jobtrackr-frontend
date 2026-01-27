import { BrowserRouter, Route, Routes } from "react-router";

import AppLayout from "./components/app-layout";
import ProtectedRoute from "./components/protected-route";
import RootRedirect from "./components/root-redirect";
import Form from "./pages/applications/form";
import List from "./pages/applications/list";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/not-found";
import Settings from "./pages/settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applications" element={<List />} />
            <Route path="/applications/new" element={<Form />} />
            <Route path="/applications/:id/edit" element={<Form />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
