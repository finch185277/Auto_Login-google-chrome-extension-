$(document).ready(function() {
    var checkbox = $("#checkbox_1");



    chrome.storage.sync.get("toggle", function(result) {
        var toggle = result.toggle;
        if (toggle == undefined) {
            chrome.storage.sync.set({ "toggle": checkbox.prop("checked") });
        } else {
            checkbox.prop("checked", toggle);
        }
    });

    checkbox.change(function(event) {
        var checkState = checkbox.prop("checked");
        chrome.storage.sync.set({ "toggle": checkState });
        //console.log(checkbox.prop("checked"));    
    });



}); // document.ready


//input Account and Password
$(function() {
    $("#Save_Login").click(function() {
        var account, password;
        account = $("#Account").val();
        password = $("#Password").val();
        chrome.storage.sync.set({ "Account": account, "Password": password });
    });
    var a,p;
    chrome.storage.sync.get(["Account","Password"],function(User){
        a = User.Account;
        p = User.Password;
        console.log(a + " " + p);

    });
});