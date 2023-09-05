const BASE_URL = 'http://localhost:3030/users'
const usersList = document.getElementById('users')
const formFilter = document.getElementById('filter')

//===================Запрос и вывод нв страницу=========================
async function getUsers() {
    try {
        const response = await fetch(BASE_URL)
        if(response.status >= 200 && response.status <= 204) {
            const users = await response.json()
            return users
        }
        else if (response.status === 404) {
            throw Error(`${response.status}: not found`)
        }
        else if(response.status === 500) {
            throw Error(`${response.status}: server not working`)
        }
    } catch (error) {
        console.log(error);
    }
}
getUsers()
    .then(users => {
        users.forEach(user => {
            usersList.innerHTML += `<li>${user.name}</li>`
        });
    })
//=======================================================================


//=======================Фильтр=========================================
formFilter.addEventListener('submit', async function(event) {
    event.preventDefault()
    try {
        const select = formFilter.querySelector('[name="position"]')
            if(select.value !== "") {
                const response = await fetch(`${BASE_URL}?${select.name}=${select.value}`)
                if(response.status >= 200 && response.status <= 204) {
                    const users = await response.json()
                    usersList.innerHTML = ''
                    users.forEach(user => {
                        usersList.innerHTML += `<li>${user.name}</li>`
                    });
                }
                else if (response.status === 404) {
                    throw Error(`${response.status}: not found`)
                }
                else if(response.status === 500) {
                    throw Error(`${response.status}: server not working`)
                }
            } else {
                usersList.innerHTML = ''
                getUsers()
                .then(users => {
                    users.forEach(user => {
                        usersList.innerHTML += `<li>${user.name}</li>`
                    });
                })
            }
    } catch (error) {
        alert(error);
    }
})
//======================================================================


//========================Сброс фильтра=================================
formFilter.addEventListener('reset', async function(event) {
    event.preventDefault()
    const response = await fetch(`${BASE_URL}`)
    const users = await response.json()
    usersList.innerHTML = ''
    users.forEach(user => {
        usersList.innerHTML += `<li>${user.name}</li>`
    });
})
//======================================================================