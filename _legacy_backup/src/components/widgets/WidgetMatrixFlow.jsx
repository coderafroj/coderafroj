import React, { useMemo } from 'react';
import ReactFlow, {
    Background,
    Controls,
    Handle,
    Position,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';

const CustomNode = ({ data, isConnectable }) => (
    <div className="obsidian-card !p-4 !rounded-2xl border-primary/20 min-w-[150px] shadow-[0_0_20px_rgba(47,129,247,0.1)]">
        <Handle type="target" position={Position.Top} className="!bg-primary" />
        <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${data.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-primary'}`} />
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{data.category}</span>
        </div>
        <p className="text-[10px] font-black text-white uppercase italic">{data.label}</p>
        <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </div>
);

const nodeTypes = {
    custom: CustomNode,
};

const initialNodes = [
    {
        id: 'core',
        type: 'custom',
        data: { label: 'CODERAFROJ_CORE_OS', category: 'SYSTEM', status: 'active' },
        position: { x: 250, y: 0 }
    },
    {
        id: 'weather',
        type: 'custom',
        data: { label: 'WEATHER_NODE_v1', category: 'DATA', status: 'active' },
        position: { x: 50, y: 150 }
    },
    {
        id: 'crypto',
        type: 'custom',
        data: { label: 'FINANCE_MATRIX', category: 'STREAM', status: 'active' },
        position: { x: 250, y: 150 }
    },
    {
        id: 'system',
        type: 'custom',
        data: { label: 'SYSTEM_PULSE', category: 'KERNEL', status: 'active' },
        position: { x: 450, y: 150 }
    },
    {
        id: 'monetization',
        type: 'custom',
        data: { label: 'PREMIUM_UPLINK', category: 'REVENUE', status: 'active' },
        position: { x: 250, y: 300 }
    },
];

const initialEdges = [
    { id: 'e1-2', source: 'core', target: 'weather', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#2f81f7' } },
    { id: 'e1-3', source: 'core', target: 'crypto', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#2f81f7' } },
    { id: 'e1-4', source: 'core', target: 'system', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#2f81f7' } },
    { id: 'e2-5', source: 'weather', target: 'monetization', animated: true },
    { id: 'e3-5', source: 'crypto', target: 'monetization', animated: true },
    { id: 'e4-5', source: 'system', target: 'monetization', animated: true },
];

export default function WidgetMatrixFlow() {
    return (
        <div className="h-[400px] w-full rounded-[2.5rem] border border-white/5 bg-[#030014]/50 overflow-hidden relative">
            <div className="absolute top-8 left-8 z-10 space-y-2">
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">Matrix_Architecture</h3>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Visualizing Node Connectivity</p>
            </div>

            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                nodeTypes={nodeTypes}
                fitView
                className="coderafroj-flow"
            >
                <Background color="#1d1d1d" gap={20} />
            </ReactFlow>

            <div className="absolute bottom-8 right-8 z-10">
                <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <span className="text-[8px] font-mono text-primary-glow font-bold uppercase tracking-widest">Real-time Logic Mapping</span>
                </div>
            </div>
        </div>
    );
}
