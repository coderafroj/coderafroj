import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: '"JetBrains Mono", monospace',
});

const MermaidRenderer = ({ chart }) => {
    const ref = useRef(null);
    const [svg, setSvg] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const renderChart = async () => {
            if (!chart) return;
            try {
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
                setError(null);
            } catch (err) {
                console.error("Mermaid Render Error:", err);
                setError("Invalid Mermaid Syntax");
            }
        };

        renderChart();
    }, [chart]);

    if (error) {
        return (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono">
                {error}
                <pre className="mt-2 text-xs opacity-50">{chart}</pre>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className="mermaid-chart my-8 p-6 bg-[#0d1117] rounded-xl border border-white/5 overflow-x-auto flex justify-center"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};

export default MermaidRenderer;
