import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    addEdge,
    useNodesState,
    useEdgesState,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { Article, Category } from '@mui/icons-material';

const TopicNode = ({ data, selected }) => (
    <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`elite-node ${selected ? 'elite-node-active' : ''}`}
    >
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${data.isNew ? 'bg-green-500/20 text-green-500' : 'bg-sky-500/10 text-sky-500'}`}>
                {data.isCourse ? <Category /> : <Article />}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                    {data.category || 'Topic Module'}
                </p>
                <h3 className="text-sm font-bold text-white uppercase italic">
                    {data.label}
                </h3>
            </div>
        </div>
    </motion.div>
);

const nodeTypes = {
    topic: TopicNode,
};

const TopicFlowArea = ({ topics, onTopicSelect, selectedTopic, courseTitle }) => {
    const initialNodes = useMemo(() => {
        const nodes = [
            {
                id: 'course-root',
                type: 'topic',
                position: { x: 250, y: 0 },
                data: { label: courseTitle, isCourse: true, category: 'Root Course' },
            },
            ...topics.map((topic, index) => ({
                id: topic.id,
                type: 'topic',
                position: { x: 250, y: 150 + index * 120 },
                data: { ...topic, label: topic.title },
            })),
        ];
        return nodes;
    }, [topics, courseTitle]);

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
