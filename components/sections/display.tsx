'use client'
import CircularGallery from "../animations/CircularGallery"

const Display = () => {
    // Define services with images and descriptions
    const services = [
        {
            image: "https://images.unsplash.com/photo-1618477461853-c0aeee3bd56c?auto=format&fit=crop&w=800&h=600",
            text: "3D Animation",
            subtitle: "Immersive animations for storytelling and branding",
        },
        {
            image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&h=600",
            text: "Modeling",
            subtitle: "High-quality 3D models for games and visuals",
        },
        {
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&h=600",
            text: "2D Animation",
            subtitle: "Dynamic 2D visuals for engaging content",
        },
        {
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&h=600",
            text: "Motion Design",
            subtitle: "Fluid motion graphics for ads and media",
        },
        {
            image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&h=600",
            text: "Video Editing",
            subtitle: "Professional edits for compelling videos",
        },
        {
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&h=600",
            text: "Designing",
            subtitle: "Creative designs for branding and marketing",
        },
        {
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&h=600",
            text: "Web Designing",
            subtitle: "Stunning UI/UX for modern websites",
        },
        {
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&h=600",
            text: "Web Development",
            subtitle: "Robust, scalable web solutions",
        },
    ]

    return (
        <div id="services" className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="relative z-10 pt-16 pb-8">
                <div className="text-center">
                    <h1 className="font-playfair text-6xl md:text-8xl font-bold text-foreground mb-4 tracking-tight">
                        Our Services
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4 font-light">
                        Explore the creative and technical expertise of Creative Fusion Agency
                    </p>
                </div>
            </div>

            <div className="h-[70vh] relative">
                <CircularGallery
                    items={services}
                    bend={1.2} // Slightly reduced for smoother curvature
                    textColor="#ffffff"
                    borderRadius={0.1} // Modern, subtle rounded edges
                    font="bold 28px Geist Sans" // Consistent with professional look
                    scrollEase={0.04} // Smooth scrolling
                    scrollSpeed={1.8} // Controlled speed for better UX
                />
            </div>

            <div className="relative z-10 pb-16 pt-8">
                <div className="text-center">
                    <p className="text-muted-foreground text-sm md:text-base">
                        Scroll or drag to explore our services
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Display