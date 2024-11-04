<script>
    import { profiles } from '$lib/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Header from '$lib/Header.svelte';
  
    let selectedProfileIndex = null;
    let name = '';
    let experienceLevel = '';
    let email = '';
    let heightFeet = '';
    let heightInches = '';
    let unit = 'lbs';
  
    $: if (selectedProfileIndex !== null) {
      const profile = $profiles[selectedProfileIndex];
      if (profile) {
        name = profile.name;
        experienceLevel = profile.experienceLevel;
        email = profile.email;
        heightFeet = profile.height.feet;
        heightInches = profile.height.inches;
        unit = profile.unit;
      }
    }
  
    function updateProfile() {
      profiles.update((profileList) => {
        const updatedList = [...profileList];
        updatedList[selectedProfileIndex] = {
          name,
          experienceLevel,
          email,
          height: { feet: heightFeet, inches: heightInches },
          unit
        };
        return updatedList;
      });
      goto('/'); // Navigate back to the main page after updating
    }
</script>

<style>
    .form-container {
      max-width: 400px;
      margin: 2rem auto;
      background-color: #ffffff;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  
    h2 {
      text-align: center;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      color: #4A90E2;
    }
  
    label {
      font-size: 0.9rem;
      color: #666;
    }
  
    input, select {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      color: #333;
    }
  
    input:focus, select:focus {
      border-color: #4A90E2;
      outline: none;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    }
  
    .button {
      width: 100%;
      padding: 12px;
      background-color: #4A90E2;
      border: none;
      border-radius: 5px;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .button:hover {
      background-color: #357ABD;
    }
</style>
  
<Header />

<div class="form-container">
    <h2>Update Stringer Profile</h2>
  
    <label>Select Stringer</label>
    <select bind:value={selectedProfileIndex}>
      <option value={null}>Select a stringer</option>
      {#each $profiles as profile, index}
        <option value={index}>{profile.name}</option>
      {/each}
    </select>
  
    <label>Name</label>
    <input bind:value={name} type="text" placeholder="Enter name" />
  
    <label>Experience Level</label>
    <input bind:value={experienceLevel} type="text" placeholder="Enter experience level" />
  
    <label>Email</label>
    <input bind:value={email} type="email" placeholder="Enter email" />
  
    <label>Height</label>
    <div style="display: flex; gap: 10px;">
      <input bind:value={heightFeet} type="number" placeholder="Feet" style="flex: 1;" />
      <input bind:value={heightInches} type="number" placeholder="Inches" style="flex: 1;" />
    </div>
  
    <label>Unit</label>
    <select bind:value={unit}>
      <option value="lbs">lbs</option>
      <option value="kg">kg</option>
    </select>
  
    <button class="button" on:click={updateProfile}>Update Profile</button>
</div>
  