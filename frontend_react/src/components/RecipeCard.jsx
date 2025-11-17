import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  /** Card for a single recipe in the grid. */
  return (
    <article className="card" aria-label={recipe.title}>
      <Link to={`/recipe/${recipe.id}`} aria-label={`Open ${recipe.title}`}>
        <img
          className="card-media"
          src={recipe.image}
          alt={`${recipe.title} image`}
          loading="lazy"
        />
      </Link>
      <div className="card-content">
        <h3 className="card-title">
          <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
        </h3>
        <div className="card-meta">
          <span className="badge" title="Cuisine">🍽 {recipe.cuisine}</span>
          <span className="badge" title="Time">⏱ {recipe.time}</span>
          <span className="badge" title="Rating">⭐ {recipe.rating}</span>
          <span className="badge" title="Calories">🔥 {recipe.calories} cal</span>
        </div>
      </div>
    </article>
  );
}
