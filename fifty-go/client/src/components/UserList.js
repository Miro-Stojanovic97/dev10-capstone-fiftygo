import { useEffect, useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

function UserList() {

    const [users, setUsers] = useState([]);

    const auth = useContext(AuthContext);

    return (
        <>
        <div className='container'>
        <h2 className="mt-4">FiftyGO Users</h2>
        <table className="table table-striped table-hover table-sm">
          <thead>
            <tr>
                <th scope="col">
                  <div className='p-1'>User ID</div>
                </th>
                <th scope="col">
                  <div className='p-1'>First Name</div> 
                </th>
                <th scope="col">
                  <div className='p-1'>Last Name</div> 
                </th>
                <th scope="col">
                  <div className='p-1'>Username</div> 
                </th>
                <th scope="col">
                  <div className='p-1'>Password</div> 
                </th>
                <th scope="col">
                  <div className='p-1'>Membership Status</div> 
                </th>
                <th scope="col">
                  <div className='p-1'></div> 
                </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.userId}>
                <td>
                  <div className='p-1'>{auth.user.appUserId}</div> 
                </td>
                <td>
                  <div className='p-1'>{auth.user.firstName}</div> 
                </td>
                <td>
                  <div className='p-1'>{auth.user.lastName}</div> 
                </td>
                <td>
                  <div className='p-1'>{auth.user.username}</div> 
                </td>
                <td>
                  <div className='p-1'>{auth.user.password}</div> 
                </td>
                <td>
                  <div className='p-1'>{auth.user.roles}</div> 
                </td>
                <td className='vert-center'>
                  <div className="row align-self-center p-1 m-1">
                      <button className="btn btn-primary btn-sm mb-2">
                        <i className="bi bi-pencil-square"></i> Disable User
                      </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    );
}

export default UserList;