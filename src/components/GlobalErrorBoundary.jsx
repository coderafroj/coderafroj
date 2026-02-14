import React from 'react';

class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("CRITICAL APP ERROR:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center">
                    <div className="max-w-md space-y-6">
                        <h1 className="text-4xl font-black text-white uppercase italic">System Stabilized</h1>
                        <p className="text-slate-400 font-light">
                            A momentary glitch was detected. We've paused to protect your session.
                        </p>
                        {this.state.error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
                                <p className="text-red-500 font-mono text-[10px] uppercase tracking-wider">Error Insight</p>
                                <p className="text-red-400 text-xs mt-1 font-mono">{this.state.error.message}</p>
                            </div>
                        )}
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full hover:scale-105 transition-all"
                        >
                            Resume Session
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
