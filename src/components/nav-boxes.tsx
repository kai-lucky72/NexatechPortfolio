import { useEffect, useMemo, useState } from 'react';
import { FloatingButton } from './floating-button';

type SectionId = 'home' | 'about-me' | 'projects' | 'members' | 'contact';

type Item = { id: SectionId; label: string; href: string; variant: string };

const items: Item[] = [
	{ id: 'home', label: 'Home', href: '/#home', variant: 'variant-purple' },
	{ id: 'about-me', label: 'About Us', href: '/#about-me', variant: 'variant-blue' },
	{ id: 'projects', label: 'Projects', href: '/#projects', variant: 'variant-green' },
	{ id: 'members', label: 'Members', href: '/#members', variant: 'variant-red' },
	{ id: 'contact', label: 'Contact', href: '/#contact', variant: 'variant-grey' },
];

// Fixed positions: Top (Home, About, Members). Bottom (Projects, Contact).
const fixedPos: Record<SectionId, string> = {
    home: 'pos-3',        // centered top
    'about-me': 'pos-1',  // top-left
    members: 'pos-2',     // top-right
    projects: 'pos-5',    // bottom-left
    contact: 'pos-10',    // bottom-right
};

export const NavBoxes = () => {
	const [active, setActive] = useState<SectionId | null>(null);
	const observed = useMemo(() => items.map((i) => i.id), []);

	// Observe sections to hide the currently visible one (among observed only)
	useEffect(() => {
		const opts: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: [0, 0.25, 0.5, 0.75, 1] };
		const ratios: Record<string, number> = {};
		const handler: IntersectionObserverCallback = (entries) => {
			for (const e of entries) {
				const id = e.target.id as SectionId;
				if (!observed.includes(id)) continue;
				ratios[id] = e.intersectionRatio;
			}
			// pick observed id with highest ratio > 0
			let best: { id: SectionId; ratio: number } | null = null;
			for (const id of observed) {
				const r = ratios[id] ?? 0;
				if (r > 0 && (!best || r > best.ratio)) best = { id, ratio: r };
			}
			setActive(best ? best.id : null);
		};
		const io = new IntersectionObserver(handler, opts);
		observed.forEach((id) => {
			const el = document.getElementById(id);
			if (el) io.observe(el);
		});
		// initialize from hash if matches observed
		const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
		if (hash && observed.includes(hash as SectionId)) setActive(hash as SectionId);
		return () => io.disconnect();
	}, [observed]);

	// Fixed positions map
    const posMap = useMemo(() => {
        const map = new Map<SectionId, string>();
        items.forEach((item) => map.set(item.id, fixedPos[item.id]));
        return map;
    }, []);

	return (
		<div className="floating-layer" aria-hidden>
			{items
				.filter((i) => !active || i.id !== active)
				.map((i) => (
					<FloatingButton
						key={i.id}
						label={i.label}
						href={i.href}
						className={`${posMap.get(i.id)} ${i.variant} no-hover`}
					/>
				))}
		</div>
	);
};
