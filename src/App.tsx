
import "./index.css"
import Login from "./Pages/LoginPage/LoginPage.tsx"
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import Main from "./Pages/MainPage/MainPage.tsx"
import RecipeDetailPage from "./Pages/RecipeDetailPage/RecipeDetailPage.tsx"

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

function App() {
  return (
      <Router>
    <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<ProtectedRoute><Main/></ProtectedRoute>}/>
          <Route path="/recipe/:id" element={<ProtectedRoute><RecipeDetailPage/></ProtectedRoute>} />
        </Routes>
      </Router>
  )
}

export default App
