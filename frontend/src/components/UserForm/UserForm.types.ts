import type { User } from '../../types'

export type UserFormProps = {
  defaultValues?: Omit<User, 'id'>
  onSubmit: (user: Omit<User, 'id'>) => Promise<void> | void
}
