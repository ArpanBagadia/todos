import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from 'react-hot-toast'

function App() {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Navbar setSearchQuery={setSearchQuery}/>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home searchQuery={searchQuery}/>
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
