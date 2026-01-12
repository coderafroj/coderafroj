import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { LogOut, Plus, LayoutDashboard, FileText, Book, Layers, Terminal, Eye, Edit3, Sparkles, Code, PlusCircle, Bold, Italic, Link as LinkIcon, Image as ImageIcon, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const Admin = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('notes');
    const [previewMode, setPreviewMode] = useState(false); // For split-view toggle
    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Form State
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState('');
    const [link, setLink] = useState('');
    const [submitStatus, setSubmitStatus] = useState('');
    const [category, setCategory] = useState('Programming');
    const [content, setContent] = useState('');
    const [tutorialId, setTutorialId] = useState('');
    const [order, setOrder] = useState('0');
    const [tutorials, setTutorials] = useState([]);
    const [projects, setProjects] = useState([]);
    const [posts, setPosts] = useState([]);
    const [notes, setNotes] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const fetchData = async () => {
        const tSnap = await getDocs(collection(db, 'tutorials'));
        setTutorials(tSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        const pSnap = await getDocs(collection(db, 'projects'));
        setProjects(pSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        const postSnap = await getDocs(collection(db, 'posts'));
        setPosts(postSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        const notesSnap = await getDocs(collection(db, 'notes'));
        setNotes(notesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser && currentUser.email === 'coderafroj@gmail.com') {
                setUser(currentUser);
                fetchData();
            } else {
                signOut(auth);
                navigate('/login');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);

    const deleteItem = async (col, id) => {
        if (!window.confirm("Terminate this artifact from the nexus?")) return;
        try {
            const { deleteDoc, doc } = await import('firebase/firestore');
            await deleteDoc(doc(db, col, id));
            setSubmitStatus('TERMINATED');
            fetchData();
            setTimeout(() => setSubmitStatus(''), 3000);
        } catch (err) {
            setSubmitStatus('ERROR');
        }
    };

    const editItem = async (item, col) => {
        setEditMode(true);
        setEditingId(item.id);
        setTitle(item.title || '');
        setDesc(item.description || '');
        setImage(item.image || '');
        setTags(item.tags?.join(', ') || '');
        setLink(item.link || '');
        setContent(item.content || '');
        setCategory(item.category || 'Programming');
        
        // Set active tab based on collection
        if (col === 'notes') setActiveTab('notes');
        else if (col === 'projects') setActiveTab('project');
        else if (col === 'posts') setActiveTab('blog');
        else if (col === 'tutorials') setActiveTab('tutorial');
    };

    const cancelEdit = () => {
        setEditMode(false);
        setEditingId(null);
        setTitle('');
        setDesc('');
        setImage('');
        setTags('');
        setLink('');
        setContent('');
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setSubmitStatus(editMode ? 'UPDATING...' : 'SYNCING...');
        try {
            const { updateDoc, doc: firestoreDoc } = await import('firebase/firestore');
            
            if (editMode && editingId) {
                // Update existing item
                let collectionName = '';
                if (activeTab === 'notes') collectionName = 'notes';
                else if (activeTab === 'project') collectionName = 'projects';
                else if (activeTab === 'blog') collectionName = 'posts';
                else if (activeTab === 'tutorial') collectionName = 'tutorials';
                else if (activeTab === 'chapter') collectionName = 'chapters';

                const docRef = firestoreDoc(db, collectionName, editingId);
                const updateData = {};
                
                if (activeTab === 'notes') {
                    updateData.title = title;
                    updateData.description = desc;
                    updateData.content = content;
                    updateData.image = image;
                    updateData.tags = tags.split(',').map(t => t.trim());
                    updateData.updatedAt = new Date();
                } else if (activeTab === 'project') {
                    updateData.title = title;
                    updateData.description = desc;
                    updateData.image = image;
                    updateData.tags = tags.split(',').map(t => t.trim());
                    updateData.link = link;
                    updateData.updatedAt = new Date();
                } else if (activeTab === 'blog') {
                    updateData.title = title;
                    updateData.description = desc;
                    updateData.image = image;
                    updateData.tags = tags.split(',').map(t => t.trim());
                    updateData.updatedAt = new Date();
                } else if (activeTab === 'tutorial') {
                    updateData.title = title;
                    updateData.description = desc;
                    updateData.category = category;
                    updateData.updatedAt = new Date();
                }

                await updateDoc(docRef, updateData);
                setSubmitStatus('UPDATED');
                cancelEdit();
            } else {
                // Create new item
                if (activeTab === 'notes') {
                    await addDoc(collection(db, 'notes'), {
                        title,
                        description: desc,
                        content,
                        image,
                        tags: tags.split(',').map(t => t.trim()),
                        createdAt: new Date()
                    });
                } else if (activeTab === 'project') {
                    await addDoc(collection(db, 'projects'), {
                        title, description: desc, image, tags: tags.split(',').map(t => t.trim()), link, date: new Date().toLocaleDateString(), createdAt: new Date()
                    });
                } else if (activeTab === 'blog') {
                    await addDoc(collection(db, 'posts'), {
                        title, description: desc, image, tags: tags.split(',').map(t => t.trim()), createdAt: new Date()
                    });
                } else if (activeTab === 'tutorial') {
                    await addDoc(collection(db, 'tutorials'), {
                        title, description: desc, category, chapterCount: 0, createdAt: new Date()
                    });
                } else if (activeTab === 'chapter') {
                    if (!tutorialId) throw new Error("Select Target Module");
                    await addDoc(collection(db, 'chapters'), {
                        tutorialId, title, content, order: parseInt(order), createdAt: new Date()
                    });
                }
                setSubmitStatus('DEPLOYED');
            }
            
            await fetchData();
            setTitle(''); setDesc(''); setTags(''); setContent(''); setLink(''); setImage('');
            setTimeout(() => setSubmitStatus(''), 3000);
        } catch (err) {
            setSubmitStatus(`FAILED: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-primary-glow font-mono animate-pulse tracking-widest">BOOTING NEXUS_OS...</div>
        </div>
    );

    return (
        <div className="min-h-screen pt-24 px-6 pb-20">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/5 pb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                                <Sparkles size={16} className="text-primary-glow" />
                            </div>
                            <h1 className="text-4xl font-black text-white tracking-tighter">CODERAFROJ CONTROL</h1>
                        </div>
                        <p className="text-dim-text font-mono text-[10px] tracking-[0.2em] uppercase opacity-60">Admin Session: {user?.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block obsidian-card px-4 py-2 rounded-xl text-[10px] font-mono text-dim-text">
                            STATUS: <span className="text-primary-glow">SECURE_LINK_ACTIVE</span>
                        </div>
                        <Button variant="danger" onClick={handleLogout} className="px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest">
                            <LogOut size={16} /> DISCONNECT
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Sidebar Nav */}
                    <nav className="lg:col-span-2 space-y-3">
                        {[
                            { id: 'notes', icon: <FileText size={18} />, label: 'NOTES' },
                            { id: 'project', icon: <Terminal size={18} />, label: 'PROJECTS' },
                            { id: 'blog', icon: <Sparkles size={18} />, label: 'BLOG' },
                            { id: 'tutorial', icon: <Book size={18} />, label: 'MODULES' },
                            { id: 'chapter', icon: <Layers size={18} />, label: 'CONTENT' },
                            { id: 'manage', icon: <LayoutDashboard size={18} />, label: 'REGISTRY' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-4 transition-all duration-500 border group ${activeTab === tab.id ? 'bg-primary/10 border-primary/30 text-white shadow-[0_0_20px_rgba(99,102,241,0.1)]' : 'border-transparent text-dim-text hover:bg-white/5 hover:text-white'}`}
                            >
                                <span className={`${activeTab === tab.id ? 'text-primary-glow' : 'group-hover:text-primary-glow'} transition-colors`}>{tab.icon}</span>
                                <span className="text-[10px] font-mono tracking-widest font-bold">{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Main Workspace */}
                    <main className="lg:col-span-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                                className="obsidian-card p-10 rounded-[2.5rem] relative overflow-hidden"
                            >
                                {activeTab === 'manage' ? (
                                    <div className="space-y-16">
                                        <header>
                                            <h2 className="text-3xl font-black text-white tracking-tight mb-2 uppercase">Central registry</h2>
                                            <p className="text-dim-text text-sm">Managing all deployed digital assets across the nexus.</p>
                                        </header>

                                        {[
                                            { title: 'CODERAFROJ NOTES', data: notes, col: 'notes', theme: 'primary' },
                                            { title: 'PROJECT PROTOCOLS', data: projects, col: 'projects', theme: 'secondary' },
                                            { title: 'TRANSMISSIONS', data: posts, col: 'posts', theme: 'accent' },
                                            { title: 'KNOWLEDGE MODULES', data: tutorials, col: 'tutorials', theme: 'primary' }
                                        ].map((sec, i) => (
                                            <section key={i} className="space-y-6">
                                                <h3 className={`text-[10px] font-mono tracking-[0.4em] uppercase text-${sec.theme}-glow`}>{sec.title}</h3>
                                                <div className="grid gap-3">
                                                    {sec.data.map(item => (
                                                        <div key={item.id} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-${sec.theme}-glow`}><Sparkles size={18} /></div>
                                                                <p className="text-white font-bold tracking-tight">{item.title}</p>
                                                            </div>
                                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button onClick={() => editItem(item, sec.col)} className="p-3 text-primary/50 hover:text-primary hover:bg-primary/10 rounded-xl transition-all">
                                                                    <Edit3 size={18} />
                                                                </button>
                                                                <button onClick={() => deleteItem(sec.col, item.id)} className="p-3 text-red-500/30 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                                                                    <LogOut size={18} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        ))}
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-10">
                                        <header className="flex justify-between items-end">
                                            <div>
                                                <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
                                                    {editMode ? 'Edit ' : ''}
                                                    {activeTab === 'notes' ? 'CODERAFROJ Note' : activeTab === 'project' ? 'Deploy Project' : activeTab === 'blog' ? 'Publish log' : activeTab === 'tutorial' ? 'Create Module' : 'Compose Content'}
                                                </h2>
                                                <p className="text-dim-text text-sm mt-1">{editMode ? 'Updating existing artifact...' : 'Initializing artifact sequence...'}</p>
                                            </div>
                                            {activeTab === 'chapter' && (
                                                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                                                    <button type="button" onClick={() => setPreviewMode(false)} className={`px-4 py-2 rounded-lg text-[10px] font-mono tracking-widest transition-all ${!previewMode ? 'bg-primary text-white shadow-lg' : 'text-dim-text hover:text-white'}`}><Edit3 size={14} className="inline mr-2" /> EDITOR</button>
                                                    <button type="button" onClick={() => setPreviewMode(true)} className={`px-4 py-2 rounded-lg text-[10px] font-mono tracking-widest transition-all ${previewMode ? 'bg-primary text-white shadow-lg' : 'text-dim-text hover:text-white'}`}><Eye size={14} className="inline mr-2" /> PREVIEW</button>
                                                </div>
                                            )}
                                        </header>

                                        <div className="grid gap-8">
                                            {(activeTab !== 'manage') && (
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">ENTITY_TITLE</label>
                                                    <Input value={title} onChange={e => setTitle(e.target.value)} required placeholder="SEQUENCE_NAME_V1" className="bg-white/5 border-white/10 p-5 rounded-2xl focus:border-primary/50 text-lg font-bold" />
                                                </div>
                                            )}

                                            {activeTab === 'notes' && (
                                                <>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">IMAGE_URL (Optional)</label>
                                                        <Input value={image} onChange={e => setImage(e.target.value)} placeholder="https://example.com/image.jpg" className="bg-white/5 border-white/10 p-5 rounded-2xl" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">DESCRIPTION</label>
                                                        <Textarea value={desc} onChange={e => setDesc(e.target.value)} required rows={3} placeholder="Brief summary..." className="bg-white/5 border-white/10 p-5 rounded-2xl" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">TAGS (comma separated)</label>
                                                        <Input value={tags} onChange={e => setTags(e.target.value)} placeholder="React, JavaScript, Tutorial" className="bg-white/5 border-white/10 p-5 rounded-2xl" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase flex justify-between items-center">
                                                            <span>CONTENT (Markdown Supported)</span>
                                                            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                                                                <button type="button" onClick={() => setPreviewMode(false)} className={`px-3 py-1 rounded-lg text-[9px] font-mono tracking-widest transition-all ${!previewMode ? 'bg-primary text-white' : 'text-dim-text hover:text-white'}`}><Edit3 size={12} className="inline mr-1" /> EDIT</button>
                                                                <button type="button" onClick={() => setPreviewMode(true)} className={`px-3 py-1 rounded-lg text-[9px] font-mono tracking-widest transition-all ${previewMode ? 'bg-primary text-white' : 'text-dim-text hover:text-white'}`}><Eye size={12} className="inline mr-1" /> PREVIEW</button>
                                                            </div>
                                                        </label>
                                                        {previewMode ? (
                                                            <div className="obsidian-card p-10 rounded-3xl border-white/10 min-h-[400px] overflow-y-auto nexus-markdown">
                                                                <ReactMarkdown className="markdown-content prose prose-invert max-w-none">
                                                                    {content || "*CONTENT_EMPTY*"}
                                                                </ReactMarkdown>
                                                            </div>
                                                        ) : (
                                                            <div className="space-y-4">
                                                                <div className="flex gap-2 p-2 bg-white/5 rounded-2xl border border-white/5">
                                                                    {[
                                                                        { icon: <Bold size={16} />, prefix: '**', suffix: '**', label: 'Bold' },
                                                                        { icon: <Italic size={16} />, prefix: '_', suffix: '_', label: 'Italic' },
                                                                        { icon: <LinkIcon size={16} />, prefix: '[', suffix: '](url)', label: 'Link' },
                                                                        { icon: <ImageIcon size={16} />, prefix: '![alt](', suffix: ')', label: 'Image' },
                                                                        { icon: <Code2 size={16} />, prefix: '```\n', suffix: '\n```', label: 'Code' },
                                                                    ].map((tool, i) => (
                                                                        <button
                                                                            key={i}
                                                                            type="button"
                                                                            title={tool.label}
                                                                            onClick={() => setContent(prev => prev + tool.prefix + tool.suffix)}
                                                                            className="p-3 text-dim-text hover:text-primary-glow hover:bg-white/5 rounded-xl transition-all"
                                                                        >
                                                                            {tool.icon}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                                <Textarea value={content} onChange={e => setContent(e.target.value)} required rows={15} placeholder="# Start writing your note in Markdown..." className="bg-white/5 border-white/10 p-10 rounded-3xl focus:border-primary/50 font-mono text-sm leading-relaxed" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            )}

                                            {activeTab === 'tutorial' && (
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">CLASSIFICATION</label>
                                                    <Input value={category} onChange={e => setCategory(e.target.value)} required placeholder="Neural Networks, UX Design..." className="bg-white/5 border-white/10 p-5 rounded-2xl" />
                                                </div>
                                            )}

                                            {activeTab === 'chapter' && (
                                                <div className="grid md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">TARGET_MODULE</label>
                                                        <select value={tutorialId} onChange={e => setTutorialId(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-primary/50 appearance-none cursor-pointer">
                                                            <option value="" disabled className="bg-bg-dark">SELECT_NEXUS_NODE</option>
                                                            {tutorials.map(t => <option key={t.id} value={t.id} className="bg-bg-card">{t.title}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">EXECUTION_ORDER</label>
                                                        <Input type="number" value={order} onChange={e => setOrder(e.target.value)} required className="bg-white/5 border-white/10 p-5 rounded-2xl" />
                                                    </div>
                                                </div>
                                            )}

                                            {activeTab === 'chapter' ? (
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">CORE_CONTENT_MATRIX</label>
                                                    {previewMode ? (
                                                        <div className="obsidian-card p-10 rounded-3xl border-white/10 min-h-[500px] overflow-y-auto nexus-markdown">
                                                            <ReactMarkdown className="markdown-content prose prose-invert max-w-none">
                                                                {content || "*CONTENT_MATRIX_EMPTY*"}
                                                            </ReactMarkdown>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-4">
                                                            <div className="flex gap-2 p-2 bg-white/5 rounded-2xl border border-white/5">
                                                                {[
                                                                    { icon: <Bold size={16} />, prefix: '**', suffix: '**', label: 'Bold' },
                                                                    { icon: <Italic size={16} />, prefix: '_', suffix: '_', label: 'Italic' },
                                                                    { icon: <LinkIcon size={16} />, prefix: '[', suffix: '](url)', label: 'Link' },
                                                                    { icon: <ImageIcon size={16} />, prefix: '![alt](', suffix: ')', label: 'Image' },
                                                                    { icon: <Code2 size={16} />, prefix: '```\n', suffix: '\n```', label: 'Code' },
                                                                ].map((tool, i) => (
                                                                    <button
                                                                        key={i}
                                                                        type="button"
                                                                        title={tool.label}
                                                                        onClick={() => setContent(prev => prev + tool.prefix + tool.suffix)}
                                                                        className="p-3 text-dim-text hover:text-primary-glow hover:bg-white/5 rounded-xl transition-all"
                                                                    >
                                                                        {tool.icon}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            <Textarea value={content} onChange={e => setContent(e.target.value)} required rows={20} placeholder="# START COMPOSING..." className="bg-white/5 border-white/10 p-10 rounded-3xl focus:border-primary/50 font-mono text-sm leading-relaxed" />
                                                        </div>
                                                    )}
                                                </div>
                                            ) : activeTab !== 'notes' && (
                                                <>
                                                    {(activeTab === 'project' || activeTab === 'blog') && (
                                                        <div className="space-y-3">
                                                            <label className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">IMAGE_VECTOR_URL</label>
                                                            <Input value={image} onChange={e => setImage(e.target.value)} placeholder="https://nexus.cdn/vector.png" className="bg-white/5 border-white/10 p-5 rounded-2xl" />
                                                        </div>
                                                    )}
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">DATA_SYNOPSIS</label>
                                                        <Textarea value={desc} onChange={e => setDesc(e.target.value)} required rows={4} placeholder="Protocol summary..." className="bg-white/5 border-white/10 p-5 rounded-2xl" />
                                                    </div>
                                                    {(activeTab === 'project' || activeTab === 'blog') && (
                                                        <div className="space-y-3">
                                                            <label className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">METADATA_TAGS</label>
                                                            <Input value={tags} onChange={e => setTags(e.target.value)} placeholder="AI, WEB3, NEURAL" className="bg-white/5 border-white/10 p-5 rounded-2xl" />
                                                        </div>
                                                    )}
                                                    {activeTab === 'project' && (
                                                        <div className="space-y-3">
                                                            <label className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">LIVE_UPLINK</label>
                                                            <Input value={link} onChange={e => setLink(e.target.value)} placeholder="https://protocol-x.com" className="bg-white/5 border-white/10 p-5 rounded-2xl" />
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        <footer className="pt-10 flex items-center justify-between border-t border-white/5">
                                            <div className="font-mono text-[10px] text-primary-glow font-bold tracking-widest">{submitStatus || 'SYSTEM_READY'}</div>
                                            <div className="flex gap-4">
                                                {editMode && (
                                                    <button type="button" onClick={cancelEdit} className="px-8 py-5 bg-white/5 text-white rounded-2xl font-bold tracking-widest hover:bg-white/10 transition-all">
                                                        CANCEL
                                                    </button>
                                                )}
                                                <button type="submit" disabled={isSubmitting} className="group relative px-12 py-5 bg-primary text-white rounded-2xl font-black tracking-widest hover:scale-[1.05] transition-all disabled:opacity-50 disabled:scale-100 overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                                    <span className="relative z-10 uppercase flex items-center gap-3">
                                                        {isSubmitting ? <Sparkles size={18} className="animate-spin" /> : <Plus size={18} />}
                                                        {isSubmitting ? 'SYNCING...' : editMode ? 'UPDATE' : 'DEPLOY'}
                                                    </span>
                                                </button>
                                            </div>
                                        </footer>
                                    </form>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Admin;

