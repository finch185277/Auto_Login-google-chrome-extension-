$(document).ready(function() {
    login();
});

function login() {
    //Sync account and password
    var account, password, number;
    var accountSet = true;
    

    chrome.storage.sync.get(["Account", "Password"], function(User) {
        account = User.Account;
        password = User.Password;
        //console.log(account + " " + password);
        if (account == undefined || password == undefined) {
            accountSet = false;
            alert("Please input your ID and Password in the extension!!!");
        }
        
        //input Account and Password
        if ($("#username") != null)
            document.getElementById("username").value = account;
        else {
            console.log("can't find username");
        }
        if ($("#password") != null)
            document.getElementById("password").value = password;
        else {
            console.log("can't find password");
        }

	
        var x = $("#captcha");
        console.log(x);

        number = $.post("https://nasa.cs.nctu.edu.tw/sap/2017/hw2/captcha-solver/api/",
                        x,
                        function(data,status){
    			    //console.log("Data: " + data + "\nStatus: " + status);
			    console.log(status);
			    if ($("seccode") != null)
				document.getElementById("seccode").value = status;
			    else {
				console.log("can't find captcha");
			    }
			    var loginBtn =$("input[name='Submit2']");
			    //if toggle is on : Login
			    var toggle_state;
			    chrome.storage.sync.get("toggle", function(result) {
				toggle_state = result.toggle;
				//console.log("toggle_state = " + toggle_state);
				if (toggle_state === undefined) {
				    console.log(toggle_state);
				}
				if (toggle_state == true && accountSet) {
				    loginBtn.click();
				    top.location.replace('login.php');
				}
			    });

    			}
    		       );
        console.log("end test");
    });
}
