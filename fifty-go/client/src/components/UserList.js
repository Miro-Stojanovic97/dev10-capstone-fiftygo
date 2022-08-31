import { useEffect, useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

function UserList() {

    const [users, setUsers] = useState([]);
    const [roles, setRoles ] = useState([]);

    const auth = useContext(AuthContext);

    useEffect(() => {
        if(auth.user.hasRole('ROLE_ADMIN')) {

        const init = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.user.token}`
          },
        };

          fetch(`http://localhost:8080/user`, init)
            .then(response => {
              if (response.status === 200) {
                return response.json();
              } else {
                return Promise.reject(`Unexpected status code: ${response.status}`);
              }
            })
            
            .then(data => setUsers(data))
            .catch(console.log);
        }
        }, [auth.user.token]); // An empty dependency array tells to run our side effect once when the component is initially loaded.   
    
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
                  <div className='p-1'>User Status</div> 
                </th>
                <th scope="col">
                  <div className='p-1'></div> 
                </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={auth.user.appUserId + "-key"}>
                <td>
                  <div className='p-1'>{user.appUserId}</div> 
                </td>
                <td>
                  <div className='p-1'>{user.firstName}</div> 
                </td>
                <td>
                  <div className='p-1'>{user.lastName}</div> 
                </td>
                <td>
                  <div className='p-1'>{user.username}</div> 
                </td>
                <td>
                  <div className='p-1'>{user.roles}</div> 
                  {console.log(user)}
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