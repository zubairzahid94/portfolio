"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import FadeIn from "@/components/animations/fade-in"

const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform built with Next.js, featuring real-time inventory management and seamless checkout experience.",
    image: "/modern-ecommerce-interface.png",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "AI-Powered Dashboard",
    description:
      "An intelligent analytics dashboard that provides real-time insights and predictive analytics for business decision making.",
    image: "/ai-analytics-dashboard.png",
    tags: ["React", "Python", "TensorFlow", "D3.js"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Mobile Banking App",
    description:
      "A secure and intuitive mobile banking application with biometric authentication and real-time transaction tracking.",
    image: "/mobile-banking-app.png",
    tags: ["React Native", "Node.js", "MongoDB", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Creative Portfolio",
    description:
      "A stunning portfolio website for a creative agency, featuring smooth animations and immersive user experience.",
    image: "/creative-portfolio-website-with-animations.jpg",
    tags: ["Next.js", "GSAP", "Three.js", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Social Media Platform",
    description:
      "A modern social media platform with real-time messaging, content sharing, and advanced privacy controls.",
    image: "/social-media-interface.png",
    tags: ["Vue.js", "Socket.io", "PostgreSQL", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Learning Management System",
    description: "An comprehensive LMS platform for online education with interactive courses and progress tracking.",
    image: "/online-learning-platform.png",
    tags: ["React", "Express.js", "MySQL", "WebRTC"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Explore our latest work showcasing innovative solutions and cutting-edge technologies
            </p>
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {PROJECTS.map((project, index) => (
            <FadeIn key={project.id} delay={index * 100}>
              <Card className="bg-card border-white/10 overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-white/70 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* View All Projects CTA */}
        <FadeIn>
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 bg-transparent"
            >
              View All Projects
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
