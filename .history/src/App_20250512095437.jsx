import { ThemeProvider as CustomThemeProvider, useTheme } from './context/ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { GlobalStyles } from './styles/GlobalStyles';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';
import Toolbox from './components/Toolbox/Toolbox';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import AnimatedBackground from './components/Background/AnimatedBackground';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiMoon, FiSun } from 'react-icons/fi';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

// ThemeSyncWrapper syncs theme from custom context to styled-components
function ThemeSyncWrapper({ children }) {
  const { theme } = useTheme();
  return (
    <StyledThemeProvider theme={{ mode: theme }}>
      {children}
    </StyledThemeProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <CustomThemeProvider>
        <ThemeSyncWrapper>
          <GlobalStyles />
          <BrowserRouter>
            <AnimatedBackground />
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/toolbox" element={<Toolbox />} />
              </Routes>
            </main>
            <Footer />
            <MobileControls />
            <ScrollToTop />
          </BrowserRouter>
        </ThemeSyncWrapper>
      </CustomThemeProvider>
    </LanguageProvider>
  );
}

export default App;
