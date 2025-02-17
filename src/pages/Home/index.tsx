import { useForm } from 'react-hook-form'

// Custom hooks
import useSubmitForm from './hooks/useSubmitForm'

// Components
import FormInput from '../../components/FormInput'
import FormHeader from '../../components/FormHeader'
import FormButton from '../../components/FormButton'

// Styles
import './index.scss'

function Home() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onBlur',
  })
  const { createItem } = useSubmitForm()

  return (
    <main className='home'>
      <FormHeader title='Formulário' description='Cadastrar' />
      <form onSubmit={handleSubmit(createItem)}>
        <FormInput
          formField={{
            type: 'email',
            name: 'email',
            placeholder: 'francisco.braz@example.com',
            label: 'E-mail',
            regex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            regexErrorMessage: 'Formato de e-mail inválido',
            required: true,
          }}
          register={register}
          errors={errors}
        />
        <FormInput
          formField={{
            type: 'input',
            name: 'name',
            placeholder: 'Francisco',
            label: 'Nome',
            required: true,
            mask: 'numberNotAllow',
          }}
          register={register}
          errors={errors}
        />
        <FormInput
          formField={{
            type: 'input',
            name: 'cep',
            placeholder: '49400-000',
            label: 'CEP',
            required: true,
            mask: 'cep',
          }}
          register={register}
          errors={errors}
        />
        <FormButton
          type='submit'
          styleType='contained'
          onClick={() => console.log(getValues())}
          disabled={!isValid}
          isLoading={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </FormButton>
      </form>
    </main>
  )
}

export default Home
