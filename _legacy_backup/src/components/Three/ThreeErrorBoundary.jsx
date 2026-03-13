import React from 'react';

class ThreeErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Suppress and handle WebGL context lost or creation errors
        if (error.message?.includes('WebGL') || error.message?.includes('context')) {
            console.warn("Switching to Static Mode: WebGL failure detected.");
        } else {
            console.warn("Three.js Rendering Error:", error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.fallback || (
                <div className="w-full h-full flex items-center justify-center bg-[#02040a] relative overflow-hidden">
                    {/* Subtle CSS animation as fallback */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-pulse" />
                    <div className="coderafroj-grid opacity-10" />
                    {this.props.showPlaceholder && (
                        <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">
                            System_Link_Static_Mode
                        </div>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ThreeErrorBoundary;
