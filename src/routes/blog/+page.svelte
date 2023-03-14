<script>
	export let data;
	let {posts} = data;
</script>

{#each posts as post}
	<div><a href={`/blog/posts/${post.slug}`}>{post.title}</a></div>
{/each}