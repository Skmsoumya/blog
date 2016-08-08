Polymer({
	is: "blog-post-holder",

	properties: {
		postData: {
			type: Array,
			observer: "changeCategories"
		}
	},

	changeCategories: function() {
		this.postData.forEach(function(post, index) {
			console.log(index);
			var postCategory = post.categories.split("/");
			console.log(postCategory);
			post.categories = postCategory;
		}.bind(this));
	},

	toggleShare: function(event) {
		event.target.parentNode.classList.toggle("scaleDown");
		event.target.parentNode.classList.toggle("fadeout");
		console.log(event.target.parentNode);
		setTimeout(function() {
			event.target.parentNode.parentNode.classList.toggle("shareExpanded");
		}, 500);
		
	}
});