<script>
  import { profiles } from '../lib/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Header from '$lib/Header.svelte';

  let profileList = [];

  $: profiles.subscribe(value => profileList = value);

  function selectStringer(name) {
    console.log(`Stringer ${name} selected`);
  }

  function newStringer() {
    goto('/new-stringer');
  }

  function updateStringer() {
    goto('/update-stringer');
  }
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 20px;
    height: 100vh;
    align-items: center;
  }

  .button {
    padding: 20px;
    font-size: 24px;
    text-align: center;
    background-color: #007bff;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
  }

  .button.secondary {
    background-color: #6c757d;
  }

  .button:hover {
    background-color: #0056b3;
  }
</style>

<Header />

<div class="container">
  <h2>Select Stringer</h2>
  {#each profileList as profile}
    <div class="button" on:click={() => selectStringer(profile.name)}>
      {profile.name}
    </div>
  {/each}
  <div class="button secondary" on:click={newStringer}>New Stringer</div>
  <div class="button secondary" on:click={updateStringer}>Update Stringer</div>
</div>
