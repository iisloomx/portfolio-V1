import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiHome, FiUser, FiCode, FiMail } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: ${({ scrolled }) => scrolled ? 'rgba(var(--background-rgb), 0.8)' : 'transparent'};
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${({ scrolled }) => scrolled ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'};
  z-index: 1000;
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.h1)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  cursor: pointer;
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    flex-direction: column;
    background: var(--background);
    padding: 6rem 2rem;
    z-index: 90;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  color: var(--text);
  padding: 0.5rem;
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s ease;
  }

  &:hover {
    color: var(--primary);
    &::after {
      width: 100%;
    }
  }

  &.active {
    color: var(--primary);
    &::after {
      width: 100%;
    }
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ThemeToggle = styled(motion.button)`
  background: none;
  color: var(--text);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary);
  }
`;

const MenuButton = styled(motion.button)`
  display: none;
  background: none;
  color: var(--text);
  font-size: 1.5rem;
  z-index: 100;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled(motion.div)`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 80;
  }
`;

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <Nav
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContainer>
        <Logo
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Salim Al-Naaimi
        </Logo>
        <MenuButton
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </MenuButton>
        <AnimatePresence>
          {isOpen && (
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
          )}
        </AnimatePresence>
        <NavLinks
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
        >
          <NavLink to="home" smooth={true} duration={500} onClick={closeMenu}>
            <FiHome /> Home
          </NavLink>
          <NavLink to="about" smooth={true} duration={500} onClick={closeMenu}>
            <FiUser /> About
          </NavLink>
          <NavLink to="projects" smooth={true} duration={500} onClick={closeMenu}>
            <FiCode /> Projects
          </NavLink>
          <NavLink to="contact" smooth={true} duration={500} onClick={closeMenu}>
            <FiMail /> Contact
          </NavLink>
          <ThemeToggle
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </ThemeToggle>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
