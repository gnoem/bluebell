<script lang="ts">
  import { useEffect } from "../../hooks";

  export let name: string;
  export let label: string = undefined;
  export let options: { value: string; display: string }[] = [];
  export let defaultOption: { value: string; display: string };
  export let value: string = defaultOption.value;
  export let stretch: boolean = false;

  let dropdown: HTMLDivElement | null;
  let selected;
  $: selected = options.find(option => option.value === value);

  const handleClick = (optionValue): void => {
    value = optionValue;
    opened = false;
  }
  let opened = false;
  useEffect(() => {
    if (!opened || !dropdown) return;
    const checkClick = (e) => {
      if (dropdown.contains(e.target)) return;
      opened = false;
    }
    window.addEventListener('click', checkClick);
    return () => window.removeEventListener('click', checkClick);
  }, () => [opened, dropdown]);

  const inputWidth = (): string => {
    // look at all options and see whose .display property is longest
    const sortedByLength = options.map(({ display }) => display).sort((a, b) => {
      return a.length - b.length;
    });
    // use that as the basis for element width
    return `${sortedByLength[0].length + 1}rem`;
  }

</script>

<div class="input" style={stretch ? '' : `width: ${inputWidth()}`}>
  {#if label}
    <label for={name}>{label}</label>
  {/if}
  <div class={`dropdown ${opened ? 'opened' : ''}`} bind:this={dropdown}>
    <div class="display" on:click={() => { opened = !opened }}>{selected.display}</div>
    <div class="options">
      {#each options as { value, display }}
        <div class="option">
          <div on:click={() => handleClick(value)}>{display}</div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .dropdown {
    --dropdown-height: 2rem;
    position: relative;
    cursor: pointer;
    user-select: none;
    line-height: var(--dropdown-height);
    z-index: 50;
  }
  .display, .option > div {
    background: #fff;
    padding: 0 0.5rem;
  }
  .display {
    border: 1px solid #000;
    padding-right: 2rem;
    position: relative;
    display: flex;
    align-items: center;
  }
  .display::before {
    font: 900 1em 'Font Awesome 5 Free';
    content: '\f0d9';
    position: absolute;
    right: 0.75rem;
    transition: 0.2s;
    transform-origin: center;
  }
  .dropdown.opened .display::before {
    transform: rotate(-90deg);
  }
  .options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
  }
  .option {
    position: relative;
    max-height: 0;
    overflow: hidden;
    transition: 0.2s;
  }
  .option > div::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    width: calc(100% - 2px);
    height: calc(100%);
    border: 1px solid #000;
    border-top: 0;
  }
  .option:hover > div {
    background: #f7f7f7;
  }
  .dropdown.opened .option {
    max-height: var(--dropdown-height);
  }
</style>