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

<div class="settings">
    <p>settings page</p>
</div>
  