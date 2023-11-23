import Homepage from "./pages/Homepage";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authpage from "./pages/Authpage";
import { AuthProvider } from "./components/AuthProvider";
import Profilepage from "./pages/Profilepage";
import Bookingpage from "./pages/Bookingpage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Authpage />} />
            <Route path="/profile" element={<Profilepage />} />
            <Route path="/booking" element={<Bookingpage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
