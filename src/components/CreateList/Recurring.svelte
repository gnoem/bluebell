<script lang="ts">

  import { InputDropdown, InputCheckbox } from "..";
  import { createEventDispatcher } from "svelte";
  import { useEffect } from "../../hooks";

	const dispatch = createEventDispatcher();

  let type = 'daily';
  let days = [];

  const options = [
    { display: 'Daily', value: 'daily' },
    { display: 'Weekly', value: 'weekly' },
  ]
  const weekOptions = [
    { display: 'Sun', value: 'sunday' },
    { display: 'Mon', value: 'monday' },
    { display: 'Tue', value: 'tuesday' },
    { display: 'Wed', value: 'wednesday' },
    { display: 'Thu', value: 'thursday' },
    { display: 'Fri', value: 'friday' },
    { display: 'Sat', value: 'saturday' },
  ]
  const defaultOption = options[0];

  const handleCheckboxChange = (value) => (e) => {
    const isChecked = e.detail.value;
    const index = days.indexOf(value);
    const isInArray = index !== -1;
    if (isChecked && !isInArray) {
      days.push(value);
    } else if (!isChecked && isInArray) {
      days.splice(index, 1);
    }
  }

  useEffect(() => {
    dispatch('selectType', {
      value: type
    });
  }, () => [type]);

  useEffect(() => {
    dispatch('selectDays', {
      value: days
    });
  }, () => [days]);

</script>

<div>
  <InputDropdown name="recurring" bind:value={type} {options} {defaultOption} />
  {#if type === 'weekly'}
    <p>Every:</p>
    {#each weekOptions as { display, value }}
      <InputCheckbox side="left" arrange="inline" name={value} label={display} on:change={handleCheckboxChange(value)} />
    {/each}
  {/if}
</div>

<style>
  div {
    margin: 0.75rem 0;
    padding-left: 1rem;
    border-left: 1px solid #000;
  }
  p {
    margin: 0.5rem 0 0.25rem;
  }
</style>