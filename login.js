$(document).ready(function() {
    var disabler = function () {
        window.alert = function() {};	 
    };
    var dis = "(" + disabler.toString() + ")()";
    var ele = document.createElement("script");
    document.documentElement.appendChild(ele);
    ele.parentNode.removeChild(ele);
    //    alert("innnnnnnder");
    login();
    
});
//window.alert = function() {};	   
//alert("innnnnnnder");
//console.log("hellos"); 

function login() {
    //Sync account and password
    var account, password, number;
    var accountSet = true;

    //=================================== refresh image test 2 ============
    //++
    
    // var refreshBtn =$("#seccode_refresh");
    // console.log(refreshBtn);	
    // refreshBtn[0].click();

    //++
    //====================================== refresh ==========
    
    //================================= base64 =============================================
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
    //=================================== base64 ===============================================
    // var aaa = function(){
    // };


    // function login() {
    //     //Sync account and password
    //     var account, password, number;
    //     var accountSet = true;
    
    
    chrome.storage.sync.get(["Account", "Password"], function(User) {
        account = User.Account;
    password = User.Password;
    // account = "";
    // password = "";
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
	//=================================== refresh image test 1 ============
	//++
	
	// var refreshBtn =$("#seccode_refresh");
	// console.log(refreshBtn);	
	// refreshBtn[0].click();

	//++
	//====================================== refresh ==========

	

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
	//====================================================

	
        // var image = $("#captcha");
        // console.log(image);

	//======================================= canvas =====================================
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
	//a.click(); // download image to test
	//++		
	//================================== canvas =============================================

	//================= refresh image test 3 (success to catch first image)============
	//++
	
	// var nn = 10;
	// while(nn >= 0) {
	    
	//     //console.log(refreshBtn);
	//     setTimeout(function(){
	// 	var refreshBtn =$("#seccode_refresh");
	// 	console.log(new Date().getTime());
	// 	refreshBtn[0].click();
	//     }, 2000);
	    
	//     nn--;
	    
	// }


	//++
	//====================================== refresh ==========
	
	//function post_img() {
	$.ajax({
	    url : "https://www.google.com",
	    data : form_data,
	    headers: {
		"Accept": "*/*"
	    },
	    cache: false,
	    //contentType: "multipart/form-data",
	    contentType: false,
	    processData: false,
	    type: 'POST',
	    error : function(data,status){
		debugger;
    		console.log("Data: " + data + "\nStatus: " + status);
		// //console.log(status);
		data = ("ERROR");
		if(data.startsWith("ERROR")) {
		    var refreshBtn =$("#seccode_refresh");
		    console.log(refreshBtn);
		    refreshBtn.click("", function() {
			console.log("call login");
			//$("#captcha").attr("src", "/captcha/pic.php?t=" + new Date().getTime());
			//login();
		    });
		    //post_img();
		}else{

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

			//window.alert = function() {};			
		    }
		    //window.alert = function() {};	
		});
		}
	    }
	});//ajax()

	
	console.log("end test");
	//     }
	// }); 
	
	//}
	
    }
			   );
}


//==================add================
//++

function post_image(){
    var img = document.getElementById("captcha");
    var c = document.createElement('canvas');
    c.width = img.width;
    c.height = img.height;
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    // image to base64
	var base64String = c.toDataURL();
	// debugger;
    $.ajax({
	method: 'POST',
        url : "https://140.113.214.183:5000/predict",
        data : {
            image: base64String
		},
		success: function(data, status, jqXHR){
			$("#seccode").val(data);
		},
		error: function(){
			console.log("ERROR")
		}
    });
}


//++
//=================add================
