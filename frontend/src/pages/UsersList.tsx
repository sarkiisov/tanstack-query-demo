import { Link, useNavigate } from 'react-router'
import { useFindManyUsers } from '../hooks/useFindManyUsers'
import { getAxiosError } from '../utils/error'

export const UsersList = () => {
  const navigate = useNavigate()

  const { data: users, isLoading, isError, error } = useFindManyUsers()

  return (
    <div className="flex flex-1 flex-col gap-3">
      <Link to="add" className="ml-auto w-fit">
        <button className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
          Добавить
        </button>
      </Link>
      {isLoading && <div>Загрузка...</div>}
      {!isLoading && users && (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Имя
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Фамилия
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Возраст
              </th>
            </tr>
          </thead>
          <tbody>
            {(users ?? []).map((user) => (
              <tr
                key={user.id}
                onClick={() => navigate(`/users/${user.id}`)}
                className="cursor-pointer transition hover:bg-blue-50"
              >
                <td className="border border-gray-300 px-4 py-2">{user.firstname}</td>
                <td className="border border-gray-300 px-4 py-2">{user.lastname}</td>
                <td className="border border-gray-300 px-4 py-2">{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isError && <div>{getAxiosError(error)}</div>}
    </div>
  )
}
