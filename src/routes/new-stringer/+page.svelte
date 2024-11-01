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
  
    function saveProfile() {
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
      display: flex;
      flex-direction: column;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
  
    label {
      font-size: 18px;
      margin-top: 10px;
    }
  
    input {
      padding: 10px;
      font-size: 16px;
      margin-top: 5px;
      border-radius: 5px;
    }
  
    button {
      margin-top: 20px;
      padding: 10px;
      font-size: 18px;
      background-color: #007bff;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
</style>
  
<Header />

<div class="form-container">
    <h2>New Stringer Profile</h2>
    
    <label>Name</label>
    <input bind:value={name} type="text" placeholder="Enter name" />
  
    <label>Experience Level</label>
    <input bind:value={experienceLevel} type="text" placeholder="Enter experience level" />
  
    <label>Email</label>
    <input bind:value={email} type="email" placeholder="Enter email" />
  
    <label>Height</label>
    <div>
      <input bind:value={heightFeet} type="number" placeholder="Feet" style="width: 40px;" />
      <input bind:value={heightInches} type="number" placeholder="Inches" style="width: 40px;" />
    </div>
  
    <label>Unit</label>
    <select bind:value={unit}>
      <option value="lbs">lbs</option>
      <option value="kg">kg</option>
    </select>
  
    <button on:click={saveProfile}>Save Profile</button>
  </div>
  