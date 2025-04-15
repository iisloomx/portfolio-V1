import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'fr' : 'en');
  };

  const translations = {
    en: {
      // Hero Section
      greeting: "HELLO, I'M",
      title: "IT Student | Future System & Network Administrator",
      description: "I am a Computer Science student at IUT Paul Sabatier III, specializing in Deploying Secure and Communicative Applications (DACS). With a strong foundation in system administration, network security, and software development, I bring hands-on experience in Linux environments, database management (PL/SQL, Oracle), and full-stack development (Java, Python, PHP, and web technologies).\n\nThroughout my academic journey, I have configured and managed storage servers, developed scalable database-driven applications, and designed software architecture using UML. I thrive on solving complex technical challenges, optimizing systems for performance and security, and continuously learning new technologies.\n\nBeyond tech, I'm passionate about powerlifting, photography, and exploring new places—always seeking new challenges, both in and out of the digital world.",
      contactButton: "Contact Me",
      resumeButton: "Download CV",

      // Navigation
      navHome: "Home",
      navAbout: "About",
      navProjects: "Projects",
      navContact: "Contact",

      // About Section
      aboutTitle: "About Me",
      aboutDescription: "I've always been fascinated by how things work behind the scenes, whether it's servers, networks, or security systems. As a Computer Science student at IUT Paul Sabatier III, specializing in Deploying Secure and Communicative Applications (DACS), I focus on system administration, network security, and software development—but my real passion lies in cybersecurity.\n\nI enjoy exploring security vulnerabilities, writing scripts for automation and testing, and understanding how to reinforce system defenses. I've developed scripts for scanning and identifying security flaws, including SQL injection detection, and I love the challenge of making systems more secure and resilient.\n\nBeyond security, I have experience in Linux administration, database management (PL/SQL, Oracle), and full-stack development (Java, Python, PHP, and web technologies). Through my academic projects, I've deployed and managed servers, built database-driven applications, and designed software architectures using UML.\n\nOutside of tech, you'll find me lifting weights, capturing moments through photography, or diving into cybersecurity challenges. I'm always up for a conversation about security, ethical hacking, or the latest in tech—so let's connect!",

      // Projects Section
      projectsTitle: "My Projects",
      projectsDescription: "A collection of innovative projects showcasing my skills in web development, system administration, and software engineering.",

      // Contact Section
      contactTitle: "Get In Touch",
      contactDescription: "Feel free to reach out for collaboration or any inquiries.",
      contactFormName: "Your Name",
      contactFormEmail: "Your Email",
      contactFormMessage: "Your Message",
      contactFormSend: "Send Message",

      // Language Modal
      languageModalTitle: "Choose Language",
      languageEnglish: "English",
      languageFrench: "French",

      // Technical Skills Sections
      technicalSkillsTitle: "Technical Skills",
      technicalSkillsSubtitle: "Technologies I Work With",
      
      // Skill Categories
      programmingLanguages: "Programming Languages",
      webTechnologies: "Web Technologies",
      cloudAndDevOps: "Cloud & DevOps",
      databases: "Databases",
      tools: "Tools & Platforms",
      operatingSystems: 'Operating Systems',
      artificialIntelligence: 'AI & Machine Learning',
      cybersecurity: 'Cybersecurity & Ethical Hacking',
      vulnerabilityScanningTools: 'Vulnerability Scanning Tools',
      networkSecurityTools: 'Network Security Tools',
      securityAutomation: 'Security Automation',
      dataAnalytics: 'Data Analytics',
      containerization: 'Containerization',

      // Timeline/Experience Section
      timeline: [
        {
          title: "Computer Science Student",
          subtitle: "IUT Informatique, Paul Sabatier III",
          description: "Specializing in Deploying Secure and Communicative Applications (DACS)",
          date: "2025 - Present"
        },
        {
          title: "Internship - R&D Trainee",
          subtitle: "Insimo",
          description: "Worked in system administration (Linux), implemented a centralized logging system for Docker containers, Linux, and Windows logs; added SSH, port verification, and updates; worked with Grafana and InfluxDB for monitoring and visualization.",
          date: "2024"
        },
        {
          title: "Pre-University Studies",
          subtitle: "University of Limoges",
          description: "Gained a solid foundation in computer science principles, learned French language (B2), etc.",
          date: "2021 - 2023"
        },
        {
          title: "General Studies",
          subtitle: "Azan Bin Qais High School",
          description: "Gained a solid foundation in math, physics, chemistry, and biology.",
          date: "2019 - 2021"
        }
      ],
    },
    fr: {
      // Hero Section
      greeting: "BONJOUR, JE SUIS",
      title: "Étudiant en Informatique | Futur Administrateur Systèmes & Réseaux",
      description: "Actuellement étudiant en informatique à l'IUT Paul Sabatier III, je me spécialise dans le Déploiement d'Applications Communicantes et Sécurisées (DACS). Passionné par l'administration des systèmes, la sécurité des réseaux et le développement logiciel, je possède une solide expérience en gestion des environnements Linux, administration de bases de données (PL/SQL, Oracle), et développement full-stack (Java, Python, PHP et technologies web).\n\nAu cours de mon parcours académique, j'ai configuré et géré des serveurs de stockage, développé des applications basées sur des bases de données évolutives et conçu des architectures logicielles en UML. J'aime relever des défis techniques complexes, optimiser les systèmes pour plus de performance et de sécurité, et apprendre continuellement de nouvelles technologies.\n\nEn dehors de l'informatique, je suis passionné par le powerlifting, la photographie et les voyages, toujours à la recherche de nouveaux défis, que ce soit dans le monde numérique ou ailleurs.",
      contactButton: "Me Contacter",
      resumeButton: "Télécharger CV",

      // Navigation
      navHome: "Accueil",
      navAbout: "À Propos",
      navProjects: "Projets",
      navContact: "Contact",

      // About Section
      aboutTitle: "À Propos de Moi",
      aboutDescription: "J'ai toujours été fasciné par les coulisses des systèmes, qu'il s'agisse de serveurs, de réseaux ou de systèmes de sécurité. En tant qu'étudiant en informatique à l'IUT Paul Sabatier III, spécialisé dans le Déploiement d'Applications Communicantes et Sécurisées (DACS), je me concentre sur l'administration système, la sécurité réseau et le développement logiciel—mais ma véritable passion réside dans la cybersécurité.\n\nJ'aime explorer les vulnérabilités de sécurité, écrire des scripts d'automatisation et de test, et comprendre comment renforcer les défenses des systèmes. J'ai développé des scripts pour scanner et identifier les failles de sécurité, notamment la détection d'injections SQL, et j'adore le défi de rendre les systèmes plus sécurisés et résilients.\n\nAu-delà de la sécurité, j'ai de l'expérience en administration Linux, gestion de bases de données (PL/SQL, Oracle), et développement full-stack (Java, Python, PHP et technologies web). À travers mes projets académiques, j'ai déployé et géré des serveurs, construit des applications pilotées par des bases de données et conçu des architectures logicielles en UML.\n\nEn dehors de la tech, vous me trouverez en train de soulever des poids, de capturer des moments en photographie, ou de plonger dans des défis de cybersécurité. Je suis toujours prêt à discuter de sécurité, de hacking éthique ou des dernières innovations technologiques—alors connectons-nous !",

      // Projects Section
      projectsTitle: "Mes Projets",
      projectsDescription: "Une collection de projets innovants démontrant mes compétences en développement web, administration système et ingénierie logicielle.",

      // Contact Section
      contactTitle: "Contactez-Moi",
      contactDescription: "N'hésitez pas à me contacter pour une collaboration ou toute demande.",
      contactFormName: "Votre Nom",
      contactFormEmail: "Votre Email",
      contactFormMessage: "Votre Message",
      contactFormSend: "Envoyer Message",

      // Language Modal
      languageModalTitle: "Choisir la Langue",
      languageEnglish: "Anglais",
      languageFrench: "Français",

      // Technical Skills Sections
      technicalSkillsTitle: "Compétences Techniques",
      technicalSkillsSubtitle: "Technologies que j'utilise",
      
      // Skill Categories
      programmingLanguages: "Langages de Programmation",
      webTechnologies: "Technologies Web",
      cloudAndDevOps: "Cloud & DevOps",
      databases: "Bases de Données",
      tools: "Outils & Plateformes",
      operatingSystems: 'Systèmes d\'Exploitation',
      artificialIntelligence: 'IA et Apprentissage Automatique',
      cybersecurity: 'Cybersécurité et Hacking Éthique',
      vulnerabilityScanningTools: 'Outils de Scan de Vulnérabilités',
      networkSecurityTools: 'Outils de Sécurité Réseau',
      securityAutomation: 'Automatisation de la Sécurité',
      dataAnalytics: 'Analyse de Données',
      containerization: 'Conteneurisation',

      // Timeline/Experience Section
      timeline: [
        {
          title: "Étudiant en Informatique",
          subtitle: "IUT Informatique, Paul Sabatier III",
          description: "Spécialisation en Déploiement d'Applications Communicantes et Sécurisées (DACS)",
          date: "2025 - Présent"
        },
        {
          title: "Stage - Stagiaire R&D",
          subtitle: "Insimo",
          description: "Administration système Linux, mise en place d'un système centralisé pour les logs des conteneurs Docker, logs Linux et Windows ; ajout d'accès SSH, vérification des ports et des mises à jour ; travail avec Grafana et InfluxDB pour la supervision et la visualisation.",
          date: "2024"
        },
        {
          title: "Études Pré-Universitaires",
          subtitle: "Université de Limoges",
          description: "Acquisition d'une solide base en informatique, apprentissage du français (B2), etc.",
          date: "2021 - 2023"
        },
        {
          title: "Études Générales",
          subtitle: "Azan Bin Qais High School",
          description: "Bases solides en mathématiques, physique, chimie et biologie.",
          date: "2019 - 2021"
        }
      ],
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
