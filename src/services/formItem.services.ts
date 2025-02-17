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
