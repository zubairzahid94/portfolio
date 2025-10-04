"use client"
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { MorphingBlob } from '@/components/MorphingBlob';
import { ProjectCard } from '@/components/ProjectCard';
import { Project } from '@/types/types';
import React from 'react';


const AllProjects: React.FC = () => {
    const projects: Project[] = [
        {
            id: 1,
            title: 'Neural Interface',
            description: 'A revolutionary brain-computer interface designed for seamless human-machine interaction. Built with cutting-edge neuroscience and elegant UX.',
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
            video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
        },
        {
            id: 2,
            title: 'Quantum Dashboard',
            description: 'Real-time quantum computing visualization platform. Transforming complex quantum states into intuitive, actionable insights for researchers.',
            thumbnail: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80',
            video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
        },
        {
            id: 3,
            title: 'Orbital Commerce',
            description: 'Next-generation e-commerce platform with spatial computing integration. Redefining online shopping through immersive 3D experiences.',
            thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
            video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
        },
        {
            id: 4,
            title: 'Biometric Suite',
            description: 'Advanced identity verification system combining facial recognition, iris scanning, and behavioral biometrics for enterprise security.',
            thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
            video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
        },
        {
            id: 5,
            title: 'Climate Nexus',
            description: 'Comprehensive climate data platform aggregating real-time environmental metrics. Empowering decision-makers with predictive analytics.',
            thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
            video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
        },
        {
            id: 6,
            title: 'Autonomous Fleet',
            description: 'Fleet management system for self-driving vehicles. Orchestrating thousands of autonomous agents with machine learning optimization.',
            thumbnail: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
            video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
        }
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-black">
                <MorphingBlob />

                <div className="pb-24">
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                            {projects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </div>

                        {/* <div className="mt-32 text-center">
                            <p className="text-zinc-500 text-lg mb-8">
                                Interested in working together?
                            </p>
                            <button className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-zinc-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20">
                                Get in Touch
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProjects;