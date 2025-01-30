import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

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
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
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

  &:hover {
    color: var(--primary);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-left: auto;
  padding-right: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem;
  transition: all 0.3s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s ease;
  }

  &:hover {
    color: var(--primary);
    
    &:after {
      width: 100%;
    }
  }

  &.active {
    color: var(--primary);
    &:after {
      width: 100%;
    }
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

  @media (max-width: 768px) {
    margin-right: 1rem;
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

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      }) || 'home';
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
      setActiveSection(sectionId);
    }
  };

  return (
    <HeaderContainer
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav>
        <Logo href="#" onClick={() => scrollToSection('home')}>Salim</Logo>
        <NavLinks>
          <NavLink 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className={activeSection === 'home' ? 'active' : ''}
          >
            Home
          </NavLink>
          <NavLink 
            href="#about" 
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            className={activeSection === 'about' ? 'active' : ''}
          >
            About
          </NavLink>
          <NavLink 
            href="#projects" 
            onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
            className={activeSection === 'projects' ? 'active' : ''}
          >
            Projects
          </NavLink>
          <NavLink 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            className={activeSection === 'contact' ? 'active' : ''}
          >
            Contact
          </NavLink>
        </NavLinks>
        <ThemeToggleButton
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          theme={theme}
        >
          <div className="icon-container">
            <motion.div
              className="sun-icon"
              initial={false}
              animate={{ 
                y: theme === 'dark' ? 0 : -30,
                opacity: theme === 'dark' ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <FiSun />
            </motion.div>
            <motion.div
              className="moon-icon"
              initial={false}
              animate={{ 
                y: theme === 'light' ? 0 : 30,
                opacity: theme === 'light' ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <FiMoon />
            </motion.div>
          </div>
        </ThemeToggleButton>
        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </Nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MobileNavLink 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            >
              Home
            </MobileNavLink>
            <MobileNavLink 
              href="#about" 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              About
            </MobileNavLink>
            <MobileNavLink 
              href="#projects" 
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
            >
              Projects
            </MobileNavLink>
            <MobileNavLink 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            >
              Contact
            </MobileNavLink>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
