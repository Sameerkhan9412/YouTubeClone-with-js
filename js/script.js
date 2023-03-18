let menuIcon=document.querySelector(".menu-icon");
let menuRes=document.querySelector(".menu-res");
let sidebar=document.querySelector(".sidebar");
let container=document.querySelector(".container");
let subscribeBtn=document.querySelector("#SubscribeBtn")
let notificationBell=document.querySelector(".notification-bell")
let explore_btn_for_mobile=document.getElementById("explore");
menuIcon.onclick=function(){
    sidebar.classList.toggle("small-sidebar");
    container.classList.toggle("large-container");
    // container.classList.toggle("large-container");
	sidebar.classList.toggle("show-sidebar-for-mobile");
}