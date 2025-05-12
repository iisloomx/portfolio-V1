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
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${props => props.scrolled ? '1px solid var(--card-border)' : 'none'};
  transition: all 0.3s ease;
  padding-bottom: 0;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  transition: color 0.3s ease;
  margin-bottom: 0.5rem;

  &:hover {
    color: var(--primary);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-left: auto;
  padding-right: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.25rem 0;
  transition: all 0.3s ease;
  position: relative;
  margin-left: 1rem;

  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 1px;
    background: var(--primary);
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }

  &.active {
    color: var(--primary);

    &:after {
      width: 100%;
      background: var(--primary);
    }
  }
`;

const LanguageToggleButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  margin-left: 1rem;
  
  &:hover {
    color: var(--primary);
  }
`;

const ThemeToggleButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--card-bg);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid var(--card-border);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  padding: 0;
  margin-left: 1rem;

  &:hover {
    color: var(--primary);
    border-color: var(--primary);
    box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.3);
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
    transition: all 0.3s ease;
  }

  .sun-icon {
    transform: ${props => props.theme === 'dark' ? 'translate(-50%, -50%)' : 'translate(-50%, -150%)'};
    opacity: ${props => props.theme === 'dark' ? 1 : 0};
  }

  .moon-icon {
    transform: ${props => props.theme === 'light' ? 'translate(-50%, -50%)' : 'translate(-50%, 50%)'};
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
        <span style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.02em', display: 'flex', alignItems: 'center' }}>
          <FiTool style={{ color: 'var(--primary)', marginRight: '0.32em', filter: 'drop-shadow(0 0 6px #a259f7cc)' }} />
          My Toolbox
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
            href="#home" 
          >
            Salim
          </Logo>
          
          <NavLinks>
            {navLinks.map((link, index) => (
                <RouterLink
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
                </RouterLink>
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
                href={link.to}
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
