# Portfolio (React + Vite + Tailwind)

Modern, responsive frontend developer portfolio with:

- Dark mode toggle (persisted)
- Smooth scrolling
- Lazy-loaded sections with skeleton fallbacks
- Project filtering
- Contact form validation
- Subtle reveal animations on scroll

## Folder structure

```
src/
  components/
    Badge.jsx
    Button.jsx
    Container.jsx
    FormFields.jsx
    Navbar.jsx
    ProjectCard.jsx
    Section.jsx
    Skeletons.jsx
  data/
    profile.js
  hooks/
    useDarkMode.js
    useReveal.js
  sections/
    About.jsx
    Contact.jsx
    Experience.jsx
    Hero.jsx
    Projects.jsx
    Skills.jsx
  utils/
    cn.js
  App.jsx
  index.css
  main.jsx
```

## Run locally

```bash
npm install
npm run dev
```

## Customize content

Edit `src/data/profile.js`:

- `profile`: name/title/location/email/social links
- `projects`: titles, descriptions, stack, demo/GitHub links, tags (used for filtering)
- `skills`: skill names + levels
- `timeline`: experience/education entries

## Notes (Tailwind)

This project uses Tailwind via **CDN** in `index.html` because the npm registry was unreachable during setup.
If you want the standard Tailwind build pipeline later, install Tailwind + PostCSS and replace the CDN script.
