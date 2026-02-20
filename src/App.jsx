import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GitHubProvider } from './context/GitHubContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';
import { AnimatePresence, motion } from 'framer-motion';

// Lazy Load Heavy 3D & Layout Components
const IntroScene = lazy(() => import('./components/layout/IntroScene'));

// Lazy Load Pages - Core
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const TutorialHub = lazy(() => import('./pages/TutorialHub'));
const TutorialViewer = lazy(() => import('./pages/TutorialViewer'));

// Lazy Load Pages - Admin & Editors (Micro Frontend Candidates)
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const NoteEditor = lazy(() => import('./pages/NoteEditor'));
const NotesAdmin = lazy(() => import('./pages/Admin/NotesAdmin'));
const UltimateEditor = lazy(() => import('./pages/Admin/UltimateEditor'));

// Lazy Load Pages - Auth & User
const Register = lazy(() => import('./pages/Register'));
const GitHubDashboard = lazy(() => import('./pages/GitHubDashboard'));
const Contact = lazy(() => import('./pages/Contact'));
const DesignViewer = lazy(() => import('./pages/DesignViewer'));

import MobileTabBar from './components/layout/MobileTabBar';

// Lazy Load Pages - Learning System
const CourseIndex = lazy(() => import('./pages/Learn/CourseIndex'));
const NotesLayout = lazy(() => import('./pages/Learn/NotesLayout'));
const TopicPage = lazy(() => import('./pages/Learn/TopicPage'));
const GeneratedTutorialViewer = lazy(() => import('./pages/Learn/GeneratedTutorialViewer'));
const PremiumTutorialViewer = lazy(() => import('./pages/Learn/PremiumTutorialViewer'));

import './App.css';

import { Toaster } from 'sonner';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isSpecialModule = location.pathname.startsWith('/github') ||
    location.pathname.startsWith('/learn') ||
    location.pathname.startsWith('/premium-tutorial');
  const hideGlobalUI = isAdmin || isSpecialModule;

  // Only show intro once per session
  const [showIntro, setShowIntro] = React.useState(() => {
    return !sessionStorage.getItem('intro_played');
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('intro_played', 'true');
  };

  return (
    <GlobalErrorBoundary>
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
            {showIntro && (
              <Suspense fallback={null}>
                <IntroScene onComplete={handleIntroComplete} />
              </Suspense>
            )}
          </AnimatePresence>

          <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Cyber-Coderafroj Background Architecture */}
            {!isAdmin && (
              <div className="coderafroj-bg">
                <div className="coderafroj-grid" />
                <div className="coderafroj-mesh" />
              </div>
            )}

            {!hideGlobalUI && <Navbar />}
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
                  <Suspense fallback={
                    <div className="flex items-center justify-center min-h-[50vh] text-sky-500 font-mono tracking-widest text-xs animate-pulse">
                      INITIALIZING MODULE...
                    </div>
                  }>
                    <Routes location={location} key={location.pathname}>
                      <Route path="/" element={<Home />} />
                      <Route path="/widgets" element={<Projects />} />
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
                      <Route path="/ai-tutorial/:slug" element={<GeneratedTutorialViewer />} />
                      <Route path="/premium-tutorial/:slug" element={<PremiumTutorialViewer />} />
                    </Routes>
                  </Suspense>
                </motion.div>
              </AnimatePresence>
            </main>
            {!hideGlobalUI && <Footer />}
            {!hideGlobalUI && <MobileTabBar />}
          </div>
        </GitHubProvider>
      </HelmetProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
