/*--------------------------
declare API key
--------------------------*/
let API_KEY="AIzaSyCONoIZGywddQGUi7JcB8MKxK_ItzHNYjI";
//let API_KEY="AIzaSyAQeq8AFNng2zFmZme6YeJJ4xNBKB2P-Xg";
//let API_KEY="AIzaSyD2P0IW0q5lqC64zYHkGhrJmTEH7wIeneU";
var video_id=localStorage.getItem("video");
async function video_detail(){
	let res=await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video_id}&maxResults=1&regionCode=in&key=${API_KEY}`);
	let data=await res.json();
	display_video_and_details(data.items);
}
video_detail();
function display_video_and_details(video_data){
	//console.log(video_data);
	video_data.forEach(({snippet,id,statistics})=>{
		let video_title=snippet.title;
		let channel_name=snippet.channelTitle;
		let video_description=snippet.description;
		let likeCount=conversion(statistics.likeCount);
		let viewscount=conversion(statistics.viewCount);
		let publish_date=snippet.publishedAt;
		let playvideo=document.getElementById("play-video");
		playvideo.innerHTML=`
			<iframe src="https://www.youtube.com/embed/${video_id}?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
			<h3>${video_title}</h3>
			<div class="play-video-info">
				<div class="publisher">
					<div class="">
						<img src="./images/profile.jpeg" alt="">
						<div class="">
							<p>${channel_name}</p>
							<span>2k Subscribers</span>
						</div>
					</div>
					<button class="subscribe" id="SubscribeBtn"> <img src="./images/icons8-notification-bell-64.png" class="notification-bell" alt="">Subscribe</button>
			
				</div>
				<div class="video-imp-icon">
					<a href=""><img src="./images/like.png" alt="">${likeCount}</a>
					<a href=""><img src="./images/icons8-dislike-64.png" alt=""></a>
					<a href=""><img src="./images/share.png" alt="">Share</a>
					<a href=""><img src="./images/save.png" alt="">Save</a>
				</div>
			</div>
			<hr>
			
	`;
	let views_and_puslished_date=document.getElementById("views-and-puslished-date");
	views_and_puslished_date.innerText=`${viewscount} views ${publish_date}`;
	let description=document.getElementById("description");
	description.innerText=`${video_description}`;
	});
}

/*------------------------------
		search related video
------------------------------*/
async function search_related_videos(video_id){
	let res=await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&regionCode=in&relatedToVideoId=${video_id}&type=video&key=${API_KEY}`);
	let data=await res.json();
	console.log(data.items);
	display_related_video(data.items);
}
search_related_videos(video_id);
function display_related_video(data2){
	console.log(data2);
	let related_video_container=document.getElementById("related-video-container");
	//video_container.innerHTML=null
	data2.forEach(({snippet,id})=>{
		let thumbnail_url=snippet.thumbnails.high.url;
		console.log(thumbnail_url);
		let video_title=snippet.title;
		let channel_name=snippet.channelTitle;
		//let views=statistics.viewCount;
		let video_list=document.createElement("div");
		video_list.classList.add("side-video-list");
		video_list.innerHTML+=`
				<img src="${thumbnail_url}" alt="">
				<div class="side-video-info">
					<a href="" class="small-thumbnail">${video_title}</a>
					<p>${channel_name}</p>
				</div>
		`;
		related_video_container.append(video_list);
		let data={
			id
		}
		video_list.addEventListener("click",function(){
			localStorage.setItem("video",data.id.videoId);
			window.location.href="playvideo.html";
		});
	
	});
}
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


