<script lang="ts">
  import { useEffect } from "../../hooks";
  export let item: string;
  export let deleteItem: () => void;
  export let editItem: (content: string) => void;

  let input;
  let editing = false;
  let value = item;
  let buttonClass = '';

  const handleDelete = () => {
    buttonClass = 'goodbye';
    setTimeout(() => {
      deleteItem();
    }, 200);
  }

  useEffect(() => {
    if (!editing) return;
    const handleKeydown = (e) => {
      if ((e.code === 'Enter') && (input === document.activeElement)) {
        editItem(value);
        editing = false;
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, () => [editing]);
</script>

<li class={buttonClass}>
  <div>
    <button on:click={handleDelete}><i class="fas fa-times" /></button>
  </div>
  {#if editing}
    <input type=text bind:this={input} bind:value />
  {:else}
    <span on:click={() => { editing: true }}>{item}</span>
  {/if}
</li>

<style>
  li {
    --list-item-height: 1.5rem;
    line-height: var(--list-item-height);
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform-origin: left bottom;
    animation: 0.2s scaleIn 1 forwards;
  }
  li.goodbye {
    animation: 0.2s scaleOut 1 forwards;
  }
  li input, li span {
    width: 100%;
    text-align: left;
  }
  li > div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.675rem;
  }
  li > div button {
    opacity: 0.5;
    font-size: 0.8rem;
  }
  li > div button:hover {
    opacity: 1;
  }
  @keyframes scaleIn {
    0% {
      transform: scale(0);
      max-height: 0;
    }
    100% {
      transform: scale(1);
      max-height: var(--list-item-height);
    }
  }
  @keyframes scaleOut {
    0% {
      transform: scale(1);
      max-height: var(--list-item-height);
    }
    100% {
      transform: scale(0);
      max-height: 0;
    }
  }
</style>

<!-- 
  - allow rearrange and delete tasks
  - clear all
  - list titles
  - conditions for recurring
 -->