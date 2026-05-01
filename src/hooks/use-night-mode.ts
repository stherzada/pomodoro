import { useState, useEffect } from "react"

export function useNightMode() {
  const [isNightMode, setIsNightMode] = useState(false)

  useEffect(() => {
    if (isNightMode) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [isNightMode])

  const toggleNightMode = () => setIsNightMode((prev) => !prev)

  return {
    isNightMode,
    toggleNightMode,
  }
}
