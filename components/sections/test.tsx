// "use client"

// import { Button } from "@/components/ui/button"
// import { ChevronDown } from "lucide-react"
// import { HERO_CONTENT } from "@/lib/constants"
// import FadeIn from "@/components/animations/fade-in"

// export default function Hero() {
//   const handleScrollToProjects = () => {
//     const element = document.querySelector("#projects")
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" })
//     }
//   }

//   return (
//     <section id="home" className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         {/* Floating Element Placeholders - Ready for 3D characters */}
//         <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-sm animate-pulse" />
//         <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 rounded-full blur-sm animate-pulse delay-1000" />
//         <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-500/10 rounded-full blur-sm animate-pulse delay-2000" />
//         <div className="absolute top-1/2 right-1/3 w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-full blur-sm animate-pulse delay-500" />
//         <div className="absolute bottom-1/4 right-1/5 w-18 h-18 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-full blur-sm animate-pulse delay-1500" />
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <div className="space-y-8">
//           {/* Main Headline */}
//           <FadeIn delay={200}>
//             <div className="space-y-4">
//               <h1 className="hero-text text-white font-extrabold tracking-tight">
//                 <span className="block">{HERO_CONTENT.headline}</span>
//                 <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
//                   {HERO_CONTENT.subheadline}
//                 </span>
//               </h1>
//             </div>
//           </FadeIn>

//           {/* Description */}
//           <FadeIn delay={400}>
//             <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
//               {HERO_CONTENT.description}
//             </p>
//           </FadeIn>
//         </div>
//       </div>
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
//     </section>
//   )
// }
