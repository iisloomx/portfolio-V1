import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaJava, FaPython, FaReact, FaNodeJs, FaDocker, FaLinux, FaGitAlt, FaDatabase, FaCloud, FaCode, FaTerminal, FaPhp, FaCss3, FaWindows, FaUbuntu, FaBrain, FaShieldAlt, FaNetworkWired, FaSearchLocation, FaChartBar, FaChartLine, FaServer } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiMysql, SiMongodb, SiOracle, SiRedis, SiOwncloud } from 'react-icons/si';
import { DiDjango } from 'react-icons/di';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from 'styled-components';

// 1) Import the library + default CSS
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {
  FiCode, FiBook
} from 'react-icons/fi';

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
  background: var(--card-bg);
  border-radius: 2rem;
  padding: 2.5rem 2rem;
  text-align: center;
  border: 2px solid var(--glass-border);
  box-shadow: 0 8px 32px rgba(var(--primary-rgb), 0.10), 0 2px 16px rgba(124,58,237,0.08);
  transition: all 0.35s cubic-bezier(.4,2,.6,1);
  position: relative;
  overflow: hidden;
  color: var(--text);
  &:hover {
    box-shadow: 0 16px 60px 0 rgba(var(--primary-rgb),0.18), 0 4px 24px 0 rgba(124,58,237,0.10);
    transform: translateY(-8px) scale(1.035);
    border-color: var(--primary);
    background: linear-gradient(120deg, var(--card-bg) 80%, var(--primary) 100%);
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
    font-size: 2.9rem;
    color: var(--primary);
    background: none;
    border-radius: 1.2rem;
    padding: 0.5rem;
    box-shadow: none;
    transition: all 0.35s cubic-bezier(.4,2,.6,1);
  }
  span {
    font-size: 1rem;
    color: var(--primary);
    font-weight: 600;
    transition: color 0.3s;
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
  background: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(28,32,48,0.98)' : 'rgba(255,255,255,0.97)')};
  border-radius: 2rem;
  box-shadow: ${({ theme }) => (theme.mode === 'dark' ? '0 8px 32px 0 rgba(108,99,255,0.16), 0 1.5px 8px 0 rgba(63,81,181,0.11)' : '0 8px 32px 0 rgba(108,99,255,0.09), 0 1.5px 8px 0 rgba(63,81,181,0.04)')};
  border: ${({ theme }) => (theme.mode === 'dark' ? '1.5px solid #23263a' : '1.5px solid #e0e7ff')};
  padding: 2.3rem 2.8rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  &::before {
    content: '';
    position: absolute;
    top: -40%;
    left: -40%;
    width: 180%;
    height: 180%;
    background: radial-gradient(circle, rgba(108,99,255,0.06) 0%, rgba(63,81,181,0.09) 100%);
    z-index: 0;
    filter: blur(18px);
  }
  h3 {
    color: ${({ theme }) => (theme.mode === 'dark' ? '#fff' : '#222')};
    font-weight: 800;
    font-size: 1.35rem;
    letter-spacing: 0.02em;
    z-index: 2;
    position: relative;
    margin-bottom: 0.25rem;
    background: none;
    -webkit-background-clip: unset;
    -webkit-text-fill-color: unset;
  }
  h4 {
    color: ${({ theme }) => (theme.mode === 'dark' ? '#b3baff' : '#3f51b5')};
    font-weight: 700;
    font-size: 1.07rem;
    margin-bottom: 0.5rem;
    z-index: 2;
    position: relative;
  }
  p {
    font-size: 1.09rem;
    color: ${({ theme }) => (theme.mode === 'dark' ? '#e0e7ff' : '#222')};
    margin-bottom: 8px;
    z-index: 2;
    position: relative;
  }
  .card-date {
    font-style: italic;
    color: #888;
    font-size: 0.99rem;
    z-index: 2;
    position: relative;
  }
`;

const CategoryTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: var(--text);
  font-size: 1.2rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CategoryDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

/* ============================
   Data Arrays
============================= */

const timelineIconMap = {
  'Computer Science Student': <FiCode />,
  'Étudiant en Informatique': <FiCode />,
  'Internship - R&D Trainee': <FaLinux />,
  'Stage - Stagiaire R&D': <FaLinux />,
  'Pre-University Studies': <FiBook />,
  'Études Pré-Universitaires': <FiBook />,
  'General Studies': <FiBook />,
  'Études Générales': <FiBook />
};

/* ============================
   About Component
============================= */

const About = () => {
  const { language, translations } = useLanguage();
  const t = translations[language];
  const theme = useTheme();

  const isDark = theme.mode === 'dark';
  const cardBg = isDark ? 'rgba(28,32,48,0.98)' : 'rgba(255,255,255,0.97)';
  const cardBorder = isDark ? '1.5px solid #23263a' : '1.5px solid #e0e7ff';
  const cardShadow = isDark
    ? '0 8px 32px 0 rgba(108,99,255,0.16), 0 1.5px 8px 0 rgba(63,81,181,0.11)'
    : '0 8px 32px 0 rgba(108,99,255,0.09), 0 1.5px 8px 0 rgba(63,81,181,0.04)';
  const titleColor = isDark ? '#fff' : '#222';
  const subtitleColor = isDark ? '#b3baff' : '#3f51b5';
  const iconBg = isDark ? '#6C63FF' : '#3f51b5';
  const iconColor = '#fff';

  const timelineIconStyle = {
    background: iconBg,
    color: iconColor,
    boxShadow: '0 4px 24px rgba(108,99,255,0.18)',
    border: '2.5px solid #fff',
    outline: '4px solid #6C63FF',
    outlineOffset: '2.5px',
    transition: 'all 0.3s cubic-bezier(.4,2,.6,1)'
  };

  const timelineContentStyle = {
    background: cardBg,
    boxShadow: cardShadow,
    borderRadius: '2rem',
    border: cardBorder,
    backdropFilter: 'blur(8px)'
  };

  const timelineContentArrowStyle = {
    borderRight: `7px solid ${iconBg}`
  };

  const skillCategories = [
    {
      title: t.programmingLanguages,
      description: 'Core Languages',
      skills: [
        { icon: <FaJava />, name: 'Java' },
        { icon: <FaPython />, name: 'Python' },
        { icon: <FaCode />, name: 'C' },
        { icon: <FaTerminal />, name: 'Ada' }
      ]
    },
    {
      title: t.webTechnologies,
      description: 'Frontend & Backend',
      skills: [
        { icon: <FaReact />, name: 'React' },
        { icon: <FaNodeJs />, name: 'Node.js' },
        { icon: <SiTypescript />, name: 'TypeScript' },
        { icon: <SiJavascript />, name: 'JavaScript' },
        { icon: <FaPhp />, name: 'PHP' },
        { icon: <FaCss3 />, name: 'CSS' }
      ]
    },
    {
      title: t.cloudAndDevOps,
      description: 'Infrastructure & Deployment',
      skills: [
        { icon: <FaDocker />, name: 'Docker' },
        { icon: <SiOwncloud />, name: 'OwnCloud' }
      ]
    },
    {
      title: t.operatingSystems,
      description: 'System Management',
      skills: [
        { icon: <FaLinux />, name: 'Linux' },
        { icon: <FaUbuntu />, name: 'Debian' },
        { icon: <FaTerminal />, name: 'Kali Linux' },
        { icon: <FaWindows />, name: 'Windows' }
      ]
    },
    {
      title: t.artificialIntelligence,
      description: 'AI & Machine Learning',
      skills: [
        { icon: <FaBrain />, name: 'Ollama' }
      ]
    },
    {
      title: t.vulnerabilityScanningTools,
      description: 'Security Assessment',
      skills: [
        { icon: <FaShieldAlt />, name: 'Burp Suite' },
        { icon: <FaDatabase />, name: 'SQLmap' }
      ]
    },
    {
      title: t.networkSecurityTools,
      description: 'Network Penetration',
      skills: [
        { icon: <FaNetworkWired />, name: 'Wireshark' },
        { icon: <FaSearchLocation />, name: 'Nmap' },
        { icon: <FaCode />, name: 'Nikto' }
      ]
    },
    {
      title: t.securityAutomation,
      description: 'Scripting & Automation',
      skills: [
        { icon: <FaTerminal />, name: 'Bash Scripting' },
        { icon: <FaPython />, name: 'Python Security' }
      ]
    },
    {
      title: t.dataAnalytics,
      description: 'Data Insights & Visualization',
      skills: [
        { icon: <FaChartBar />, name: 'Pandas' },
        { icon: <FaChartLine />, name: 'Matplotlib' }
      ]
    },
    {
      title: t.containerization,
      description: 'Virtualization & Containerization',
      skills: [
        { icon: <FaDocker />, name: 'Docker Compose' },
        { icon: <FaServer />, name: 'Kubernetes' }
      ]
    },
    {
      title: t.databases,
      description: 'Data Management',
      skills: [
        { icon: <FaDatabase />, name: 'Database' },
        { icon: <SiMysql />, name: 'MySQL' },
        { icon: <SiMongodb />, name: 'MongoDB' },
        { icon: <SiOracle />, name: 'Oracle' },
        { icon: <SiRedis />, name: 'Redis' }
      ]
    },
    {
      title: t.tools,
      description: 'Development Tools',
      skills: [
        { icon: <FaGitAlt />, name: 'Git' },
        { icon: <FaTerminal />, name: 'CLI' },
        { icon: <FiCode />, name: 'VS Code' }
      ]
    }
  ];

  const timelineItems = t.timeline.map((item, idx) => ({
    ...item,
    icon: timelineIconMap[item.title] || <FiBook />,
    position: idx % 2 === 0 ? 'left' : 'right'
  }));

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
                color: titleColor,
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t.technicalSkillsTitle}
            </motion.h2>

            <SkillsGrid>
              {skillCategories.map((category, catIndex) => (
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
                  <CategoryTitle>
                    {category.title}
                  </CategoryTitle>
                  <CategoryDescription>
                    {category.description}
                  </CategoryDescription>
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
              iconStyle={timelineIconStyle}
              contentStyle={timelineContentStyle}
              contentArrowStyle={timelineContentArrowStyle}
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
