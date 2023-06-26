import React from 'react'
import { Link , useParams} from 'react-router-dom'

export default function Folder({ folder }) {
  const { folderId } = useParams()
  const setActive = () => {
    return folder.id === folderId ? 'bg-slate-700' : 'bg-slate-500'
  }
  return (

    <Link to={`folders/${folder.id}`}>
        <div className={`w-full h-[40px] ${setActive()} rounded-md px-2 text-left flex items-center shadow-2xl my-[5px] cursor-pointer transition-all hover:bg-slate-400 flex-shrink-0`}>
            <p className='text-base text-slate-50'>{ folder.name }</p>
        </div>
    </Link>
  )
}
