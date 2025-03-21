import React from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'

function LogoDesc({onHandleInputChange}) {
  return (
    <div className='my-10'>
      <HeadingDescription title={Lookup.LogoDescTitle}
      description={Lookup.LogoDescDesc}/> 
      <input
        type="text"
        placeholder={Lookup.InputTitlePlaceholder}
        className="p-4 border rounded-lg mt-5 w-full"

        onChange={(e)=>onHandleInputChange(e.target.value)}
      ></input>
    </div>
  )
}

export default LogoDesc
