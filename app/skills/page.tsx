import { Navigation } from '@/components/nav';
import { Card } from '@/components/card';
import { Separator } from '@/components/ui/separator';
import {
  Code2,
  Database,
  Smartphone,
  Globe,
  Server,
  Cloud,
  Shield,
  Cpu,
  // GitBranch,
  Palette,
  // LineChart
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Amit Acharya | Technical Skills | Full-Stack Developer Portfolio',
  description: 'Amit Acharya is a Full-Stack Developer with expertise in Web & Mobile Development. Explore his technical skills and experience.',
  keywords: [
    'Full Stack Development',
    'Web Development',
    'Mobile Development',
    'Frontend Development',
    'Backend Development',
    'DevOps',
    'Technical Skills',
    'Software Engineering',
  ],
  openGraph: {
    title: 'Amit Acharya | Technical Skills | Full-Stack Developer Portfolio',
    description: 'Amit Acharya is a Full-Stack Developer with expertise in Web & Mobile Development. Explore his technical skills and experience.',
    type: 'website',
    url: 'https://amit-acharya.live/skills',
    images: [
      {
        url: 'https://your-domain.com/og-skills.png',
        width: 1200,
        height: 630,
        alt: 'Technical Skills Overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amit Acharya | Technical Skills | Full-Stack Developer Portfolio',
    description: 'Amit Acharya is a Full-Stack Developer with expertise in Web & Mobile Development. Explore his technical skills and experience.',
    // images: ['https://your-domain.com/og-skills.png'],
  },
  alternates: {
    canonical: 'https://amit-acharya.live/skills',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    knowsAbout: [
      'Web Development',
      'Mobile Development',
      'Frontend Development',
      'Backend Development',
      'DevOps',
      'Database Management',
      'UI/UX Design',
    ],
    skills: [
      'React.js',
      'Next.js',
      'Node.js',
      'TypeScript',
      'React Native',
      'AWS',
      'Docker',
    ],
  },
};

export default function SkillsPage() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Globe className="w-6 h-6" />,
      skills: [
        {
          name: "Core Technologies",
          items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript"]
        },
        {
          name: "Frameworks & Libraries",
          items: ["React.js", "Next.js", "Vue.js", "Redux", "TanStack Query"]
        },
        {
          name: "Styling",
          items: ["Tailwind CSS", "Styled Components", "SASS/SCSS", "Material-UI", "Shadcn UI"]
        }
      ]
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="w-6 h-6" />,
      skills: [
        {
          name: "React Native",
          items: ["Core Components", "Navigation", "Hooks", "Animations"]
        },
        {
          name: "Mobile UI",
          items: ["Native Base", "React Native Paper", "Custom Components"]
        },
        {
          name: "Platform Specific",
          items: ["iOS Development", "Android Development", "Responsive Design"]
        }
      ]
    },
    {
      title: "Backend Development",
      icon: <Server className="w-6 h-6" />,
      skills: [
        {
          name: "Languages & Frameworks",
          items: ["Node.js", "Express.js", "Python", "Django", "FastAPI"]
        },
        {
          name: "API Development",
          items: ["RESTful APIs", "GraphQL", "WebSockets", "API Security"]
        },
        {
          name: "Authentication",
          items: ["JWT", "OAuth", "Session Management", "Passport.js"]
        }
      ]
    },
    {
      title: "Database & Storage",
      icon: <Database className="w-6 h-6" />,
      skills: [
        {
          name: "SQL Databases",
          items: ["PostgreSQL", "MySQL", "SQLite"]
        },
        {
          name: "NoSQL Databases",
          items: ["MongoDB", "Firebase", "Redis"]
        },
        {
          name: "ORM & Query Builders",
          items: ["Prisma", "Sequelize", "TypeORM"]
        }
      ]
    },
    {
      title: "DevOps & Deployment",
      icon: <Cloud className="w-6 h-6" />,
      skills: [
        {
          name: "Cloud Platforms",
          items: ["AWS", "Google Cloud", "Vercel", "Heroku"]
        },
        {
          name: "Containerization",
          items: ["Docker", "Kubernetes", "Container Orchestration"]
        },
        {
          name: "CI/CD",
          items: ["GitHub Actions", "Jenkins", "CircleCI"]
        }
      ]
    },
    {
      title: "Testing & Quality",
      icon: <Shield className="w-6 h-6" />,
      skills: [
        {
          name: "Testing Frameworks",
          items: ["Jest", "React Testing Library", "Cypress", "Playwright"]
        },
        {
          name: "Testing Types",
          items: ["Unit Testing", "Integration Testing", "E2E Testing"]
        },
        {
          name: "Quality Tools",
          items: ["ESLint", "Prettier", "TypeScript", "Husky"]
        }
      ]
    },
    {
      title: "Development Tools",
      icon: <Code2 className="w-6 h-6" />,
      skills: [
        {
          name: "Version Control",
          items: ["Git", "GitHub", "GitLab", "Bitbucket"]
        },
        {
          name: "Code Editors",
          items: ["VS Code", "WebStorm", "Sublime Text"]
        },
        {
          name: "Package Managers",
          items: ["npm", "yarn", "pnpm"]
        }
      ]
    },
    {
      title: "Performance & Optimization",
      icon: <Cpu className="w-6 h-6" />,
      skills: [
        {
          name: "Web Performance",
          items: ["Code Splitting", "Lazy Loading", "Caching Strategies"]
        },
        {
          name: "Mobile Performance",
          items: ["App Size Optimization", "Memory Management", "Battery Efficiency"]
        },
        {
          name: "SEO",
          items: ["Meta Tags", "Semantic HTML", "Open Graph Protocol"]
        }
      ]
    },
    {
      title: "UI/UX & Design",
      icon: <Palette className="w-6 h-6" />,
      skills: [
        {
          name: "Design Tools",
          items: ["Figma", "Adobe XD", "Sketch"]
        },
        {
          name: "Design Principles",
          items: ["Responsive Design", "Mobile-First Design", "Accessibility"]
        },
        {
          name: "Animation",
          items: ["Framer Motion", "React Spring", "CSS Animations"]
        }
      ]
    }
  ];

  return (
    <div className="pb-16 text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <div className="px-4 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-12 md:pt-24 lg:pt-16">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Technical Skills
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Full-Stack Web & Mobile Development expertise with a focus on modern technologies
            and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <Card key={category.title}>
              <div className="p-6 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-800">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-zinc-200">
                    {category.title}
                  </h2>
                </div>
                <div className="space-y-6">
                  {category.skills.map((skillGroup) => (
                    <div key={skillGroup.name}>
                      <h3 className="mb-2 text-sm font-medium text-zinc-400">
                        {skillGroup.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-sm text-zinc-300 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Separator className="my-16 bg-zinc-800" />

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-zinc-200">
            Continuous Learning
          </h2>
          <p className="mt-4 text-zinc-400">
            Constantly updating skills and exploring new technologies to stay current with industry trends and best practices.
          </p>
        </div>
      </div>
    </div>
  );
}