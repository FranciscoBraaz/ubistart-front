import { FieldValues } from 'react-hook-form'
import { createItem } from '../../../services/formItem.services'

interface Item {
  name: string
  email: string
  cep: number
}

function useSubmitForm() {
  async function submitCreateItem(values: FieldValues) {
    const formValues = values as Item
    try {
      const formItemCreated = await createItem(formValues)
      return formItemCreated
    } catch (error) {
      console.error(error)
    }
  }

  return { submitCreateItem }
}

export default useSubmitForm
