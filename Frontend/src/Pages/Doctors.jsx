import React ,{useState}from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { useEffect } from 'react'



export default function Doctors() {

  const {speciality} = useParams()
  const [filterDoc, setFilterDoc] = useState([])

  const {doctors} = useContext(AppContext)

  const navigate = useNavigate()
  const applyFilter = () =>{
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setFilterDoc(doctors)
    }
  }

  useEffect(() => { 
    applyFilter()
  }, [speciality,doctors])

  return (
    <div>
      <p>Browse thorugh the doctors speciality.</p>
      <div>
        <div>
          <p>General Physician</p>
          <p>Gynecologist</p>
          <p>Dermatologist</p>
          <p>Pediatrician</p>
          <p>Neurologist</p>
          <p>Gastroenterologist</p>
        </div>
        <div className='w-full flex flex-wrap gap-4 gap-y-6 '>
          {
          filterDoc?.map((item,index)=>(
            <div onClick={()=>navigate(`/appointment/${item._id}`)}  key={index} className='border border-bule-200 rounded-xl  overfull-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 '> 
                <img  className="bg-blue-50 w-60 h-60 " src={item.image} alt="" />
                <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full '></p><p>Available</p>
                </div>
                <p className=' font-medium text-lg text-gray-900  '>{item.name}</p>
                <p className='text-gray-600 text-sm '>{item.speciality}</p>
            </div>
            </div>

            ))}
        </div>
      </div>
    </div>
  )
}
