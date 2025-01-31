import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const FooterContainer = styled.footer`
  background: var(--card-bg);
  border-top: none; /* Remove any top border */
  padding: 2rem 0;
  margin-top: 4rem;
  width: 100vw; /* Ensure full width */
  position: relative;
  left: 0;
  right: 0;
  box-sizing: border-box;
  overflow: hidden; /* Prevent overflow */
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right, 
      transparent, 
      var(--primary), 
      transparent
    );
  }
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column; /* Ensures proper alignment */
  align-items: center;
  text-align: center;
  gap: 1rem;
  position: relative;
`;

const Copyright = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center; /* Center the links properly */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
`;

const FooterLink = styled(motion.a)`
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary);
  }
`;

function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          {currentYear} {language === 'en' 
            ? 'Salim. All rights reserved.' 
            : 'Salim. Tous droits réservés.'}
        </Copyright>
        <FooterLinks>
          <FooterLink
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === 'en' ? 'Privacy Policy' : 'Politique de Confidentialité'}
          </FooterLink>
          <FooterLink
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === 'en' ? 'Terms of Service' : 'Conditions d\'Utilisation'}
          </FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
