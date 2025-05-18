import { Link, useNavigate, useParams } from 'react-router'
import { UserForm } from '../components/UserForm/UserForm'
import { useUpdateUser } from '../hooks/useUpdateUser'
import type { User } from '../types'
import { useFindUser } from '../hooks/useFindUser'

export const UserEdit = () => {
  const { id } = useParams() as { id: string }

  const navigate = useNavigate()

  const { data: user } = useFindUser(id)

  const updateUserMutation = useUpdateUser()

  const handleFormSubmit = async (user: Omit<User, 'id'>) => {
    await updateUserMutation.mutateAsync({ id, user: { id, ...user } })

    navigate(`/users/${id}`)
  }

  return (
    <div className="flex flex-col gap-3">
      <UserForm defaultValues={user} onSubmit={handleFormSubmit} />
      <Link to={`/users/${id}`}>
        <button className="w-full cursor-pointer rounded-md border border-gray-400 px-4 py-2 text-gray-700 transition hover:bg-gray-100">
          Вернуться
        </button>
      </Link>
    </div>
  )
}
