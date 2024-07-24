import { Button as MUIButton } from '@mui/material'
import { ButtonProps } from './types'

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <MUIButton variant="contained" color="primary" fullWidth onClick={onClick}>
      {children}
    </MUIButton>
  )
}
