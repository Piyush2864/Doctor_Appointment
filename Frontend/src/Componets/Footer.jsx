import React from 'react'
import logo from "../assets/logo123.jpg"

export default function Footer() {
  return (
    <div className='md:mx-10'>
        <div className='flex sm:gird  gird-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            
            <div>
                 <img className='mb-5 w-10' src={logo} alt="" />
                 <p className='w-full md:w-2/3 text-gray-600 leading-6 '> Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sint reprehenderit quibusdam dolorem, veniam labore, molestias recusandae alias possimus cupiditate ipsum laudantium id a eaque aspernatur nobis tenetur magni explicabo.</p>
            </div>

             <div  className='md:mx-10'>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li> 
              </ul>
             </div>

        <div className='md:mx-10'>
            <p className='text-xl font-medium mb-5'> GET IN TOUCH </p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+1-524-123-4567</li>
                <li>Docterhealth@gmail.com</li>
            </ul>
        </div>
        </div>
        <div> 
            <hr />
            <p className=' text-center py-5 text-sm '> &copy; Copyright 2024 - 2025 Docter Health. All Rights Reserved </p>
        </div>
    </div>
  )
}
