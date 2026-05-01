import { useState, useEffect } from "react"

export function useNightMode() {
  const [isNightMode, setIsNightMode] = useState(false)

  useEffect(() => {
    if (isNightMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isNightMode])

  const toggleNightMode = () => setIsNightMode((prev) => !prev)

  return {
    isNightMode,
    toggleNightMode,
  }
}
