// logOut = document.getElementById("logOutBtn");
// logOut.onclick = function() {
//     alert("Rời khỏi trang Quản trị sinh viên");
//     delete localStorage.loggedIn;
//     window.location.href = "01common interface.html";
    
// }

let sidebar_1 = document.getElementById("sidebar_1");
let sidebar_2 = document.getElementById("sidebar_2");
let sidebar_3 = document.getElementById("sidebar_3");
let sidebar_4 = document.getElementById("sidebar_4");
let sidebar_5 = document.getElementById("sidebar_5");

sidebar_1.onclick = function(){
    window.location.href = "03homepage.html";
}
sidebar_2.onclick = function(){
    window.location.href = "04course_page.html";
}
sidebar_3.onclick = function(){
    window.location.href = "05class_page.html";
}
sidebar_4.onclick = function(){
    window.location.href = "";
}
sidebar_5.onclick = function(){
    window.location.href = "";
}