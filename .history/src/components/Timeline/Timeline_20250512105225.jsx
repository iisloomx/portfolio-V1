import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaBriefcase, FaCode, FaLaptopCode, FaServer, FaCertificate } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const TimelineContainer = styled.section`
  min-height: 100vh;
  padding: 6rem 1.5rem;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme === 'dark' ? `
    radial-gradient(circle at 10% 40%, rgba(var(--primary-rgb), 0.15) 0%, transparent 40%),
    radial-gradient(circle at 90% 60%, rgba(var(--accent-rgb), 0.1) 0%, transparent 40%)
  ` : `
    radial-gradient(circle at 10% 40%, rgba(var(--primary-rgb), 0.07) 0%, transparent 30%),
    radial-gradient(circle at 90% 60%, rgba(var(--accent-rgb), 0.05) 0%, transparent 30%)
  `};

  @media (max-width: 768px) {
    padding: 5rem 1rem;
  }
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
  font-weight: var(--font-weight-extrabold);
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  letter-spacing: -0.02em;
  filter: drop-shadow(0 2px 10px rgba(var(--primary-rgb), 0.3));
`;

const Description = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
  
  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    margin: 2rem auto 0;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    border-radius: 2px;
  }
`;

const StyledTimeline = styled(VerticalTimeline)`
  &::before {
    background: linear-gradient(to bottom, 
      var(--primary) 0%, 
      var(--accent) 100%
    ) !important;
    width: 3px !important;
    box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.5) !important;
  }

  .vertical-timeline-element-icon {
    box-shadow: 0 0 0 4px var(--primary), inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05) !important;
  }

  @media (max-width: 1169px) {
    &::before {
      left: 18px !important;
    }
    
    .vertical-timeline-element-icon {
      left: 0 !important;
    }
  }
`;

const TimelineElement = styled(VerticalTimelineElement)`
  .vertical-timeline-element-content {
    background: var(--card-bg) !important;
    border-radius: 15px !important;
    box-shadow: 0 10px 25px rgba(var(--primary-rgb), 0.1) !important;
    padding: 2rem !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    border: 1px solid var(--glass-border) !important;
    overflow: visible !important;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(var(--primary-rgb), 0.2) !important;
      border-color: var(--primary) !important;
    }
    
    transition: all 0.3s ease-in-out !important;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: ${props => 
        props.type === 'education' 
          ? 'linear-gradient(90deg, #4f46e5, #818cf8)' 
          : props.type === 'work' 
            ? 'linear-gradient(90deg, #06b6d4, #22d3ee)'
            : 'linear-gradient(90deg, #10b981, #34d399)'
      };
      border-radius: 15px 15px 0 0;
      opacity: 0.8;
    }
  }

  .vertical-timeline-element-content-arrow {
    border-right: 7px solid var(--card-bg) !important;
  }

  h3 {
    font-weight: var(--font-weight-bold) !important;
    margin-bottom: 0.5rem !important;
    color: var(--primary) !important;
    font-size: 1.5rem !important;
  }

  h4 {
    font-weight: var(--font-weight-semibold) !important;
    margin-bottom: 0.2rem !important;
    color: var(--accent) !important;
    font-size: 1.1rem !important;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    margin-bottom: 0 !important;
    line-height: 1.6 !important;
    color: var(--text-secondary) !important;
  }
`;

const IconWrapper = styled.div`
  background: ${props => 
    props.type === 'education' 
      ? 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)' 
      : props.type === 'work' 
        ? 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)'
        : 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
  };
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  font-size: 1.5rem;
  box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.4);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1) rotate(5deg);
  }
`;

const TypeBadge = styled.span`
  background: ${props => 
    props.type === 'education' 
      ? 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)' 
      : props.type === 'work' 
        ? 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)'
        : 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
  };
  color: white;
  font-size: 0.75rem;
  font-weight: var(--font-weight-semibold);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
`;

const Timeline = () => {
  const { language, translations } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Particles initialization
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'education':
        return <FaGraduationCap />;
      case 'work':
        return <FaBriefcase />;
      case 'project':
        return <FaCode />;
      case 'certification':
        return <FaCertificate />;
      default:
        return <FaServer />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'education':
        return language === 'en' ? 'Education' : 'Formation';
      case 'work':
        return language === 'en' ? 'Experience' : 'Expérience';
      case 'project':
        return language === 'en' ? 'Project' : 'Projet';
      case 'certification':
        return language === 'en' ? 'Certification' : 'Certification';
      default:
        return '';
    }
  };
  
  // Timeline data with multilanguage support
  const timelineData = {
    en: [
      {
        title: "Computer Science Student",
        subtitle: "IUT Informatique, Paul Sabatier III",
        description: "Specializing in Deploying Secure and Communicative Applications (DACS). Focus on system administration, network security, and cybersecurity.",
        date: "2025 - Present",
        icon: getIcon('education'),
        type: 'education'
      },
      {
        title: "Internship - R&D Trainee",
        subtitle: "Insimo",
        description: "Advanced Linux system administration, designed and deployed a centralized logging solution for Docker containers, Linux, and Windows systems. Implemented secure SSH access, automated port verification, and managed system updates.",
        date: "2025 (3 months, Strasbourg)",
        icon: getIcon('work'),
        type: 'work'
      },
      {
        title: "Self-Directed Learning",
        subtitle: "Cybersecurity & Ethical Hacking",
        description: "Developed scripts for vulnerability scanning and security testing. Studied network security principles and implemented secure system architectures.",
        date: "2024",
        icon: getIcon('project'),
        type: 'project'
      },
      {
        title: "System Monitoring Project",
        subtitle: "ELK Stack Implementation",
        description: "Built a comprehensive system to automatically collect and monitor logs from different applications and servers using the ELK Stack (Elasticsearch, Logstash, Kibana).",
        date: "2023",
        icon: getIcon('project'),
        type: 'project'
      },
      {
        title: "Pre-University Studies",
        subtitle: "University of Limoges",
        description: "Gained a solid foundation in computer science principles and learned French (B2 level).",
        date: "2021 - 2023",
        icon: getIcon('education'),
        type: 'education'
      },
      {
        title: "General Studies",
        subtitle: "Azan Bin Qais High School",
        description: "Focused on mathematics, physics, chemistry, and biology, building a strong foundation for technical education.",
        date: "2019 - 2021",
        icon: getIcon('education'),
        type: 'education'
      }
    ],
    fr: [
      {
        title: "Étudiant en Informatique",
        subtitle: "IUT Informatique, Paul Sabatier III",
        description: "Spécialisation en Déploiement d'Applications Communicantes et Sécurisées (DACS). Accent sur l'administration système, la sécurité réseau et la cybersécurité.",
        date: "2025 - Présent",
        icon: getIcon('education'),
        type: 'education'
      },
      {
        title: "Stage - Stagiaire R&D",
        subtitle: "Insimo",
        description: "Administration avancée des systèmes Linux, conception et déploiement d'une solution centralisée de gestion des logs pour les conteneurs Docker, systèmes Linux et Windows. Mise en place de l'accès SSH sécurisé et vérification automatisée des ports.",
        date: "2025 (3 mois, Strasbourg)",
        icon: getIcon('work'),
        type: 'work'
      },
      {
        title: "Apprentissage Autodidacte",
        subtitle: "Cybersécurité & Hacking Éthique",
        description: "Développement de scripts pour le scan de vulnérabilités et les tests de sécurité. Étude des principes de sécurité réseau et implémentation d'architectures système sécurisées.",
        date: "2024",
        icon: getIcon('project'),
        type: 'project'
      },
      {
        title: "Projet de Supervision Système",
        subtitle: "Implémentation ELK Stack",
        description: "Construction d'un système complet pour collecter et surveiller automatiquement les journaux de différentes applications et serveurs en utilisant la pile ELK (Elasticsearch, Logstash, Kibana).",
        date: "2023",
        icon: getIcon('project'),
        type: 'project'
      },
      {
        title: "Études Pré-Universitaires",
        subtitle: "Université de Limoges",
        description: "Acquisition d'une solide base en informatique et apprentissage du français (niveau B2).",
        date: "2021 - 2023",
        icon: getIcon('education'),
        type: 'education'
      },
      {
        title: "Études Générales",
        subtitle: "Azan Bin Qais High School",
        description: "Concentration sur les mathématiques, la physique, la chimie et la biologie, construisant une base solide pour l'éducation technique.",
        date: "2019 - 2021",
        icon: getIcon('education'),
        type: 'education'
      }
    ]
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <TimelineContainer theme={theme} ref={ref}>
      <ParticlesContainer>
        <Particles
          id="tsparticles-timeline"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            fpsLimit: 60,
            particles: {
              number: { 
                value: 50, 
                density: { enable: true, value_area: 900 } 
              },
              color: { value: theme === 'dark' ? '#4f46e5' : '#818cf8' },
              shape: {
                type: "circle",
                stroke: { width: 0, color: "#000000" }
              },
              opacity: { 
                value: 0.3, 
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              size: { 
                value: 3, 
                random: true,
                anim: {
                  enable: true,
                  speed: 2,
                  size_min: 0.1,
                  sync: false
                }
              },
              line_linked: { 
                enable: true, 
                distance: 150, 
                color: theme === 'dark' ? '#818cf8' : '#4f46e5', 
                opacity: 0.2, 
                width: 1
              },
              move: { 
                enable: true, 
                speed: 0.8, 
                direction: "none", 
                random: true, 
                straight: false, 
                out_mode: "out",
                bounce: false
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true,
                  mode: "grab"
                },
                onclick: {
                  enable: true,
                  mode: "push"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 140,
                  line_linked: {
                    opacity: 1
                  }
                },
                push: {
                  particles_nb: 3
                }
              }
            },
            retina_detect: true
          }}
        />
      </ParticlesContainer>
      
      <Content>
        <Header>
          <Title
            variants={headerVariants}
            initial="hidden"
            animate={controls}
          >
            {language === 'en' ? 'My Journey' : 'Mon Parcours'}
          </Title>
          <Description
            variants={headerVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            {language === 'en' 
              ? 'The path that shaped my skills and passion for technology.'
              : 'Le chemin qui a façonné mes compétences et ma passion pour la technologie.'}
          </Description>
        </Header>

        <StyledTimeline>
          {timelineData[language].map((item, index) => (
            <TimelineElement
              key={index}
              date={item.date}
              iconStyle={{ background: 'transparent', color: '#fff' }}
              icon={<IconWrapper type={item.type}>{item.icon}</IconWrapper>}
              contentStyle={{ background: 'var(--card-bg)', color: 'var(--text)' }}
              contentArrowStyle={{ borderRight: '7px solid var(--card-bg)' }}
              visible={true}
              type={item.type}
            >
              <TypeBadge type={item.type}>
                {getIcon(item.type)} {getTypeLabel(item.type)}
              </TypeBadge>
              <h3 className="vertical-timeline-element-title">{item.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">{item.subtitle}</h4>
              <p>{item.description}</p>
            </TimelineElement>
          ))}
        </StyledTimeline>
      </Content>
    </TimelineContainer>
  );
};

export default Timeline; 