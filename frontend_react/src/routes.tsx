import React from 'react';
import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';

// PUBLIC_INTERFACE
export const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/recipe/:id', element: <RecipeDetail /> },
];
