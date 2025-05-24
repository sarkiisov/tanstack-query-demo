import { useNavigate } from 'react-router'
import { UserForm } from '../components/UserForm/UserForm'
import { useCreateUser } from '../hooks/useCreateUser'
import type { User } from '../types'

export const UserAdd = () => {
  const createUserMutation = useCreateUser()

  const navigate = useNavigate()

  const handleFormSubmit = async (user: Omit<User, 'id'>) => {
    const id = crypto.randomUUID()

    await createUserMutation.mutateAsync({ id, ...user })

    navigate(`/users/${id}`)
  }

  return <UserForm onSubmit={handleFormSubmit} />
}
