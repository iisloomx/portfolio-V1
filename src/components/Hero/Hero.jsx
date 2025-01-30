import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback } from "react";

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2rem;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Content = styled.div`
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

const Hero = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#38bdf8"
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5,
        random: true
      },
      size: {
        value: 3,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#38bdf8",
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
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
            opacity: 0.5
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };

  return (
    <HeroSection id="home">
      <ParticlesContainer>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesConfig}
        />
      </ParticlesContainer>
      <Container>
        <Content>
          <Greeting
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hello, I'm
          </Greeting>
          <Name
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Salim Al-Naaimi
          </Name>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Computer Science Student & System Administrator
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Specializing in Déploiement d'Applications Communicantes et Sécurisées (DACS).
            Passionate about system administration, network security, and creating efficient solutions.
          </Description>
          <ButtonContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              href="#contact"
              className="primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch <FiArrowRight />
            </Button>
            <Button
              href="/resume.pdf"
              className="secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV <FiDownload />
            </Button>
          </ButtonContainer>
        </Content>
      </Container>
    </HeroSection>
  );
};

export default Hero;
