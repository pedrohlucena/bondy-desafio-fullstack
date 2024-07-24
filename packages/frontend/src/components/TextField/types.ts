import { RefCallBack } from 'react-hook-form'

export interface TextFieldProps {
  inputRef?: React.RefObject<HTMLInputElement> | RefCallBack
  type?: string
  label?: string
  name?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}
