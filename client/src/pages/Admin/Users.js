import React, { useState ,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'

const Users = () => {


  {/*  get all users */}
const [users,setUsers]=useState([])

  const getUsers = async () => {
    try {
        const { data } = await axios.get(`/api/v1/product/alll-users`);
        setUsers(data);
    } catch (error) {
        console.log(error)
    }
}
useEffect(() => {
    getUsers()
}, [])

  {/* */}
  return (
    <Layout title={'Dashboard - All Users'}>
        <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1 className='text-center'>All users</h1>
               {/* get all users */}

               <div className="review-list">
                    {users?.map((u, i) => (
                        <div key={i} className="review-item">
                            <span className="review-username">User : {u.name}</span>
                            <p className="review-text">User-Email : {u.email}</p>
                            <p className="review-text">User-Phone No : {u.phone}</p>
                            <p className="review-text">User-Address : {u.address}</p>
                        </div>
                    ))}
                </div>

               {/* */}
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Users