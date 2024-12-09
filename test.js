// fetch("http://localhost:3080/api/users", {
//   method: "POST",
//   headers: "Content-type: application/json",
//   body: {
//     id: new Date().getTime().toString(),
//     firstName: "Mike",
//     lastName: "Tyson",
//     age: 50,
//   },
// });

// fetch("http://localhost:3030/users/1733581274032", {
//   method: "PUT",
//   headers: { "content-type": "application/json" },
//   body: JSON.stringify({
//     id: "1733581274032",
//     firstName: "John",
//     lastName: "Smith",
//     age: "40",
//   }),
// });

// CRUD
/// /html
/// {name, lastName, age, gender}
/// /users => user.json
/// /users/1 =>
/// ?age=min

// +----------------------------+-----+-------+
// |                            | PUT | PATCH |
// +----------------------------+-----+-------+
// | Запрос имеет тело          | Да  | Да    |
// | Успешный ответ имеет тело  | Нет | Да    |
// | Меняет состояние сервера   | Да  | Да    |
// | Идемпотентный              | Да  | Нет   |
// | Кэшируемый                 | Нет | Нет   |
// | Допускается в HTML-формах  | Нет | Нет   |
// +----------------------------+-----+-------+


// let arr = {
//   id: "1733581258117",
//   firstName: "Mike",
//   lastName: "Tyson",
//   age: 50,
// };

// const checkKeys = (user, key) => {
//   let keys = Object.keys(user);
//   let getParam = keys.map((k) => k.toLowerCase())
//     .find((el) => el === key.toLowerCase());
//   if (getParam) {
//     return {
//       key: getParam,
//     };
//   } else {
//     return undefined;
//   }
// };

// console.log(checkKeys(arr, "firstNAME"));
