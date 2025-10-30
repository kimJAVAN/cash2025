// src/components/ui/color-mode.tsx
import type { IconButtonProps } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { forwardRef, createContext, useContext, useState, useEffect } from "react"
import { LuMoon, LuSun } from "react-icons/lu"

type ColorMode = "light" | "dark"

interface ColorModeContextType {
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void
  toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined)

export interface ColorModeProviderProps {
  children: React.ReactNode
}

export function ColorModeProvider({ children }: ColorModeProviderProps) {
  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    const stored = localStorage.getItem("chakra-ui-color-mode")
    return (stored as ColorMode) || "light"
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(colorMode)
    localStorage.setItem("chakra-ui-color-mode", colorMode)
  }, [colorMode])

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode)
  }

  const toggleColorMode = () => {
    setColorModeState(prev => prev === "light" ? "dark" : "light")
  }

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}

export function useColorMode() {
  const context = useContext(ColorModeContext)
  if (!context) {
    throw new Error("useColorMode must be used within ColorModeProvider")
  }
  return context
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "light" ? light : dark
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === "light" ? <LuSun /> : <LuMoon />
}

interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}

export const ColorModeButton = forwardRef<HTMLButtonElement, ColorModeButtonProps>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode()
    return (
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
      >
        <ColorModeIcon />
      </IconButton>
    )
  }
)