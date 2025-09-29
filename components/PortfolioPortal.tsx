"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PortfolioPortalProps } from '../types/portfolio';
import { DEFAULT_PORTFOLIO_ITEMS } from '../constants/themes';
import { PortfolioCard } from './PortfolioCard';

export const PortfolioPortal: React.FC<PortfolioPortalProps> = ({
    portfolioItems = []
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const items = portfolioItems.length > 0 ? portfolioItems : DEFAULT_PORTFOLIO_ITEMS;

    return (
        <div ref={containerRef} className="min-h-screen bg-black py-20">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                        Portfolio Portal
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Scroll through dimensional layers of experience and expertise
                    </p>
                </motion.div>

                {/* Portfolio Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {items.map((item, index) => {
                        // Create individual scroll progress for each card
                        const cardProgress = useTransform(
                            scrollYProgress,
                            [index / items.length, (index + 1) / items.length],
                            [0, 1]
                        );

                        return (
                            <PortfolioCard
                                key={index}
                                title={item.title}
                                description={item.description}
                                characterType={item.characterType}
                                bgTheme={item.bgTheme}
                                holographicData={item.holographicData}
                                scrollProgress={cardProgress}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};