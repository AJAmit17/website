"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { IconBrandPython, IconBrandJavascript, IconBrandReact, IconBrandNextjs, IconBrandTailwind, IconBrandFigma, IconBrandGit, IconDatabase, IconMathFunction, IconChartBar, IconBrain } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/card"

const skills = [
  {
    title: "Web Development",
    description: "Proficient in creating responsive and interactive web applications using modern frameworks and libraries.",
    icons: [
      { icon: IconBrandJavascript, name: "JavaScript" },
      { icon: IconBrandReact, name: "React" },
      { icon: IconBrandNextjs, name: "Next.js" },
      { icon: IconBrandTailwind, name: "Tailwind CSS" },
    ],
    projects: [
      { name: "E-commerce Platform", description: "Built a full-stack e-commerce solution with Next.js and Stripe integration." },
      { name: "Portfolio Website", description: "Designed and developed a responsive portfolio site using React and Framer Motion." },
    ],
  },
  {
    title: "Data Science",
    description: "Experienced in data analysis, machine learning, and statistical modeling to derive insights from complex datasets.",
    icons: [
      { icon: IconBrandPython, name: "Python" },
      { icon: IconMathFunction, name: "NumPy" },
      { icon: IconChartBar, name: "Pandas" },
      { icon: IconBrain, name: "Scikit-learn" },
    ],
    projects: [
      { name: "Predictive Analytics Model", description: "Developed a machine learning model to predict customer churn for a telecom company." },
      { name: "Data Visualization Dashboard", description: "Created an interactive dashboard for visualizing COVID-19 data trends using Plotly and Dash." },
    ],
  },
  {
    title: "Tools & Technologies",
    description: "Proficient with various tools and technologies that enhance productivity and collaboration in development projects.",
    icons: [
      { icon: IconBrandGit, name: "Git" },
      { icon: IconBrandFigma, name: "Figma" },
      { icon: IconDatabase, name: "SQL" },
    ],
    projects: [
      { name: "CI/CD Pipeline", description: "Implemented a robust CI/CD pipeline using GitHub Actions for automated testing and deployment." },
      { name: "Database Optimization", description: "Optimized database queries and schema design for a high-traffic web application, improving performance by 40%." },
    ],
  },
]

export default function SimplifiedSkillSetShowcase() {
  const [selectedSkill, setSelectedSkill] = useState(null)

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">My Skill Set</h1>
        <p className="text-xl text-gray-400">Bridging Web Technologies and Data Science</p>
      </header>

      <div className="space-y-16">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-zinc-900 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4">{skill.title}</h2>
            <p className="text-gray-400 mb-6">{skill.description}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              {skill.icons.map((item, iconIndex) => (
                <div key={iconIndex} className="flex flex-col items-center">
                  <item.icon className="w-8 h-8 mb-2" />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setSelectedSkill(skill)}
            >
              View Projects
            </Button>
          </motion.div>
        ))}
      </div>

      {selectedSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">{selectedSkill.title} Projects</h3>
            {selectedSkill.projects.map((project, index) => (
              <Card key={index} className="mb-4 p-4 bg-zinc-800">
                <h4 className="text-lg font-semibold mb-2">{project.name}</h4>
                <p className="text-gray-400">{project.description}</p>
              </Card>
            ))}
            <Button onClick={() => setSelectedSkill(null)} className="mt-4">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}