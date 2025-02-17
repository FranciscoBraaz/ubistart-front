import { api } from './api'

export async function createItem({
  name,
  email,
  cep,
}: {
  name: string
  email: string
  cep: number
}) {
  try {
    const formItemCreated = await api.post('/create-item', {
      name,
      email,
      cep,
    })
    return formItemCreated
  } catch (error) {
    console.warn('DB - Erro ao criar item:', error)
    throw new Error(String(error))
  }
}

export async function getItems(page: number = 1) {
  try {
    const { data } = await api.get(`/get-items/${page}`)

    return data
  } catch (error) {
    console.warn('Erro ao buscar items:', error)
    throw new Error(String(error))
  }
}
