import { useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';

type SectionItem = {
  id: string;
  label: string;
};

const sections: SectionItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about-me', label: 'About' },
  { id: 'vision-mission', label: 'Vision' },
  { id: 'projects', label: 'Projects' },
  { id: 'why-nexatech', label: 'Why' },
  { id: 'tech-stack', label: 'Stack' },
  { id: 'members', label: 'Members' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'contact', label: 'Contact' },
];

export const SidebarNav = () => {
  const ids = useMemo(() => sections.map((s) => s.id), []);
  const [active, setActive] = useState<string>('home');
  const others = useMemo(() => sections.filter((s) => s.id !== 'home'), []);
  const [progress, setProgress] = useState(0); // 0..100 along the full section span (excluding home)

  useEffect(() => {
    const opts: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };
    const ratios: Record<string, number> = {};

    const handler: IntersectionObserverCallback = (entries) => {
      for (const e of entries) {
        const id = e.target.id;
        if (!ids.includes(id)) continue;
        ratios[id] = e.intersectionRatio;
      }
      let best: { id: string; ratio: number } | null = null;
      for (const id of ids) {
        const r = ratios[id] ?? 0;
        if (r > 0 && (!best || r > best.ratio)) best = { id, ratio: r };
      }
      if (best) setActive(best.id);

      // update scroll progress along first..last non-home section
      const firstId = others[0]?.id;
      const lastId = others[others.length - 1]?.id;
      const firstEl = firstId ? document.getElementById(firstId) : null;
      const lastEl = lastId ? document.getElementById(lastId) : null;
      if (firstEl && lastEl) {
        const firstTop = firstEl.getBoundingClientRect().top + window.scrollY;
        const lastBottom = lastEl.getBoundingClientRect().bottom + window.scrollY;
        const total = Math.max(1, lastBottom - firstTop);
        const y = window.scrollY + window.innerHeight / 2; // use viewport middle as reference
        const pct = Math.min(100, Math.max(0, ((y - firstTop) / total) * 100));
        setProgress(pct);
      }
    };

    const io = new IntersectionObserver(handler, opts);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    // initialize from hash
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
    if (hash && ids.includes(hash)) setActive(hash);

    return () => io.disconnect();
  }, [ids]);

  const handleClick = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Hide the sidebar while on Home
  const hidden = active === 'home';
  if (hidden) return null;

  // Positions for dots along the rail (evenly spaced)
  const dotPositions = others.map((_, i) => (others.length > 1 ? (i / (others.length - 1)) * 100 : 0));

  return (
    <nav className="sidebar-nav line" aria-label="Section navigation">
      <div className="rail">
        <div className="thumb" style={{ top: `${progress}%` }} />
      </div>
      <ul className="dots">
        {others.map((s, i) => (
          <li key={s.id} style={{ top: `${dotPositions[i]}%` }}>
            <a
              href={`/#${s.id}`}
              onClick={handleClick(s.id)}
              className={active === s.id ? 'active' : ''}
              aria-label={s.label}
              aria-current={active === s.id ? 'true' : undefined}
            >
              <span className="dot" />
              <span className="label">{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
