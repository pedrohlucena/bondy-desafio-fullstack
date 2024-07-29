export interface ButtonProps {
  theme?: 'primary' | 'secondary'
  children: React.ReactNode
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
