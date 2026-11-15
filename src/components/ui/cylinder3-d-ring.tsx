"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

export interface CylinderItem {
    src: string
    alt: string
    title?: string
    id?: string
    price?: string
    tag?: string
    category?: string
    subtitle?: string
}

const DEFAULT_IMAGES: CylinderItem[] = [
    { src: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80", alt: "Truffle Butter Tagliolini", title: "Truffle Tagliolini", price: "$22.00", tag: "Signature" },
    { src: "https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&w=600&q=80", alt: "Slow-Braised Rigatoni Bolognese", title: "Rigatoni Bolognese", price: "$21.50", tag: "Slow Simmered" },
    { src: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80", alt: "Roman Cacio e Pepe", title: "Roman Cacio e Pepe", price: "$19.00", tag: "Classic" },
    { src: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80", alt: "Rosemary Parmesan Kennebec Fries", title: "Kennebec Fries", price: "$8.50", tag: "Crispy Favorite" },
    { src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80", alt: "Calabrian Chili Garlic Tagliolini", title: "Chili Garlic Tagliolini", price: "$18.50", tag: "Spicy" },
    { src: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=600&q=80", alt: "Crispy Polenta Fries", title: "Polenta Fries", price: "$9.50", tag: "Gluten-Free" },
    { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80", alt: "Handmade Saffron Campanelle", title: "Saffron Campanelle", price: "$23.00", tag: "Chef Special" },
    { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80", alt: "Shaved Fennel & Citrus Salad", title: "Fennel Citrus Salad", price: "$11.00", tag: "Fresh" },
    { src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80", alt: "Charred Romanesco Cauliflower", title: "Charred Romanesco", price: "$10.50", tag: "Vegan" },
    { src: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80", alt: "Brown Butter Gnocchi", title: "Brown Butter Gnocchi", price: "$20.50", tag: "Hand-Rolled" },
]

export interface Cylinder3DRingProps {
    images?: CylinderItem[]
    duration?: number
    perspective?: number
    initialTiltX?: number
    interactiveTilt?: boolean
    className?: string
    cardClassName?: string
    onItemClick?: (item: CylinderItem, index: number) => void
}

export function Cylinder3DRing({
    images = DEFAULT_IMAGES,
    duration = 18,
    perspective = 1100,
    initialTiltX = -14,
    interactiveTilt = true,
    className = "",
    cardClassName = "",
    onItemClick,
}: Cylinder3DRingProps) {
    const stageRef = useRef<HTMLDivElement>(null)
    const tiltRef = useRef<HTMLDivElement>(null)
    const drumRef = useRef<HTMLDivElement>(null)
    const spinTweenRef = useRef<gsap.core.Tween | null>(null)
    const [width, setWidth] = useState(0)
    const isDraggingRef = useRef(false)
    const pointerDownPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

    useEffect(() => {
        const el = stageRef.current
        if (!el) return
        const updateWidth = () => {
            if (stageRef.current) {
                setWidth(stageRef.current.clientWidth)
            }
        }
        updateWidth()
        const ro = new ResizeObserver(([entry]) => {
            if (entry && entry.contentRect.width > 0) {
                setWidth(entry.contentRect.width)
            }
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    const count = Math.max(images.length, 8)

    // Fluid responsive card dimensions adapting to mobile, tablet, and desktop
    const cardW = width <= 0 ? 150 : width < 420
        ? Math.max(Math.round(width * 0.26), 90)
        : width < 640
        ? Math.max(Math.round(width * 0.22), 110)
        : width < 1024
        ? Math.min(Math.max(Math.round(width * 0.18), 130), 180)
        : Math.min(Math.max(Math.round(width * 0.16), 140), 210)

    const cardH = Math.round(cardW * 1.36)

    // Mathematically computed cylindrical radius with responsive clearance
    const chordSpacing = width < 480 ? 12 : width < 768 ? 16 : 22
    const radiusScale = width < 480 ? 1.08 : width < 768 ? 1.15 : 1.22
    const radius = Math.round(((cardW + chordSpacing) / (2 * Math.tan(Math.PI / count))) * radiusScale)

    // Responsive container min-height
    const containerHeight = width <= 0 ? 460 : width < 480 ? 350 : width < 768 ? 420 : 490

    // GSAP continuous spin loop
    useGSAP(
        () => {
            if (!drumRef.current || !width) return
            spinTweenRef.current = gsap.to(drumRef.current, {
                rotationY: -360,
                duration,
                ease: "none",
                repeat: -1,
            })
        },
        { scope: stageRef, dependencies: [duration, width > 0], revertOnUpdate: true }
    )

    const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        isDraggingRef.current = false
        pointerDownPosRef.current = { x: e.clientX, y: e.clientY }
    }, [])

    const handlePointerMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            const dx = Math.abs(e.clientX - pointerDownPosRef.current.x)
            const dy = Math.abs(e.clientY - pointerDownPosRef.current.y)
            if (dx > 6 || dy > 6) {
                isDraggingRef.current = true
            }

            if (!interactiveTilt || !stageRef.current || !tiltRef.current) return
            const rect = stageRef.current.getBoundingClientRect()
            const normY = (e.clientY - rect.top) / rect.height - 0.5
            const normX = (e.clientX - rect.left) / rect.width - 0.5

            gsap.to(tiltRef.current, {
                rotationX: initialTiltX - normY * 16,
                rotationZ: normX * 4,
                duration: 0.5,
                ease: "power2.out",
                overwrite: "auto",
            })

            if (spinTweenRef.current) {
                // Interactive velocity scaling: moving right accelerates forward, left reverses
                const targetTimeScale = 1 + normX * 3.5
                gsap.to(spinTweenRef.current, {
                    timeScale: targetTimeScale,
                    duration: 0.4,
                    overwrite: "auto",
                })
            }
        },
        [interactiveTilt, initialTiltX]
    )

    const handlePointerLeave = useCallback(() => {
        isDraggingRef.current = false
        if (tiltRef.current) {
            gsap.to(tiltRef.current, {
                rotationX: initialTiltX,
                rotationZ: 0,
                duration: 0.8,
                ease: "power3.out",
                overwrite: "auto",
            })
        }
        if (spinTweenRef.current) {
            gsap.to(spinTweenRef.current, { timeScale: 1, duration: 0.8, overwrite: "auto" })
        }
    }, [initialTiltX])

    const handleCardClick = (img: CylinderItem, i: number) => {
        if (isDraggingRef.current) return
        if (onItemClick) {
            onItemClick(img, i)
        }
    }

    return (
        <div
            ref={stageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerCancel={handlePointerLeave}
            className={`relative flex w-full items-center justify-center overflow-hidden py-8 sm:py-12 md:py-16 select-none touch-pan-y ${className}`}
            style={{
                minHeight: containerHeight,
                perspective: `${width < 640 ? Math.min(perspective, 850) : perspective}px`,
                maskImage: "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
            }}
        >
            {width > 0 && (
                <div
                    ref={tiltRef}
                    className="will-change-transform"
                    style={{
                        transformStyle: "preserve-3d",
                        transform: `translateZ(${-radius * 0.32}px) rotateX(${initialTiltX}deg)`,
                    }}
                >
                    <div
                        ref={drumRef}
                        className="relative will-change-transform"
                        style={{
                            width: cardW,
                            height: cardH,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {Array.from({ length: count }, (_, i) => {
                            const img = images[i % images.length]
                            const angle = (360 / count) * i
                            return (
                                <div
                                    key={i}
                                    onClick={() => handleCardClick(img, i)}
                                    role={onItemClick ? "button" : undefined}
                                    tabIndex={onItemClick ? 0 : undefined}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            handleCardClick(img, i)
                                        }
                                    }}
                                    className={`group absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl transition-shadow duration-300
                                        bg-stone-200 dark:bg-stone-800
                                        border border-black/[0.08] dark:border-white/[0.14]
                                        shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12),0_8px_10px_-6px_rgba(0,0,0,0.06)]
                                        dark:shadow-[0_14px_35px_-8px_rgba(0,0,0,0.7),0_0_15px_rgba(255,255,255,0.04)]
                                        ring-1 ring-black/[0.04] dark:ring-white/[0.06] cursor-pointer ${cardClassName}`}
                                    style={{
                                        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                        backfaceVisibility: "visible",
                                    }}
                                >
                                    {/* Shimmer / Skeleton background placeholder */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 dark:from-stone-800 dark:via-stone-900 dark:to-stone-950 animate-pulse" />

                                    {/* Image */}
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        loading="lazy"
                                        draggable={false}
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none"
                                        }}
                                        className="relative size-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                                    />

                                    {/* Ambient lighting gradient overlay for both light & dark modes */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-white/10 dark:from-black/85 dark:via-black/30 dark:to-white/15" />

                                    {/* Card overlay metadata if provided */}
                                    {(img.title || img.price || img.tag) && (
                                        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 text-left pointer-events-none z-10">
                                            {img.tag && (
                                                <span className="inline-block px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider bg-[#C9A24B] text-[#1F1A16] mb-1 shadow-xs">
                                                    {img.tag}
                                                </span>
                                            )}
                                            {img.title && (
                                                <h4 className="font-serif font-black text-xs sm:text-sm text-white line-clamp-1 drop-shadow-md">
                                                    {img.title}
                                                </h4>
                                            )}
                                            {img.price && (
                                                <p className="font-mono text-[10px] sm:text-xs font-bold text-[#E6C875] mt-0.5">
                                                    {img.price}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Subtle border sheen highlight */}
                                    <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-white/20 dark:ring-white/10 group-hover:ring-[#C9A24B]/50 transition-all" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cylinder3DRing
