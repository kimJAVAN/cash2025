// src/components/ui/field.tsx
import { Field as ChakraField } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface FieldProps extends ChakraField.RootProps {
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorText?: React.ReactNode
  optionalIndicator?: React.ReactNode
}

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, helperText, errorText, optionalIndicator, ...rest } =
      props
    return (
      <ChakraField.Root ref={ref} {...rest}>
        {label && (
          <ChakraField.Label>
            {label}
            {optionalIndicator}
          </ChakraField.Label>
        )}
        {children}
        {helperText && (
          <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
        )}
        {errorText && (
          <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
        )}
      </ChakraField.Root>
    )
  },
)