
// console.log(infoUser);
function DeleteUser() {
  if (confirm("Bạn muốn xóa người dùng này?")) {
    // Save it!
    console.log("Đã xóa");
  } else {
    // Do nothing!
    console.log("Chưa xóa");
  }
}
function saveNew() {
  var name = document.getElementById("usr").value;
  var btd= document.getElementById("btd").value;
  var tel = document.getElementById("tel").value;
  var email = document.getElementById("email").value;
  var role = document.getElementById("role").value;
  var UserInput = {name,btd,tel,email,role};
  var json_string = JSON.stringify(UserInput);
  console.log(json_string)
}
