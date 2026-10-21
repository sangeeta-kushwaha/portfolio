/**
 * Edit this file to update the portfolio.
 * Leave a URL as an empty string when you do not have one yet.
 * The contact form, navigation, and sections all read from here.
 */

export const profile = {
  name: 'Sangeeta Kushwaha',
  title: 'Frontend Developer',
  location: 'India',
  email: 'sangeetakushwaha1205@gmail.com',
  // Put a file in public/ (for example public/profile.jpg) and set this to '/profile.jpg'.
  photo: '',
  // Put a PDF in public/resume.pdf and set this to '/resume.pdf'.
  resumeUrl: '',
  intro:
    'I build responsive interfaces with React and JavaScript — reusable components, accessible interactions, and pages that stay fast.',
  socials: {
    github: 'https://github.com/sangeeta-kushwaha',
    linkedin: 'https://www.linkedin.com/in/sangeeta-kushwaha12'
  }
}

export const about = {
  lead: 'I spend most of my time turning a layout into a working screen: forms, lists, navigation, and the states in between. The largest piece is Taskboard, a task manager with its own Express API and a MongoDB database.',
  approach:
    'I start with the screen someone actually uses, then split it into components. I check the layout on a phone and on a wide desktop, and I make sure a keyboard can reach the controls.',
  strengths: [
    {
      title: 'Reusable components',
      text: 'Screens are built from small pieces I can use again, instead of copying the same markup from page to page.'
    },
    {
      title: 'Responsive layout',
      text: 'Spacing, type, and navigation are checked at phone, tablet, and desktop widths.'
    },
    {
      title: 'Clear states',
      text: 'Forms and lists show loading, empty, success, and error states instead of failing quietly.'
    }
  ],
  interests: ['Interface design', 'Accessibility', 'JavaScript', 'Connecting a React screen to an API']
}

export const navLinks = [
  { href: '#top', label: 'Home', id: 'top' },
  { href: '#about', label: 'About', id: 'about' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#experience', label: 'Experience', id: 'experience', requiresTimeline: true },
  { href: '#contact', label: 'Contact', id: 'contact' }
]

export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Bootstrap']
  },
  {
    id: 'backend',
    title: 'Backend',
    items: ['Node.js', 'Express.js']
  },
  {
    id: 'database',
    title: 'Database',
    items: ['MongoDB']
  },
  {
    id: 'tools',
    title: 'Tools',
    items: ['Git', 'Vite', 'ESLint', 'Netlify']
  }
]

export const projects = [
  {
    id: 'taskboard',
    featured: true,
    title: 'Taskboard',
    category: 'Full stack',
    description:
      'A personal task manager. People sign up, sign in, and work only with their own tasks. A task has a title, description, priority, status, and an optional due date. The React app searches, filters, and pages through tasks by asking an Express API, which stores them in MongoDB.',
    stack: ['React', 'JavaScript', 'Express', 'MongoDB'],
    image: '',
    githubUrl: 'https://github.com/sangeeta-kushwaha/TodoApp',
    demoUrl: ''
  },
  {
    id: 'chat-app',
    title: 'Chat App',
    category: 'Full stack',
    description:
      'A WhatsApp-style chat screen in React, TypeScript, and Tailwind, with registration and sign-in through an Express API. User accounts are stored in MongoDB. The conversation list still uses data kept in the browser, and live messaging is not connected yet.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Express', 'MongoDB'],
    image: '',
    // Add the repository URL after this project is on GitHub.
    githubUrl: '',
    demoUrl: ''
  },
  {
    id: 'shoe-store',
    title: 'Shoe Store',
    category: 'React',
    description:
      'A small React shop for browsing shoes, adding and removing cart items, changing quantities, and seeing the total update.',
    stack: ['React', 'CSS', 'Vite'],
    image: '',
    githubUrl: 'https://github.com/sangeeta-kushwaha/React-Mini-Projects/tree/main/shoe-store',
    demoUrl: 'https://darling-bavarois-20ac31.netlify.app/'
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    category: 'React',
    description:
      'A React utility that builds a random password from a chosen length, with options for numbers and symbols, and copies the result to the clipboard.',
    stack: ['React', 'CSS', 'Vite'],
    image: '',
    githubUrl: 'https://github.com/sangeeta-kushwaha/React-Mini-Projects/tree/main/passwordGenerator',
    demoUrl: 'https://sparkly-eclair-06b598.netlify.app/'
  },
  {
    id: 'todo-crud',
    title: 'To-Do List',
    category: 'JavaScript',
    description:
      'A responsive to-do list in HTML, CSS, and JavaScript. Tasks can be created, viewed, updated, and deleted, and they are stored with MockAPI.',
    stack: ['HTML', 'CSS', 'JavaScript', 'MockAPI'],
    image: '',
    githubUrl: 'https://github.com/sangeeta-kushwaha/todo-app-crud',
    demoUrl: 'https://zesty-smakager-a944f2.netlify.app/'
  }
]

// Add a job or degree only when the organization and dates are real.
// Example:
// { title: 'Frontend Developer', org: 'Studio name', period: '2024 — 2025', points: ['What you actually did.'] }
export const experience = []

export const education = []

export function hasTimeline() {
  return experience.length > 0 || education.length > 0
}
