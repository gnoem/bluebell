<script lang="ts">
  export let name: string;
  export let label: string = undefined;
  export let checked: boolean = false;
  export let arrange: string = '';
  export let side: string = 'right';
  let checkbox: HTMLInputElement | null;
  export let ref = checkbox;
</script>

<div class={`input ${side} ${arrange}`}>
  {#if label}
    <label for={name}>{label}</label>
  {/if}
  <div class="checkbox">
    <input {name} type=checkbox bind:checked bind:this={ref} />
    <span></span>
  </div>
</div>

<style>
  div.input {
    --checkbox-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  label {
    margin: 0;
    margin-right: 0.5rem;
  }
  div.input.left label {
    order: 1;
    margin: 0;
    margin-left: 0.5rem;
  }
  div.input.inline {
    display: inline-flex;
    margin-right: 1rem;
  }
  div.checkbox {
    position: relative;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
  }
  div.checkbox, div.checkbox * {
    cursor: pointer;
  }
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    opacity: 0;
    margin: 0;
  }
  input + span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    border: 1px solid #000;
    background: #fff;
  }
  input + span::before {
    font: 900 0.6em 'Font Awesome 5 Free';
    content: '\f00c';
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;
  }
  input:checked + span::before {
    opacity: 1;
  }
</style>