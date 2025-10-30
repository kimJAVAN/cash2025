import React from "react";
import {
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";

// ColorMode 버튼
export const ColorModeButton = React.forwardRef<HTMLButtonElement, any>(
  function ColorModeButton(props, ref) {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        icon={
          colorMode === "dark" ? (
            <Icon as={LuMoon} color="yellow.500" />
          ) : (
            <Icon as={LuSun} color="yellow.500" />
          )
        }
      />
    );
  }
);

// useColorModeValue는 Chakra UI에서 바로 가져다 쓰면 됨
// 예시:
// const bg = useColorModeValue('white', 'gray.800');

