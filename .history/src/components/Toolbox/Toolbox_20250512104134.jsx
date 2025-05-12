import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLaptopCode, FaCoffee, FaBook, FaHeadphones, FaStickyNote, FaMobileAlt, FaSeedling } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const ToolboxContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 1.5rem;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme === 'dark' ? `
    radial-gradient(circle at 30% 20%, rgba(var(--primary-rgb), 0.15) 0%, transparent 40%),
    radial-gradient(circle at 70% 80%, rgba(var(--accent-rgb), 0.1) 0%, transparent 40%)
  ` : `
    radial-gradient(circle at 30% 20%, rgba(var(--primary-rgb), 0.07) 0%, transparent 30%),
    radial-gradient(circle at 70% 80%, rgba(var(--accent-rgb), 0.05) 0%, transparent 30%)
  `};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
`;

const Title = styled(motion.h2)`
  color: var(--primary);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
  font-weight: var(--font-weight-extrabold);
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  letter-spacing: -0.02em;
`;

const Description = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
`;

const ToolsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ToolItem = styled(motion.div)`
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 1.2rem;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 20px rgba(var(--primary-rgb), 0.1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(var(--primary-rgb), 0.2);
    border-color: var(--primary);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
`;

const IconContainer = styled.div`
  font-size: 3rem;
  color: var(--primary);
  margin-bottom: 1.2rem;
  background: rgba(var(--primary-rgb), 0.1);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  ${ToolItem}:hover & {
    color: white;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    transform: scale(1.1) rotate(5deg);
  }
`;

const Label = styled.h3`
  font-size: 1.3rem;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 1rem;
  color: var(--text);
`;

const Content = styled.div`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  
  b {
    color: var(--primary);
    font-weight: var(--font-weight-semibold);
  }
  
  i {
    opacity: 0.85;
    font-style: italic;
    display: block;
    margin-top: 0.8rem;
  }
`;

const Toolbox = () => {
  const { language, translations } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];

  // Les données des outils avec support multilingue
  const toolItems = {
    en: [
      {
        id: 'laptop',
        icon: <FaLaptopCode />,
        label: 'Tech Stack',
        content: (
          <>
            <b>Languages & Tools:</b> Python, PHP, JS<br/>
            <b>Frameworks/Tools:</b> Docker, Elasticsearch, Kali Linux<br/>
            <b>IDE/Editor:</b> VS Code<br/>
            <i>A passionate system & network admin with a knack for cybersecurity and system monitoring.</i>
          </>
        )
      },
      {
        id: 'coffee',
        icon: <FaCoffee />,
        label: 'Coffee Mug',
        content: (
          <>
            <b>Productivity Habit:</b> First coffee, then Docker-compose up.<br/>
            <b>Favorite Coding Snacks:</b> Nuts and dark chocolate<br/>
            <b>Quote:</b> Turning caffeine into code since 2021.
          </>
        )
      },
      {
        id: 'book',
        icon: <FaBook />,
        label: 'Learning',
        content: (
          <>
            <b>Tech Book:</b> Clean Code by Robert C. Martin<br/>
            <b>Non-tech Influence:</b> Atomic Habits by James Clear<br/>
            <i>Believer in building effective habits, both in coding and life.</i>
          </>
        )
      },
      {
        id: 'headphones',
        icon: <FaHeadphones />,
        label: 'Music',
        content: (
          <>
            <b>Coding Playlist:</b> Cigarettes After Sex, Lo-fi beats<br/>
            <b>Podcast/Genre:</b> Cybersecurity podcasts, Dark gothic playlists<br/>
            <i>Music is my coding companion; dark vibes and calm tunes help me dive deep.</i>
          </>
        )
      },
      {
        id: 'sticky',
        icon: <FaStickyNote />,
        label: 'Philosophy',
        content: (
          <>
            <b>Personal Motto:</b> Less is more. Keep it simple and secure.<br/>
            <i>Focused on clarity, minimalism, and security.</i>
          </>
        )
      },
      {
        id: 'phone',
        icon: <FaMobileAlt />,
        label: 'Contact',
        content: (
          <>
            <b>Always on call for new opportunities!</b><br/>
            <i>Connecting with tech and people—sometimes both at once.</i>
          </>
        )
      },
      {
        id: 'plant',
        icon: <FaSeedling />,
        label: 'Growth',
        content: (
          <>
            <b>Growth Metaphor:</b> Consistent small efforts lead to big growth.<br/>
            <b>Work-Life Balance:</b> Balancing network cables and hiking trails.<br/>
            <i>Rooted in growth, balance, and continuous learning.</i>
          </>
        )
      }
    ],
    fr: [
      {
        id: 'laptop',
        icon: <FaLaptopCode />,
        label: 'Tech Stack',
        content: (
          <>
            <b>Langages & Outils:</b> Python, PHP, JS<br/>
            <b>Frameworks/Outils:</b> Docker, Elasticsearch, Kali Linux<br/>
            <b>IDE/Éditeur:</b> VS Code<br/>
            <i>Un administrateur systèmes & réseaux passionné avec un talent pour la cybersécurité et la supervision système.</i>
          </>
        )
      },
      {
        id: 'coffee',
        icon: <FaCoffee />,
        label: 'Café',
        content: (
          <>
            <b>Habitude productive:</b> D'abord le café, ensuite docker-compose up.<br/>
            <b>Collations préférées:</b> Noix et chocolat noir<br/>
            <b>Citation:</b> Transformer la caféine en code depuis 2021.
          </>
        )
      },
      {
        id: 'book',
        icon: <FaBook />,
        label: 'Apprentissage',
        content: (
          <>
            <b>Livre tech:</b> Clean Code de Robert C. Martin<br/>
            <b>Influence non-tech:</b> Atomic Habits de James Clear<br/>
            <i>Adepte de la construction d'habitudes efficaces, tant en programmation que dans la vie.</i>
          </>
        )
      },
      {
        id: 'headphones',
        icon: <FaHeadphones />,
        label: 'Musique',
        content: (
          <>
            <b>Playlist de codage:</b> Cigarettes After Sex, Lo-fi beats<br/>
            <b>Podcast/Genre:</b> Podcasts de cybersécurité, Playlists gothic<br/>
            <i>La musique est ma compagne de codage; les ambiances sombres et les mélodies calmes m'aident à plonger en profondeur.</i>
          </>
        )
      },
      {
        id: 'sticky',
        icon: <FaStickyNote />,
        label: 'Philosophie',
        content: (
          <>
            <b>Devise personnelle:</b> Le moins est le mieux. Garder les choses simples et sécurisées.<br/>
            <i>Concentré sur la clarté, le minimalisme et la sécurité.</i>
          </>
        )
      },
      {
        id: 'phone',
        icon: <FaMobileAlt />,
        label: 'Contact',
        content: (
          <>
            <b>Toujours disponible pour de nouvelles opportunités!</b><br/>
            <i>Connecter la technologie aux personnes—parfois les deux à la fois.</i>
          </>
        )
      },
      {
        id: 'plant',
        icon: <FaSeedling />,
        label: 'Croissance',
        content: (
          <>
            <b>Métaphore de croissance:</b> Des efforts constants mènent à une grande évolution.<br/>
            <b>Équilibre vie-travail:</b> Équilibrer câbles réseau et sentiers de randonnée.<br/>
            <i>Enraciné dans la croissance, l'équilibre et l'apprentissage continu.</i>
          </>
        )
      }
    ]
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <ToolboxContainer theme={theme}>
      <Header>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {language === 'en' ? 'My Toolbox' : 'Ma Boîte à Outils'}
        </Title>
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {language === 'en' 
            ? 'A peek into my digital workspace and the tools that fuel my passion for technology.'
            : 'Un aperçu de mon espace de travail numérique et des outils qui alimentent ma passion pour la technologie.'}
        </Description>
      </Header>
      
      <ToolsGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {toolItems[language].map((item) => (
          <ToolItem
            key={item.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <IconContainer>{item.icon}</IconContainer>
            <Label>{item.label}</Label>
            <Content>{item.content}</Content>
          </ToolItem>
        ))}
      </ToolsGrid>
    </ToolboxContainer>
  );
};

export default Toolbox;
