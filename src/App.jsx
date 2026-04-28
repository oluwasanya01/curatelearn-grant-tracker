import { useState, useEffect } from 'react'
import './App.css'

const ContactIcon = ({ type }) => {
  switch (type) {
    case 'email':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      )
    case 'phone':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      )
    case 'location':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    default:
      return null
  }
}

const SocialIcon = ({ type }) => {
  switch (type) {
    case 'instagram':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37 z"></path>
          <circle cx="17.5" cy="6.5" r="1.5"></circle>
        </svg>
      )
    case 'tiktok':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
        </svg>
      )
    case 'facebook':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 0 1 2-2h1z"></path>
        </svg>
      )
    case 'youtube':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33 z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      )
    case 'twitter':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 0a9.5 9.5 0 0 0-9-5.6"></path>
        </svg>
      )
    case 'linkedin':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6 z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    default:
      return null
  }
}

function ChatModal({ isOpen, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [chatStarted, setChatStarted] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Esther's AI assistant. Feel free to ask me about brand strategy, content creation, social media, or her amazing projects!",
      sender: 'bot',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleStartChat = (e) => {
    e.preventDefault()
    if (name.trim() && email.trim()) {
      setChatStarted(true)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
    }

    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          system: `You are Esther Nnamah's AI assistant. Esther is a talented Brand Strategist and Content Creator specializing in social media marketing, personal branding, content creation, and digital strategy.

Esther's expertise includes:
- Content Creation (TikTok, Instagram, Facebook)
- Brand Strategy and Development
- Social Media Marketing
- Digital Marketing
- Personal Branding
- Influencer Marketing

Be helpful, friendly, and provide information about Esther's work, expertise, and services. Keep responses concise and professional.`,
          messages: [
            {
              role: 'user',
              content: input,
            },
          ],
        }),
      })

      const data = await response.json()

      if (data.content && data.content[0]) {
        const botMessage = {
          id: messages.length + 2,
          text: data.content[0].text,
          sender: 'bot',
        }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'bot',
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
        <div className="chat-header">
          <h3>Esther's Assistant</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {!chatStarted ? (
          <div className="chat-form-initial">
            <form onSubmit={handleStartChat}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
              />
              <button type="submit" className="start-chat-btn">
                Start Chat
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-message ${msg.sender}`}>
                  <p>{msg.text}</p>
                </div>
              ))}
              {loading && (
                <div className="chat-message bot">
                  <p>Thinking...</p>
                </div>
              )}
            </div>
            <form className="chat-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something..."
                disabled={loading}
              />
              <button type="submit" disabled={loading || !input.trim()}>
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function App() {
  const [showChat, setShowChat] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const socialLinks = [
    { type: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/_esther_nnamah?igsh=MTg5MjNzMjI3YzRwbA==' },
    { type: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@_esther_nnamah?_r=1&_t=ZS-95OBRTDJiR0' },
    { type: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/share/1DdJe5wkrg/' },
    { type: 'twitter', label: 'Twitter', url: '#' },
    { type: 'linkedin', label: 'LinkedIn', url: '#' },
  ]

  const projects = [
    {
      id: 1,
      title: 'Viral TikTok Content #1',
      description: 'Engaging personal branding content that resonates with audience',
      tech: ['TikTok', 'Content Creation', 'Storytelling'],
      videoUrl: 'https://vt.tiktok.com/ZSHwFNJMP/',
    },
    {
      id: 2,
      title: 'Viral TikTok Content #2',
      description: 'Authentic personal brand expression and audience engagement',
      tech: ['TikTok', 'Personal Branding', 'Video Content'],
      videoUrl: 'https://vt.tiktok.com/ZSHwFvB2a/',
    },
    {
      id: 3,
      title: 'Featured Content Campaign',
      description: 'Strategic content creation showcasing brand story and values',
      tech: ['Content Strategy', 'Social Media', 'Engagement'],
      videoUrl: 'https://www.tiktok.com/@_esther_nnamah/video/7609872725556890898',
    },
  ]

  return (
    <div className="app">
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <a href="#" className="logo">E.N</a>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#projects">Portfolio</a>
            <a href="#contact">Contact</a>
            <div className="nav-icons">
              {socialLinks.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="nav-icon" title={link.label}>
                  <SocialIcon type={link.type} />
                </a>
              ))}
            </div>
          </nav>
          <button className="cta-button" onClick={() => setShowChat(true)}>
            <span className="btn-text">Let's Connect</span>
            <svg className="btn-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <img src="/profile.jpg" alt="Esther Nnamah" className="hero-bg-image" />
        <div className="hero-content">
          <h1>Esther Nnamah</h1>
          <h2>Brand Strategist & Content Creator</h2>
          <p>
            I create compelling content that tells your brand story. Specializing in social media strategy,
            personal branding, and digital storytelling to build authentic connections with your audience.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary" style={{ textDecoration: 'none' }}>
              View My Work
            </a>
            <button className="btn-secondary" onClick={() => setShowChat(true)}>
              Work With Me
            </button>
          </div>
          <div className="hero-socials">
            <span>Follow me:</span>
            {socialLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="social-icon" title={link.label}>
                <SocialIcon type={link.type} />
              </a>
            ))}
          </div>
        </div>
        <div className="hero-image">
          <div className="profile-circle">
            <img src="/profile.png" alt="Esther Nnamah" />
          </div>
        </div>
      </section>

      <a href="#about" className="scroll-indicator">
        <p>Scroll Down</p>
        <p>↓</p>
      </a>

      {/* About Section */}
      <section id="about" className="section about">
        <h2>About Me</h2>
        <div className="professional-summary">
          <p>
            Nnamah Esther Elochukwu is a multifaceted communicator and leader whose work sits at the intersection of faith, intellect, and creativity. She is a skilled content and creative writer, as well as the author of two books that reflect her deep commitment to personal growth, purpose, and spiritual awakening. With a voice that is both insightful and inspiring, she uses storytelling as a tool to challenge perspectives, ignite transformation, and encourage intentional living.
          </p>
          <p>
            As an ordained Pastor and teacher of God's Word, Esther carries a strong mandate to guide, disciple, and nurture individuals in their spiritual journeys. Her teachings are rooted in truth, clarity, and practical application, making them both relatable and impactful for diverse audiences. Beyond the pulpit, she is a compelling public speaker who communicates with conviction, wisdom, and grace, leaving lasting impressions wherever she ministers or speaks.
          </p>
          <p>
            Professionally trained as a Microbiologist, Esther brings a disciplined and analytical mindset into her work, blending scientific precision with creative and spiritual depth. She currently serves as the Accountability Officer at Strengthened Generation Nation Church, where she plays a key role in fostering structure, responsibility, and growth within the community. In addition, she serves as the Country Manager for The Heritage Kids Community, where she is actively involved in shaping young minds and building a strong foundation for the next generation.
          </p>
          <p>
            At the core of everything she does is a deep passion for personal development, self-improvement, faith, excellence, and community impact. Esther is driven by a vision to raise individuals who are not only successful but also grounded in purpose, integrity, and a desire to positively influence the world around them.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services">
        <h2>My Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Social Media Strategy</h3>
            <p>Comprehensive strategies for TikTok, Instagram, Facebook and more</p>
          </div>
          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Content Creation</h3>
            <p>Engaging, authentic content that resonates with your audience</p>
          </div>
          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Personal Branding</h3>
            <p>Build your unique brand identity and establish authority</p>
          </div>
          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Growth Strategy</h3>
            <p>Data-driven strategies to grow your following and engagement</p>
          </div>
          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Video Content</h3>
            <p>Professional video content optimized for social platforms</p>
          </div>
          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Brand Consulting</h3>
            <p>Expert guidance on brand positioning and digital presence</p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills">
        <h2>Expertise</h2>
        <div className="skills-grid">
          <span className="skill-badge">Content Creation</span>
          <span className="skill-badge">Social Media Marketing</span>
          <span className="skill-badge">Brand Strategy</span>
          <span className="skill-badge">Video Editing</span>
          <span className="skill-badge">TikTok Marketing</span>
          <span className="skill-badge">Instagram Strategy</span>
          <span className="skill-badge">Personal Branding</span>
          <span className="skill-badge">Digital Marketing</span>
          <span className="skill-badge">Community Building</span>
          <span className="skill-badge">Storytelling</span>
          <span className="skill-badge">Influencer Marketing</span>
          <span className="skill-badge">Analytics & Insights</span>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="projects" className="section projects">
        <h2>Featured Work</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-tags">
                {project.tech.map((tag, i) => (
                  <span key={i} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
              {project.videoUrl && (
                <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="video-button">
                  Watch Video
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="project-gallery">
          <h3>Content Highlights</h3>
          <div className="gallery-slideshow">
            <button className="slideshow-btn prev-btn" onClick={prevSlide}>
              ‹
            </button>
            <div className="slideshow-container">
              <div className="slideshow-item">
                <div className="gallery-image"></div>
                <p className="slide-title">{projects[currentSlide].title}</p>
                <p className="slide-description">{projects[currentSlide].description}</p>
              </div>
            </div>
            <button className="slideshow-btn next-btn" onClick={nextSlide}>
              ›
            </button>
          </div>
          <div className="slideshow-indicators">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <h2>Get In Touch</h2>
        <p className="contact-intro">Let's collaborate and create something amazing together!</p>

        <div className="contact-container">
          {/* Contact Information */}
          <div className="contact-info">
            <h3>Contact Information</h3>

            <div className="info-item">
              <div className="info-icon">
                <ContactIcon type="email" />
              </div>
              <div>
                <h4>Email</h4>
                <a href="mailto:estherelochukwu01@gmail.com">estherelochukwu01@gmail.com</a>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <ContactIcon type="location" />
              </div>
              <div>
                <h4>Location</h4>
                <p>Lagos, Nigeria</p>
              </div>
            </div>

            <div className="follow-section">
              <h4>Follow Me</h4>
              <div className="follow-icons">
                {socialLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="follow-icon" title={link.label}>
                    <SocialIcon type={link.type} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <h3>Send Me a Message</h3>
            <form className="contact-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" required />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Tell me about your project..." rows="5" required></textarea>
              </div>

              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Chat Modal */}
      <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <h3>E.N</h3>
            <p>Brand Strategist & Content Creator</p>
          </div>

          <div className="footer-section footer-nav">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#projects">Portfolio</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section footer-connect">
            <h4>Connect</h4>
            <div className="footer-socials">
              {socialLinks.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="footer-icon" title={link.label}>
                  <SocialIcon type={link.type} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Esther Nnamah. All rights reserved.</p>
          <button className="footer-chat-btn" onClick={() => setShowChat(true)}>
            Work With Me
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App
