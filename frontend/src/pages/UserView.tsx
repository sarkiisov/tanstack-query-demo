import { Link, useNavigate, useParams } from 'react-router'
import { useFindUser } from '../hooks/useFindUser'
import type { User } from '../types'
import { useDeleteUser } from '../hooks/useDeleteUser'
import { getAxiosError } from '../utils/error'

export const UserView = () => {
  const { id } = useParams() as { id: string }

  const navigate = useNavigate()

  const { data: user, isLoading, isError, error } = useFindUser(id)

  const deleteUserMutation = useDeleteUser()

  const handleDeleteUser = async (user: User) => {
    const confirmed = window.confirm(
      `Вы действительно хотите удалить пользователя ${user.firstname} ${user.lastname}`
    )

    if (!confirmed) return

    await deleteUserMutation.mutateAsync(user.id)

    navigate('/users')
  }

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (isError) {
    return getAxiosError(error)
  }

  if (user) {
    return (
      <div className="flex flex-col gap-3">
        <div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-semibold text-gray-700">Имя:</span>
            <span className="text-gray-900">{user?.firstname || '-'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-semibold text-gray-700">Фамилия:</span>
            <span className="text-gray-900">{user?.lastname || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Возраст:</span>
            <span className="text-gray-900">{user?.age ?? '-'}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link to={`/users/${user?.id}/edit`}>
            <button className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
              Изменить
            </button>
          </Link>

          <button
            onClick={() => handleDeleteUser(user)}
            type="button"
            className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            Удалить
          </button>
        </div>
      </div>
    )
  }
}
