import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLaptopCode, FaCoffee, FaBook, FaHeadphones, FaStickyNote, FaMobileAlt, FaSeedling } from 'react-icons/fa';

const deskItems = [
  {
    id: 'laptop',
    icon: <FaLaptopCode />,
    label: 'Laptop',
    content: (
      <>
        <b>Languages & Tools:</b> Python, PHP, JS<br/>
        <b>Frameworks/Tools:</b> Docker, Elasticsearch (ELK Stack), Kali linux<br/>
        <b>IDE/Editor:</b> Windsurf<br/>
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
    label: 'Book',
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
    label: 'Headphones',
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
    label: 'Sticky Note',
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
    label: 'Phone',
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
    label: 'Plant',
    content: (
      <>
        <b>Growth Metaphor:</b> Consistent small efforts lead to big growth—professionally and personally.<br/>
        <b>Work-Life Balance:</b> Balancing network cables and hiking trails.<br/>
        <i>Rooted in growth, balance, and continuous learning.</i>
      </>
    )
  }
];

const DeskContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 3rem 1rem;
`;

const DeskRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.2rem;
  background: var(--card-bg);
  border-radius: 2.5rem;
  box-shadow: 0 8px 32px rgba(var(--primary-rgb), 0.10), 0 2px 16px rgba(124,58,237,0.08);
  padding: 2.5rem 3.5rem;
  margin-top: 2rem;
  position: relative;
`;

const DeskItem = styled(motion.button)`
  background: none;
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: var(--primary);
  font-size: 2.3rem;
  transition: transform 0.18s, box-shadow 0.18s;
  border-radius: 1.2rem;
  padding: 0.7rem 0.5rem;
  position: relative;
  &:hover {
    background: rgba(var(--primary-rgb), 0.10);
    box-shadow: 0 0 16px 2px var(--primary);
    transform: translateY(-7px) scale(1.06);
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 220px;
  background: var(--card-bg);
  border: 2px solid var(--glass-border);
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px rgba(var(--primary-rgb), 0.14);
  padding: 1.1rem 1.3rem;
  color: var(--text);
  z-index: 10;
  font-size: 1rem;
  pointer-events: auto;
  @media (max-width: 700px) {
    min-width: 170px;
    font-size: 0.93rem;
  }
`;

const Toolbox = () => {
  const [active, setActive] = useState(null);
  return (
    <DeskContainer>
      <h2 style={{ color: 'var(--primary)', letterSpacing: '0.04em', fontWeight: 800 }}>
        My Toolbox
      </h2>
      <DeskRow>
        {deskItems.map(item => (
          <DeskItem
            key={item.id}
            onClick={() => setActive(active === item.id ? null : item.id)}
            aria-label={item.label}
            tabIndex={0}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            {item.icon}
            <span style={{ fontSize: '0.98rem', color: 'var(--text)', marginTop: '0.4rem' }}>{item.label}</span>
            <AnimatePresence>
              {active === item.id && (
                <Tooltip
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.23 }}
                >
                  {item.content}
                </Tooltip>
              )}
            </AnimatePresence>
          </DeskItem>
        ))}
      </DeskRow>
    </DeskContainer>
  );
};

export default Toolbox;
