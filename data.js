/* ==========================================================================
   SITE DATA: edit this file to change content. No layout code needs touching.
   - intro: "session" (once per browser session) | "always" | "off"
   - links: leave linkedin / instagram / email empty to hide them
   - formEndpoint: a Formspree-style URL, e.g. "https://formspree.io/f/xxxxxxx".
     When empty, the contact form validates and points visitors to GitHub instead.
   - projects[].live: deployment URL ("" shows "Coming soon"); image: screenshot path ("" uses generated art)
   ========================================================================== */
window.SITE = {
  intro: "session",
  name: "Ahmed Sayed Ebrahim",
  url: "https://ahmed-sayed2007.github.io/portfolio/",
  links: {
    github: "https://github.com/ahmed-sayed2007",
    linkedin: "https://www.linkedin.com/in/ahmed-sayed-717287357/",
    instagram: "",
    email: "ebrahems868@gmail.com",
    phone: "01557925251"
  },
  formEndpoint: "",

  stats: [
    { from: "projects", label: "Featured projects" },
    { value: 20, suffix: "+", label: "Projects built at Route Academy" },
    { from: "tech", label: "Technologies in my toolkit" }
  ],

  about: [
    { k: "Education", v: "Front-End Development Diploma", s: "Route Academy, Feb – Sep 2026" },
    { k: "Graduation", v: "Expected 2027 / 2028", s: "Continuing to study and build" },
    { k: "Based in", v: "Cairo, Egypt", s: "Open to remote and on-site roles" },
    { k: "Looking for", v: "Internships and junior roles", s: "Also freelance and collaborations" }
  ],

  tech: [
    { name: "HTML5", icon: "html" },
    { name: "CSS3", icon: "css" },
    { name: "JavaScript", icon: "js" },
    { name: "TypeScript", icon: "ts" },
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "next" },
    { name: "Tailwind CSS", icon: "tailwind" },
    { name: "Bootstrap", icon: "bootstrap" },
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
    { name: "Figma", icon: "figma" },
    { name: "REST APIs", icon: "api" }
  ],

  projects: [
    {
      title: "NutriPlan",
      category: "Nutrition, food & fitness web app",
      description: "A planning app for exploring meals, reading nutrition facts and logging what you eat, with barcode product lookup and a clean data-driven interface.",
      tech: ["HTML", "CSS", "JavaScript", "API integration", "SweetAlert2", "Plotly"],
      repo: "https://github.com/ahmed-sayed2007/JS-exam",
      live: "https://ahmed-sayed2007.github.io/JS-exam/", image: "assets/projects/nutriplan.webp", hue: 262, mono: "Np"
    },
    {
      title: "Fresh Cart",
      category: "E-commerce web application",
      description: "A modern storefront built with Next.js and TypeScript: product browsing, cart and wishlist, authentication with protected routes, validated forms and a checkout flow.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "NextAuth", "React Hook Form", "Zod"],
      repo: "https://github.com/ahmed-sayed2007/fresh-cart",
      live: "https://fresh-cart-kwbd.vercel.app/", image: "assets/projects/freshcart.webp", hue: 214, mono: "Fc"
    },
    {
      title: "LinkedPost",
      category: "Social media web application",
      description: "A social feed built with React and TypeScript: sign up and log in, browse posts, open post details, comment, like and update your profile photo.",
      tech: ["React", "TypeScript", "Tailwind CSS", "TanStack Query", "Axios", "React Router", "React Hook Form", "Zod"],
      repo: "https://github.com/ahmed-sayed2007/social-APP",
      live: "https://social-app-qann.vercel.app/", image: "assets/projects/linkedpost.webp", hue: 236, mono: "Lp"
    },
    {
      title: "EliteHomes",
      category: "Real estate landing page",
      description: "A responsive real estate landing page that focuses on structure, layout, styling and interactive front-end behaviour, built with Bootstrap.",
      tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      repo: "https://github.com/ahmed-sayed2007/exam-bootstrap",
      live: "https://ahmed-sayed2007.github.io/exam-bootstrap/", image: "assets/projects/elitehomes.webp", hue: 285, mono: "Eh"
    }
  ],

  journey: [
    { when: "Feb 2026", title: "Front-end diploma begins", text: "Started the Front-End Development Diploma at Route Academy.", tag: "Start" },
    { when: "Foundations", title: "Core web skills", text: "HTML5, CSS3, JavaScript, Bootstrap, responsive layouts and working with REST APIs, through more than 20 hands-on projects.", tag: "Learning" },
    { when: "Modern stack", title: "React, TypeScript and Next.js", text: "Component architecture, state management, forms, validation and authentication. Fresh Cart is deployed on Vercel.", tag: "Milestone" },
    { when: "Sep 2026", title: "End of the diploma program", text: "More than 20 projects built during the diploma; four are featured here, from vanilla JavaScript to a full Next.js application.", tag: "Milestone" },
    { when: "2027 / 2028", title: "Expected graduation", text: "Continuing formal studies while building and learning in public.", tag: "Next" },
    { when: "Now", title: "Looking for a first role", text: "Open to internships, junior positions, freelance work and collaborations.", tag: "Open", now: true }
  ],

  services: [
    { title: "Frontend Development", text: "Clean, component-based interfaces in React, Next.js and TypeScript, wired to real APIs.", vis: "code" },
    { title: "Responsive Web Design", text: "Layouts that hold up from small phones to wide desktop screens without compromises.", vis: "responsive" },
    { title: "Interactive Web Experiences", text: "Motion, micro-interactions and details that make an interface feel alive.", vis: "orb" },
    { title: "UI Implementation", text: "Turning Figma designs into pixel-accurate, accessible code that matches the original intent.", vis: "guides" },
    { title: "Performance Optimization", text: "Lean assets and smooth rendering so pages load fast and animate without jank.", vis: "gauge" }
  ]
};
