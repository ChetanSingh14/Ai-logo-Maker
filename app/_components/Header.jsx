"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { useUser } from "@clerk/nextjs";
function Header() {
  const {user}=useUser();
  console.log(user)
  return (
    <div className=' px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm'>
      <Image src={'./logo.svg'} alt='logo' width={180} height={100}></Image>
      <div className='flex gap-3 items-center'>
        {user?<Button>Dashboard</Button>:
      <Button>Get started</Button>}
      <UserButton/>
      </div>
     
    </div>
  )
}

export default Header
