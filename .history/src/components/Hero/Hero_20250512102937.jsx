import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback } from "react";
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 6rem 2rem 4rem;
  overflow: hidden;
  background: ${props => props.theme === 'dark' ? `
    radial-gradient(circle at 20% 20%, rgba(var(--primary-rgb), 0.15) 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(var(--accent-rgb), 0.1) 0%, transparent 40%)
  ` : `
    radial-gradient(circle at 20% 20%, rgba(var(--primary-rgb), 0.07) 0%, transparent 30%),
    radial-gradient(circle at 80% 80%, rgba(var(--accent-rgb), 0.05) 0%, transparent 30%)
  `};

  @media (max-width: 768px) {
    padding: 5rem 1.5rem 3rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Content = styled(motion.div)`
  max-width: 800px;
`;

const Greeting = styled(motion.span)`
  display: inline-block;
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--accent);
  margin-bottom: 1.2rem;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  position: relative;
  padding-left: 3rem;
  
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 2.5rem;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    transform: translateY(-50%);
  }
`;

const Name = styled(motion.h1)`
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  margin-bottom: 1.2rem;
  font-weight: var(--font-weight-extrabold);
  line-height: 1.1;
  color: var(--text);
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  letter-spacing: -0.02em;
  filter: drop-shadow(0 2px 10px rgba(var(--primary-rgb), 0.3));
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 2rem;
  color: var(--text);
  font-weight: var(--font-weight-semibold);
  max-width: 800px;
`;

const Description = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  margin-bottom: 3rem;
  color: var(--text-secondary);
  max-width: 750px;
  line-height: 1.7;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -1.5rem;
    left: 0;
    width: 5rem;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--primary), transparent);
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 2.5rem;
`;

const Button = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  border-radius: 3rem;
  font-weight: var(--font-weight-semibold);
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  z-index: 1;

  svg {
    transition: transform 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  }

  &.primary {
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    color: white;
    box-shadow: 0 10px 25px -5px rgba(var(--primary-rgb), 0.4);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px -5px rgba(var(--primary-rgb), 0.6);

      svg {
        transform: translateX(5px) scale(1.2);
      }
    }
  }

  &.secondary {
    background: transparent;
    color: var(--text);
    border: 2px solid var(--primary);
    position: relative;
    overflow: hidden;
    z-index: 1;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
      z-index: -1;
      transition: width 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    }

    &:hover {
      color: white;
      transform: translateY(-5px);
      border-color: transparent;
      box-shadow: 0 15px 30px -5px rgba(var(--primary-rgb), 0.4);
      
      &::before {
        width: 100%;
      }

      svg {
        transform: translateY(-3px) scale(1.2);
        color: white;
      }
    }
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

function Hero() {
  const { language, translations } = useLanguage();
  const { theme } = useTheme();
  
  const t = translations[language];

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // console.log(container); // Removed log
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
        stiffness: 70,
        damping: 15 
      }
    }
  };

  return (
    <HeroSection id="home" theme={theme}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: false },
          fpsLimit: 120,
          particles: {
            number: { 
              value: 80, 
              density: { enable: true, value_area: 800 } 
            },
            color: { value: "var(--primary)" },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "var(--primary-light)"
              }
            },
            opacity: { 
              value: 0.5, 
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
              color: "var(--primary)", 
              opacity: 0.4, 
              width: 1
            },
            move: { 
              enable: true, 
              speed: 1, 
              direction: "none", 
              random: false, 
              straight: false, 
              out_mode: "out",
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
              }
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
                particles_nb: 4
              }
            }
          },
          retina_detect: true
        }}
      />
      <Container>
        <Content 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Greeting variants={itemVariants}>
            {t.greeting}
          </Greeting>
          <Name variants={itemVariants}>
            Salim Al-Naaimi
          </Name>
          <Title variants={itemVariants}>
            {t.title}
          </Title>
          <Description variants={itemVariants}>
            {t.description.split('\n\n')[0]}
          </Description>
          <ButtonContainer 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Button 
              href="/CV.pdf" 
              download 
              className="secondary"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.resumeButton} <FiDownload />
            </Button>
          </ButtonContainer>
        </Content>
      </Container>
    </HeroSection>
  );
}

export default Hero;
