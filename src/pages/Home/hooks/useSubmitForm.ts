import { FieldValues } from 'react-hook-form'
import { createItem } from '../../../services/formItem.services'

interface Item {
  id: string
  name: string
  email: string
  cep: number
}

interface UseSubmitForm {
  reset: (itemSelected: Item) => void
  refetchInitialPage: VoidFunction
}

function useSubmitForm({ reset, refetchInitialPage }: UseSubmitForm) {
  async function submitCreateItem(values: FieldValues) {
    const formValues = values as Item
    try {
      await createItem(formValues)
      refetchInitialPage()
    } catch (error) {
      console.error(error)
    }
  }

  function onFillForm(itemSelected: Item) {
    reset(itemSelected)
  }

  return { submitCreateItem, onFillForm }
}

export default useSubmitForm
