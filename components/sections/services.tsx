import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, Star, Target, Smartphone, Globe } from "lucide-react"
import { SERVICES } from "@/lib/constants"

const iconMap = {
  code: Code,
  palette: Palette,
  star: Star,
  target: Target,
  smartphone: Smartphone,
  globe: Globe,
}

const EXTENDED_SERVICES = [
  ...SERVICES,
  {
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android",
    icon: "smartphone" as keyof typeof iconMap,
  },
  {
    title: "Web Applications",
    description: "Scalable web applications built with modern frameworks and best practices",
    icon: "globe" as keyof typeof iconMap,
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            We offer comprehensive digital solutions to help your business thrive in the modern world
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXTENDED_SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code
            return (
              <Card
                key={index}
                className="bg-card border-white/10 p-8 text-center group hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-0">
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                  <p className="text-white/70 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Process Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Our Process</h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              We follow a proven methodology to deliver exceptional results for every project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your goals, requirements, and target audience",
              },
              {
                step: "02",
                title: "Strategy",
                description: "Developing a comprehensive plan and technical architecture",
              },
              {
                step: "03",
                title: "Design & Development",
                description: "Creating beautiful designs and robust, scalable solutions",
              },
              {
                step: "04",
                title: "Launch & Support",
                description: "Deploying your project and providing ongoing maintenance",
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary/30">{process.step}</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{process.title}</h4>
                <p className="text-white/60 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
