import { Link, useOutlet } from 'react-router'

export const UsersLayout = ({ children }: React.PropsWithChildren) => {
  const outlet = useOutlet()

  return (
    <div className="mx-auto flex max-w-4xl gap-8 p-6">
      {children}
      {outlet && (
        <div className="flex w-1/3 flex-col gap-3">
          <Link to="/users">
            <button
              type="button"
              className="cursor-pointer rounded-md border border-gray-400 px-4 py-2 text-gray-700 transition hover:bg-gray-100"
            >
              Закрыть
            </button>
          </Link>
          {outlet}
        </div>
      )}
    </div>
  )
}
