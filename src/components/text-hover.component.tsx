import { useCallback, useEffect, useRef, useState } from 'react';

type TTextHoverProps = {
    text: string;
    className?: string;
};

export const TextHover = ({ text, className = '' }: TTextHoverProps) => {
    const [run, setRun] = useState(false);
    const timer = useRef<number | null>(null);
    const ANIM_MS = 480; // keep in sync with CSS animation duration

    const clear = () => {
        if (timer.current) {
            window.clearTimeout(timer.current);
            timer.current = null;
        }
    };

    const trigger = useCallback(() => {
        if (run) return; // prevent overlap during the current run
        setRun(true);
        clear();
        timer.current = window.setTimeout(() => {
            setRun(false); // immediately ready for next trigger
        }, ANIM_MS);
    }, [run]);

    useEffect(() => () => clear(), []);

    return (
        <p
            className={`hover-text ${run ? 'run' : ''} ${className}`.trim()}
            onMouseEnter={trigger}
            onClick={trigger}
            onTouchStart={trigger}
        >
            {Array.from(text).map((char, index) => {
                const isSpace = char === ' ';
                return (
                    <span
                        key={index}
                        className={isSpace ? 'space' : undefined}
                        style={{ ['--delay' as any]: `${0.04 * index}s` }}
                    >
                        {isSpace ? '\u00A0' : char}
                    </span>
                );
            })}
        </p>
    );
};
