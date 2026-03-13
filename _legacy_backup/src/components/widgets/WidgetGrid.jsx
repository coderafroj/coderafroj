import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import WidgetWrapper from './WidgetWrapper';
import EliteWeather from './library/EliteWeather';
import CyberQuotes from './library/CyberQuotes';
import SystemPulse from './library/SystemPulse';
import GitHubPulse from './library/GitHubPulse';
import StockTicker from './library/StockTicker';
import PomodoroTimer from './library/PomodoroTimer';
import TaskNode from './library/TaskNode';
import NetMatrix from './library/NetMatrix';
import NewsNode from './library/NewsNode';
import CurrencyNode from './library/CurrencyNode';
import DevLibrary from './library/DevLibrary';

const WIDGETS_CONFIG = [
    { id: 'dev-library', title: 'Knowledge_Hub_AI', category: 'LEARN', component: <DevLibrary />, isLocked: false },
    { id: 'weather', title: 'Weather_Node_v1', category: 'ATMOS', component: <EliteWeather />, isLocked: false },
    { id: 'quotes', title: 'Quote_Streamer', category: 'DATA', component: <CyberQuotes />, isLocked: false },
    { id: 'pulse', title: 'System_Pulse', category: 'KERNEL', component: <SystemPulse />, isLocked: false },
    { id: 'github', title: 'GitHub_Matrix', category: 'UPLINK', component: <GitHubPulse />, isLocked: true },
    { id: 'stocks', title: 'Finance_Ticker', category: 'MARKET', component: <StockTicker />, isLocked: true },
    { id: 'pomodoro', title: 'Pomodoro_Core', category: 'FLOW', component: <PomodoroTimer />, isLocked: true },
    { id: 'tasks', title: 'Task_Registry', category: 'NODE', component: <TaskNode />, isLocked: true },
    { id: 'network', title: 'Net_Matrix_v6', category: 'SIGNAL', component: <NetMatrix />, isLocked: true },
    { id: 'news', title: 'Global_News_Feed', category: 'ARCHIVE', component: <NewsNode />, isLocked: true },
    { id: 'currency', title: 'Currency_Node', category: 'FOREX', component: <CurrencyNode />, isLocked: true },
];

export default function WidgetGrid({ onUnlock }) {
    const [items, setItems] = useState(WIDGETS_CONFIG);

    return (
        <Reorder.Group
            axis="y"
            values={items}
            onReorder={setItems}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {items.map((item) => (
                <Reorder.Item
                    key={item.id}
                    value={item}
                    className="relative"
                >
                    <WidgetWrapper
                        title={item.title}
                        category={item.category}
                        isLocked={item.isLocked}
                        onUnlock={() => onUnlock(item.title)}
                    >
                        {/* Drag Handle */}
                        <div className="absolute top-4 right-16 z-50 cursor-grab active:cursor-grabbing opacity-20 hover:opacity-100 transition-opacity">
                            <GripVertical size={16} className="text-slate-500" />
                        </div>
                        {item.component}
                    </WidgetWrapper>
                </Reorder.Item>
            ))}
        </Reorder.Group>
    );
}
