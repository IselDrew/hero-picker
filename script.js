let users = [
  'iseldrew',
  'oksanakozhukh',
  'antonpanchenk0',
  'giruta',
  'staspitsyk',
  'alexandrkrivobok',
  'alekseypetrenko',
  'kolesnicknick',
];

const usersInfo = {};

function getAllUsers() {
  users.forEach(user => loadUser(user));
}

async function loadUser(pickedUser) {
  try {
    const link = 'https://api.github.com/users/' + pickedUser;
    let response = await fetch(link);
    let user = await response.json();
    usersInfo[pickedUser] = user;
    console.log(usersInfo);
  } catch (err) {
    console.log(err);
  }
}

function getRandomUser() {
  if(!users.length) {
    alert('No users left');
    return;
  }

  const randomNumber = Math.floor(Math.random()*users.length);
  const gitAcc = users[randomNumber];
  const user = usersInfo[gitAcc];
  users = users.filter(item => { return item != gitAcc});

  addUserToDOM(user);
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

