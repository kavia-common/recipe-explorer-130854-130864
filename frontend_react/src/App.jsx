import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import './styles/global.css';

// PUBLIC_INTERFACE
export default function App() {
  /** Root app component with routes and global theme application. */
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
