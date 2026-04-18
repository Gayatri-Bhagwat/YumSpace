
import "./index.css"
import Login from "./Pages/LoginPage/LoginPage.tsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Main from "./Pages/MainPage/MainPage.tsx"
import RecipeDetailPage from "./Pages/RecipeDetailPage/RecipeDetailPage.tsx"
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Main/>}/>
          <Route path="/recipe/:id" element={<RecipeDetailPage/>} />
        </Routes>
      </Router>
  )
}

export default App
