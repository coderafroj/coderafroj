import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GitHubProvider } from './context/GitHubContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';




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
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <GitHubProvider>
        <div className="min-h-screen flex flex-col relative overflow-hidden">
          {/* Cyber-Coderafroj Background Architecture */}
          <div className="coderafroj-bg">
            <div className="coderafroj-grid" />
            <div className="coderafroj-mesh" />
          </div>

          <Navbar />
          <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/notes" element={<TutorialHub />} />
              <Route path="/notes/:tutorialId" element={<TutorialViewer />} />
              <Route path="/tutorial/:tutorialId" element={<TutorialViewer />} />
              <Route path="/tutorial/:tutorialId/:chapterId" element={<TutorialViewer />} />

              {/* Legacy Admin Routes - Keeping for now if needed, or can be removed if user wants total cleanup */}
              <Route path="/admin/notes/new" element={<NoteEditor />} />
              <Route path="/admin/notes/edit/:id" element={<NoteEditor />} />
              <Route path="/admin" element={<Admin />} />
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
          </main>
          <Footer />
          <MobileTabBar />
        </div>
      </GitHubProvider>
    </HelmetProvider>
  );
}

export default App;
