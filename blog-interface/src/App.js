import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";
import ArticlesList from "./pages/ArticlesList";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div id="page-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/articles-list" element={<ArticlesList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
