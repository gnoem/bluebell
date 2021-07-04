<script lang="ts">
  import AddItem from "./AddItem.svelte";
  import ListItem from "./ListItem.svelte";

  const defaultItems = [];
	let listItems: string[] = defaultItems;
  let addedItem: string = '';

  const handleSubmit = (): void => {
    listItems = [...listItems, addedItem];
    addedItem = '';
  }
  const deleteItem = (index: number) => () => {
    listItems.splice(index, 1);
    listItems = listItems;
  }
  const editItem = (index: number) => (content: string) => {
    listItems.splice(index, 1, content);
    listItems = listItems;
  }
</script>

<span class="label">List items:</span>
{#if listItems.length > 0}
  <ul>
    {#each listItems as item, i (item)}
      <ListItem {item} deleteItem={deleteItem(i)} editItem={editItem(i)} />
    {/each}
  </ul>
{:else}
  <span style="opacity: 0.6">None yet!</span>
{/if}
<AddItem bind:addedItem {handleSubmit} />

<style>
  ul {
    margin: 0.5rem 0 0;
    padding: 0;
  }
</style>