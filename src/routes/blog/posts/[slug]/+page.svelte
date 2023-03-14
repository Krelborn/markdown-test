<script lang="ts">
  export let data;

  type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	$: component = data.component as unknown as C;
</script>
<h1>I am a post</h1>
<svelte:component this={component} />