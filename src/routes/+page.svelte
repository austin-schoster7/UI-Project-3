<script>
  import { profiles } from '../lib/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Header from '$lib/Header.svelte';

  let profileList = [];

  $: profiles.subscribe(value => profileList = value);

  // TODO: Handle logic for selecting profiles
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
  .main-container {
    padding: 2rem;
    max-width: 800px;
    margin: auto;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .button {
    padding: 12px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #4A90E2;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .button:hover {
    background-color: #357ABD;
  }

  .profile-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .profile-card {
    background-color: #fff;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .profile-card:hover {
    transform: translateY(-5px);
  }

  .profile-name {
    font-size: 1.2rem;
    font-weight: 500;
    color: #4A90E2;
  }

  .profile-details {
    font-size: 0.9rem;
    color: #666;
  }
</style>

<Header />

<div class="main-container">
  <div class="button-group">
    <button class="button" on:click={newStringer}>New Stringer</button>
    <button class="button" on:click={updateStringer}>Update Stringer</button>
  </div>

  <h2>Stringer Profiles</h2>
  <div class="profile-grid">
    {#each $profiles as profile}
      <div class="profile-card" on:click={() => selectStringer(profile.name)}>
        <div class="profile-name">{profile.name}</div>
        <div class="profile-details">
          Experience: {profile.experienceLevel}<br>
          Height: {profile.height.feet}' {profile.height.inches}"<br>
          Unit: {profile.unit}
        </div>
      </div>
    {/each}
  </div>
</div>