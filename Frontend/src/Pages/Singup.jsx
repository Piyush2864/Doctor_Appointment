import React, { useEffect } from 'react'

export default function singup() {
  const [formdata, setFormdata] = React.useState({
    name: '',
    email: '',
    password: ''
  })
  useEffect(() => { 
    
  }, [])
  return (
    <div>
        <h2>Singup</h2>
        <form action="">
        <form>
        <input type="text" placeholder="Name" className="border-2 border-gray-200 p-2 m-2 rounded-md"/>
        <input type="text" placeholder="Email" className="border-2 border-gray-200 p-2 m-2 rounded-md"/>
        <input type="password" placeholder="Password" className="border-2 border-gray-200 p-2 m-2 rounded-md"/>
        <button className="bg-blue-500 text-white p-2 m-2 rounded-md">Singup</button>
      </form>
    
        </form>
    </div>
  )
}


