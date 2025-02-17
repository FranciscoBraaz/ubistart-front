import { useEffect, useRef, useState } from 'react'
import { getItems } from '../../../services/formItem.services'

function useGetItems() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState<{ formItems: any[]; totalPages: number }>({
    formItems: [],
    totalPages: 0,
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
        const responseData = await getItems(page)
        if (page > 1) {
          responseData.formItems = [...data.formItems, ...responseData.formItems]
        }
        setData(responseData)
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

  function onLoadMore() {
    setPage(page + 1)
  }

  function refetchInitialPage() {
    setPage(1)
  }

  return { data, loading, error, currentPage: page, onLoadMore, refetchInitialPage }
}

export default useGetItems
