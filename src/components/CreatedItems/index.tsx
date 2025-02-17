// Custom hooks
import useGetItems from './hooks/useGetItems'

// Styles
import './index.scss'

function CreatedItems() {
  const { loadMore, data, loading, error } = useGetItems()

  return (
    <div className='created-items'>
      <h1>Lista de itens</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <ul className='created-items__list'>
        {data?.formItems?.map((item: any) => (
          <li key={item.id}>
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
      <button className='created-items__load-more' onClick={loadMore}>
        Carregar mais
      </button>
    </div>
  )
}

export default CreatedItems
