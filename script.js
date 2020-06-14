// получем списов зарегистрированных пользователей (JSON,AJAX) с сервера
var access = [
      {
        login: 'admin',
        password: 'admin',
        position: 'admin'
      },
      {
        login: 'user',
        password: 'user',
        position: 'user'
      },
    ]
// вывод сообщения ошибки авторизации
		function acs(){
			document.getElementById("access").innerHTML = 'Неверный логин или пароль!';
		}
// проверка введёныых данных на соответствие с полученым списком
		function checkAccess()
		{
			let login = document.getElementById('log').value;
			let password = document.getElementById('pas').value;
			var flag = true;
			for (var i = 0; i < access.length; i++) {
					if (login == access[i].login && password == access[i].password) {
						if (access[i].position == 'admin') {
							window.location.href = '/ContactsList/adminList.html';
							flag = false;
							break;
						} else if (access[i].position == 'user') {
							window.location.href = '/ContactsList/userList.html';
							flag = false;
							break;
						}
					} else if(flag){ acs();  }
			}
		}
