import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiGithub, 
  FiExternalLink, 
  FiX,
  FiServer,
  FiDatabase,
  FiShield,
  FiCode,
  FiGrid,
  FiCloud,
  FiBox,
  FiCpu,
  FiLock
} from 'react-icons/fi';
import Modal from 'react-modal';
import { Tilt } from 'react-tilt';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding: 2rem 0;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 100%;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary);
  display: flex;
  justify-content: center;
  
  svg {
    filter: drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.3));
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--text);
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tech = styled.span`
  font-size: 0.9rem;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  background: var(--primary);
  color: white;
  opacity: 0.8;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
`;

const LinkIcon = styled.a`
  color: var(--text);
  font-size: 1.2rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary);
  }
`;

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

const projects = [
  {
    title: 'Storage Server Setup',
    description: 'Implemented and configured a secure storage server using Linux, Apache, and OwnCloud, focusing on data security and efficient file management.',
    tech: ['Linux', 'Apache', 'OwnCloud'],
    github: '#',
    icon: <FiServer />,
    images: [
      'https://via.placeholder.com/800x400?text=Server+Dashboard',
      'https://via.placeholder.com/800x400?text=File+Management',
    ],
    longDescription: 'A comprehensive storage server solution that provides secure file storage and sharing capabilities. Features include user authentication, file versioning, and automated backups.',
  },
  {
    title: 'Cheese Sales App',
    description: 'Developed a Java-based application for managing cheese sales, implementing UML design principles and creating an intuitive user interface.',
    tech: ['Java', 'UML', 'UI/UX'],
    github: '#',
    icon: <FiBox />,
    images: [
      'https://via.placeholder.com/800x400?text=Sales+Dashboard',
      'https://via.placeholder.com/800x400?text=Inventory+Management',
    ],
    longDescription: 'A sophisticated point-of-sale system specifically designed for cheese retailers. The application handles inventory management, sales tracking, and customer relationships.',
  },
  {
    title: 'Oracle APEX Web App',
    description: 'Created a web application using Oracle APEX, implementing database management and user authentication features.',
    tech: ['Oracle APEX', 'SQL', 'Web Development'],
    github: '#',
    icon: <FiDatabase />,
    images: [
      'https://via.placeholder.com/800x400?text=Web+Interface',
      'https://via.placeholder.com/800x400?text=Database+Schema',
    ],
    longDescription: 'A robust web application built on Oracle APEX platform, featuring complex database operations and a user-friendly interface.',
  },
  {
    title: 'Linux Virtualized Environment',
    description: 'Set up and managed a virtualized Linux environment using VirtualBox, implementing system administration best practices.',
    tech: ['Linux', 'VirtualBox', 'System Admin'],
    github: '#',
    icon: <FiCpu />,
    images: [
      'https://via.placeholder.com/800x400?text=Virtual+Environment',
      'https://via.placeholder.com/800x400?text=System+Architecture',
    ],
    longDescription: 'A comprehensive virtualized environment setup that demonstrates advanced system administration capabilities and network configuration.',
  },
  {
    title: 'Anomaly Detection App',
    description: 'Built an AI-powered system for detecting anomalies in data streams, implementing machine learning algorithms for real-time analysis.',
    tech: ['Python', 'Machine Learning', 'Data Analysis'],
    github: '#',
    icon: <FiGrid />,
    images: [
      'https://via.placeholder.com/800x400?text=ML+Dashboard',
      'https://via.placeholder.com/800x400?text=Analysis+Results',
    ],
    longDescription: 'An intelligent system that uses machine learning to detect and flag anomalies in real-time data streams, with visualization and reporting capabilities.',
  },
  {
    title: 'Advanced Proxy',
    description: 'Developed a sophisticated proxy application with enhanced security features and traffic management capabilities.',
    tech: ['Networking', 'Security', 'C'],
    github: '#',
    icon: <FiLock />,
    images: [
      'https://via.placeholder.com/800x400?text=Proxy+Interface',
      'https://via.placeholder.com/800x400?text=Traffic+Analysis',
    ],
    longDescription: 'A high-performance proxy application that provides advanced security features, traffic management, and detailed analytics.',
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <ProjectsSection id="projects">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          My Projects
        </Title>
        <ProjectGrid>
          {projects.map((project, index) => (
            <Tilt
              key={index}
              options={{
                max: 15,
                scale: 1.05,
                speed: 1000,
              }}
            >
              <ProjectCard
                onClick={() => openModal(project)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <ProjectContent>
                  <ProjectIcon>{project.icon}</ProjectIcon>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <TechStack>
                    {project.tech.map((tech, techIndex) => (
                      <Tech key={techIndex}>{tech}</Tech>
                    ))}
                  </TechStack>
                  <Links>
                    {project.github && (
                      <LinkIcon href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                        <FiGithub />
                      </LinkIcon>
                    )}
                    {project.demo && (
                      <LinkIcon href={project.demo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                        <FiExternalLink />
                      </LinkIcon>
                    )}
                  </Links>
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
                <ProjectIcon>{selectedProject.icon}</ProjectIcon>
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
                <TechStack>
                  {selectedProject.tech.map((tech, index) => (
                    <Tech key={index}>{tech}</Tech>
                  ))}
                </TechStack>
              </ModalContent>
            )}
          </AnimatePresence>
        </Modal>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
