<script lang="ts">
  import { InputCheckbox, InputText } from "..";
  import { useEffect } from "../../hooks";
  import ListItems from "./ListItems.svelte";
  import Recurring from "./Recurring.svelte";

  interface IOptions {
    recurring: boolean;
    recurType?: 'daily' | 'weekly' | null;
    recurDays?: string[] | null;
  }

  let listName: string = '';
  let options: IOptions = {
    recurring: false
  }
  let listItems: string[] = [];

  let isRecurring: boolean;
  $: isRecurring = !!options?.recurring;

  let nameInput: HTMLInputElement | null;

  const listNameInput = (e) => {
    listName = e.detail.value;
  }

  const setOptions = (property: string) => (e) => {
    options[property] = e.detail.value;
  }

  const setListItems = (e) => {
    listItems = e.detail.value;
  }

  const handleSubmit = () => {
    console.log(`
      listName: ${listName}
      listItems: ${listItems.join(', ')}
    `);
  }

  useEffect(() => {
    if (!options.recurring) {
      options.recurType = null;
      options.recurDays = null;
    }
  }, () => [options]);
  
  useEffect(() => {
    nameInput?.focus();
  }, () => [nameInput]);
  
</script>

<section>
  <h2>Create a new list</h2>

  <div class="big">
    <InputText
      placeholder="My list"
      label="Name this list:"
      name="listname"
      bind:value={listName}
      on:input={listNameInput}
      createRef={(el) => { nameInput = el }}
    />
  </div>

  <div>
    <InputCheckbox label="Recurring?" name="recurring" bind:checked={options.recurring} />
    {#if isRecurring}
      <Recurring on:selectType={setOptions('recurType')} on:selectDays={setOptions('recurDays')} />
    {/if}
  </div>

  <div>
    <ListItems on:update={setListItems} />
  </div>

  <button class="block" style="margin-top: 1rem" on:click={handleSubmit}>Save</button>
</section>

<style>
  h2 {
    margin-bottom: 0;
  }
  section > * {
    margin-bottom: 1.5rem;
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