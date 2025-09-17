"use client"

import { useState, useEffect } from "react"

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up")
  const [prevScrollY, setPrevScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setScrollDirection("down")
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection("up")
      }

      setPrevScrollY(currentScrollY)
    }

    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll)
    }

    window.addEventListener("scroll", throttledHandleScroll)
    return () => window.removeEventListener("scroll", throttledHandleScroll)
  }, [prevScrollY])

  return scrollDirection
}
