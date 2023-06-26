import { getAuth } from 'firebase/auth';
import { Navigate, Outlet, useLoaderData } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const folders = useLoaderData()
  const auth = getAuth()
  if(!localStorage.getItem('accessToken') || !folders) {
    auth.signOut()
    return <Navigate to={'/login'}/>
  }

  return <Outlet />
}
