(function() {
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

  function loadUser(pickedUser) {
    const link = 'https://api.github.com/users/' + pickedUser;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', link, true);

    xhr.onload = function() {
      if(this.status === 200) {
        const user = JSON.parse(this.responseText);

        addUserToDOM(user);
      }
    }
    xhr.send();
  }

  function addUserToDOM(user) {
    const output =
      '<div class="user">' +
        '<img src="' + user.avatar_url + '" >' +
        '<br>' + 
        '<a href="' + user.html_url +  '">' + `${user.login}` + '</a>' +
      '</div>';

    document.querySelector('.users').innerHTML = output;
  }

  document.querySelector('.hero').addEventListener('click', getRandomUser);
})()

