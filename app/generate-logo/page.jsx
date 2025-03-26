"use client"
import React, { useContext } from 'react'
import { UserDetailContex } from '../_context/UserDetailContext'

function GenerateLogo() {
  const {userDetail,setUserDetail}=useContext(UserDetailContex)
  console.log(userDetail);
  return (
    <div>
      gekjbfds
    </div>
  )
}

export default GenerateLogo

