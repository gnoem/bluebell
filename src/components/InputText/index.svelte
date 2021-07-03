<script lang="ts">
  import { useEffect } from "../../hooks";

  export let name: string;
  export let label: string = undefined;
  export let value: string;
  export let placeholder = '';
  export let createRef;

  let localRef: HTMLInputElement | null;

  useEffect(() => {
    createRef(localRef);
  }, () => [localRef]);
  
</script>

<div class="input">
  {#if label}
    <label for={name}>{label}</label>
  {/if}
  <input {name} {placeholder} type=text bind:value bind:this={localRef} />
</div>

<style>
  div.input, div.input > * {
    width: 100%;
  }
</style>