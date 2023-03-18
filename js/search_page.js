// api key
let API_KEY="AIzaSyDw9iF7ePEmSpw15oYs6mHHWqK30kuhh9k";
var search_query=localStorage.getItem("video");

/*----------------------------------------
	seatch video function
--------------------------------------------*/

async function search_videos(search_query){
	console.log(query.value);
	let res=await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${search_query}&regionCode=in&key=${API_KEY}`);
	let data=await res.json();
	filter_video(data.items);
}
search_videos(search_query);
function filter_video(data2){
	console.log(data2);
	let video_container=document.getElementById("video-container");
	video_container.innerHTML=null;
	data2.forEach(({snippet,id})=>{
		console.log(id.videoId);
		let thumbnail_url=snippet.thumbnails.high.url;
		let video_title=snippet.title;
		let channel_name=snippet.channelTitle;
		let video_list=document.createElement("div");
		video_list.classList.add("video-list");
		video_list.innerHTML+=`
                <img src="${thumbnail_url}" alt="" class="thumbnail">
                <div class="flex-div">
                    <img src="./images/profile.jpeg" alt="">
                    <div class="video-info">
                         <b class="small-thumbnail">${video_title}</b>
                        <p>${channel_name }<img src="./images/icons8-approval-60.png" alt="" id="approved-icon"> </p>
                    </div>
                </div>
		`;
		video_container.append(video_list);
		let data={
			id
		}
		video_list.addEventListener("click",function(){
			localStorage.setItem("video",data.id.videoId);
			window.location.href="playvideo.html";
			console.log(data.id.videoId);
		});
	});
}
/*----------------------------------
	new search on search page
----------------------------------*/
let new_search_btn=document.getElementById("new-search-btn");
new_search_btn.addEventListener("click",new_search_func);
function new_search_func(){
	search_videos(query.value);
}
query.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
      validate(e);
    }
});
  function validate(e) {
    new_search_func();
  }

