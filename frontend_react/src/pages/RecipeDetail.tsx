import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, Recipe } from '../services/api';

// PUBLIC_INTERFACE
export default function RecipeDetail() {
  /** Detailed view of a recipe: hero image, summary, ingredients, steps, nutrition. */
  const { id = '' } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState<Recipe | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(undefined);
      try {
        const r = await api.fetchRecipeById(id);
        if (!cancelled) setData(r);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load recipe');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (id) run();
    return () => { cancelled = true; };
  }, [id]);

  function toggle(name: string) {
    setChecked((m) => ({ ...m, [name]: !m[name] }));
  }

  return (
    <div className="container" style={{ paddingTop: 20, paddingBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <button className="button ghost" onClick={() => nav(-1)} aria-label="Go back">← Back</button>
        <Link className="button ghost" to="/">Home</Link>
      </div>

      {loading && <div className="loading">Loading…</div>}
      {error && <div className="error">Error: {error}</div>}
      {!loading && !error && data && (
        <>
          <div className="detail-hero">
            <img src={data.image} alt={`${data.title} hero`} />
            <div className="panel">
              <h2 style={{ marginTop: 0 }}>{data.title}</h2>
              <p style={{ color: 'var(--color-text-muted)' }}>{data.description}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                <span className="badge">🍽 {data.cuisine}</span>
                <span className="badge">⏱ {data.time}</span>
                <span className="badge">⭐ {data.rating}</span>
                <span className="badge">🔥 {data.calories} cal</span>
                {data.dietary.map((d) => (
                  <span className="badge" key={d}>🏷 {d}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
            <section className="panel" aria-labelledby="ingredients">
              <h3 id="ingredients">Ingredients</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {data.ingredients.map((ing) => {
                  const idc = `ing-${ing.name}`;
                  return (
                    <li key={ing.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                      <input
                        id={idc}
                        type="checkbox"
                        checked={!!checked[ing.name]}
                        onChange={() => toggle(ing.name)}
                        aria-labelledby={`${idc}-label`}
                      />
                      <label id={`${idc}-label`} htmlFor={idc}>
                        {ing.name} {ing.amount ? <span style={{ color: 'var(--color-text-muted)' }}>• {ing.amount}</span> : null}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="panel" aria-labelledby="steps">
              <h3 id="steps">Method</h3>
              <ol>
                {data.steps.map((s, i) => (
                  <li key={i} style={{ padding: '8px 0' }}>{s}</li>
                ))}
              </ol>
            </section>
          </div>

          <section className="panel" style={{ marginTop: 20 }} aria-labelledby="nutrition">
            <h3 id="nutrition">Nutrition</h3>
            <table className="nutrition">
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {data.nutrition.map((n) => (
                  <tr key={n.label}>
                    <td>{n.label}</td>
                    <td>{n.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  );
}
