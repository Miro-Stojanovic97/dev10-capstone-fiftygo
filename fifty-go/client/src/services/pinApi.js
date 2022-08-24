const url = 'http://localhost:8080/api/pin';

export async function findAll() {
    const response = await fetch(url);
    if (response.status === 200) {
      return response.json();
    } else {
      return Promise.reject(`Unexpected status code: ${response.status}`);
    }
  }

//   export async function findById(id) {
//     const response = await fetch(`${url}/${id}`);
//     if (response.status === 200) {
//       return response.json();
//     } else {
//       return Promise.reject(`Unexpected status code: ${response.status}`);
//     }
//   }

// export async function add(solarPanel) {
//     const init = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${getToken()}`
//       },
//       body: JSON.stringify(solarPanel)
//     };
  
//     const response = await fetch(url, init);
//     if (response.status === 201 || response.status === 400) {
//       return response.json();
//     } else {
//       return Promise.reject(`Unexpected status code: ${response.status}`);
//     }
//   }
  
//   export async function update(solarPanel) {
//     const init = {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${getToken()}`
//       },
//       body: JSON.stringify(solarPanel)
//     };
  
//     const response = await fetch(`${url}/${solarPanel.id}`, init);
//     if (response.status === 204) {
//       return null;
//     } else if (response.status === 400) {
//       return response.json();
//     } else {
//       return Promise.reject(`Unexpected status code: ${response.status}`);
//     }
//   }
  
//   export async function deleteById(id) {
//     const init = {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${getToken()}`
//       }
//     };
  
//     const response = await fetch(`${url}/${id}`, init);
//     if (response.status === 204) {
//       return null;
//     } else {
//       return Promise.reject(`Unexpected status code: ${response.status}`);
//     }
//   }
  
//   const getToken = () => {
//     return localStorage.getItem('jwt_token');
//   }
  