import {
  Control,
  FieldValues,
  FormState,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

type Form<T extends FieldValues> = {
  control: Control<T, object>
  watch: UseFormWatch<T>
  getValues: UseFormGetValues<T>
  setValue: UseFormSetValue<T>
  reset: UseFormReset<T>
  handleSubmit: UseFormHandleSubmit<T>
  formState: FormState<T>
}

export default Form
