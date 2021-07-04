<script lang="ts">
  import AddItem from "./AddItem.svelte";
  import ListItem from "./ListItem.svelte";
  import { createEventDispatcher } from "svelte";
  import { useEffect } from "../../hooks";

  const dispatch = createEventDispatcher();

  export let listItems: string[] = [];

  const defaultItems = listItems;
	let list: string[] = defaultItems;
  let addedItem: string = '';

  const handleSubmit = (): void => {
    list = [...list, addedItem];
    addedItem = '';
  }
  const deleteItem = (index: number) => () => {
    list.splice(index, 1);
    list = list;
  }
  const editItem = (index: number) => (content: string) => {
    list.splice(index, 1, content);
    list = list;
  }

  useEffect(() => {
    dispatch('update', {
      value: list
    });
  }, () => [list]);

</script>

<span class="label">List items:</span>
{#if list.length > 0}
  <ul>
    {#each list as item, i (item)}
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