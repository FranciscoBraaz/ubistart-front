import { MoonLoader, ScaleLoader } from 'react-spinners'

// Styles
import './index.scss'
import { cepMask } from '../../utils/masks'

interface Item {
  _id: string
  name: string
  email: string
  cep: string
}

interface CreatedItemsProps {
  onFillForm: (item: Item, index: number) => void
  loadMore: VoidFunction
  data: {
    formItems: Item[]
    totalPages: number
  }
  currentPage: number
  loading: boolean
  loadingMore: boolean
  error: string
}

function CreatedItems({
  data,
  loading,
  loadingMore,
  error,
  currentPage,
  onFillForm,
  loadMore,
}: CreatedItemsProps) {
  return (
    <div className='created-items'>
      <h1>Lista de itens</h1>
      {loading && (
        <div className='created-items__loading'>
          <ScaleLoader color='#007a7c' width={32} height={32} />
        </div>
      )}
      {error && <p>{error}</p>}
      <ul className='created-items__list'>
        {data?.formItems?.map((item: Item, index) => (
          <li key={item._id} onClick={() => onFillForm(item, index)} role='button'>
            <p>
              <strong>Nome:</strong> {item.name}
            </p>
            <p>
              <strong>E-mail:</strong> {item.email}
            </p>
            <p>
              <strong>CEP:</strong> {cepMask(item.cep)}
            </p>
          </li>
        ))}
      </ul>
      {currentPage < data.totalPages && (
        <button className='created-items__load-more' onClick={loadMore}>
          {loadingMore ? <MoonLoader color='#000' size={20} /> : <span>Carregar mais</span>}
        </button>
      )}
    </div>
  )
}

export default CreatedItems
