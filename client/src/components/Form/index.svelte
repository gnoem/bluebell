<script lang="ts">
  export let handleSubmit: () => void;
  export let submitValue: string;
  export let clearForm: () => void = null;
</script>

<form on:submit|preventDefault={handleSubmit}>
  <slot></slot>
  <div>
    <input type=submit value={submitValue} />
    {#if clearForm}
      <button type=button on:click={clearForm}>reset</button>
    {/if}
  </div>
</form>
