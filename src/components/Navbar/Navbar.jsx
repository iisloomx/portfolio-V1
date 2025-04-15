import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiUser, FiCode, FiTool, FiMail } from 'react-icons/fi';

const Navbar = () => {
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
    <nav>
      <div>
        <h1 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 900,
          fontSize: '2.1rem',
          letterSpacing: '0.03em',
          color: 'var(--primary)',
          textShadow: '0 2px 16px rgba(124,58,237,0.13)'
        }}>Salim Al-Naaimi</h1>
        <button onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
        <AnimatePresence>
          {isOpen && (
            <div
              onClick={closeMenu}
            />
          )}
        </AnimatePresence>
        <div
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
        >
          <Link to="home" smooth={true} duration={500} onClick={closeMenu} style={{ color: 'var(--text)' }}>
            <FiHome /> Home
          </Link>
          <Link to="about" smooth={true} duration={500} onClick={closeMenu} style={{ color: 'var(--text)' }}>
            <FiUser /> About
          </Link>
          <Link to="projects" smooth={true} duration={500} onClick={closeMenu} style={{ color: 'var(--text)' }}>
            <FiCode /> Projects
          </Link>
          <Link to="toolbox" smooth={true} duration={500} onClick={closeMenu} style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.02em' }}>
            <FiTool style={{ color: 'var(--primary)', filter: 'drop-shadow(0 0 6px #a259f7cc)' }} /> My Toolbox
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
