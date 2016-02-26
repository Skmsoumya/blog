// All the functions that are called when document is fully loaded

$(document).ready(function() {
	getPostData();
	$("#previous").addClass("disabled");
});

// Doing a AJAX call to get Posts data in JSON format from the server

function getPostData() {
	$.getJSON("/blog/posts.json", function(data) {
		var latest = data.posts.pop();
		console.log(latest);
		displayLatest(latest);

		var posts = makePostGroup(data.posts);
		if(posts.length === 1) {
			$("#next").addClass("disabled");
		}
		displayPosts(posts[0]);
		var counter = 0;

		$("#next").click(function() {
			
			if(counter <= posts.length - 2) {
				TweenMax.staggerTo(".element", 0.5, {scale:0.7, opacity:0, delay:0.2, onComplete: x }, 0.1);
				counter ++;
				
			}
			if(posts.length -1 === counter) {
				$("#next").addClass("disabled");
			}

			if(counter > 0) {
				$("#previous").removeClass("disabled");
			}
		});

		$("#previous").click(function() {
			if(counter > 0) {
				counter --;
				TweenMax.staggerTo(".element", 0.5, {scale:0.7, opacity:0, delay:0.2, onComplete: x }, 0.1);
			}

			if(counter === 0) {
				$("#previous").addClass("disabled");
			}

			if(counter >= 0) {
				$("#next").removeClass("disabled");
			}
		});

		function x() {
			$("#post-holder").empty();
			displayPosts(posts[counter]);
		}
	});
}

// Function for animation of different stuff called after the document is loaded 

function animate() {
	var isTweening = true;
	TweenMax.staggerFrom(".element", 1, {scale:0.5, opacity:0, delay:0.2, onComplete: completed, ease: Bounce.easeOut, force3D:true}, 0.2);
	function completed () {
		isTweening = false;
	}

	$(".element").hover(over, out);

	function over() {
		if(!isTweening) {
			isTweening = true;
			var siblings = $(this).siblings().addClass("a");
			TweenMax.staggerTo(siblings, 0.3, {scale:0.9, opacity: 0.8, delay:0.3, ease:  Power2.easeIn, force3D:true});
			//TweenMax.to(this, 0.3, {scale: 1.1, delay: 0.3, ease:  Power2.easeIn});
		}
	}

	function out() {
		var siblings = $(".a");
		TweenMax.staggerTo(siblings, 0.2, {scale:1, opacity: 1, delay: 0.3, ease:  Circ.easeIn, force3D:true, overwrite:"all"});
		isTweening = false;
	}
}
// Function to display the post in each page

function displayPosts( entries ) {
	var template = $.templates("#postTemplate");

	var htmlOutput = template.render(entries);


	$("#post-holder").html(htmlOutput);
	animate();
}


// Function that make the grouping of the posts according to page no;

function makePostGroup(blogEntries) {

	var noOfPages = Math.ceil(blogEntries.length / 9);
	var postsAccordingToPageNo = [];

	if( noOfPages < 1) {
		var a =[];
		for (var i = 0; i < blogEntries.length; i++) {
			a.push(blogEntries.pop());

		};

		postsAccordingToPageNo.push(a.reverse());
	}

	else {
		for (var j = 0; j < noOfPages; j++) {
			if(blogEntries.length < 9) {
				var b = [];
				var times = blogEntries.length;
				for (var k = 0; k < times; k++) {
					b.push(blogEntries.pop());

				};
				postsAccordingToPageNo.push(b);
			}
			else {
				var c = [];
				for (var l = 0; l < 9; l++) {
					c.push(blogEntries.pop());
				};
				postsAccordingToPageNo.push(c);
			}
		};

	}

	return postsAccordingToPageNo; 
}

function displayLatest(latest) {
	$(".latest").css("backgroundColor", latest.color);
	$("#latest-link").attr("href", latest.url);
	$("#latest-date").html(latest.date);
	$("#latest-head").html(latest.title);
	$("#latest-catagories").html(latest.tags);
	$("#latest-img").attr("src", latest.featuredImg);
}