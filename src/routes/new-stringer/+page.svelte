<script>
  import { goto } from '$app/navigation';
  import { profiles } from '$lib/stores';
  import Header from '$lib/Header.svelte';

  let name = '';
  let experienceLevel = '';
  let email = '';
  let heightFeet = '';
  let heightInches = '';
  let unit = 'lbs';
  let nameError = ''; // Variable to store error message for name

  function saveProfile() {
    if (!name.trim()) {
      nameError = 'Name is required';
      return;
    }
    
    // Clear the error if the name is valid
    nameError = '';
    
    const newProfile = {
      name,
      experienceLevel,
      email,
      height: { feet: heightFeet, inches: heightInches },
      unit
    };
    
    profiles.update((profileList) => [...profileList, newProfile]);
    goto('/');
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

  .required-asterisk {
    color: #ff5722; /* Red color for the asterisk */
    margin-left: 2px;
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

  .error-message {
    color: #ff5722;
    font-size: 0.9rem;
    margin-top: -10px;
    margin-bottom: 15px;
  }
</style>

<Header />

<div class="form-container">
  <h2>Create Stringer Profile</h2>
  
  <label>
    Name <span class="required-asterisk">*</span>
  </label>
  <input type="text" placeholder="Enter name" bind:value={name} />
  {#if nameError}
    <div class="error-message">{nameError}</div>
  {/if}

  <label>Experience Level</label>
  <input type="text" placeholder="Enter experience level" bind:value={experienceLevel} />

  <label>Email</label>
  <input type="email" placeholder="Enter email" bind:value={email} />

  <label>Height</label>
  <div style="display: flex; gap: 10px;">
    <input type="number" placeholder="Feet" style="flex: 1;" bind:value={heightFeet} />
    <input type="number" placeholder="Inches" style="flex: 1;" bind:value={heightInches} />
  </div>

  <label>Unit</label>
  <select bind:value={unit}>
    <option value="lbs">lbs</option>
    <option value="kg">kg</option>
  </select>

  <button class="button" on:click={saveProfile}>Add Profile</button>
</div>
