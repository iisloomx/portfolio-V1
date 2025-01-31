import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { GlobalStyles } from './styles/GlobalStyles';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiMoon, FiSun } from 'react-icons/fi';

const MobileControlsContainer = styled(motion.div)`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: none;
  justify-content: space-between;
  z-index: 1000;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileControlButton = styled(motion.button)`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(var(--background-rgb), 0.8);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(var(--text-rgb), 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-size: 0.8rem;
  font-weight: 600;

  svg {
    font-size: 1rem;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const MobileControls = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <MobileControlsContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MobileControlButton
        onClick={toggleLanguage}
        whileTap={{ scale: 0.9 }}
      >
        {language === 'en' ? 'FR' : 'EN'}
      </MobileControlButton>
      <MobileControlButton
        onClick={toggleTheme}
        whileTap={{ scale: 0.9 }}
      >
        {theme === 'light' ? <FiMoon /> : <FiSun />}
      </MobileControlButton>
    </MobileControlsContainer>
  );
};

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <GlobalStyles />
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <MobileControls />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
