import { Button as MUIButton } from '@mui/material'
import { ButtonProps } from './types'

export default function Button({
  theme = 'primary',
  children,
  onClick,
}: ButtonProps) {
  return (
    <MUIButton variant="contained" color={theme} fullWidth onClick={onClick}>
      {children}
    </MUIButton>
  )
}
