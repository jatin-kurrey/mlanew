"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({
    children,
    autoPlay = false,
    interval = 5000,
    slidesToShow = 3,
    showDots = true,
    showArrows = true,
    className = ""
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const slides = Array.isArray(children) ? children : [children];
    const totalSlides = slides.length;
    const maxIndex = Math.max(0, totalSlides - slidesToShow);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    const goToSlide = useCallback((index) => {
        setCurrentIndex(Math.min(index, maxIndex));
    }, [maxIndex]);

    // Auto-play functionality
    useEffect(() => {
        if (!autoPlay || isHovered || totalSlides <= slidesToShow) return;

        const timer = setInterval(nextSlide, interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, isHovered, nextSlide, totalSlides, slidesToShow]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "ArrowRight") nextSlide();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nextSlide, prevSlide]);

    if (totalSlides === 0) {
        return null;
    }

    return (
        <div
            className={`relative ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="region"
            aria-label="Carousel"
        >
            {/* Carousel Container */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
                    }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 px-2"
                            style={{ width: `${100 / slidesToShow}%` }}
                        >
                            {slide}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            {showArrows && totalSlides > slidesToShow && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 text-[#1e3a8a]" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 text-[#1e3a8a]" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {showDots && totalSlides > slidesToShow && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:ring-offset-2 ${currentIndex === index
                                    ? "bg-[#1e3a8a] w-8"
                                    : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={currentIndex === index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// Responsive Carousel Wrapper Component
export function ResponsiveCarousel({ children, autoPlay = false, interval = 5000, className = "" }) {
    const [slidesToShow, setSlidesToShow] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Carousel
            autoPlay={autoPlay}
            interval={interval}
            slidesToShow={slidesToShow}
            className={className}
        >
            {children}
        </Carousel>
    );
}
