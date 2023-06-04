import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";

import Navbar from "./components/NavBar/NavBar"
import Footer from "./components/Footer/Footer";

import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register";
import Dashboard from "./pages/DashBoard/DashBoard";
import CreatPost from "./pages/CreatePost/CreatePost"

import { AuthProvider } from "./context/AuthContext";
import Search from "./pages/Search/Search";
import Posts from "./pages/Post/Posts";
import EditPost from "./pages/EditPost/EditPost";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Posts />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />

              <Route
                path="/dashboard/posts/edit/:id"
                element={user ? <EditPost /> : <Navigate to="/login" />}
              />

              <Route
                path="/posts/creatPost"
                element={user ? <CreatPost /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>

      </AuthProvider>
    </div>
  );
}

export default App;