// TODO: 
// 1. Change users array to array of objects;
//    E.g. [{ name: 'IselDrew', isChecked: false }, {...}, ...]
// 2. Add list of users with line-through for those, who has isChecked: true;
// 3. Redo Reload without refreshing page;
// 4. Rewrite Reload button;

let users = [
  'iseldrew',
  'oksanakozhukh',
  'antonpanchenk0',
  'giruta',
  'staspitsyk',
  'alexandrkrivobok',
  'alekseypetrenko',
  'maslovakat',
  // 'kolesnicknick',
];

const usersInfo = {};

function getAllUsers() {
  users.forEach(user => loadUser(user));
  loadList()
  // console.log(usersInfo)
}

function loadList() {
  const userNames = users.map(elem => {
    return '<li>' + elem + '</li>'; // try usersInfo[elem]
  })
  console.log(userNames)
  const strNamesList = userNames.join('\n')
  const output =
    '<ul>' + strNamesList + '</ul>';
  document.querySelector('.listOfUsers').innerHTML = output;
}

async function loadUser(pickedUser) {
  try {
    const link = 'https://api.github.com/users/' + pickedUser;
    let response = await fetch(link);
    let user = await response.json();
    usersInfo[pickedUser] = user;
    // console.log(usersInfo);
  } catch (err) {
    console.log(err);
  }
}

function getRandomUser() {
  if(!users.length) {
    document.querySelector('.choose-button').textContent = 'Reload' // delete this 
    document.querySelector('.choose-button').addEventListener('click', reloadPage) // delete this
    showMessage('No Heroes Left')
    return;
  }

  const randomNumber = Math.floor(Math.random()*users.length);
  const gitAcc = users[randomNumber];
  const user = usersInfo[gitAcc];
  users = users.filter(item => { return item != gitAcc});

  addUserToDOM(user);
}

function reloadPage() { // delete this
  location.reload();
}

function showMessage(msg) {
  const output = '<h1>' + msg + '</h1>';
  document.querySelector('.users').innerHTML = output;
}

function addUserToDOM(user) {
  const output =
    '<div class="user">' +
      '<a href="' + user.html_url +  '" target="_blank">' + 
        '<div class="img-wrapper">' +
          '<img src="' + user.avatar_url + '" >' +
        '</div>' +
      '</a>' +
      '<br>' + 
      '<h1>' + user.login + '</h1>' +
    '</div>';

  document.querySelector('.users').innerHTML = output;
}

document.querySelector('.choose-button').addEventListener('click', getRandomUser);
document.addEventListener('DOMContentLoaded', getAllUsers)

