import { useCallback, useEffect, useRef, useState } from 'react';

type TSectionTitleProps = {
    title: string;
    subTitle?: string;
};

export const SectionTitle = ({ title, subTitle }: TSectionTitleProps) => {
    const [pop, setPop] = useState(false);
    const cooldownUntil = useRef<number>(0);
    const endTimer = useRef<number | null>(null);
    const COOLDOWN_MS = 5000; // 5 seconds
    const ANIM_MS = 340; // keep in sync with CSS ~320ms + buffer

    const clearTimer = () => {
        if (endTimer.current) {
            window.clearTimeout(endTimer.current);
            endTimer.current = null;
        }
    };

    const triggerPop = useCallback(() => {
        const now = Date.now();
        if (now < cooldownUntil.current) return; // still cooling down
        if (pop) return; // already running
        setPop(true);
        clearTimer();
        endTimer.current = window.setTimeout(() => {
            setPop(false);
            cooldownUntil.current = Date.now() + COOLDOWN_MS; // start cooldown
        }, ANIM_MS);
    }, [pop]);

    // Safety: ensure we always reset pop if CSS ends earlier/later
    const handleAnimationEnd = useCallback(() => {
        if (!pop) return;
        setPop(false);
        cooldownUntil.current = Date.now() + COOLDOWN_MS;
        clearTimer();
    }, [pop]);

    useEffect(() => () => clearTimer(), []);

    return (
        <div
            className={`title${pop ? ' pop' : ''}`}
            onMouseEnter={triggerPop}
            onClick={triggerPop}
            onTouchStart={triggerPop}
            onAnimationEnd={handleAnimationEnd}
        >
            <p className='primary-text'>{title}</p>
            {subTitle && <p className='secondary-text'>{subTitle}</p>}
        </div>
    );
};
