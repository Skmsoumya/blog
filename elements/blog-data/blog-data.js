Polymer({
	is: "blog-data",
	properties: {
		blogPostsData: {
			notify: true,
			type: Array,
		}
	},
	handleResponse: function(event) {
		this.blogPostsData = event.detail.response.posts;
	}
});