$(document).ready(function() {
    login();
});
//==============================================================================
//++

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

//++
//==================================================================================
// var aaa = function(){
// };


function login() {
    //Sync account and password
    var account, password, number;
    var accountSet = true;
    var png ;
    

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

	// var refreshBtn =$("#seccode_refresh");
	// refreshBtn.click();
	// var num = 10;

	// while(num >= 0) {
	//     if($("#captcha").ready(function() {
		
	// 	var refreshBtn = $("#seccode_refresh");
	// 	refreshBtn.click();
	// 	num--;
	// 	console.log("ready");
	// 	console.log(num);
	// 	return false;
	//     })) {
	// 	console.log("if");
	// 	console.log(num);
	// 	num--;
	//     }
	// }
	
        var image = $("#captcha");
        console.log(image);

	//============================================================================
	//++
	var c = document.createElement('canvas');
	c.width = 160;
	c.height = 90;
	var ctx = c.getContext('2d');
	var img = document.getElementById('captcha');
	ctx.drawImage(img, 0, 0);
	var base64String = c.toDataURL();
	console.log(base64String);
	// debugger;
	var form_data = new FormData();

	// var blob = new Blob(img, { type: "image/png"});
	var blobpng = dataURItoBlob(base64String);
	form_data.append("image", blobpng, "aaa.png");
	
	var URL = window.URL || window.webkitURL;
        var downloadUrl = URL.createObjectURL(blobpng);
	var a = document.createElement("a");
        a.href = downloadUrl;
        a.download = "aaa.png";
        document.body.appendChild(a);
	//a.click();
	//++		
	//===============================================================================	
	$.ajax({
	    url : "https://nasa.cs.nctu.edu.tw/sap/2017/hw2/captcha-solver/api/",
	    data : form_data,
	    headers: {
		"Accept": "*/*"
	    },
	    cache: false,
	    //contentType: "multipart/form-data",
	    contentType: false,
	    processData: false,
	    type: 'POST',
	    success : function(data,status){
    		console.log("Data: " + data + "\nStatus: " + status);
		// //console.log(status);
		// while (data.startsWith("ERROR")) {
		//     var refreshBtn =$("#seccode_refresh");
		//     refreshBtn.click();
		// }//else{

		if ($("seccode") != null)
		    document.getElementById("seccode").value = data;
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
			//top.location.replace('login.php');
            //$(document).ready(function() {
            //    top.location.replace('login.php');
            //});
			
			
		    }
		});
		//}
	    }
	});
	console.log("end test");
	//     }
	// }); 
	
    }
			   );
}
