// Api key
let API_KEY="AIzaSyCONoIZGywddQGUi7JcB8MKxK_ItzHNYjI";
/*----------------------------------
	function for fetching popular video
-------------------------------------*/

async function fetchPopularVideoes(){
	let res=await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=in&key=${API_KEY}`);
	let data=await res.json();
	displayFetchVideoes(data.items);
	console.log(data.items);
};
fetchPopularVideoes();

function displayFetchVideoes(data){
	let video_container=document.getElementById("video-container");
	video_container.innerHTML=null;
	console.log(data);
	data.forEach(({snippet,id,statistics})=>{
		let thumbnail_url=snippet.thumbnails.high.url;
		let video_title=snippet.title;
		let channel_name=snippet.channelTitle;
		let views=conversion(statistics.viewCount);
		let video_list=document.createElement("div");
		video_list.classList.add("video-list");
		video_list.innerHTML+=`
                <img src="${thumbnail_url}" alt="" class="thumbnail">
                <div class="flex-div">
                    <img src="./images/profile.jpeg" alt="">
                    <div class="video-info">
                         <b class="video-title">${video_title}</b>
                        <p>${channel_name }<img src="./images/icons8-approval-60.png" alt="" id="approved-icon"> </p>
                        <p>${views} views</p>
                    </div>
                </div>
		`;
		video_container.append(video_list);
		let data={
			id
		}
		video_list.addEventListener("click",function(){
			localStorage.setItem("video",data.id);
			window.location.href="playvideo.html";
		});
	
	});
}
	
/*-----------------------------------------------------
				search video  section	
------------------------------------------------*/
let query=document.getElementById("query");
let submit_btn=document.getElementById("search-btn");
async function search_func(){
	console.log(query.value);
	let queryvalue=query.value;
	localStorage.setItem("video",query.value);
	console.log(query.value);
	window.location.href="search_page.html";
}
submit_btn.addEventListener("click",search_func);
console.log("hello")
query.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
      validate(e);
    }
  });
  function validate(e) {
    search_func();
  }

  /*---------------------------------------------------------
function for count views and like in indian chart system
--------------------------------------------*/
function conversion(num){
    if(num<1000){
        return num;
    }
    else 
    if((num>=1000)&&(num<100000)){
        return (Number(num/1000).toFixed(1))+"K";
    }
    else 
    if((num>=100000)&&(num<10000000)){
    return (Number(num/100000).toFixed(1))+"lakh";
    }
    else
    {
        return (Number(num/10000000).toFixed(1))+"Cr";
    }
}
