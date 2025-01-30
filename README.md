# Salim Al-Naaimi Portfolio

A modern, responsive portfolio website built with React and Vite, featuring a clean design and smooth animations.

## Features

- Dark/Light mode support
- Fully responsive design
- Modern UI with smooth animations
- Fast performance
- Smooth scrolling navigation

## Tech Stack

- React (Vite)
- Styled Components
- Framer Motion
- React Icons
- React Scroll

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd salim-portfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Navbar/
│   ├── Hero/
│   ├── About/
│   ├── Projects/
│   ├── Contact/
│   └── Footer/
├── context/
│   └── ThemeContext.jsx
├── styles/
│   └── GlobalStyles.js
├── App.jsx
└── main.jsx
```

## Customization

- Theme colors can be modified in `src/styles/GlobalStyles.js`
- Project data can be updated in `src/components/Projects/Projects.jsx`
- Contact information can be updated in `src/components/Contact/Contact.jsx`

## License

This project is licensed under the MIT License.
