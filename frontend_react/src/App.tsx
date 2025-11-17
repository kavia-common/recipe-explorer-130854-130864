import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import './styles/global.css';
import { applyThemeToDocument } from './theme';

// PUBLIC_INTERFACE
export default function App(): JSX.Element {
  /** Root app component with routes and global theme application. */
  useEffect(() => {
    applyThemeToDocument();
  }, []);

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
