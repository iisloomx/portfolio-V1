import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiUser, FiCode, FiMail } from 'react-icons/fi';

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
        <h1>Salim Al-Naaimi</h1>
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
          <Link to="home" smooth={true} duration={500} onClick={closeMenu}>
            <FiHome /> Home
          </Link>
          <Link to="about" smooth={true} duration={500} onClick={closeMenu}>
            <FiUser /> About
          </Link>
          <Link to="projects" smooth={true} duration={500} onClick={closeMenu}>
            <FiCode /> Projects
          </Link>
          <Link to="contact" smooth={true} duration={500} onClick={closeMenu}>
            <FiMail /> Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
