import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiServer, FiDatabase, FiShield, FiCode, FiGrid, FiCloud, FiBox, FiCpu, FiLock } from 'react-icons/fi';
import { FaDocker, FaNetworkWired, FaCameraRetro } from 'react-icons/fa';
import { SiGrafana, SiElasticsearch, SiCheckmarx, SiLinux, SiSecurityscorecard } from 'react-icons/si';
import Modal from 'react-modal';
import { Tilt } from 'react-tilt';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useLanguage } from '../../context/LanguageContext';

Modal.setAppElement('#root');

const ProjectsSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: var(--background);
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 3rem;
  text-align: center;
  color: var(--text);
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2.3rem;
  padding: 2.5rem 0;
`;

const ProjectCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 1.6rem;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(var(--primary-rgb), 0.10), 0 2px 16px rgba(124,58,237,0.08);
  border: 2px solid var(--glass-border);
  transition: box-shadow 0.3s, border 0.3s, transform 0.25s, background 0.25s;
  cursor: default;
  position: relative;
  height: 100%;
  backdrop-filter: blur(12px);
  color: var(--text);
  &:hover {
    box-shadow: 0 16px 48px 0 rgba(var(--primary-rgb),0.19), 0 8px 32px 0 rgba(124,58,237,0.13);
    border: 2px solid var(--primary);
    transform: translateY(-6px) scale(1.025);
    background: linear-gradient(120deg, var(--card-bg) 80%, var(--primary) 100%);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectIcon = styled.div`
  font-size: 2.7rem;
  margin-bottom: 1.4rem;
  color: var(--primary);
  display: flex;
  justify-content: center;
  filter: none;
  transition: color 0.3s, filter 0.3s;
  
  /* Light mode: no glow, Dark mode: soft glow */
  html.dark-theme & {
    filter: drop-shadow(0 0 12px #a259f7cc);
    color: #a259f7;
  }
  html.light-theme & {
    filter: none;
    color: #7c3aed;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.9rem;
  color: var(--text);
  font-weight: 700;
`;

const ProjectDescription = styled.p`
  font-size: 1.02rem;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 0.7rem;
  flex-grow: 1;
`;

const iconMap = {
  docker: <FaDocker />,
  metrics: <SiCheckmarx />,
  grafana: <SiGrafana />,
  network: <FaNetworkWired />,
  security: <SiSecurityscorecard />,
  camera: <FaCameraRetro />,
  server: <FiServer />,
  database: <FiDatabase />,
  shield: <FiShield />,
  code: <FiCode />,
  grid: <FiGrid />,
  cloud: <FiCloud />,
  box: <FiBox />,
  cpu: <FiCpu />,
  lock: <FiLock />,
};

const Projects = () => {
  const { translations, language } = useLanguage();
  const t = translations[language];
  const projects = t.projects;
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      maxWidth: '800px',
      width: '90%',
      padding: '2rem',
      border: 'none',
      borderRadius: '15px',
      backgroundColor: 'var(--card-bg)',
      color: 'var(--text)',
    },
  };

  const ModalContent = styled.div`
    position: relative;
  `;

  const CloseButton = styled.button`
    position: absolute;
    top: -1rem;
    right: -1rem;
    background: var(--primary);
    color: white;
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: var(--hover);
    }
  `;

  const ModalTitle = styled.h2`
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--text);
  `;

  const ImageSlider = styled.div`
    margin: 2rem 0;
    border-radius: 10px;
    overflow: hidden;

    .swiper {
      width: 100%;
      height: 300px;
    }

    .swiper-slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;

  return (
    <ProjectsSection id="projects">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {t.projectsTitle}
        </Title>
        <ProjectGrid>
          {projects.map((project, idx) => (
            <Tilt
              key={idx}
              options={{
                max: 15,
                scale: 1.05,
                speed: 1000,
              }}
            >
              <ProjectCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.13 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                style={{ cursor: 'default' }}
              >
                <ProjectContent>
                  <ProjectIcon>{iconMap[project.icon] || <FaDocker />}</ProjectIcon>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                </ProjectContent>
              </ProjectCard>
            </Tilt>
          ))}
        </ProjectGrid>

        <Modal
          isOpen={!!selectedProject}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="Project Details"
        >
          <AnimatePresence>
            {selectedProject && (
              <ModalContent>
                <CloseButton onClick={closeModal}>
                  <FiX />
                </CloseButton>
                <ProjectIcon>{iconMap[selectedProject.icon] || <FaDocker />}</ProjectIcon>
                <ModalTitle>{selectedProject.title}</ModalTitle>
                <ImageSlider>
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                  >
                    {selectedProject.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img src={image} alt={`${selectedProject.title} screenshot ${index + 1}`} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </ImageSlider>
                <ProjectDescription>{selectedProject.longDescription}</ProjectDescription>
              </ModalContent>
            )}
          </AnimatePresence>
        </Modal>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
