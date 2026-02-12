# ⚡ Developer Portfolio

A technical-style personal portfolio website featuring immersive 3D visuals powered by Three.js, built with Vue 3 and TailwindCSS.

![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r170-000000?logo=three.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)

## ✨ Features

- **Interactive 3D Hero** — Wireframe icosahedron with orbiting torus rings and mouse-reactive camera
- **Particle Field Background** — 1500+ animated particles with connecting lines running across the entire page
- **3D Skills Orbit** — Tech skill names orbiting a central wireframe sphere
- **Wireframe Globe** — Rotating globe with glowing dots for the contact section
- **Terminal UI** — Animated typing effects with a fake terminal window
- **Dark Cyberpunk Theme** — Neon cyan/green accents, glassmorphism cards, and glow effects
- **Fully Responsive** — Balanced layout from mobile to ultrawide screens

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API) |
| 3D Graphics | Three.js |
| Styling | TailwindCSS v4 |
| Build Tool | Vite 7 |
| Animations | GSAP, CSS Keyframes |
| Utilities | VueUse (`useMouse`) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/taivt/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── three/               # Three.js 3D scene components
│   │   ├── ParticleField.vue    # Full-screen particle background
│   │   ├── HeroScene.vue        # Wireframe icosahedron + torus rings
│   │   ├── SkillsOrbit.vue      # Skills orbiting a sphere
│   │   └── ContactGlobe.vue     # Wireframe globe
│   ├── NavBar.vue               # Fixed glassmorphism navigation
│   ├── HeroSection.vue          # Hero with typing animation
│   ├── AboutSection.vue         # Terminal-style about section
│   ├── SkillsSection.vue        # Skills with 3D orbit + progress bars
│   ├── ProjectsSection.vue      # Project cards with 3D tilt
│   └── ContactSection.vue       # Contact with globe + links
├── composables/
│   └── useThreeScene.js     # Three.js scene lifecycle composable
├── style.css                # Global styles, neon effects, animations
├── App.vue                  # Root component
└── main.js                  # Entry point
```

## 🎨 Customization

### Personal Info

Update the following files with your own content:

- `HeroSection.vue` — Name, title, greeting text
- `AboutSection.vue` — Terminal bio, info cards
- `SkillsSection.vue` — Skill categories and levels
- `ProjectsSection.vue` — Project details, links, tech stacks
- `ContactSection.vue` — Email, GitHub, LinkedIn URLs

### Theme Colors

Edit CSS custom properties in `src/style.css`:

```css
@theme {
  --color-neon-cyan: #00f5ff;
  --color-neon-green: #39ff14;
  --color-neon-purple: #bf00ff;
  --color-neon-pink: #ff006e;
}
```

## 📄 License

MIT
