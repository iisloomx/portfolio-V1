import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLaptopCode, FaCoffee, FaBook, FaHeadphones, 
  FaStickyNote, FaMobileAlt, FaSeedling, FaServer, 
  FaShieldAlt, FaDatabase, FaDocker, FaGitAlt 
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

// Workspace Container with 3D perspective effect
const WorkspaceContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  perspective: 1000px;
  overflow-x: hidden;
  position: relative;
  background: ${props => props.theme === 'dark' ? `
    radial-gradient(circle at 20% 20%, rgba(var(--primary-rgb), 0.15) 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(var(--accent-rgb), 0.1) 0%, transparent 40%)
  ` : `
    radial-gradient(circle at 20% 20%, rgba(var(--primary-rgb), 0.05) 0%, transparent 30%),
    radial-gradient(circle at 80% 80%, rgba(var(--accent-rgb), 0.03) 0%, transparent 30%)
  `};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  font-weight: var(--font-weight-extrabold);
  filter: drop-shadow(0 2px 10px rgba(var(--primary-rgb), 0.3));
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    margin: 2rem auto 0;
    border-radius: 2px;
  }
`;

const Desk = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  
  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ItemCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(var(--primary-rgb), 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(var(--primary-rgb), 0.2);
    border-color: var(--primary);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const IconContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(var(--primary-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
  color: var(--primary);
  font-size: 1.8rem;
  transition: all 0.3s ease;
  
  ${ItemCard}:hover & {
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    color: white;
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 10px 25px rgba(var(--primary-rgb), 0.3);
  }
`;

const ItemLabel = styled.h3`
  font-size: 1.2rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text);
  margin-bottom: 1rem;
  text-align: center;
`;

const DetailsBox = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 2rem;
  pointer-events: none;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 90;
`;

const DetailCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 100;
  pointer-events: auto;
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  
  h3 {
    font-size: 1.8rem;
    font-weight: var(--font-weight-bold);
    margin-bottom: 1.5rem;
    color: var(--primary);
    display: flex;
    align-items: center;
    gap: 1rem;
    
    svg {
      font-size: 1.6rem;
    }
  }
  
  p {
    margin: 1rem 0;
    color: var(--text-secondary);
    line-height: 1.7;
  }
  
  b {
    color: var(--primary);
    font-weight: var(--font-weight-semibold);
  }
  
  i {
    display: block;
    margin-top: 1.5rem;
    font-style: italic;
    opacity: 0.8;
    font-size: 0.95rem;
    border-left: 3px solid var(--primary);
    padding-left: 1rem;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(var(--primary-rgb), 0.1);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text);
  font-size: 1.2rem;
  
  &:hover {
    background: var(--primary);
    color: white;
  }
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    background: currentColor;
    border-radius: 1px;
  }
  
  &::before {
    transform: rotate(45deg);
  }
  
  &::after {
    transform: rotate(-45deg);
  }
`;

// Floating circles background
const Circle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at center, 
    rgba(var(--primary-rgb), 0.3) 0%, 
    rgba(var(--primary-rgb), 0) 70%
  );
  opacity: 0.5;
  z-index: 0;
  
  &.circle1 {
    width: 300px;
    height: 300px;
    top: 10%;
    left: 5%;
  }
  
  &.circle2 {
    width: 400px;
    height: 400px;
    bottom: 5%;
    right: 5%;
  }
  
  &.circle3 {
    width: 200px;
    height: 200px;
    top: 40%;
    right: 15%;
  }
`;

const toolItems = [
  {
    id: 'coding',
    icon: <FaLaptopCode />,
    label: 'Tech Stack',
    content: (
      <>
        <h3><FaLaptopCode /> Tech Stack</h3>
        <p><b>Languages & Tools:</b> Python, PHP, JavaScript</p>
        <p><b>Frameworks/Libraries:</b> React, Laravel, Express</p>
        <p><b>IDE/Editor:</b> VS Code, JetBrains IDEs</p>
        <i>A passionate system & network admin with a knack for cybersecurity and system monitoring. Always exploring new technologies and programming paradigms.</i>
      </>
    )
  },
  {
    id: 'coffee',
    icon: <FaCoffee />,
    label: 'Work Habits',
    content: (
      <>
        <h3><FaCoffee /> Work Habits</h3>
        <p><b>Daily Routine:</b> First coffee, then docker-compose up.</p>
        <p><b>Productivity Method:</b> Pomodoro technique (25min focused work, 5min break)</p>
        <p><b>Favorite Coding Snacks:</b> Nuts and dark chocolate</p>
        <i>Turning caffeine into code since 2021. Finding the perfect balance between focused work and short breaks maximizes my productivity.</i>
      </>
    )
  },
  {
    id: 'security',
    icon: <FaShieldAlt />,
    label: 'Security',
    content: (
      <>
        <h3><FaShieldAlt /> Security Focus</h3>
        <p><b>Areas of Interest:</b> Network security, Penetration testing, Security auditing</p>
        <p><b>Tools:</b> Kali Linux, Metasploit, Wireshark, Burp Suite</p>
        <p><b>Methodologies:</b> OWASP Top 10, Secure SDLC, Defense in Depth</p>
        <i>Security isn't just a feature, it's a foundation. I approach every project with a security-first mindset, considering potential vulnerabilities from the start.</i>
      </>
    )
  },
  {
    id: 'database',
    icon: <FaDatabase />,
    label: 'Database',
    content: (
      <>
        <h3><FaDatabase /> Database Systems</h3>
        <p><b>SQL:</b> MySQL, PostgreSQL, Oracle</p>
        <p><b>NoSQL:</b> MongoDB, Elasticsearch</p>
        <p><b>Skills:</b> Database design, Query optimization, Data modeling</p>
        <i>Data is the heart of modern applications. I enjoy designing efficient database schemas and optimizing queries for performance.</i>
      </>
    )
  },
  {
    id: 'server',
    icon: <FaServer />,
    label: 'Infrastructure',
    content: (
      <>
        <h3><FaServer /> Infrastructure</h3>
        <p><b>Operating Systems:</b> Linux (Debian/Ubuntu/CentOS), Windows Server</p>
        <p><b>Networking:</b> VLAN setup, Firewall configuration, Load balancing</p>
        <p><b>Monitoring:</b> ELK Stack, Prometheus, Grafana</p>
        <i>Building robust infrastructure is like creating a solid foundation. I focus on reliability, scalability, and monitoring to ensure systems run smoothly.</i>
      </>
    )
  },
  {
    id: 'docker',
    icon: <FaDocker />,
    label: 'Containers',
    content: (
      <>
        <h3><FaDocker /> Containers</h3>
        <p><b>Technologies:</b> Docker, Docker Compose, Kubernetes basics</p>
        <p><b>Experience:</b> Creating optimized Dockerfiles, Managing multi-container applications</p>
        <p><b>Skills:</b> Container orchestration, Microservice architecture</p>
        <i>"It works on my machine" is no longer an excuse in the age of containers. I leverage containerization to create consistent deployment environments.</i>
      </>
    )
  },
  {
    id: 'git',
    icon: <FaGitAlt />,
    label: 'Version Control',
    content: (
      <>
        <h3><FaGitAlt /> Version Control</h3>
        <p><b>Tools:</b> Git, GitHub, GitLab</p>
        <p><b>Workflow:</b> Feature branches, Pull requests, Code reviews</p>
        <p><b>CI/CD:</b> GitHub Actions, GitLab CI</p>
        <i>Version control is the time machine of software development. I emphasize clean commit history and effective collaboration through well-structured workflows.</i>
      </>
    )
  },
  {
    id: 'growth',
    icon: <FaSeedling />,
    label: 'Learning',
    content: (
      <>
        <h3><FaSeedling /> Continuous Learning</h3>
        <p><b>Current Focus:</b> Advanced cybersecurity, Cloud architecture</p>
        <p><b>Learning Style:</b> Hands-on projects, Technical documentation, Online courses</p>
        <p><b>Tech Books:</b> Clean Code (Robert C. Martin), The Phoenix Project</p>
        <i>Growth comes from consistent small efforts over time. I dedicate time each week to learning new technologies and refining existing skills.</i>
      </>
    )
  }
];

const Toolbox = () => {
  const [activeItem, setActiveItem] = useState(null);
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  // Close modal when clicking escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setActiveItem(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  const circleVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.2, 0.5],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <WorkspaceContainer theme={theme}>
      {/* Animated background circles */}
      <Circle 
        className="circle1" 
        variants={circleVariants} 
        animate="animate"
        transition={{ duration: 8 }}
      />
      <Circle 
        className="circle2" 
        variants={circleVariants} 
        animate="animate"
        transition={{ duration: 12, delay: 1 }}
      />
      <Circle 
        className="circle3" 
        variants={circleVariants} 
        animate="animate"
        transition={{ duration: 10, delay: 2 }}
      />
      
      <Header>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {language === 'en' ? 'My Toolbox' : 'Ma Boîte à Outils'}
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {language === 'en' 
            ? 'A glimpse into the technologies and practices that power my development process'
            : 'Un aperçu des technologies et pratiques qui alimentent mon processus de développement'}
        </Subtitle>
      </Header>
      
      <Desk
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {toolItems.map((item, index) => (
          <ItemCard
            key={item.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveItem(item)}
          >
            <IconContainer>
              {item.icon}
            </IconContainer>
            <ItemLabel>
              {item.label}
            </ItemLabel>
          </ItemCard>
        ))}
      </Desk>
      
      <AnimatePresence>
        {activeItem && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
            />
            <DetailsBox>
              <DetailCard
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
              >
                {activeItem.content}
                <CloseButton 
                  onClick={() => setActiveItem(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              </DetailCard>
            </DetailsBox>
          </>
        )}
      </AnimatePresence>
    </WorkspaceContainer>
  );
};

export default Toolbox;
