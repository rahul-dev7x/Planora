import { Button } from '@/components/ui/button'

import { FaPlus } from 'react-icons/fa'
import EventCard from './EventCard'
import { useState } from 'react'
import CreateEventDialog from './CreateEventDialog'

const Events = () => {
const [isDialogOpen,setIsDialogOpen]=useState(false)
  return (
    <div className='flex flex-col gap-4 '>
      <div className='flex justify-between'>
        <div>
          <h2 className='text-2xl font-semibold twxt-gray-600'>Events</h2>
          <p className='text-xl text-gray-400'>Manage Your Events and Tickets</p>
        </div>
        <div className='flex justify-between items-center gap-2'>
          <Button className='bg-blue-700 text-white'><FaPlus size={25}/></Button>
          <p className='text-xl font-semibold' onClick={()=>setIsDialogOpen(true)}>Create Event</p>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        <EventCard/>
       
      </div>
      <CreateEventDialog open={isDialogOpen} onClose={()=>setIsDialogOpen(false)}/>
    </div>
  )
}

export default Events
