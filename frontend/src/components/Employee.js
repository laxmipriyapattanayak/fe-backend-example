import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployee, addEmployee, deleteEmployee, updateEmployee } from '../employeeSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Employee = () => {
  const dispatch = useDispatch();
  const {employee, error, apiReply}  = useSelector((state) => state.empStore)
  const [emp, setEmp] = useState({name: '', designation: ''});
  const [update, isUpdate] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployee())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(update) {
        dispatch(updateEmployee(emp))
        isUpdate(false)
        toast(`Updated Successful`)
    } else {
        //calling update api
        dispatch(addEmployee(emp))
        toast(`Insert Successful`)
    }
    //calling fetch api to get fresh data
    dispatch(fetchEmployee())
    setEmp({name: '', designation: ''})
  }
  
  const handleChange = (e) => {
    setEmp({...emp, [e.target.name]: e.target.value})
  }

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id))
    toast(`Delete Successful`)
    dispatch(fetchEmployee())
  }

  const handleUpdate = (id, name, designation) => {
    setEmp({id: id, name: name, designation: designation})
    isUpdate(true)
  }

  return (
    <div className='app'>
        <section>{error}</section>
        <section>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input name="name" value={emp.name} placeholder='Name' onChange={(e) => handleChange(e)}/>
                <input name="designation" value={emp.designation} placeholder='Designation' onChange={(e) => handleChange(e)}/>
                <button disabled={emp.name && emp.designation ? false: true }>{update ? 'Update' : 'Ok'}</button>
            </form>
        </section>
        <br/>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>O</th>
                    <th>O</th>
                </tr>
            </thead>
            <tbody>    
                {employee?.map((emp) => {
                    const {id, name, designation} = emp;
                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{designation}</td>
                            <td>
                                <button onClick={() => handleUpdate(id, name, designation)}>update</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(id)}>delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        
        <footer>
            <span>{ Object.keys(apiReply).length > 0 ? JSON.stringify(apiReply) : 'footer' }</span>
        </footer>
        <ToastContainer position="top-center" autoClose={2000}/>
    </div>
  )
}

export default Employee