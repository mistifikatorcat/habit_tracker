export class Api{
    constructor({baseUrl, headers}){
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _respond(res) {
        return res.ok ? res.json() : Promise.reject(`Something went wrong: ${res.status}`);
    }

    getHabits(token) {
        return fetch(`${this._baseUrl}/myhabits`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }).then(this._respond);
      }
    
      createHabit({name, description}) {
        return fetch(`${this._baseUrl}/myhabits/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({name, description}),
        }).then(this._respond);
      }

      editHabit({name, description}) {
        return fetch(`${this._baseUrl}/myhabits/`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
              body: JSON.stringify({name: name, description: description})
        }).then(this._respond)
      }
    
      deleteHabit(id) {
        return fetch(`${this._baseUrl}/myhabits/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }).then(this._respond);
      }

}

let baseUrl = 'http://localhost:1337';

const api = new Api({
    baseUrl
})

export default api;