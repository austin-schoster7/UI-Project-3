<script>
	import { goto } from '$app/navigation';
	import Header from '$lib/Header.svelte';
	import { selectedProfile } from '../../lib/stores';
	import { onMount } from 'svelte';

	let profileData;
	let unit = 'lbs'; // Track the current unit
	let tension = 550; // Default tension value
	let displayTension = 55;
	let originalTension = tension; // Store original tension for toggling +10%
	let isTenPercentEnabled = false; // State for +10% button

	// State to track which of the first three buttons is selected
	let selectedFunctionButton = null; // Values can be 'Level', 'Mains', or 'Crosses'

	let tensionPercentage = 10; // Default percentage for tension adjustment

	function setDisplayTension() { // Sets the displayed tension to the actual value shown on screen
		displayTension = tension / 10;
	}

	function increasePercentage() {
		tensionPercentage += 5;
	}

	function decreasePercentage() {
		if (tensionPercentage > 0) {
			tensionPercentage -= 5;
		}
	}

	function toggleCustomPercentage() {
		if (isTenPercentEnabled) {
			// Reset to original tension
			tension = originalTension;
			setDisplayTension();
		} else {
			// Increase tension by custom percentage
			originalTension = tension; // Store the current tension
			tension = parseFloat((tension * (1 + tensionPercentage / 100)).toFixed(1));
			setDisplayTension();
		}
		isTenPercentEnabled = !isTenPercentEnabled; // Toggle the button state
	}

	onMount(() => {
		selectedProfile.subscribe((profile) => {
			profileData = profile;
			unit = profile.unit ? profile.unit : 'lbs'; // Set unit based on profile data
			tension = unit === 'lbs' ? 550 : 250; // Set default tension based on unit
			originalTension = tension; // Set original tension based on unit
			setDisplayTension();
		});
	});

	function incrementTension(step) {
		tension += step;
		setDisplayTension();
	}

	function decrementTension(step) {
		tension -= step;
		setDisplayTension();
	}

	function toggleUnit() {
		if (unit === 'lbs') {
			// Convert lbs to kg (1 lb = 0.453592 kg)
			tension = parseFloat((tension * 0.453592).toFixed(0));
			setDisplayTension();
			unit = 'kg';
		} else {
			// Convert kg to lbs (1 kg = 2.20462 lbs)
			tension = parseFloat((tension * 2.20462).toFixed(0));
			setDisplayTension();
			unit = 'lbs';
		}
	}

	function toggleTenPercent() {
		if (isTenPercentEnabled) {
			// Reset to original tension
			tension = originalTension;
			setDisplayTension();
		} else {
			// Increase tension by 10%
			originalTension = tension; // Store the current tension
			tension = parseFloat((tension * 1.1).toFixed(0)); // Increase by 10%
			setDisplayTension();
		}
		isTenPercentEnabled = !isTenPercentEnabled; // Toggle the button state
	}

	function selectFunctionButton(button) {
		if (selectedFunctionButton === button) {
			selectedFunctionButton = null; // Deselect if the same button is clicked
		} else {
			selectedFunctionButton = button; // Select the new button
		}
	}
</script>

<Header />

<div class="main-menu">
	<div class="welcome">
		<h1>Welcome, {profileData ? profileData.name : ''}!</h1>
	</div>
	<br />

	<!-- Increment and Decrement Arrows for each place value -->
	<div class="tension-controls">
		<div class="tension-column">
			<button class="arrow-button" on:click={() => incrementTension(100)}>▲</button>
			<div class="tension-place">{Math.floor(displayTension / 10)}</div>
			<button class="arrow-button" on:click={() => decrementTension(100)}>▼</button>
		</div>
		<div class="tension-column">
			<button class="arrow-button" on:click={() => incrementTension(10)}>▲</button>
			<div class="tension-place">{Math.floor(displayTension % 10)}</div>
			<button class="arrow-button" on:click={() => decrementTension(10)}>▼</button>
		</div>

		<div class="decimal-point">.</div>

		<div class="tension-column">
			<button class="arrow-button" on:click={() => incrementTension(1)}>▲</button>
			<div class="tension-place">{(displayTension % 1).toFixed(1).split('.')[1]}</div>
			<button class="arrow-button" on:click={() => decrementTension(1)}>▼</button>
		</div>

		<!-- Unit Toggle Button -->
		<button class="unit-label" on:click={toggleUnit}>{unit}</button>
	</div>

	<!-- Side-by-side function buttons with a vertical bar separating +10% button -->
	<!-- Function Buttons -->
	<div class="function-buttons">
		<button
			class={selectedFunctionButton === 'Level' ? 'enabled' : ''}
			on:click={() => selectFunctionButton('Level')}>Level</button
		>

		<button
			class={selectedFunctionButton === 'Mains' ? 'enabled' : ''}
			on:click={() => selectFunctionButton('Mains')}>Mains</button
		>

		<button
			class={selectedFunctionButton === 'Crosses' ? 'enabled' : ''}
			on:click={() => selectFunctionButton('Crosses')}>Crosses</button
		>

		<div class="vertical-bar"></div>

		<!-- Container for the percentage button and plus/minus controls -->
		<div class="percentage-control-group">
			<button class={isTenPercentEnabled ? 'enabled' : ''} on:click={toggleCustomPercentage}>
				+{tensionPercentage}%
			</button>

			<!-- Plus and minus buttons next to the percentage button -->
			<div class="percentage-controls">
				<button class="small-button" on:click={increasePercentage}>+</button>
				<button class="small-button" on:click={decreasePercentage}>-</button>
			</div>
		</div>
	</div>
</div>

<style>
	html,
	body {
		margin: 0;
		padding: 0;
		overflow: hidden;
		height: 100%;
	}

	.main-menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 80vh;
		background-color: #f5f5f5;
		padding: 2rem;
	}

	.welcome {
		font-size: 1rem;
		font-weight: bold;
		color: #333;
		margin-bottom: 2rem;
	}

	.tension-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.tension-column {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.arrow-button {
		font-size: 3rem;
		background: none;
		border: none;
		color: #4a90e2;
		cursor: pointer;
	}

	.arrow-button:hover {
		color: #357abd;
	}

	.decimal-point {
		font-size: 12rem;
		font-weight: bold;
		color: #333;
		margin: 0 0.2rem;
	}

	.unit-label {
		font-size: 4rem;
		font-weight: bold;
		color: #333;
		margin-left: 0.5rem;
		cursor: pointer;
	}

	.unit-label:hover {
		color: #357abd;
	}

	.tension-place {
		font-size: 12rem;
		font-weight: 500;
		color: #333;
		margin: 0.5rem 0;
	}

	.function-buttons {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		width: 100%;
		max-width: 800px;
		margin-top: 2rem;
	}

	.function-buttons button {
		flex: 1;
		padding: 2rem;
		font-size: 1.2rem;
		background-color: #e0e0e0;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		transition: background-color 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.function-buttons button:hover {
		background-color: #d0d0d0;
	}

	.function-buttons button.enabled {
		background-color: #357abd;
		color: white;
	}

	.vertical-bar {
		width: 4px;
		background-color: #ccc;
		height: 100%;
		margin: 0 0.5rem;
	}

	.percentage-control-group {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem; /* Adjust gap between percentage button and controls as needed */
		height: 100%;
		width: 25%;
	}

	.percentage-control-group button {
		padding: 1rem;
		font-size: 1rem;
		background-color: #e0e0e0;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		transition: background-color 0.3s ease;
		height: 100%;
	}

	.percentage-control-group button:hover {
		background-color: #d0d0d0;
	}

	.percentage-control-group button.enabled {
		background-color: #357abd;
		color: white;
	}

	.percentage-controls {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.small-button {
		width: 40px;
		height: 30px;
		font-size: 1rem;
		background-color: #e0e0e0;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.small-button:hover {
		background-color: #d0d0d0;
	}

	.small-button:active {
		background-color: #c0c0c0;
	}

</style>
