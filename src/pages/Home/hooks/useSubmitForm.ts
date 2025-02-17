import { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { toast } from 'react-toastify'

// Services
import { createItem, editItem } from '../../../services/formItem.services'
import { cepMask } from '../../../utils/masks'

interface Item {
  _id: string
  name: string
  email: string
  cep: string
}

interface UseSubmitForm {
  reset: (itemSelected: Item) => void
  refetchInitialPage: VoidFunction
  updateItem?: (data: Item, itemIndex: number) => void
}

function useSubmitForm({ reset, refetchInitialPage, updateItem }: UseSubmitForm) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [itemIndex, setItemIndex] = useState<number | null>(null)

  async function submitCreateItem(values: FieldValues) {
    const formValues = values as Item
    try {
      await createItem(formValues)
      refetchInitialPage()
      setTimeout(() => {
        onClearForm()
      }, 200)
      toast.success('Item cadastrado')
    } catch (error) {
      console.error(error)
      if (error instanceof Error && error.message) {
        toast.error(error.message)
      } else {
        toast.error('Erro ao salvar alterações')
      }
    }
  }

  async function submitEditItem(values: FieldValues) {
    const formValues = values as Item
    try {
      if (!selectedItem) return
      const response = await editItem({
        name: formValues.name,
        cep: formValues.cep,
        email: formValues.email,
        id: formValues._id,
      })
      const data = response.data.updatedItem as Item

      if (updateItem && itemIndex !== null) {
        updateItem(data, itemIndex)
      }

      toast.success('Alterações salvas')
      setTimeout(() => {
        onClearForm()
      }, 200)
    } catch (error: string | unknown) {
      console.error(error)
      if (error instanceof Error && error.message) {
        toast.error(error.message)
      } else {
        toast.error('Erro ao salvar alterações')
      }
    }
  }

  function onFillForm(itemSelected: Item, itemIndex: number) {
    setSelectedItem(itemSelected)
    setItemIndex(itemIndex)
    reset({
      _id: itemSelected._id,
      name: itemSelected.name,
      email: itemSelected.email,
      cep: cepMask(itemSelected.cep),
    })
  }

  function onClearForm() {
    reset({
      _id: '',
      name: '',
      email: '',
      cep: '',
    })
    setSelectedItem(null)
    setItemIndex(null)
  }

  return { submitCreateItem, submitEditItem, onFillForm, selectedItem, onClearForm }
}

export default useSubmitForm
