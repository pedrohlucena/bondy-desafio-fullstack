import { Button as MUIButton } from '@mui/material'
import { ButtonProps } from './types'

export default function Button({
  theme = 'primary',
  children,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <MUIButton
      variant="contained"
      color={theme}
      disabled={disabled}
      fullWidth
      onClick={onClick}
    >
      {children}
    </MUIButton>
  )
}
