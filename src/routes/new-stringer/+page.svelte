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
  let volume = 50; // Default volume level
	let pullerSpeed = 50; // Default puller speed level

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
			unit,
      volume,
      pullerSpeed
		};

		profiles.update((profileList) => [...profileList, newProfile]);
		goto('/');
	}

  function goBack() {
		window.history.back(); // Navigate to the previous page without saving
	}
</script>

<Header />

<div class="form-container">
	<h2>Create Stringer Profile</h2>

  <!-- Back Button -->
	<button class="button back-button" on:click={goBack}>Back</button>

	<label>
		Name <span class="required-asterisk">*</span>
	</label>
	<input type="text" placeholder="Enter name" bind:value={name} />
	{#if nameError}
		<div class="error-message">{nameError}</div>
	{/if}

	<label>Experience Level</label>
	<select type="text" placeholder="Enter experience level" bind:value={experienceLevel}>
		<option value="Beginner">Beginner</option>
		<option value="Experienced">Experienced</option>
		<option value="Advanced">Advanced</option>
		<option value="Professional">Professional</option>
	</select>

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

  <!-- Volume Control -->
	<label>Volume</label>
	<div class="slider-container">
		<input type="range" min="0" max="100" bind:value={volume} class="slider" />
		<input type="number" min="0" max="100" bind:value={volume} class="slider-input" />
	</div>

	<!-- Puller Speed Control -->
	<label>Puller Speed</label>
	<div class="slider-container">
		<input type="range" min="0" max="100" bind:value={pullerSpeed} class="slider" />
		<input type="number" min="0" max="100" bind:value={pullerSpeed} class="slider-input" />
	</div>

	<button class="button" on:click={saveProfile}>Add Profile</button>
</div>

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
    color: #ff5722;
    margin-left: 2px;
  }

  input, select, .slider-input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    color: #333;
  }

  .slider-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
  }

  .slider {
    width: 80%; /* Make slider larger */
    -webkit-appearance: none;
    height: 12px; /* Increase slider height */
    background: #ddd;
    border-radius: 5px;
    outline: none;
    transition: background 0.3s ease;
  }

  .slider:hover {
    background: #bfd4ea;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px; /* Make thumb larger */
    height: 24px;
    background: #fff; /* White thumb for contrast */
    border: 2px solid #4A90E2;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s ease, border-color 0.3s ease;
  }

  .slider::-webkit-slider-thumb:hover {
    background: #4A90E2;
    border-color: #4A90E2;
  }

  .slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background: #fff;
    border: 2px solid #4A90E2;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s ease, border-color 0.3s ease;
  }

  .slider::-moz-range-thumb:hover {
    background: #4A90E2;
    border-color: #4A90E2;
  }

  .slider-input {
    width: 60px; /* Make input box smaller */
    text-align: center;
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

  .back-button {
    background-color: #ccc;
    color: #333;
    margin-bottom: 10px;
  }

  .error-message {
    color: #ff5722;
    font-size: 0.9rem;
    margin-top: -10px;
    margin-bottom: 15px;
  }
</style>
