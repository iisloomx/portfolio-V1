import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FiCode, FiServer, FiDatabase, FiShield } from 'react-icons/fi';

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: var(--background);
  position: relative;
  overflow: hidden;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Bio = styled(motion.div)`
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: var(--text);
  }
`;

const SkillsContainer = styled(motion.div)`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: var(--text);
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const SkillCard = styled(motion.div)`
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  box-shadow: 0 4px 20px var(--shadow);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px var(--shadow);
    border-color: var(--primary-light);
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: var(--text);
    text-align: center;
    font-weight: 600;
  }
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  margin-bottom: 1.2rem;
  
  .skill-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    color: var(--text);
    font-weight: 500;
  }

  .skill-bar {
    height: 8px;
    background: rgba(var(--primary-rgb), 0.1);
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
      border-radius: 4px;
      width: ${props => props.progress}%;
      transition: width 1s ease;
    }
  }
`;

const TimelineWrapper = styled.div`
  .vertical-timeline {
    &::before {
      background: var(--card-border);
    }
  }

  .vertical-timeline-element {
    margin: 2rem 0;
  }

  .vertical-timeline-element-icon {
    box-shadow: 0 0 0 4px var(--primary), inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05);
  }

  .vertical-timeline-element-content {
    background: transparent;
    box-shadow: none;
    padding: 0;

    .vertical-timeline-element-date {
      color: var(--text);
      opacity: 0.8;
    }
  }
`;

const TimelineCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--card-border);
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;

  h3 {
    color: var(--text);
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  h4 {
    color: var(--primary);
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    opacity: 0.9;
  }

  .date {
    color: var(--accent);
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .icon {
    color: var(--primary);
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const TimelineSection = styled.div`
  margin: 4rem 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: var(--primary-light);
    opacity: 0.3;
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  margin: 2rem 0;
  width: 50%;
  position: relative;

  &:nth-child(even) {
    align-self: flex-end;
    justify-content: flex-start;
    padding-left: 30px;
    padding-right: 0;
  }

  &::before {
    content: '';
    position: absolute;
    right: -8px;
    top: 0;
    width: 16px;
    height: 16px;
    background: var(--primary);
    border: 4px solid var(--background);
    border-radius: 50%;
    box-shadow: 0 0 0 3px var(--primary-light);
  }

  &:nth-child(even)::before {
    right: auto;
    left: -8px;
  }
`;

const Section = styled.section`
  padding: 6rem 0;
  background: var(--background);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(180deg, 
      rgba(var(--primary-rgb), 0.03) 0%,
      rgba(var(--background-rgb), 0) 100%
    );
    pointer-events: none;
  }
`;

const skills = [
  { name: 'Java', level: 85, icon: <FiCode /> },
  { name: 'Python', level: 80, icon: <FiCode /> },
  { name: 'Linux', level: 90, icon: <FiServer /> },
  { name: 'SQL', level: 75, icon: <FiDatabase /> },
  { name: 'Network Security', level: 85, icon: <FiShield /> },
  { name: 'System Admin', level: 80, icon: <FiServer /> }
];

const timeline = [
  {
    date: '2025 - Present',
    title: 'Computer Science Student',
    subtitle: 'IUT Informatique, Paul Sabatier III',
    description: 'Specializing in Déploiement d\'Applications Communicantes et Sécurisées (DACS)',
    icon: <FiCode />
  },
  {
    date: '2021 - 2023',
    title: 'Pre-University Studies',
    subtitle: 'University of Limoges',
    description: 'Gained a solid foundation in computer science principles and programming languages, learned french language and Gained B2 level in french',
    icon: <FiServer />
  },
  {
    date: '2019 - 2021',
    title: 'General Studies',
    subtitle: 'Azan Bin Qais High School',
    description: 'Gained a solid foundation in math, physics, chemistry, and biology',
    icon: <FiServer />
  }
];

const About = () => {
  return (
    <AboutSection id="about">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About Me
        </Title>
        <Content>
          <Bio
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p>
              I am a Computer Science student specializing in Déploiement d'Applications
              Communicantes et Sécurisées (DACS) at IUT Informatique, Paul Sabatier III,
              Toulouse.
            </p>
            <p>
              With a strong foundation in system administration, network security, and
              application development, I am passionate about creating secure and efficient
              solutions to complex problems.
            </p>
          </Bio>
          <SkillsContainer
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Technical Skills</h3>
            <SkillsGrid>
              {skills.map((skill, index) => (
                <SkillCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CircularProgressbar
                    value={skill.level}
                    text={`${skill.level}%`}
                    styles={buildStyles({
                      textSize: '1.5rem',
                      pathColor: 'var(--primary)',
                      textColor: 'var(--text)',
                      trailColor: 'var(--border)',
                    })}
                  />
                  <h3>{skill.name}</h3>
                </SkillCard>
              ))}
            </SkillsGrid>
          </SkillsContainer>
        </Content>
        <TimelineWrapper>
          <h3>Experience & Education</h3>
          <VerticalTimeline>
            {timeline.map((item, index) => (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element"
                date={item.date}
                iconStyle={{ background: 'var(--primary)', color: '#fff' }}
                icon={item.icon}
              >
                <TimelineCard>
                  <h3 className="vertical-timeline-element-title">{item.title}</h3>
                  <h4 className="vertical-timeline-element-subtitle">{item.subtitle}</h4>
                  <p>{item.description}</p>
                  <p className="date">{item.date}</p>
                </TimelineCard>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </TimelineWrapper>
      </Container>
    </AboutSection>
  );
};

export default About;
