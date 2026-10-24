// description is the shared summary; technologies is the shared tech stack.
// gallery accepts { src, alt, caption? } objects with distinct image sources.
// Page-specific wording is retained to preserve the existing portfolio content.
// Optional case-study fields stay empty until the owner confirms the details.
// Existing roles are preserved; project features are not personal contribution claims.
export const projects = [
  {
    "id": 1,
    "title": "AC-CORE",
    "role": "Frontend Developer",
    "description": "A municipal incident reporting platform for Angeles City with geospatial mapping, weather syncing, and a hazard tracking dashboard.",
    "fullDescription": "AC-CORE is a municipal incident reporting platform designed for the local government of Angeles City. Citizens can log hazards using a geospatial map and automatic GPS detection, while city engineers can review reports through an LGU command dashboard. The platform also includes weather syncing and a guest reporting mode.",
    "image": "/ac-core.png",
    "features": [
      "Geospatial Live Map",
      "Auto-Detect GPS Location",
      "Real-time Weather Syncing",
      "LGU Command Dashboard",
      "Guest Reporting Mode"
    ],
    "github": "https://github.com/MMPA-Works/AC-CORE",
    "live": "https://ac-core.vercel.app/",
    "slug": "ac-core",
    "featured": true,
    "type": null,
    "teamContext": null,
    "targetUsers": [],
    "contributions": [],
    "challenges": [],
    "lessons": [],
    "status": null,
    "gallery": [],
    "technologies": [
      "Angular 18",
      "TypeScript",
      "MongoDB",
      "Leaflet.js",
      "Tailwind CSS",
      "Spartan UI",
      "Node.js"
    ],
    "featuredDescription": "A municipal incident reporting platform for Angeles City featuring interactive geospatial mapping, live weather syncing, and a hazard tracking dashboard.",
    "featuredTechnologies": [
      "Angular 18",
      "TailwindCSS",
      "MongoDB"
    ],
    "resumeDescription": "A proactive digital command dashboard designed for the Angeles City local government to handle data-heavy municipal infrastructure modules efficiently without client-side lag. Translated complex geographic data into an intuitive user experience by integrating Leaflet.js for a geospatial live map with automated citizen GPS detection. Implemented real-time weather syncing APIs and structured a polished, multi-page layout utilizing structured routing systems.",
    "resumeTechnologies": "Angular 18, TypeScript, MongoDB Leaflet.js, Tailwind CSS, Spartan UI, Node.js"
  },
  {
    "id": 2,
    "title": "Flashify",
    "role": "Fullstack Developer",
    "description": "A quiz and flashcard learning platform with quiz management, JWT authentication, and result tracking.",
    "fullDescription": "Flashify brings quizzes and flashcards together in a full-stack learning platform. Students can create and manage quizzes, study in flashcard mode, and review results through a responsive dashboard. The application uses JWT authentication and a React, Express, Node.js, and MongoDB architecture.",
    "image": "/flashify.png",
    "features": [
      "JWT Auth",
      "Quiz CRUD",
      "Flashcard Mode",
      "Performance Analytics",
      "Responsive Dashboard"
    ],
    "github": "https://github.com/mpangilinann/Flashify",
    "live": "https://flashifylearn.vercel.app/",
    "slug": "flashify",
    "featured": true,
    "type": null,
    "teamContext": null,
    "targetUsers": [],
    "contributions": [],
    "challenges": [],
    "lessons": [],
    "status": null,
    "gallery": [],
    "technologies": [
      "React.JS",
      "MongoDB",
      "Express.js",
      "Node.js",
      "JWT",
      "TailwindCSS"
    ],
    "featuredDescription": "A full-stack quiz and flashcard learning platform where users can create quizzes, study using flashcards, and track their quiz results through an interactive dashboard.",
    "featuredTechnologies": [
      "ReactJS",
      "TailwindCSS",
      "MongoDB"
    ],
    "resumeDescription": "A highly responsive MERN-architecture platform featuring dynamic CRUD functionalities for custom quizzes and interactive flashcard study modes. Secured user data and session persistence by implementing JSON Web Tokens (JWT) authentication and state-managed user interfaces. Designed a clean, minimalist performance analytics dashboard to help students track quiz history and monitor completion metrics seamlessly.",
    "resumeTechnologies": "React.js, Express.js, Node.js, MongoDB, JWT, Tailwind CSS"
  },
  {
    "id": 3,
    "title": "Thryve",
    "role": "Frontend Developer",
    "description": "A health and fitness tracker for workouts, meals, water intake, sleep, and daily progress.",
    "fullDescription": "Thryve brings health and fitness tracking into one platform. Users can calculate BMI and record meals, water intake, workouts, and sleep. A dashboard presents daily statistics and progress charts, while an achievement system recognizes progress milestones.",
    "image": "/thryve.png",
    "features": [
      "Meal Tracking",
      "BMI Calculator",
      "Sleep Monitoring",
      "Achievement System",
      "Progress Charts"
    ],
    "github": "https://github.com/iyawnnn/Thryve",
    "live": "https://thryvefitness.vercel.app/",
    "slug": "thryve",
    "featured": true,
    "type": null,
    "teamContext": null,
    "targetUsers": [],
    "contributions": [],
    "challenges": [],
    "lessons": [],
    "status": null,
    "gallery": [],
    "technologies": [
      "Vue.JS",
      "MongoDB",
      "Node.JS",
      "Express.JS",
      "PrimeVue",
      "Chart.JS",
      "JWT",
      "Bcrypt"
    ],
    "resumeDescription": "Developed a health and fitness tracking interface for monitoring workouts, meals, water intake, sleep, BMI, and daily progress. Presented daily statistics through a dashboard with progress charts and achievement tracking.",
    "resumeTechnologies": "Vue.JS, MongoDB, Node.JS, Express.JS, PrimeVue, Chart.JS, JWT, Bcrypt"
  },
  {
    "id": 4,
    "title": "The Coffee Lab & Lounge",
    "role": "Fullstack Developer",
    "description": "A specialty coffee e-commerce platform with menu filtering, search, and a shopping cart.",
    "fullDescription": "The Coffee Lab & Lounge is a specialty coffee e-commerce platform. Visitors can browse the menu, search for products, filter iced, hot, and specialty drinks, and manage a shopping cart. Educational content introduces the bean-to-cup process.",
    "image": "/thecoffeelab.png",
    "features": [
      "Product Filtering",
      "Shopping Cart",
      "Search Functionality",
      "Educational Content",
      "Smooth Animations"
    ],
    "github": "https://github.com/mpangilinann/The-Coffee-Lab-Lounge",
    "live": "https://thecoffeelabandloungue.vercel.app/",
    "slug": "the-coffee-lab-lounge",
    "featured": false,
    "type": null,
    "teamContext": null,
    "targetUsers": [],
    "contributions": [],
    "challenges": [],
    "lessons": [],
    "status": null,
    "gallery": [],
    "technologies": [
      "React.JS",
      "TailwindCSS",
      "Framer Motion",
      "Lucide React",
      "React Router"
    ],
    "featuredDescription": "An elegant e-commerce platform for a specialty coffee shop, showcasing its menu, ambiance, and unique offerings to attract customers.",
    "featuredTechnologies": [
      "ReactJS",
      "TailwindCSS",
      "Vite"
    ],
    "resumeDescription": "A modern e-commerce web application featuring a dynamic digital menu, intuitive product filtering, and an integrated shopping cart system. Leveraged Tailwind CSS for rapid, utility-first UI styling to establish a polished, cohesive aesthetic across all device screens. Enhanced the overall user experience by implementing smooth UI animations and fluid micro-interactions via Framer Motion.",
    "resumeTechnologies": "React.js, Tailwind CSS, Framer Motion, Lucide React, React Router"
  },
  {
    "id": 5,
    "title": "Q-Zone Detailers",
    "role": "Frontend Developer",
    "description": "A multi-page detailing website presenting services, branch locations, and an employee directory.",
    "fullDescription": "Q-Zone Detailers is a multi-page business website built with Angular and TypeScript. It presents paint protection and ceramic coating services alongside service packages, branch locations, an employee directory, and an interactive FAQ. Structured routing connects the pages.",
    "image": "/qzone.png",
    "features": [
      "Multi-page Routing",
      "Service Packages",
      "Employee Directory",
      "Interactive FAQ",
      "Responsive UI"
    ],
    "github": "https://github.com/iyawnnn/Q-Zone-Professional-Detailers",
    "live": "https://qzoneph.netlify.app/",
    "slug": "q-zone-detailers",
    "featured": false,
    "type": null,
    "teamContext": null,
    "targetUsers": [],
    "contributions": [],
    "challenges": [],
    "lessons": [],
    "status": null,
    "gallery": [],
    "technologies": [
      "Angular",
      "TypeScript",
      "Bootstrap",
      "RxJS",
      "Angular Router"
    ]
  },
  {
    "id": 6,
    "title": "TechQuest Jobs",
    "role": "Fullstack Developer",
    "description": "A curated technology job board with resume tips, book recommendations, and certification resources.",
    "fullDescription": "TechQuest Jobs brings curated software development and UI/UX job listings together with career resources. Visitors can browse job categories and explore resume tips, book recommendations, and certification paths.",
    "image": "/techquestjobs.png",
    "features": [
      "Job Listings",
      "Career Resources",
      "Resume Tips",
      "Book Guides",
      "Filtered Categories"
    ],
    "github": "https://github.com/mpangilinann/TechQuestJobs",
    "live": "https://mpangilinann.github.io/TechQuestJobs/",
    "slug": "techquest-jobs",
    "featured": false,
    "type": null,
    "teamContext": null,
    "targetUsers": [],
    "contributions": [],
    "challenges": [],
    "lessons": [],
    "status": null,
    "gallery": [],
    "technologies": [
      "HTML",
      "CSS",
      "JavaScript",
      "Local Storage API"
    ]
  }
];
