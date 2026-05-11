import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import CategoryPage from "./components/pages/CategoryPage";
import ArticlePage from "./components/pages/ArticlePage";
import SearchPage from "./components/pages/SearchPage";
import TrendingPage from "./components/pages/TrendingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="category/:slug" element={<CategoryPage/>}/>
        <Route path="article/:id" element={<ArticlePage/>}/>
        <Route path="search" element={<SearchPage/>}/>
        <Route path="trending" element={<TrendingPage/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  );
}