import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EditorContent } from '@tiptap/react';
import {
    ChevronDown,
    Type,
    Bold,
    Italic,
    Code,
    Image as ImageIcon,
    List,
    ListOrdered,
    Quote,
    Table as TableIcon,
    Link as LinkIcon,
    Undo,
    Redo,
    Smartphone,
    Eye,
    Maximize2,
    AlignCenter,
    AlignLeft,
    AlignRight,
    Palette,
    CheckSquare,
    Highlighter,
    Subscript as SubscriptIcon,
    Superscript as SuperscriptIcon,
    Baseline
} from 'lucide-react';

const ModernEditorTray = ({ isOpen, onClose, editor, topicTitle }) => {
    if (!editor) return null;

    const ToolbarButton = ({ icon: Icon, onClick, active = false, label }) => (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className={`
        p-3 rounded-2xl transition-all haptic-feedback border
        ${active
                    ? 'bg-sky-500 text-black border-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'}
      `}
            title={label}
        >
            <Icon size={20} />
        </motion.button>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                    className="fixed inset-0 bg-[#030014] z-[2500] flex flex-col pt-4"
                >
                    {/* Top Bar / Handle */}
                    <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 border-b border-white/5">
                        <div className="flex items-center gap-3 md:gap-4">
                            <button
                                onClick={onClose}
                                className="p-2 md:p-3 bg-white/5 rounded-xl md:rounded-2xl text-slate-400 hover:text-white transition-colors"
                            >
                                <ChevronDown size={24} />
                            </button>
                            <div>
                                <h2 className="text-xl font-black uppercase italic tracking-tight text-white leading-none">
                                    {topicTitle || 'New Mission'}
                                </h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="status-pulse" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500">Live Workspace</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="word-count-badge">
                                {editor.storage.characterCount.words()} Words
                            </div>
                        </div>
                    </div>

                    {/* Floating Toolbar */}
                    <div className="overflow-x-auto no-scrollbar py-4 md:py-6 px-4 md:px-8 flex items-center gap-2 md:gap-3 border-b border-white/5 bg-slate-900/20 backdrop-blur-xl">
                        <ToolbarButton
                            icon={Bold}
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            active={editor.isActive('bold')}
                            label="Bold"
                        />
                        <ToolbarButton
                            icon={Italic}
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            active={editor.isActive('italic')}
                            label="Italic"
                        />
                        <div className="h-8 w-[1px] bg-white/10 mx-2" />

                        <ToolbarButton
                            icon={Type}
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            active={editor.isActive('heading', { level: 2 })}
                            label="Heading 2"
                        />
                        <ToolbarButton
                            icon={AlignLeft}
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            active={editor.isActive({ textAlign: 'left' })}
                            label="Align Left"
                        />
                        <ToolbarButton
                            icon={AlignCenter}
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            active={editor.isActive({ textAlign: 'center' })}
                            label="Align Center"
                        />
                        <ToolbarButton
                            icon={AlignRight}
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            active={editor.isActive({ textAlign: 'right' })}
                            label="Align Right"
                        />

                        <div className="h-8 w-[1px] bg-white/10 mx-2" />

                        <ToolbarButton
                            icon={Baseline}
                            onClick={() => {
                                const font = window.prompt('Mission Protocol: Enter Font (e.g. "Inter", "Monospace")');
                                if (font) editor.chain().focus().setFontFamily(font).run();
                            }}
                            label="Font Family"
                        />

                        <ToolbarButton
                            icon={Palette}
                            onClick={() => {
                                const color = window.prompt('Mission Protocol: Enter HEX Color (e.g. #3b82f6)');
                                if (color) editor.chain().focus().setColor(color).run();
                            }}
                            active={editor.isActive('textStyle', { color: '#3b82f6' })}
                            label="Text Color"
                        />

                        <div className="flex items-center bg-white/5 rounded-2xl border border-white/5 p-1 gap-1">
                            {[
                                { size: '12px', label: 'XS' },
                                { size: '16px', label: 'SM' },
                                { size: '20px', label: 'MD' },
                                { size: '24px', label: 'LG' },
                                { size: '32px', label: 'XL' },
                                { size: '48px', label: '2XL' },
                            ].map((f) => (
                                <button
                                    key={f.size}
                                    onClick={() => editor.chain().focus().setFontSize(f.size).run()}
                                    className={`px-2 py-1 rounded-xl text-[9px] font-black transition-all ${editor.isActive('textStyle', { fontSize: f.size }) ? 'bg-sky-500 text-black' : 'text-slate-500 hover:text-white'}`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        <ToolbarButton
                            icon={Highlighter}
                            onClick={() => editor.chain().focus().toggleHighlight().run()}
                            active={editor.isActive('highlight')}
                            label="Highlight"
                        />

                        <div className="h-8 w-[1px] bg-white/10 mx-2" />

                        <ToolbarButton
                            icon={SubscriptIcon}
                            onClick={() => editor.chain().focus().toggleSubscript().run()}
                            active={editor.isActive('subscript')}
                            label="Subscript"
                        />

                        <ToolbarButton
                            icon={SuperscriptIcon}
                            onClick={() => editor.chain().focus().toggleSuperscript().run()}
                            active={editor.isActive('superscript')}
                            label="Superscript"
                        />

                        <ToolbarButton
                            icon={Code}
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            active={editor.isActive('codeBlock')}
                            label="Code Block"
                        />
                        <ToolbarButton
                            icon={CheckSquare}
                            onClick={() => editor.chain().focus().toggleTaskList().run()}
                            active={editor.isActive('taskList')}
                            label="Task List"
                        />
                        <ToolbarButton
                            icon={List}
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            active={editor.isActive('bulletList')}
                            label="Bullet List"
                        />
                        <ToolbarButton
                            icon={ListOrdered}
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            active={editor.isActive('orderedList')}
                            label="Ordered List"
                        />
                        <div className="h-8 w-[1px] bg-white/10 mx-2" />
                        <ToolbarButton
                            icon={ImageIcon}
                            onClick={() => {
                                const url = window.prompt('Mission Protocol: Enter Image URL (Suggest < 50KB)');
                                if (url) {
                                    editor.chain().focus().setImage({ src: url }).run();
                                }
                            }}
                            label="Insert Image"
                        />
                        <ToolbarButton
                            icon={LinkIcon}
                            onClick={() => {
                                const url = window.prompt('Mission Protocol: Enter Hyperlink');
                                if (url) editor.chain().focus().setLink({ href: url }).run();
                            }}
                            active={editor.isActive('link')}
                            label="Add Link"
                        />
                        <ToolbarButton
                            icon={TableIcon}
                            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                            label="Insert Table"
                        />
                        <div className="h-8 w-[1px] bg-white/10 mx-2" />
                        <ToolbarButton
                            icon={Undo}
                            onClick={() => editor.chain().focus().undo().run()}
                            label="Undo"
                        />
                        <ToolbarButton
                            icon={Redo}
                            onClick={() => editor.chain().focus().redo().run()}
                            label="Redo"
                        />
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 overflow-y-auto bg-slate-900/10 custom-editor-scrollbar">
                        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
                            <div className="prose prose-invert max-w-none focus:outline-none min-h-[70vh] text-sm md:text-base">
                                <EditorContent editor={editor} />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Context Bar */}
                    <div className="px-8 py-3 bg-slate-950/80 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                            Elite_Protocol: Secure Write Mode
                        </span>
                        <div className="flex items-center gap-4 text-slate-500">
                            <Smartphone size={14} />
                            <Eye size={14} />
                            <Maximize2 size={14} />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModernEditorTray;
