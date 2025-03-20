import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
function Header() {
  return (
    <div className='  p-4 flex justify-between items-center shadow-sm'>
      <Image src={'./logo.svg'} alt='logo' width={180} height={100}></Image>
      <Button>Get started</Button>
    </div>
  )
}

export default Header
