'use client';

import { useState } from 'react';

export default function ExpandableText({ text }: { text: string }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <p className={`${!expanded ? 'line-clamp-2' : ''}`}>{text}</p>
            <button
                onClick={() => setExpanded((prev) => !prev)}
                className="mt-1 text-blue-500 hover:underline text-sm cursor-pointer"
            >
                {expanded ? 'Read less' : 'Read more'}
            </button>
        </div>
    );
}
