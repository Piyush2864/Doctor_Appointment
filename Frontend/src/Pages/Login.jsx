import React ,{useEffect} from 'react'


export default function Login() {

  useEffect(() => {
  
  }, [])
   



  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Email" className="border-2 border-gray-200 p-2 m-2 rounded-md"/>
        <input type="password" placeholder="Password" className="border-2 border-gray-200 p-2 m-2 rounded-md"/>
        <button className="bg-blue-500 text-white p-2 m-2 rounded-md">Login</button>
      </form>
    </div>
  )
}
