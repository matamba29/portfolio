import React, { useState, useMemo, useCallback } from 'react';
import { ChevronDown, Search, Star, DollarSign, Clock, ShieldCheck, Copy, Check, X, Filter } from 'lucide-react';
import { ErrorBoundary } from './ErrorBoundary.jsx';
import { FragranceWheel } from './FragranceWheel.jsx';
import { initialPerfumes, dupeDatabase, fragranceFamilies, familyForNote } from './data.js';

const StatBar = ({ label, value, max = 10, icon: Icon }) => (
  <div className="flex items-center gap-2">
    <Icon className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
    <span className="text-[11px] text-zinc-500 w-14 shrink-0">{label}</span>
    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-zinc-400 rounded-full"
        style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
      />
    </div>
    <span className="text-[11px] text-zinc-400 w-6 text-right shrink-0">{value}</span>
  </div>
);

const NoteChip = ({ note }) => {
  const family = familyForNote(note);
  return (
    <span
      className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full border"
      style={{
        color: family ? family.color : '#a1a1aa',
        borderColor: family ? `${family.color}55` : '#3f3f46',
        backgroundColor: family ? `${family.color}14` : 'transparent',
      }}
    >
      {note}
    </span>
  );
};

const PerfumeCard = ({ perfume, copiedId, onCopy }) => {
  const dupe = dupeDatabase[perfume.dupe];
  const savings = dupe ? Math.round(((perfume.price - dupe.price) / perfume.price) * 100) : null;
  const accentFamily = perfume.notes.map(familyForNote).find(Boolean);

  return (
    <div
      className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4 hover:border-zinc-700 transition-colors"
      style={accentFamily ? { boxShadow: `inset 3px 0 0 0 ${accentFamily.color}` } : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-medium leading-tight">{perfume.name}</h3>
          <p className="text-zinc-500 text-sm">{perfume.brand} · {perfume.family}</p>
        </div>
        <div className="flex items-center gap-1 text-amber-400 text-sm shrink-0">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          {perfume.popularity}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {perfume.notes.map(n => <NoteChip key={n} note={n} />)}
      </div>

      <div className="flex flex-col gap-1.5">
        <StatBar label="Longevity" value={perfume.longevity} icon={Clock} />
        <StatBar label="Quality" value={perfume.quality} icon={ShieldCheck} />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-zinc-300">
          <DollarSign className="w-4 h-4 text-zinc-500" />{perfume.price}
        </span>
        <span className="text-zinc-500 text-xs">{perfume.gender} · {perfume.skinTypes.join(', ')}</span>
      </div>

      {dupe && (
        <div className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wide text-emerald-400/80 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Budget Dupe
            </span>
            {savings !== null && savings > 0 && (
              <span className="text-[11px] font-medium text-emerald-400">Save {savings}%</span>
            )}
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm text-white truncate">{perfume.dupe}</p>
              <p className="text-xs text-zinc-500">{dupe.brand} · ${dupe.price}</p>
            </div>
            <button
              onClick={() => onCopy(perfume.dupe, perfume.id)}
              className="shrink-0 w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              title="Copy dupe name"
            >
              {copiedId === perfume.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const GENDERS = ['All', 'Male', 'Female', 'Unisex'];
const SORT_OPTIONS = [
  { id: 'popularity', label: 'Popularity' },
  { id: 'priceAsc', label: 'Price: Low to High' },
  { id: 'priceDesc', label: 'Price: High to Low' },
  { id: 'longevity', label: 'Longevity' },
];

const App = () => {
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [hoveredFamily, setHoveredFamily] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleCopy = useCallback((text, id) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (e) {
      // clipboard API unavailable; fail silently
    }
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(current => (current === id ? null : current)), 1500);
  }, []);

  const filteredPerfumes = useMemo(() => {
    const query = search.trim().toLowerCase();
    let list = initialPerfumes.filter(p => {
      const matchesQuery = !query || p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query);
      const matchesGender = gender === 'All' || p.gender === gender || p.gender === 'Unisex';
      const matchesFamily = !hoveredFamily || p.notes.some(n => {
        const f = familyForNote(n);
        return f && f.id === hoveredFamily;
      });
      return matchesQuery && matchesGender && matchesFamily;
    });

    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case 'priceAsc': return a.price - b.price;
        case 'priceDesc': return b.price - a.price;
        case 'longevity': return b.longevity - a.longevity;
        default: return b.popularity - a.popularity;
      }
    });

    return list;
  }, [search, gender, sortBy, hoveredFamily]);

  const activeFamily = hoveredFamily ? fragranceFamilies.find(f => f.id === hoveredFamily) : null;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-zinc-950 text-white">
        <header className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Fragrance Wheel</h1>
          <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
            Explore scent families and find affordable dupes for iconic perfumes. Hover or tap a segment to filter.
          </p>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FragranceWheel onHoverFamily={setHoveredFamily} />
        </div>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search perfumes or brands..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
              />
            </div>

            <div className="flex items-center gap-2">
              {activeFamily && (
                <button
                  onClick={() => setHoveredFamily(null)}
                  className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border"
                  style={{ color: activeFamily.color, borderColor: `${activeFamily.color}55` }}
                >
                  {activeFamily.name} <X className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={() => setShowFilters(s => !s)}
                className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors"
              >
                <Filter className="w-3.5 h-3.5" /> Filters <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-4 mb-6 p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-zinc-500 mb-1.5">Gender</p>
                <div className="flex gap-1.5">
                  {GENDERS.map(g => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                        gender === g ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-zinc-500 mb-1.5">Sort By</p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-600"
                >
                  {SORT_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
                </select>
              </div>
            </div>
          )}

          {filteredPerfumes.length === 0 ? (
            <p className="text-center text-zinc-500 text-sm py-16">No perfumes match your filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPerfumes.map(p => (
                <PerfumeCard key={p.id} perfume={p} copiedId={copiedId} onCopy={handleCopy} />
              ))}
            </div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;
