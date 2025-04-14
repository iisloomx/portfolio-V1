import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback } from "react";
import { useLanguage } from '../../context/LanguageContext';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 3rem 2rem 2rem;
  overflow: hidden;
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
  margin-bottom: 1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Name = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 5rem);
  margin-bottom: 1rem;
  font-weight: 800;
  line-height: 1.1;
  color: var(--text);
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 2rem;
  color: var(--text);
  font-weight: 600;
`;

const Description = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 2.5rem;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.6;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const Button = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  z-index: 1;

  svg {
    transition: transform 0.3s ease;
  }

  &.primary {
    background: var(--primary);
    color: white;
    box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);

    &:hover {
      transform: translateY(-2px);
      background: var(--accent);
      box-shadow: 0 6px 20px rgba(var(--accent-rgb), 0.4);

      svg {
        transform: translateX(4px);
      }
    }
  }

  &.secondary {
    background: transparent;
    color: var(--text);
    border: 2px solid var(--primary);

    &:hover {
      background: var(--primary);
      color: white;
      transform: translateY(-2px);

      svg {
        transform: translateY(2px);
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
  
  const t = translations[language];

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
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
        stiffness: 100 
      }
    }
  };

  return (
    <HeroSection id="home">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "var(--accent)" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "var(--accent)", opacity: 0.4 },
            move: { enable: true, speed: 1, direction: "none", random: false, straight: false, out_mode: "out" }
          }
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
            {t.description}
          </Description>
          <ButtonContainer 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Button 
              href="#contact" 
              className="primary"
              variants={itemVariants}
            >
              {t.contactButton} <FiArrowRight />
            </Button>
            <Button 
              href="../CV.pdf" 
              download 
              className="secondary"
              variants={itemVariants}
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
