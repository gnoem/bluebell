<script lang="ts">
  import { InputCheckbox, InputText } from "..";
  import { useEffect } from "../../hooks";
  import AddTask from "./AddTask.svelte";
  import ListItem from "./ListItem.svelte";
  import Recurring from "./Recurring.svelte";

  const defaultTasks = [];
	let tasks: string[] = defaultTasks;
  let addedTask: string = '';
  
  let listName: string = '';
  let nameInput: HTMLInputElement | null;

  let recurring: boolean = false;
  let checkboxInput: HTMLInputElement | null;

  const handleSubmit = (): void => {
    tasks = [...tasks, addedTask];
    addedTask = '';
  }
  const deleteTask = (index: number) => () => {
    tasks.splice(index, 1);
    tasks = tasks;
  }
  const editTask = (index: number) => (content: string) => {
    tasks.splice(index, 1, content);
    tasks = tasks;
  }

  useEffect(() => {
    nameInput?.focus();
  }, () => [nameInput])
</script>

<section>
  <h2>Create a new list</h2>

  <div class="big">
    <InputText placeholder="My list" label="Name this list:" name="listname" bind:value={listName} createRef={(el) => { nameInput = el }} />
  </div>

  <div>
    <InputCheckbox label="Recurring?" name="recurring" bind:checked={recurring} ref={checkboxInput} />
    {#if recurring}
      <Recurring />
    {/if}
  </div>

  <div>
    <span class="label">Tasks:</span>
    {#if tasks.length > 0}
      <ul>
        {#each tasks as task, i (task)}
          <ListItem {task} deleteTask={deleteTask(i)} editTask={editTask(i)} />
        {/each}
      </ul>
    {:else}
      <span style="opacity: 0.6">None yet!</span>
    {/if}
    <AddTask bind:addedTask {handleSubmit} />
  </div>

  <button class="block" style="margin-top: 1rem">Save</button>
</section>

<style>
  h2 {
    margin-bottom: 0;
  }
  section > * {
    margin-bottom: 1.5rem;
  }
  ul {
    margin: 0.5rem 0 0;
    padding: 0;
  }
  .big {
    font-size: 1.2rem;
  }
</style>

<!-- 
  - allow rearrange and delete tasks
  - clear all
  - list titles
  - conditions for recurring
 -->