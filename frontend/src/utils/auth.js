let BASE_URL =
node_env === 'production'
? 'http://localhost:1337'
: 'http://localhost:1337';

const fetcher = (url, headers) => {
    return fetch(url, headers).then((res) =>
      res.ok ? res.json() : Promise.reject(res.StatusText)
    );
  };

  export const register = (username, email, password) => {
    return fetcher(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
  };
  
  export const login = (email, password) => {
    return fetcher(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }); 
  };

  export const updateUser = (email, password) => {
    return fetcher(`${BASE_URL}/updateuser`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    });
    
  };
  
  export const checkToken = (token) => {
    return fetcher(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  };