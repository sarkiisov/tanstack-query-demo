import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { queryClient } from './core/query.ts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { UsersList } from './pages/UsersList.tsx'
import { UserAdd } from './pages/UserAdd.tsx'
import { UserView } from './pages/UserView.tsx'
import { UserEdit } from './pages/UserEdit.tsx'

import './index.css'
import { UsersLayout } from './layouts/UsersLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="users" />} />
          <Route
            path="users"
            element={
              <UsersLayout>
                <UsersList />
              </UsersLayout>
            }
          >
            <Route path="add" element={<UserAdd />} />
            <Route path=":id" element={<UserView />} />
            <Route path=":id/edit" element={<UserEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  </StrictMode>
)
