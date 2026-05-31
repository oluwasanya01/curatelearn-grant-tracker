import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PortfolioPage() {
  const navigate = useNavigate()
  const [currentGallerySlide, setCurrentGallerySlide] = useState(0)

  const projects = [
    {
      id: 3,
      title: 'Featured Content Campaign',
      description: 'Strategic content creation showcasing brand story and values',
      tech: ['Content Strategy', 'Social Media', 'Engagement'],
      videoUrl: 'https://www.tiktok.com/@_esther_nnamah/video/7609872725556890898',
      buttonLabel: 'Watch Video',
    },
    {
      id: 4,
      title: 'Published Books',
      description: 'Inspiring books on personal growth, purpose, and faith awakening',
      tech: ['Writing', 'Personal Development', 'Spirituality'],
      videoUrl: 'https://selar.com/m/esther-nnamah1',
      buttonLabel: 'View Books',
    },
  ]

  const gallery = [
    { id: 1, image: '/new.jpeg', title: 'BETHA Event' },
  ]

  const nextGallerySlide = () => {
    setCurrentGallerySlide((prev) => (prev + 1) % gallery.length)
  }

  const prevGallerySlide = () => {
    setCurrentGallerySlide((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  return (
    <>
      <button className="back-btn" onClick={() => navigate(-1)}>←</button>
      <section className="section projects">
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
                {project.buttonLabel || 'Watch Video'}
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="project-gallery">
        <h3>Gallery</h3>
        <div className="gallery-slideshow">
          <button className="slideshow-btn prev-btn" onClick={prevGallerySlide}>
            ‹
          </button>
          <div className="slideshow-container">
            <div className="slideshow-item">
              <img src={gallery[currentGallerySlide].image} alt={gallery[currentGallerySlide].title} className="gallery-image" />
            </div>
          </div>
          <button className="slideshow-btn next-btn" onClick={nextGallerySlide}>
            ›
          </button>
        </div>
      </div>
      </section>
    </>
  )
}

export default PortfolioPage
