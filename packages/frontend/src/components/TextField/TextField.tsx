import { TextField as MUITextField } from '@mui/material'
import { TextFieldProps } from './types'

export default function TextField({
  type,
  label,
  value,
  onChange,
}: TextFieldProps) {
  return (
    <MUITextField
      type={type}
      label={label}
      value={value}
      fullWidth
      margin="normal"
      onChange={onChange}
    />
  )
}
