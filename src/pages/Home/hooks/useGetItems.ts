import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
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
  const isLoadMore = useRef(false)

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
        toast.error('Erro ao listar itens')
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [page])

  useEffect(() => {
    if (isLoadMore.current && document.body) {
      window.scrollTo(0, document.body.scrollHeight)
      isLoadMore.current = false
    }
  }, [data])

  function onLoadMore() {
    setPage(page + 1)
    isLoadMore.current = true
  }

  function refetchInitialPage() {
    setPage(1)
  }

  function updateItem(newItem: any, itemIndex: number) {
    const updatedItems = [...data.formItems]
    updatedItems[itemIndex] = newItem
    setData({ formItems: updatedItems, totalPages: data.totalPages })
  }

  return { data, loading, error, currentPage: page, onLoadMore, refetchInitialPage, updateItem }
}

export default useGetItems
