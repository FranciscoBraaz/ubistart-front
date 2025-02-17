import { MoonLoader } from 'react-spinners'

// Styles
import './index.scss'

interface Item {
  id: string
  name: string
  email: string
  cep: number
}

interface CreatedItemsProps {
  onFillForm: (item: Item) => void
  loadMore: VoidFunction
  data: {
    formItems: Item[]
    totalPages: number
  }
  currentPage: number
  loading: boolean
  error: string
}

function CreatedItems({
  data,
  loading,
  error,
  currentPage,
  onFillForm,
  loadMore,
}: CreatedItemsProps) {
  return (
    <div className='created-items'>
      <h1>Lista de itens</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <ul className='created-items__list'>
        {data?.formItems?.map((item: Item) => (
          <li key={item.id} onClick={() => onFillForm(item)} role='button'>
            <p>
              <strong>Nome:</strong> {item.name}
            </p>
            <p>
              <strong>E-mail:</strong> {item.email}
            </p>
            <p>
              <strong>CEP:</strong> {item.cep}
            </p>
          </li>
        ))}
      </ul>
      {currentPage < data.totalPages && (
        <button className='created-items__load-more' onClick={loadMore}>
          {loading ? <MoonLoader color='#fff' size={20} /> : <span>Carregar mais</span>}
        </button>
      )}
    </div>
  )
}

export default CreatedItems
