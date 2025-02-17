import { useForm } from 'react-hook-form'

// Custom hooks
import useSubmitForm from './hooks/useSubmitForm'
import useGetItems from './hooks/useGetItems'

// Components
import FormInput from '../../components/FormInput'
import FormHeader from '../../components/FormHeader'
import FormButton from '../../components/FormButton'
import CreatedItems from '../../components/CreatedItems'

// Styles
import './index.scss'

function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      cep: '',
    },
  })
  const { refetchInitialPage, onLoadMore, updateItem, data, loading, error, currentPage } =
    useGetItems()
  const { submitCreateItem, submitEditItem, onFillForm, selectedItem, onClearForm } = useSubmitForm(
    {
      reset,
      refetchInitialPage,
      updateItem,
    }
  )

  return (
    <main className='home'>
      <FormHeader title='Formulário' description='Cadastrar' />
      <form onSubmit={handleSubmit(selectedItem ? submitEditItem : submitCreateItem)}>
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
        <button className='home__clear-form' type='button' onClick={onClearForm}>
          Limpar formulário
        </button>
        <FormButton
          type='submit'
          styleType='contained'
          disabled={!isValid}
          isLoading={isSubmitting}>
          Enviar
        </FormButton>
      </form>
      <CreatedItems
        data={data}
        loading={loading && currentPage <= 1}
        loadingMore={loading && currentPage > 1}
        error={error}
        currentPage={currentPage}
        onFillForm={(item, index) => onFillForm(item, index)}
        loadMore={onLoadMore}
      />
    </main>
  )
}

export default Home
