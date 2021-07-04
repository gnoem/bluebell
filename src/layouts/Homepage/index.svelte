<script lang="ts">
  export let navigate: (pageName: string) => void;
</script>

<div id="main">
  <header>
    <h1>bluebell</h1>
    <nav>
      <button on:click={() => navigate('home')}>Home</button>
      <button on:click={() => navigate('lists')}>My lists</button>
      <button on:click={() => navigate('new')}>Create new list</button>
      <button on:click={() => navigate('settings')}>Settings</button>
    </nav>
  </header>
  <main>
    <slot></slot>
  </main>
</div>

<style>
  #main {
    padding: var(--page-padding);
    width: 100%;
    height: 100%;
    display: grid;
    grid-template:
      'header main' 100% / 2fr 3fr;
    grid-gap: var(--page-padding);
  }
  header {
    grid-area: header;
    text-align: right;
  }
  main {
    grid-area: main;
    text-align: left;
  }
  h1 {
    color: var(--highlight-color);
    font-family: var(--header-font);
    text-transform: lowercase;
    font-size: 7rem;
    margin-bottom: 4rem;
    font-weight: 900;
    line-height: 0.8;
  }
  nav > button {
    position: relative;
    margin-bottom: 1rem;
    transition: 1s;
  }
  nav > button::before {
    content: '';
    position: absolute;
    top: calc(100% + 0.25rem);
    left: 0.125rem;
    width: 100%;
    height: 1px;
    background: #000;
    transform: scaleX(0);
    transition: 1s;
    transform-origin: left;
  }
  nav > button:hover {
    transform: skew(-15deg);
  }
  nav > button:hover::before {
    transform: scaleX(1);
    transform-origin: right;
  }
  nav > button + button {
    margin-left: 4rem;
  }
</style>