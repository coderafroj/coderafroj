import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    addEdge,
    useNodesState,
    useEdgesState,
    MarkerType,
    Handle,
    Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { Article, Category, Delete } from '@mui/icons-material';

const TopicNode = ({ data, selected }) => (
    <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`elite-node relative group ${selected ? 'elite-node-active animate-pulse-glow shadow-[0_0_20px_rgba(14,165,233,0.3)]' : ''}`}
    >
        <Handle
            type="target"
            position={Position.Top}
            className="!w-2 !h-2 !bg-primary/40 !border-primary/20 hover:!bg-primary transition-colors"
        />

        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl transition-all duration-300 ${selected ? 'bg-primary text-white scale-110' : data.isNew ? 'bg-green-500/20 text-green-500' : 'bg-sky-500/10 text-sky-500 group-hover:bg-sky-500/20'}`}>
                {data.isCourse ? <Category /> : <Article />}
            </div>
            <div className="flex-1">
                <p className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1 transition-colors ${selected ? 'text-primary' : 'text-slate-500'}`}>
                    {data.category || 'Topic Module'}
                </p>
                <h3 className={`text-sm font-bold uppercase italic transition-all ${selected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                    {data.label}
                </h3>
            </div>
            {!data.isCourse && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Are you sure you want to delete "${data.label}"?`)) {
                            data.onDelete?.(data.id);
                        }
                    }}
                    className="p-2 text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                    <Delete fontSize="small" />
                </button>
            )}
        </div>

        <Handle
            type="source"
            position={Position.Bottom}
            className="!w-2 !h-2 !bg-primary/40 !border-primary/20 hover:!bg-primary transition-colors"
        />
    </motion.div>
);

const nodeTypes = {
    topic: TopicNode,
};

const TopicFlowArea = ({ topics, onTopicSelect, onTopicDelete, selectedTopic, courseTitle }) => {
    const initialNodes = useMemo(() => {
        const nodes = [
            {
                id: 'course-root',
                type: 'topic',
                position: { x: 250, y: 0 },
                data: { label: courseTitle, isCourse: true, category: 'Root Course', onDelete: onTopicDelete },
            },
            ...topics.map((topic, index) => ({
                id: topic.id,
                type: 'topic',
                position: { x: 250, y: 150 + index * 120 },
                data: { ...topic, label: topic.title, onDelete: onTopicDelete },
            })),
        ];
        return nodes;
    }, [topics, courseTitle, onTopicDelete]);

    const initialEdges = useMemo(() => {
        return topics.map((topic) => ({
            id: `e-root-${topic.id}`,
            source: 'course-root',
            target: topic.id,
            animated: true,
            style: { stroke: 'rgba(14, 165, 233, 0.2)' },
            markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(14, 165, 233, 0.2)' },
        }));
    }, [topics]);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onSelect = useCallback((event, node) => {
        if (node.id !== 'course-root') {
            onTopicSelect(node.data);
        }
    }, [onTopicSelect]);

    return (
        <div className="w-full h-full bg-[#030014] relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onSelect}
                nodeTypes={nodeTypes}
                fitView
                style={{ background: '#030014' }}
            >
                <Background color="#1e293b" gap={20} />
                <Controls showInteractive={false} className="elite-glass !border-white/5 !bg-slate-900/50" />
                <MiniMap
                    nodeColor="#0ea5e9"
                    maskColor="rgba(3, 0, 20, 0.7)"
                    className="!bg-slate-900/50 !border-white/5"
                />
            </ReactFlow>

            {/* Floating Instructions */}
            <div className="absolute top-10 left-10 z-10 p-4 elite-glass rounded-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-sky-500">
                    Visual Architect
                </p>
                <p className="text-xs text-slate-400 mt-1">
                    Select a node to initialize editor sequence.
                </p>
            </div>
        </div>
    );
};

export default TopicFlowArea;
