import axios from 'axios'
import { api } from './api'

interface CustomError extends Error {
  data: {
    message: string
  }
}

export async function createItem({
  name,
  email,
  cep,
}: {
  name: string
  email: string
  cep: string
}) {
  try {
    const formItemCreated = await api.post('/create-item', {
      name,
      email,
      cep,
    })
    return formItemCreated
  } catch (error: CustomError | unknown) {
    if (axios.isAxiosError(error)) {
      throw Error(error.response?.data.message)
    } else {
      throw error
    }
  }
}

export async function editItem({
  name,
  email,
  cep,
  id,
}: {
  name: string
  email: string
  cep: string
  id: string
}) {
  try {
    const formItemEdited = await api.put('/edit-item', { id, name, email, cep })
    return formItemEdited
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error(error.response?.data.message)
    } else {
      throw error
    }
  }
}

export async function getItems(page: number = 1) {
  try {
    const { data } = await api.get(`/get-items/${page}`)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message
    } else {
      throw error
    }
  }
}
