import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

// 1) Import the library + default CSS
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {
  FaJava, FaPython, FaReact, FaNodeJs,
  FaDocker, FaLinux, FaCloud
} from 'react-icons/fa';
import { SiKubernetes, SiPostgresql, SiMongodb, SiGit } from 'react-icons/si';
import { FiCode, FiServer, FiBook } from 'react-icons/fi';

/* ============================
   Styled Components
============================= */

const AboutSection = styled.section`
  min-height: 80vh;
  padding: 4rem 2rem;
  background: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: auto;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  text-align: center;
  color: var(--text);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4rem;
  
  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const Bio = styled(motion.div)`
  max-width: 800px;
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: var(--text);
  }
`;

const SkillsContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  background: transparent;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  perspective: 1000px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const SkillCard = styled(motion.div)`
  background: var(--background-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
    transform: none;
    
    &:hover {
      transform: none;
    }
  }

  &:hover {
    @media (min-width: 769px) {
      transform: 
        translateZ(20px) 
        rotateX(-5deg) 
        rotateY(5deg);
      border-color: rgba(var(--primary-rgb), 0.3);
      box-shadow: 
        0 10px 25px rgba(0,0,0,0.05),
        0 5px 15px rgba(0,0,0,0.03);

      &::before {
        opacity: 1;
      }

      svg {
        transform: scale(1.2) rotate(10deg);
        color: var(--primary);
      }
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center, 
      rgba(var(--primary-rgb), 0.05) 0%, 
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
`;

const SkillIconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const SkillIconWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    font-size: 2.5rem;
    color: var(--text-secondary);
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  span {
    font-size: 0.8rem;
    color: var(--text-secondary);
    transition: color 0.3s ease;

    @media (max-width: 768px) {
      font-size: 0.7rem;
    }
  }

  &:hover {
    svg {
      transform: translateY(-5px) scale(1.1);
      color: var(--primary);
    }

    span {
      color: var(--text);
    }
  }
`;

const TimelineSectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2.2rem, 5vw, 2.8rem);
  margin: 4rem 0 3.5rem;
  color: var(--text);
  font-weight: 700;
  letter-spacing: -0.03em;
  
  &::after {
    content: '';
    display: block;
    width: 70px;
    height: 4px;
    background: linear-gradient(
      90deg,
      var(--primary) 0%,
      var(--primary-light) 100%
    );
    margin: 1.2rem auto 0;
    border-radius: 2px;
  }
`;

const TimelineCard = styled.div`
  background: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 2rem;

  h3 {
    color: var(--text);
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0 0 0.75rem;
  }

  h4 {
    color: var(--primary);
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 1rem;
  }

  p {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.7;
    margin: 0 0 1rem;
  }

  /* Put the date at the bottom, so it appears below everything else */
  .card-date {
    margin-top: 1rem;
    font-size: 0.95rem;
    color: var(--text);
    opacity: 0.8;
    font-style: italic;
  }
`;

/* ============================
   Data Arrays
============================= */

const skillCategories = [
  {
    title: 'Programming',
    description: 'Core Languages',
    skills: [
      { icon: <FaJava />, name: 'Java' },
      { icon: <FaPython />, name: 'Python' }
    ]
  },
  {
    title: 'Web Dev',
    description: 'Frontend & Backend',
    skills: [
      { icon: <FaReact />, name: 'React' },
      { icon: <FaNodeJs />, name: 'Node.js' }
    ]
  },
  {
    title: 'DevOps',
    description: 'Cloud & Infrastructure',
    skills: [
      { icon: <FaDocker />, name: 'Docker' },
      { icon: <FaLinux />, name: 'Linux' }
    ]
  },
  {
    title: 'Databases',
    description: 'Data Management',
    skills: [
      { icon: <SiPostgresql />, name: 'PostgreSQL' },
      { icon: <SiMongodb />, name: 'MongoDB' }
    ]
  }
];

const timelineItems = [
  {
    title: 'Computer Science Student',
    subtitle: 'IUT Informatique, Paul Sabatier III',
    description: `Specializing in Déploiement d'Applications 
                  Communicantes et Sécurisées (DACS)`,
    date: '2025 - Present',
    icon: <FiCode />,
    position: 'left'
  },
  {
    title: 'Pre-University Studies',
    subtitle: 'University of Limoges',
    description: `Gained a solid foundation in computer science principles, 
                  learned French language (B2), etc.`,
    date: '2021 - 2023',
    icon: <FiServer />,
    position: 'right'
  },
  {
    title: 'General Studies',
    subtitle: 'Azan Bin Qais High School',
    description: `Gained a solid foundation in math, physics, 
                  chemistry, and biology.`,
    date: '2019 - 2021',
    icon: <FiBook />,
    position: 'left'
  }
];

/* ============================
   About Component
============================= */

const About = () => {
  const { language, translations } = useLanguage();
  const t = translations[language];

  const skillCategoriesTranslated = [
    {
      title: 'Programming',
      description: 'Core Languages',
      skills: [
        { icon: <FaJava />, name: 'Java' },
        { icon: <FaPython />, name: 'Python' }
      ]
    },
    {
      title: 'Web Dev',
      description: 'Frontend & Backend',
      skills: [
        { icon: <FaReact />, name: 'React' },
        { icon: <FaNodeJs />, name: 'Node.js' }
      ]
    },
    {
      title: 'DevOps',
      description: 'Cloud & Infrastructure',
      skills: [
        { icon: <FaDocker />, name: 'Docker' },
        { icon: <FaLinux />, name: 'Linux' }
      ]
    },
    {
      title: 'Databases',
      description: 'Data Management',
      skills: [
        { icon: <SiPostgresql />, name: 'PostgreSQL' },
        { icon: <SiMongodb />, name: 'MongoDB' }
      ]
    }
  ];

  return (
    <AboutSection id="about">
      <Container>

        {/* ===== Title ===== */}
        <Title
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {t.aboutTitle}
        </Title>

        {/* ===== Bio + Skills ===== */}
        <Content>
          <Bio
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.aboutDescription.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Bio>

          <SkillsContainer
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              style={{ 
                textAlign: 'center', 
                marginBottom: '2rem',
                fontSize: '2.5rem',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                
                '@media (max-width: 768px)': {
                  fontSize: '2rem',
                  marginBottom: '1.5rem'
                }
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t.technicalSkillsTitle}
            </motion.h2>

            <SkillsGrid>
              {skillCategoriesTranslated.map((category, catIndex) => (
                <SkillCard
                  key={catIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: catIndex * 0.1,
                    type: "spring", 
                    stiffness: 200 
                  }}
                  viewport={{ once: true }}
                >
                  <h3 style={{ 
                    marginBottom: '0.5rem', 
                    color: 'var(--text)', 
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    
                    '@media (max-width: 768px)': {
                      fontSize: '1rem'
                    }
                  }}>
                    {category.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '0.9rem',
                    marginBottom: '1rem',
                    
                    '@media (max-width: 768px)': {
                      fontSize: '0.8rem'
                    }
                  }}>
                    {category.description}
                  </p>
                  <SkillIconContainer>
                    {category.skills.map((skill, skillIndex) => (
                      <SkillIconWrapper
                        key={skillIndex}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {skill.icon}
                        <span>{skill.name}</span>
                      </SkillIconWrapper>
                    ))}
                  </SkillIconContainer>
                </SkillCard>
              ))}
            </SkillsGrid>
          </SkillsContainer>
        </Content>

        {/* ===== Timeline ===== */}
        <TimelineSectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Experience &amp; Education
        </TimelineSectionTitle>

        {/* 
          Two-column layout + center vertical line 
          position={item.position} 
          ensures the first is left, second is right, third is left.
        */}
        <VerticalTimeline
          className="vertical-timeline--two-columns"
          lineColor="#6C63FF"
        >
          {timelineItems.map((item, idx) => (
            <VerticalTimelineElement
              key={idx}
              position={item.position}
              icon={item.icon}
              iconStyle={{
                background: 'var(--primary)',
                color: '#fff'
              }}
              contentStyle={{ 
                background: 'transparent', 
                boxShadow: 'none' 
              }}
              contentArrowStyle={{ 
                borderRight: '7px solid transparent' 
              }}
            >
              <TimelineCard>
                <h3>{item.title}</h3>
                <h4>{item.subtitle}</h4>
                <p>{item.description}</p>
                <p className="card-date">{item.date}</p>
              </TimelineCard>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </Container>
    </AboutSection>
  );
};

export default About;
