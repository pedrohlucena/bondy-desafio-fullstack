import { TextField as MUITextField } from '@mui/material'
import { TextFieldProps } from './types'

export default function TextField({
  inputRef,
  type,
  label,
  name,
  value,
  onChange,
  onBlur,
}: TextFieldProps) {
  return (
    <MUITextField
      ref={inputRef}
      type={type}
      label={label}
      name={name}
      value={value}
      fullWidth
      margin="normal"
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}
