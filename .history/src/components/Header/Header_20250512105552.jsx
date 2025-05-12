import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGlobe, FiMoon, FiSun, FiSun as FiLight, FiMoon as FiDark, FiTool } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.scrolled ? 'var(--card-bg)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(16px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.scrolled ? 'blur(16px)' : 'none'};
  border-bottom: ${props => props.scrolled ? '1px solid var(--glass-border)' : 'none'};
  box-shadow: ${props => props.scrolled ? '0 4px 30px rgba(0, 0, 0, 0.05)' : 'none'};
  transition: all 0.4s ease;
  padding-bottom: 0;
`;

const Nav = styled.nav`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(RouterLink)`
  font-size: 1.8rem;
  font-weight: var(--font-weight-bold);
  color: var(--text);
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  position: relative;
  overflow: hidden;
  display: inline-block;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  margin-left: auto;
  padding-right: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(RouterLink)`
  color: var(--text);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  font-size: 1rem;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  &:hover::after, &.active::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  &.active {
    color: var(--primary);
  }
`;

const LanguageToggleButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  
  &:hover {
    color: var(--primary);
    background: rgba(var(--primary-rgb), 0.1);
  }
`;

const ThemeToggleButton = styled(motion.button)`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--card-bg);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  padding: 0;
  margin-left: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-3px);
    color: var(--primary);
    border-color: var(--primary);
    box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.25);
  }

  .icon-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  .sun-icon {
    transform: ${props => props.theme === 'dark' ? 'translate(-50%, -50%) rotate(0)' : 'translate(-50%, -150%) rotate(-180deg)'};
    opacity: ${props => props.theme === 'dark' ? 1 : 0};
  }

  .moon-icon {
    transform: ${props => props.theme === 'light' ? 'translate(-50%, -50%) rotate(0)' : 'translate(-50%, 50%) rotate(180deg)'};
    opacity: ${props => props.theme === 'light' ? 1 : 0};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  color: var(--text);
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 1000;
`;

const MobileNavLink = styled(NavLink)`
  font-size: 1.5rem;
`;

const LanguageModal = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  padding: 2rem;
  z-index: 1100;
  max-width: 400px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h2 {
    margin-bottom: 1rem;
    color: var(--text);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;

const LanguageButton = styled(motion.button)`
  background: ${props => props.active ? 'var(--primary)' : 'var(--background-secondary)'};
  color: ${props => props.active ? 'white' : 'var(--text)'};
  border: none;
  padding: 1rem 2rem;
  margin: 0.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 80%;
  
  &:hover {
    transform: scale(1.05);
    background: ${props => props.active ? 'var(--accent)' : 'var(--primary-light)'};
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, translations } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { label: language === 'en' ? translations.en.navHome : translations.fr.navHome, to: '/', isRoute: true },
    { label: language === 'en' ? translations.en.navAbout : translations.fr.navAbout, to: '/about', isRoute: true },
    { label: language === 'en' ? translations.en.navProjects : translations.fr.navProjects, to: '/projects', isRoute: true },
    { label: (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <FiTool style={{ marginRight: '0.32em' }} />
          {language === 'en' ? 'Toolbox' : 'Boîte à Outils'}
        </span>
      ), to: '/toolbox', isRoute: true }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageSelect = (selectedLang) => {
    if (language !== selectedLang) {
      toggleLanguage();
    }
    setIsLanguageModalOpen(false);
  };

  return (
    <>
      <HeaderContainer 
        scrolled={isScrolled}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Nav>
          <Logo 
            to="#home" 
          >
            Salim
          </Logo>
          
          <NavLinks>
            {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  style={{
                    textDecoration: 'none',
                    marginLeft: '1rem',
                    color: location.pathname === link.to ? 'var(--primary)' : 'var(--text)',
                    fontWeight: location.pathname === link.to ? 700 : 500,
                    letterSpacing: link.to === '/toolbox' ? '0.02em' : undefined,
                    filter: location.pathname === link.to && link.to === '/toolbox' ? 'drop-shadow(0 0 6px #a259f7cc)' : undefined
                  }}
                >
                  {link.label}
                </NavLink>
            ))}
            <ThemeToggleButton
              onClick={toggleTheme}
              theme={theme}
            >
              <div className="icon-container">
                <FiSun className="sun-icon" />
                <FiMoon className="moon-icon" />
              </div>
            </ThemeToggleButton>
            <LanguageToggleButton
              onClick={() => setIsLanguageModalOpen(true)}
              whileTap={{ scale: 0.9 }}
            >
              <FiGlobe />
            </LanguageToggleButton>
          </NavLinks>
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </Nav>
      </HeaderContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <MobileNavLink 
                key={index} 
                to={link.to}
              >
                {link.label}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLanguageModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLanguageModalOpen(false)}
          >
            <LanguageModal
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{language === 'en' ? 'Choose Language' : 'Choisir la Langue'}</h2>
              <LanguageButton 
                active={language === 'en'}
                onClick={() => handleLanguageSelect('en')}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'en' ? 'English' : 'Anglais'}
              </LanguageButton>
              <LanguageButton 
                active={language === 'fr'}
                onClick={() => handleLanguageSelect('fr')}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'en' ? 'French' : 'Français'}
              </LanguageButton>
            </LanguageModal>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
