import type { FormEvent } from 'react'
import type { UserFormProps } from './UserForm.types'

export const UserForm = ({ defaultValues, onSubmit }: UserFormProps) => {
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const { firstname, lastname, age } = event.target as EventTarget & {
      firstname: HTMLInputElement
      lastname: HTMLInputElement
      age: HTMLInputElement
    }

    await onSubmit({
      firstname: firstname.value,
      lastname: lastname.value,
      age: age.valueAsNumber
    })
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
      <input
        placeholder="Имя"
        required
        name="firstname"
        defaultValue={defaultValues?.firstname}
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        placeholder="Фамилия"
        required
        name="lastname"
        defaultValue={defaultValues?.lastname}
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        placeholder="Возраст"
        type="number"
        min={18}
        name="age"
        defaultValue={defaultValues?.age}
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="w-full cursor-pointer rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
      >
        Сохранить
      </button>
    </form>
  )
}
