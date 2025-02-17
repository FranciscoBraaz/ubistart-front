import { FieldErrors, UseFormRegister } from 'react-hook-form'

// Styles
import './index.scss'
import { setMask } from '../../utils/masks'

interface FormField {
  label: string
  name: string
  type: string
  placeholder: string
  regex?: RegExp
  regexErrorMessage?: string
  required: boolean
  maxLength?: number
  mask?: string
}

interface FormInputProps {
  register: UseFormRegister<any>
  errors: FieldErrors
  formField: FormField
}

function FormInput({ register, errors, formField }: FormInputProps) {
  const {
    label,
    name,
    type,
    placeholder,
    regex,
    regexErrorMessage,
    required,
    maxLength = 1000,
    mask,
  } = formField
  const { ref, onChange, ...rest } = register(name, {
    required: {
      value: required ? true : false,
      message: `${label} é um campo necessário`,
    },
    pattern: {
      value: regex ? new RegExp(regex) : /(?:)/,
      message: regexErrorMessage ?? 'Campo inválido',
    },
  })

  function returnInputClassName() {
    let className = 'form-input'

    if (errors[name]) className += ' form-input--error'

    return className
  }

  return (
    <div className='form-input-container'>
      <label htmlFor={name}>
        {label} {required && '*'}
      </label>
      <input
        {...rest}
        id={name}
        className={returnInputClassName()}
        ref={ref}
        name={name}
        maxLength={maxLength}
        type={type}
        placeholder={placeholder}
        onChange={e => {
          if (mask) {
            e.target.value = setMask(e.target.value, mask)
          }
        }}
      />
      {errors[name] && (
        <span className='form-input__error-message'>
          {typeof errors[name]?.message === 'string' ? errors[name].message : 'Invalid field'}
        </span>
      )}
    </div>
  )
}

export default FormInput
