import styled from "styled-components";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 2rem 4rem;
  position: relative;
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

const NameHeading = styled.h1`
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 2rem;
  color: var(--text);
`;

const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: var(--text-secondary);
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: transparent;
  color: var(--text);
  border: 2px solid var(--primary);
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    background: var(--primary);
    color: white;
  }
`;

function Hero() {
  const { language, translations } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];

  return (
    <HeroSection id="home" theme={theme}>
      <Container>
        <Content>
          <NameHeading>Salim Al-Naaimi</NameHeading>
          <Title>{t.title}</Title>
          <Description>{t.description.split("\n\n")[0]}</Description>
          <Button href="/CV.pdf" download>
            {t.resumeButton} <FiDownload />
          </Button>
        </Content>
      </Container>
    </HeroSection>
  );
}

export default Hero;


