<script lang="ts">

  import { hostname } from "../../../apiConfig";
  
  let lists = [];

  const loadLists = async () => {
    const response = await fetch(`${hostname}/lists`);
    const body = await response.json();
    if (response.ok) {
      lists = body;
      return body;
    }
    throw new Error(body);
  }

</script>

<section>
  <h2>My lists</h2>
  {#await loadLists()}
    ...loading
  {:then lists}
    got lists: {JSON.stringify(lists)}
  {:catch error}
    ERROR!!!
  {/await}
</section>

<style>
</style>
