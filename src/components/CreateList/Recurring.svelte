<script lang="ts">
  import { InputDropdown, InputCheckbox } from "..";
  let value = 'daily';
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
</script>

<div>
  <InputDropdown name="recurring" bind:value {options} {defaultOption} />
  {#if value === 'weekly'}
    <p>Every:</p>
    {#each weekOptions as { display, value }}
      <InputCheckbox side="left" arrange="inline" name={value} label={display} />
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