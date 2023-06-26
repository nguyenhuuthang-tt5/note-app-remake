import { createBrowserRouter, Outlet } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import ProtectedRoute from '../components/ProtectedRoute'
import AuthProvider from '../context/AuthProvider'
import NoteList from '../components/NoteList'
import NoteDetail from '../components/NoteDetail'
import { folderUtil } from '../utils/FolderUtils'
import { noteUtils } from '../utils/NoteUtils'

const AuthLayout = ({ children }) => {
    return <AuthProvider><Outlet /></AuthProvider>
}
export default createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                element: <Login />,
                path: '/login'
            },
            {
                element: <ProtectedRoute />,
                loader: folderUtil,
                children: [
                    {
                        element: <Home />,
                        // loader: folderUtil,
                        path: '/',
                        children: [
                            {
                                element: <NoteList />,
                                path: 'folders/:folderId',
                                action: noteUtils.addNote,
                                loader: noteUtils.noteFromFolderId,
                                children: [
                                    {
                                        element: <NoteDetail />,
                                        path: 'note/:noteId',
                                        action: noteUtils.updateNote,
                                        loader: noteUtils.noteFromNoteId
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
    }
])