let modal = document.getElementById("confirmLogout");
let btnNo = document.getElementById("confirmBtnN");
let btnYes = document.getElementById("confirmBtnY");
let btnLogout = document.getElementById("btn_login");
btnNo.onclick = function(){
    modal.style.display = "none";
}

btnYes.onclick = function() {
    delete localStorage.loggedIn;
    window.location.href = "01common interface.html";
    
}

btnLogout.onclick = function(){
    modal.style.display = "block";
}