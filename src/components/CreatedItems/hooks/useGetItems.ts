import { useEffect, useRef, useState } from 'react'
import { getItems } from '../../../services/formItem.services'

function useGetItems() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState({
    formItems: [],
    totalItems: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    async function fetchItems() {
      setLoading(true)
      try {
        const data = await getItems(page)
        setData(data)
      } catch (error) {
        console.error(error)
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError(String(error))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [page])

  function loadMore() {
    setPage(page + 1)
  }

  return { loadMore, data, loading, error }
}

export default useGetItems
