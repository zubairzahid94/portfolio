'use client'
import CircularGallery from "../animations/CircularGallery"

const Display = () => {
    return (
        <div id="services" className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="relative z-10 pt-16 pb-8">
                <div className="text-center">
                    <h1 className="font-playfair text-6xl md:text-8xl font-bold text-foreground mb-4 tracking-tight">Projects</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4 font-light">
                        Discover our latest creative work and innovative solutions
                    </p>
                </div>
            </div>

            <div className="h-[70vh] relative">
                <CircularGallery
                    //   items={portfolioProjects}
                    bend={1.5} // Reduced bend for more professional look
                    textColor="#ffffff"
                    borderRadius={0.08} // Increased border radius for modern look
                    font="bold 32px Geist Sans" // Larger, cleaner font
                    scrollEase={0.03} // Slightly slower for more control
                    scrollSpeed={1.5} // Adjusted speed for better UX
                />
            </div>

            <div className="relative z-10 pb-16 pt-8">
                <div className="text-center">
                    <p className="text-muted-foreground text-sm md:text-base">Scroll or drag to explore our work</p>
                </div>
            </div>
        </div>
    )
}

export default Display
