import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GitHubProvider } from './context/GitHubContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Tutorials from './pages/Tutorials';
import TutorialView from './pages/TutorialView';
import Register from './pages/Register';
import GitHubDashboard from './pages/GitHubDashboard';
import Notes from './pages/Notes';
import NoteView from './pages/NoteView';
import NoteEditor from './pages/NoteEditor';
import Contact from './pages/Contact';
import MobileTabBar from './components/layout/MobileTabBar';
import DesignViewer from './pages/DesignViewer';
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
              <Route path="/notes" element={<Notes />} />
              <Route path="/notes/:id" element={<NoteView />} />
              <Route path="/admin/notes/new" element={<NoteEditor />} />
              <Route path="/admin/notes/edit/:id" element={<NoteEditor />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/tutorial/:tutorialId/:chapterId" element={<TutorialView />} />
              <Route path="/register" element={<Register />} />
              <Route path="/github" element={<GitHubDashboard />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/design/:id" element={<DesignViewer />} />
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
