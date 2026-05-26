import React from 'react'
import { Menu } from '@/components/ForAllPage/Menu'
import { Footer } from '@/components/ForAllPage/Footer'

const page = () => {
  return (
    
    <div className="flex flex-col min-h-screen w-full">
      
      <header className="w-full">
        <Menu />
      </header>
      
   
      <main className="relative flex flex-1 flex-col items-center justify-center gap-4 p-8 max-w-3xl w-full mx-auto">
         
      

      </main> 
    
      <Footer/>
    
    </div>
  )
}

export default page