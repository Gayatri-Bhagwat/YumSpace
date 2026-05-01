
import "./index.css"
import Login from "./Pages/LoginPage/LoginPage.tsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
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
function App() {
  return (
      <Router>
    <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Main/>}/>
          <Route path="/recipe/:id" element={<RecipeDetailPage/>} />
        </Routes>
      </Router>
  )
}

export default App
