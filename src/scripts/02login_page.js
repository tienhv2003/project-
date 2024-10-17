document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault(); // Prevent form from refreshing the page
    
    //Step 1: Retrieve email and password from input fields
    let email = document.getElementById('email_login').value;
    let password = document.getElementById('password_login').value;

    // Step 2: Check if the account exists inlocal storage
    let adminAccountsDatabase = JSON.parse(localStorage.getItem("adminAccounts"));
    for(admin of adminAccountsDatabase){
        if(admin.email === email && admin.password === password) {
            localStorage.setItem('loggedIn', `${email}`);
            window.location.href = "03homepage.html";//Dẫn đến trang homepage
            break;
        } else{
            //Step 4: Show error message if login fails
            document.getElementById('errorMessage').textContent = 'Sai email hoặc mật khẩu. Vui lòng thử lại';
        }
    }
});

