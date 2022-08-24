// export async function authenticate(username, password) {
//     const init = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         username,
//         password
//       })
//     };
//     const response = await fetch('http://localhost:8080/authenticate', init);
//     if (response.status === 200) {
//       const result = await response.json();
//       setToken(result.jwt_token);
//       const user = makeUser(result.jwt_token);
//       return user;
//     } else {
//       return Promise.reject('Bad username/password');
//     } 
//   }
  
//   export async function refreshToken () {
//     const init = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${getToken()}`
//       }
//     };
  
//     const response = await fetch('http://localhost:8080/refresh-token', init);
//     if (response.status === 200) {
//       const result = await response.json();
//       setToken(result.jwt_token);    
//       const user = makeUser(result.jwt_token);
//       return user;
//     } else {
//       return Promise.reject('Forbidden');
//     } 
//   }
  
//   export function logout() {
//     localStorage.removeItem('jwt_token');
//   }
  
//   const setToken = (token) => {
//     localStorage.setItem('jwt_token', token);
//   }
  
//   const getToken = () => {
//     return localStorage.getItem('jwt_token');
//   }
  
//   const makeUser = (token) => {
//     const tempUser = JSON.parse(decodeToken(token));
//     return {
//       username: tempUser.sub,
//       roles: tempUser.authorities
//         .split(',')
//         .map(r => r.replace('ROLE_', ''))
//     }
//   }
  
//   const decodeToken = (token) => {
//     const parts = token.split('.');
//     return atob(parts[1]);
//   }
  
//   // {
//   //   username: 'john@smith.com',
//   //   roles: ['ADMIN']
//   // }