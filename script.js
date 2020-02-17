let users = [
  'iseldrew',
  'oksanakozhukh',
  'antonpanchenk0',
  'giruta',
  'vitaliyhtml5',
  'staspitsyk',
  'alexandrkrivobok',
  'alekseypetrenko',
  'kolesnicknick',
];

function getRandomUser() {
  if(!users.length) {
    alert('No users left')
    return
  }

  const randomNumber = Math.floor(Math.random()*users.length);
  const user = users[randomNumber];
  users = users.filter(item => { return item != user })

  loadUser(user);
}

async function loadUser(pickedUser) {
  try {
    const link = 'https://api.github.com/users/' + pickedUser;
    let response = await fetch(link);
    let user = await response.json();
    addUserToDOM(user);
  } catch (err) {
    console.log(err);
  }
}

function addUserToDOM(user) {
  const output =
    '<div class="user">' +
      '<a href="' + user.html_url +  '" target="_blank">' + 
        '<img src="' + user.avatar_url + '" >' +
      '</a>' +
      '<br>' + 
      '<h2>' + user.login + '</h2>' +
    '</div>';

  document.querySelector('.users').innerHTML = output;
}

document.querySelector('.hero').addEventListener('click', getRandomUser);

