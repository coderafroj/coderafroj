import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GitHubProvider } from './context/GitHubContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import IntroScene from './components/layout/IntroScene';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';
import { AnimatePresence } from 'framer-motion';




import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import Login from './pages/Login';
import TutorialHub from './pages/TutorialHub';
import TutorialViewer from './pages/TutorialViewer';
import Register from './pages/Register';
import GitHubDashboard from './pages/GitHubDashboard';
import NoteEditor from './pages/NoteEditor';
import Contact from './pages/Contact';
import MobileTabBar from './components/layout/MobileTabBar';
import DesignViewer from './pages/DesignViewer';
import CourseIndex from './pages/Learn/CourseIndex';
import NotesLayout from './pages/Learn/NotesLayout';
import TopicPage from './pages/Learn/TopicPage';
import NotesAdmin from './pages/Admin/NotesAdmin';
import UltimateEditor from './pages/Admin/UltimateEditor';
import './App.css';

import { Toaster } from 'sonner';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Only show intro once per session
  const [showIntro, setShowIntro] = React.useState(() => {
    return !sessionStorage.getItem('intro_played');
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('intro_played', 'true');
  };

  return (
    <HelmetProvider>
      <GitHubProvider>
        <Toaster
          position="top-right"
          expand={false}
          richColors
          closeButton
          theme="dark"
          toastOptions={{
            style: {
              background: 'rgba(10, 10, 20, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              fontFamily: '"Outfit", sans-serif',
              fontSize: '12px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }
          }}
        />
        <AnimatePresence mode="wait">
          {showIntro && <IntroScene onComplete={handleIntroComplete} />}
        </AnimatePresence>

        <div className="min-h-screen flex flex-col relative overflow-hidden">
          {/* Cyber-Coderafroj Background Architecture */}
          {!isAdmin && (
            <div className="coderafroj-bg">
              <div className="coderafroj-grid" />
              <div className="coderafroj-mesh" />
            </div>
          )}

          {!isAdmin && <Navbar />}
          <main className="flex-grow relative z-10 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 1.005 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex-grow flex flex-col"
              >
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/notes" element={<TutorialHub />} />
                  <Route path="/notes/:tutorialId" element={<TutorialViewer />} />
                  <Route path="/tutorial/:tutorialId" element={<TutorialViewer />} />
                  <Route path="/tutorial/:tutorialId/:chapterId" element={<TutorialViewer />} />

                  {/* Legacy Admin Routes */}
                  <Route path="/admin/notes/new" element={<NoteEditor />} />
                  <Route path="/admin/notes/edit/:id" element={<NoteEditor />} />
                  <Route path="/admin/notes" element={<UltimateEditor />} />
                  <Route path="/admin" element={<UltimateEditor />} />
                  <Route path="/login" element={<Login />} />

                  {/* Register & Auth */}
                  <Route path="/register" element={<Register />} />
                  <Route path="/github" element={<GitHubDashboard />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/design/:id" element={<DesignViewer />} />

                  {/* New Learning System Routes */}
                  <Route path="/learn" element={<CourseIndex />} />
                  <Route path="/learn/:courseId" element={<NotesLayout />}>
                    <Route path=":topicSlug" element={<TopicPage />} />
                  </Route>
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
          {!isAdmin && <Footer />}
          {!isAdmin && <MobileTabBar />}
        </div>
      </GitHubProvider>
    </HelmetProvider>
  );
}

export default App;
