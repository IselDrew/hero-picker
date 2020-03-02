// TODO:
// 1. Change users array to array of objects;
//    E.g. [{ name: 'IselDrew', isChecked: false }, {...}, ...]
// 2. Add list of users with line-through for those, who has isChecked: true;
// 3. Redo Reload without refreshing page;
// 4. Rewrite Reload button; || done!
;(function() {
  let users = [
    "iseldrew",
    "oksanakozhukh",
    // 'antonpanchenk0',
    // 'giruta',
    // 'staspitsyk',
    // 'alexandrkrivobok',
    // 'alekseypetrenko',
    // 'maslovakat',
    // 'kolesnicknick',
  ]
  let userList = []

  const chooseButton = document.querySelector(".choose-button")
  // const usersInfo = JSON.parse(localStorage.getItem('users')) || {};
  const usersInfo = {}

  function getAllUsers() {
    // users.forEach(user => loadUser(user)); //change to map promise.all //const promises = users.map(...) promiseAll(promises).then()
    const promises = users.map(user => loadUser(user))

    Promise.all(promises)
      .then(results => {
        userList = results;
        console.log(results)
      })
      .catch(err => {
        console.log(err)
      })
  }

  async function loadUser(pickedUser) {
    try {
      const link = "https://api.github.com/users/" + pickedUser
      let response = await fetch(link)
      return await response.json()
      // let user = await response.json();
      // usersInfo[pickedUser] = user;
    } catch (err) {
      console.log(err)
    }
  }

  function handleClick() {
    if (chooseButton.textContent === "Reload") {
      reloadPage()
    }
    if (!userList.length) {
      chooseButton.textContent = "Reload"
      showMessage("No Users Left")
    } else {
      getRandomUser()
    }
  }

  function getRandomUser() {
    const randomNumber = Math.floor(Math.random() * userList.length)
    const user = userList[randomNumber]
    // const user = usersInfo[gitAcc];
    userList = userList.filter(item => item !== user)

    addUserToDOM(user)
  }

  function reloadPage() {
    // rewrite this function
    location.reload()
  }

  function addUserToDOM(user) {
    const output = `<div class="user"> 
        <a href="${user.html_url}" target="_blank">  
          <div class="img-wrapper"> 
            <img src="${user.avatar_url}"> 
          </div> 
        </a> 
        <br>  
        <h1>${user.login}</h1> 
      </div>`

    document.querySelector(".users").innerHTML = output
  }

  function showMessage(msg) {
    const output = `<h1>${msg}</h1>`
    document.querySelector(".users").innerHTML = output
  }

  chooseButton.addEventListener("click", handleClick)
  getAllUsers()
  // document.addEventListener('DOMContentLoaded', getAllUsers)
})()
