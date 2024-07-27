export interface ButtonProps {
  theme?: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
