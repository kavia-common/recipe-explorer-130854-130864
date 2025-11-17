import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import RecipeCard from '../components/RecipeCard';
import { api } from '../services/api';

const PAGE_SIZE = 12;

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page rendering sidebar and recipe grid with basic pagination and loading/error states. */
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [cuisine, setCuisine] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const url = new URL(window.location.href);
    const qp = url.searchParams.get('q') || '';
    const cu = url.searchParams.get('cuisine') || undefined;
    const tg = (url.searchParams.get('tags') || '').split(',').filter(Boolean);
    const pg = parseInt(url.searchParams.get('page') || '1', 10);
    setQ(qp);
    setCuisine(cu);
    setTags(tg);
    setPage(pg);
  }, [window.location.search]);

  const info = useMemo(() => {
    const showingStart = (page - 1) * PAGE_SIZE + 1;
    const showingEnd = Math.min(page * PAGE_SIZE, total);
    return { showingStart, showingEnd };
  }, [page, total]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(undefined);
      try {
        const res = await api.fetchRecipes({
          q,
          cuisine,
          tags,
          page,
          limit: PAGE_SIZE,
        });
        if (!cancelled) {
          setRecipes(res.items);
          setTotal(res.total);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || 'Failed to load recipes');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [q, cuisine, tags, page]);

  function changePage(next) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', String(next));
    window.history.pushState({}, '', url.toString());
    setPage(next);
  }

  return (
    <div className="container layout">
      <Sidebar />
      <main className="main">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <div className="helpers">
            <strong>Recipes</strong>
            <span>•</span>
            <span>Showing {info.showingStart}-{info.showingEnd} of {total}</span>
          </div>
          <div className="helpers" aria-live="polite">
            {loading && <span className="loading">Loading…</span>}
            {error && <span className="error">Error: {error}</span>}
          </div>
        </div>

        <section className="grid" aria-live="polite">
          {recipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </section>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, gap: 8 }}>
          <button className="button ghost" disabled={page <= 1} onClick={() => changePage(page - 1)}>
            Previous
          </button>
          <button className="button" disabled={page * PAGE_SIZE >= total} onClick={() => changePage(page + 1)}>
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
