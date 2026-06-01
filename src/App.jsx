import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './App.css'
import Header from './components/Header'
import ChatModal from './components/ChatModal'
import SocialIcon from './components/SocialIcon'
import { socialLinks } from './data/socialLinks'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import EventsPage from './pages/EventsPage'
import ContactPage from './pages/ContactPage'

function AppContent({ showChat, setShowChat, showFollowMenu, setShowFollowMenu }) {
  const location = useLocation()

  return (
    <div className="app">
      {location.pathname === '/' && <Header onChatClick={() => setShowChat(true)} />}

      <Routes>
        <Route path="/" element={<HomePage onChatClick={() => setShowChat(true)} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/contact" element={<ContactPage onChatClick={() => setShowChat(true)} />} />
      </Routes>

      <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} />

      {/* Follow Button and Menu */}
      <div className={`follow-menu ${showFollowMenu ? 'open' : ''}`}>
        <button className="follow-btn" onClick={() => setShowFollowMenu(!showFollowMenu)} title="Follow Us">
          <img src="/follow-icon.png" alt="Follow" />
        </button>
        {showFollowMenu && (
          <div className="follow-links">
            {socialLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="follow-link" title={link.label}>
                <SocialIcon type={link.type} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  const [showChat, setShowChat] = useState(false)
  const [showFollowMenu, setShowFollowMenu] = useState(false)

  return (
    <Router>
      <AppContent showChat={showChat} setShowChat={setShowChat} showFollowMenu={showFollowMenu} setShowFollowMenu={setShowFollowMenu} />
      <Analytics />
    </Router>
  )
}

export default App
