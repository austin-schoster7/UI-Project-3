<script>
	import { profiles, selectedProfileIndex } from '$lib/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Header from '$lib/Header.svelte';

	let name = '';
	let experienceLevel = '';
	let email = '';
	let heightFeet = '';
	let heightInches = '';
	let unit = 'lbs';
	let nameError = '';
	let volume = 50; // Default volume level
	let pullerSpeed = 50; // Default puller speed level

	// Load the selected profile's data on mount
	onMount(() => {
		selectedProfileIndex.subscribe((index) => {
			if (index !== null) {
				const profile = $profiles[index];
				if (profile) {
					name = profile.name;
					experienceLevel = profile.experienceLevel;
					email = profile.email;
					heightFeet = profile.height.feet;
					heightInches = profile.height.inches;
					unit = profile.unit;
					volume = profile.volume || 50; // Use saved value or default to 50
					pullerSpeed = profile.pullerSpeed || 50; // Use saved value or default to 50
				}
			}
		});
	});

	function updateProfile() {
		if (!name.trim()) {
			nameError = 'Name is required';
			return;
		}

		nameError = '';

		profiles.update((profileList) => {
			const updatedList = [...profileList];
			updatedList[$selectedProfileIndex] = {
				name,
				experienceLevel,
				email,
				height: { feet: heightFeet, inches: heightInches },
				unit,
				volume,
				pullerSpeed
			};
			return updatedList;
		});
		window.history.back(); // Navigate back to the previous page after updating
	}

	function goBack() {
		window.history.back(); // Navigate to the previous page without saving
	}

  function deleteProfile() {
    profiles.update(currentProfiles => {
      currentProfiles.splice($selectedProfileIndex, 1);
      return currentProfiles;
    });
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

  .delete-button {
    background-color: red;
    margin-top: 10px;
  }

  .delete-button:hover {
    background-color: #b81d1d;
  }

</style>

<Header />

<div class="form-container">
	<h2>Update Stringer Profile</h2>

	<!-- Back Button -->
	<button class="button back-button" on:click={goBack}>Back</button>

	<label>
		Name <span class="required-asterisk">*</span>
	</label>
	<input bind:value={name} type="text" placeholder="Enter name" />
	{#if nameError}
		<div class="error-message">{nameError}</div>
	{/if}

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

	<button class="button" on:click={updateProfile}>Update Profile</button>
  <button class="button delete-button" on:click={deleteProfile}>Delete Profile</button>
</div>
