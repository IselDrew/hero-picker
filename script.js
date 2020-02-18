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

const chooseButton = document.querySelector('.choose-button');

const usersInfo = {};

function getAllUsers() {
  users.forEach(user => loadUser(user));
  console.log(usersInfo);
}

async function loadUser(pickedUser) {
  try {
    const link = 'https://api.github.com/users/' + pickedUser;
    let response = await fetch(link);
    let user = await response.json();
    usersInfo[pickedUser] = user;
  } catch (err) {
    console.log(err);
  }
}

function getRandomUser() {
  if(!users.length) {
    chooseButton.textContent = 'Reload' // delete this 
    chooseButton.addEventListener('click', reloadPage) // delete this
    showMessage('No Users Left')
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

chooseButton.addEventListener('click', getRandomUser);
document.addEventListener('DOMContentLoaded', getAllUsers)

