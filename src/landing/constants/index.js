// ─── Brand Design Tokens ─────────────────────────────────────────────────────
export const COLORS = {
  gold:       '#C9A84C',
  goldLight:  '#E8C97A',
  goldFaint:  'rgba(201, 168, 76, 0.1)',
  goldBorder: 'rgba(201, 168, 76, 0.15)',
  pink:       '#E91E8C',
  orange:     '#FF6B35',
  white:      '#F5F0E8',
  muted:      '#888880',
  dark:       '#050505',
  darkAlt:    '#0A0A0A',
  darkWarm:   '#0F0D07',
};

export const FONTS = {
  heading: 'Space Grotesk, sans-serif',
  body:    'Outfit, sans-serif',
};

// ─── Navbar Links ─────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',       target: '',                href: '#', path: '/' },
  { label: 'Features',   target: 'explainer-video',  href: '#features', path: '/features' },
];

export const DROPDOWN_LINKS = [
  { label: "FAQ's",           path: '/resources/faq' },
  { label: 'About Founder',   path: '/resources/about-founder' },
  { label: 'Blogs',           path: '/resources/blogs' },
];

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    q: 'How does the AI prevent candidate cheating?',
    a: 'Our AI platform features advanced integrity checks: face verification via webcam, screen sharing detection, copy-paste blocks, and automated parsing of coding responses to detect plagiarism and third-party prompts.',
  },
  {
    q: 'What types of roles can intervieHire evaluate?',
    a: 'We support a wide array of technical and non-technical roles, including software engineers (frontend, backend, fullstack), product managers, sales executives, customer success, and operations.',
  },
  {
    q: 'Can we integrate this with our existing ATS?',
    a: 'Yes! We support integrations with major ATS platforms such as Greenhouse, Lever, and Ashby, allowing you to trigger evaluations and sync transcripts directly.',
  },
  {
    q: 'How are the industry experts calibrated?',
    a: 'All of our human interviewers are active professionals in their respective fields who undergo standardized training and calibration cycles to evaluate candidates objectively.',
  },
];

// ─── Impact / Stats Marquee ───────────────────────────────────────────────────
export const IMPACT_STATS = [
  { num: '50%+',        label: 'Reduction in cost-per-hire' },
  { num: '100s of hrs', label: 'Saved per hire cycle' },
  { num: 'Zero Bias',   label: 'In AI screening layer' },
  { num: '24/7',        label: 'Candidate interviews automated' },
  { num: '98%',         label: 'Cheating detection accuracy' },
  { num: '10x Faster',  label: 'Hiring pipeline velocity' },
  { num: '4.9/5',       label: 'Candidate experience rating' },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export const BLOG_POSTS = [
  {
    title:   'Preventing AI Interview Cheating',
    excerpt: 'How we screen for screen sharing, web searches, and copy-paste behavior.',
    date:    'June 2, 2026',
  },
  {
    title:   'Standardizing Tech Screening',
    excerpt: 'The impact of standardized rubric evaluation on engineering diversity and performance.',
    date:    'May 24, 2026',
  },
  {
    title:   'Scaling Startups Asynchronously',
    excerpt: 'How async technical screening saves up to 35 hours per engineer hiring cycle.',
    date:    'May 10, 2026',
  },
];

// ─── Contact Info ─────────────────────────────────────────────────────────────
export const CONTACT_INFO = {
  email:    'interviehire@gmail.com',
  website:  'interviehire.com',
  founders: 'Devasri Bali & Aditya Rana',
};
