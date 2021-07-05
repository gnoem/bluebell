<script lang="ts">
  import { useEffect } from "../../hooks";
  export let addedItem: string = '';
  export let handleSubmit: () => void;

  let input: HTMLInputElement | null = null;
  let addingItem: boolean = false;

  const toggleInput = () => {
    addedItem = '';
    addingItem = !addingItem;
  }
  
  useEffect(() => {
    if (!input) return;
    input.focus();
    const handleKeydown = (e) => {
      if (input !== document.activeElement) return;
      if (addedItem.trim() && (e.code === 'Enter')) {
        addedItem = addedItem.trim();
        handleSubmit();
      }
      if (e.code === 'Escape') {
        toggleInput();
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, () => [input]);
</script>

<div class="taskinput">
  <button class={`toggle ${addingItem ? 'editing' : ''}`} on:click={toggleInput}>
    <i class="fas fa-times" />
  </button>
  {#if addingItem}
    <div class="input">
      <input type=text bind:value={addedItem} bind:this={input} />
    </div>
  {:else}
    <button class="toggle-caption" on:click={toggleInput}>Add list item</button>
  {/if}
</div>

<style>
  div.taskinput {
    --input-height: 2rem;
    --button-size: 0.8rem;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--input-height);
  }
  button.toggle {
    font-size: var(--button-size);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    border-radius: 999px;
    transform-origin: center;
    transform: rotate(-45deg);
  }
  button.toggle.editing {
    transform: none;
  }
  div.input {
    position: relative;
    width: 100%;
    margin-left: 0.675rem;
  }
  button.toggle-caption {
    padding-left: 0.675rem;
  }
  div.input::before, div.input::after {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
  }
  div.input::before {
    content: '';
    height: 1px;
    background: #000;
    transform-origin: left;
    animation: 0.5s scaleIn 1 forwards;
  }
  div.input::after {
    content: 'Hit Enter to submit, Esc to cancel';
    font-size: 0.8rem;
    line-height: 1;
    margin-top: 0.5rem;
    animation: 0.5s fadeIn 1 forwards;
  }
  input {
    line-height: var(--input-height);
    padding: 0;
    border: 0;
    width: 100%;
    height: var(--input-height);
    position: relative;
  }
  @keyframes scaleIn {
    0% { transform: scaleX(0) }
    100% { transform: scaleX(1) }
  }
  @keyframes fadeIn {
    0% { opacity: 0 }
    100% { opacity: 0.8 }
  }
</style>