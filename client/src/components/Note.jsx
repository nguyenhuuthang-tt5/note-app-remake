import React from 'react'
import { Link } from 'react-router-dom'

export default function Note({ note }) {

  function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
  }

  return (
    <Link to={`note/${note.id}`}>
      <div className='w-full h-[50px] bg-slate-300 rounded-md px-2 text-left flex items-center shadow-lg my-[5px] cursor-pointer transition-all hover:bg-slate-100 flex-shrink-0'>
          <p className='text-base text-gray-900'>{removeTags(note.content)}</p>
      </div>
    </Link>
  )
}
