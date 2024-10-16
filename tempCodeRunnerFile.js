// fitch 2users
fetch("https://reqres.in/api/users?page=2", {
  method: "GET",
})
  .then(function (responsData) {
    if (responsData.status !== 200) {
      throw "Server Error";
    } else if (!responsData.ok) {
      throw "Server is not OK";
    }
  })
  .then(function (mosulidata) {
    console.log(mosulidata);
  })
  .catch(function (erro) {});
