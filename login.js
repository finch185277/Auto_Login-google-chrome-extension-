$(document).ready(function() {
    // var disabler = function () {
    //     window.alert = function() {};	 
    // };
    // var dis = "(" + disabler.toString() + ")()";
    // var ele = document.createElement("script");
    // document.documentElement.appendChild(ele);
    // ele.parentNode.removeChild(ele);
    
    login();
    
});

//debugger;
function login() {
    //Sync account and password
    var account, password, number;
    var accountSet = true;

    //=================================== post method ================
    //++

    function post_image(){
	var accountSet = true;
	var img = document.getElementById("captcha");
	var c = document.createElement('canvas');
	c.width = img.width;
	c.height = img.height;
	var ctx = c.getContext('2d');
	ctx.drawImage(img, 0, 0);
	
	// image to base64
	var base64String = c.toDataURL();
	//debugger;
	$.ajax({
	    method: 'POST',
            url : "https://140.113.214.183:5000/predict",
            data : {
		image: base64String
	    },
	    success: function(data, status, jqXHR){
		//console.log(status);
		
		if(!(data.startsWith("ERROR"))) {
		    if ($("seccode") != null)
			document.getElementById("seccode").value = data;
		    else {
			console.log("can't find captcha");
		    }
		    var loginBtn =$("input[name='Submit2']");
		    console.log(loginBtn);
		    //loginBtn[0].click();
		    //if toggle is on : Login
		    var toggle_state;
		    chrome.storage.sync.get("toggle", function(result) {
			toggle_state = result.toggle;
			//console.log("toggle_state = " + toggle_state);
			if (toggle_state === undefined) {
			    console.log(toggle_state);
			}
			if (toggle_state == true && accountSet) {
			    loginBtn[0].click();
			    console.log("click");
			    //window.alert = function() {};			
			}
			//window.alert = function() {};	
		    });		 
		} else {
		    var refreshBtn =$("#seccode_refresh");
		    console.log(refreshBtn);
		    refreshBtn[0].click();
		    $("#captcha").ready(function() {
		    	post_image();
			    //login();
		    })
		    //post_image();
		    //login();
		}
	    }//success function
	});
    }

    //++
    //=========================================== post method  ================
    
    chrome.storage.sync.get(["Account", "Password"], function(User) {
        account = User.Account;
	password = User.Password;

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

	

	//=============================== future =========
	//++
	
	// $("#captcha").ready(aaa);
	// var flag = false;
	// while(!flag){
	//     aaa();
	// }
	
	
	// $("#captcha").ready(function() {
	//     // post image
	//     // analyze data
	//     // if success
	//     //     flag = true
	//     //     submit button
	//     // else
	//     //     
	//     //     #refresh captcha button click
	// })
	//++
	//================== future ============================

	post_image();
	
    }//chrome ... function{
			   ); //chrome...
}
