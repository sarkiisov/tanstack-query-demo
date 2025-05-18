import { UserForm } from '../components/UserForm/UserForm'
import { useCreateUser } from '../hooks/useCreateUser'
import type { User } from '../types'

export const UserAdd = () => {
  const createUserMutation = useCreateUser()

  const handleFormSubmit = (user: Omit<User, 'id'>) => {
    createUserMutation.mutate({
      id: crypto.randomUUID(),
      ...user
    })
  }

  return <UserForm onSubmit={handleFormSubmit} />
}
