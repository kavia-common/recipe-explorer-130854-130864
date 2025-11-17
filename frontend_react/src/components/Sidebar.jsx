import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllCuisines, getAllTags } from '../services/mockData';

export default function Sidebar({ initialOpen = true }) {
  /** Sidebar housing search input and filter controls; syncs with URL query params. */
  const [open, setOpen] = useState(initialOpen);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const cuisines = useMemo(() => getAllCuisines(), []);
  const tags = useMemo(() => getAllTags(), []);

  const query = params.get('q') || '';
  const cuisine = params.get('cuisine') || '';
  const urlTags = (params.get('tags') || '').split(',').filter(Boolean);

  const [localQ, setLocalQ] = useState(query);
  useEffect(() => setLocalQ(query), [query]);

  function updateParam(key, value) {
    const p = new URLSearchParams(params);
    if (value && value.length) p.set(key, value);
    else p.delete(key);
    setParams(p, { replace: true });
    navigate({ pathname: '/', search: p.toString() });
  }

  function toggleTag(tag) {
    const set = new Set(urlTags);
    if (set.has(tag)) set.delete(tag);
    else set.add(tag);
    const next = Array.from(set);
    updateParam('tags', next.join(','));
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateParam('q', localQ.trim());
  }

  return (
    <aside className="sidebar" aria-label="Filters">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Search & Filters</h3>
        <button className="button ghost" onClick={() => setOpen(o => !o)} aria-expanded={open}>
          {open ? 'Hide' : 'Show'}
        </button>
      </div>

      {open && (
        <div>
          <form onSubmit={handleSubmit} role="search" aria-label="Recipe search">
            <input
              aria-label="Search recipes"
              className="input"
              placeholder="Search recipes..."
              value={localQ}
              onChange={(e) => {
                const v = e.target.value;
                setLocalQ(v);
                const p = new URLSearchParams(params);
                if (v) p.set('q', v);
                else p.delete('q');
                setParams(p, { replace: true });
              }}
            />
          </form>

          <div className="filter-group">
            <label htmlFor="cuisine">Cuisine</label>
            <select
              id="cuisine"
              className="select"
              value={cuisine}
              onChange={(e) => updateParam('cuisine', e.target.value)}
            >
              <option value="">All</option>
              {cuisines.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <div>Dietary</div>
            <div className="filter-tags">
              {tags.map((t) => {
                const active = urlTags.includes(t);
                return (
                  <button
                    type="button"
                    aria-pressed={active}
                    key={t}
                    className={`tag ${active ? 'active' : ''}`}
                    onClick={() => toggleTag(t)}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
