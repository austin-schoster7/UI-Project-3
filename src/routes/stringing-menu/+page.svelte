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
	let isLoading = false; // State to track loading state
	let crossTension = 0;
	let mainTension = 0;
	let tensionUnitM;
	let tensionUnitC;

	// State to track which of the first three buttons is selected
	let selectedFunctionButton = null; // Values can be 'Level', 'Mains', or 'Crosses'
	let buttonNum = -1;
	let tensionPercentage = 10; // Default percentage for tension adjustment
	let showClearConfirmation = false; // State to toggle the confirmation popup

	function setDisplayTension() {
		// Sets the displayed tension to the actual value shown on screen
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
		if (tension + step <= 900) {
			tension += step;
		} else {
			tension = 900; // Cap at 90.0 lbs
		}
		setDisplayTension();
	}

	function decrementTension(step) {
		if (tension - step >= 200) {
			tension -= step;
		} else {
			tension = 200; // Floor at 20.0 lbs
		}
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

	function simulateAdjustment(button, num) {
		selectedFunctionButton = button;
		isLoading = true;
		buttonNum = num;

		// Update the tension value from saved values if switching back to a button
		updateTensionFromSaved(button);

		// Start a 3-second timer for the progress bar
		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}

	function SetTension() {
		if (buttonNum === 1) {
			mainTension = tension / 10;
			tensionUnitM = unit;
		} else if (buttonNum === 2) {
			crossTension = tension / 10;
			tensionUnitC = unit;
		}
	}

	function updateTensionFromSaved(button) {
		if (button === 'Mains' && mainTension !== 0) {
			tension = mainTension * 10;
			unit = tensionUnitM;
		} else if (button === 'Crosses' && crossTension !== 0) {
			tension = crossTension * 10;
			unit = tensionUnitC;
		} else {
			tension = unit === 'lbs' ? 550 : 250; // Reset default tension
		}
		setDisplayTension();
	}

	function ClearTensions() {
		mainTension = 0;
		crossTension = 0;
		tensionUnitM = 'lbs';
		tensionUnitC = 'lbs';

		// Reset current tension to default
		tension = unit === 'lbs' ? 550 : 250;
		setDisplayTension();
		showClearConfirmation = false; // Hide the confirmation popup after clearing
	}

	function showConfirmation() {
		showClearConfirmation = true; // Show the confirmation popup
	}

	function cancelClear() {
		showClearConfirmation = false; // Hide the confirmation popup
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

	<div class="button-group">
		<button class="setButton" on:click={SetTension}>
			{#if selectedFunctionButton === 'Mains'}
				Set Mains Tension
			{:else if selectedFunctionButton === 'Crosses'}
				Set Crosses Tension
			{:else}
				Set Tension
			{/if}
		</button>
		<button class="clearButton" on:click={showConfirmation}>Clear Tensions</button>
	</div>
	
	{#if showClearConfirmation}
		<div class="overlay">
			<div class="confirmation-popup">
				<p>Are you sure you want to clear the saved tensions?</p>
				<div class="popup-buttons">
					<button class="confirmButton" on:click={ClearTensions}>Yes</button>
					<button class="cancelButton" on:click={cancelClear}>No</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Function Buttons -->
	<div class="function-buttons">
		<button
			class={selectedFunctionButton === 'Level' ? 'enabled' : ''}
			on:click={() => simulateAdjustment('Level',0)}
			disabled={isLoading}
		>
			Level
		</button>

		<button
			class={selectedFunctionButton === 'Mains' ? 'enabled' : ''}
			on:click={() => simulateAdjustment('Mains',1)}
			disabled={isLoading}
		>
			<div class="mains-icon" disabled={isLoading}>
				{#each Array(6) as _, i}
					<div class="vertical-line"></div>
				{/each}
			</div>
			<span class="mains-label" disabled={isLoading}>Mains {mainTension === 0 ? '' : (': '+ mainTension + tensionUnitM )}</span>
		</button>

		<button
			class={selectedFunctionButton === 'Crosses' ? 'enabled' : ''}
			on:click={() => simulateAdjustment('Crosses',2)}
			disabled={isLoading}
		>
			<div class="crosses-icon" disabled={isLoading}>
				{#each Array(6) as _, i}
					<div class="horizontal-line"></div>
				{/each}
			</div>
			<span class="mains-label" disabled={isLoading}>Crosses {crossTension === 0 ? '' : (': '+ crossTension + tensionUnitC )}</span>
		</button>

		<div class="vertical-bar"></div>

		<!-- Container for the percentage button and plus/minus controls -->
		<div class="percentage-control-group">
			<button class={isTenPercentEnabled ? 'enabled' : ''} on:click={toggleCustomPercentage}>
				Knot Tension: +{tensionPercentage}%
			</button>

			<!-- Plus and minus buttons next to the percentage button -->
			<div class="percentage-controls">
				<button
					class="small-button"
					on:click={increasePercentage}
					disabled={isTenPercentEnabled}
					title={isTenPercentEnabled ? 'Disable the toggle to change value' : ''}
					aria-disabled={isTenPercentEnabled}
				>
					+
				</button>
				<button
					class="small-button"
					on:click={decreasePercentage}
					disabled={isTenPercentEnabled}
					title={isTenPercentEnabled ? 'Disable the toggle to change value' : ''}
					aria-disabled={isTenPercentEnabled}
				>
					-
				</button>
			</div>
		</div>
	</div>
	<!-- Show Progress Bar when loading -->
	{#if isLoading}
		<div class="progress-bar">
			<div class="progress"></div>
		</div>
		<div class="adjusting-text">Adjusting Machine...</div>
	{/if}
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

	.setButton {
		background-color: #e0e0e0;
		color: #333;
		border: none;
		border-radius: 10px;
		padding: 1rem; /* Adjusted for consistency */
		font-size: 1.2rem; /* Match other buttons */
		cursor: pointer;
		transition: background-color 0.3s ease;
		width: 355px; /* Specific size for this button */
		margin-right: 65px; /* Keep the specific alignment */
		display: flex;
		align-items: center;
		justify-content: center;
		max-height: 20px;
	}

	.setButton:hover {
		background-color: #d0d0d0;
	}

	.clearButton {
		width: 355px; /* Match the width of the Set Tension button */
		margin-top: 10px;
		padding: 1rem;
		font-size: 1rem;
		background-color: #ff6666; /* Red to indicate clearing action */
		border: none;
		border-radius: 10px;
		cursor: pointer;
		color: white;
		transition: background-color 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		max-height: 20px;
	}

	.clearButton:hover {
		background-color: #e60000; /* Darker red on hover */
	}

	/* Semi-transparent gray overlay */
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent gray */
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000; /* Ensure it appears above other elements */
	}

	/* Confirmation popup */
	.confirmation-popup {
		position: relative;
		width: 300px;
		background-color: white;
		padding: 1.5rem;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		text-align: center;
		z-index: 1100; /* Ensure it appears above the overlay */
	}

	/* Popup buttons */
	.popup-buttons {
		display: flex;
		justify-content: space-around;
		margin-top: 1rem;
	}

	.confirmButton {
		padding: 0.5rem 1rem;
		background-color: #4caf50; /* Green for confirmation */
		border: none;
		border-radius: 5px;
		color: white;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.confirmButton:hover {
		background-color: #388e3c; /* Darker green on hover */
	}

	.cancelButton {
		padding: 0.5rem 1rem;
		background-color: #f44336; /* Red for cancellation */
		border: none;
		border-radius: 5px;
		color: white;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.cancelButton:hover {
		background-color: #d32f2f; /* Darker red on hover */
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
		flex-direction: column;
		color: #333;
	}

	.function-buttons button:hover {
		background-color: #d0d0d0;
	}

	.function-buttons button.enabled {
		background-color: #357abd;
		color: white;
	}

	.function-buttons button:disabled {
		background-color: #d0d0d0; /* Ensure all disabled buttons have a consistent gray */
		color: #a0a0a0; /* Dim the text for disabled state */
		cursor: not-allowed;
	}

	/* Styles for Mains Icon */
	.mains-icon {
		display: flex;
		flex-direction: row;
		gap: 4px;
		margin-bottom: 0.5rem;
		justify-content: center;
	}

	.mains-label,
	.crosses-label {
		font-size: 0.9rem;
		color: #333; /* Default color */
		margin-top: 0.5rem;
		transition: color 0.3s ease;
	}

	/* Change label to white when button is selected */
	button.enabled .mains-label,
	button.enabled .crosses-label {
		color: white; /* Change to white when enabled */
	}

	/* Vertical Line in Mains Icon */
	.vertical-line {
		width: 3px;
		height: 35px;
		background-color: #333;
		transition: background-color 0.3s ease;
	}

	button.enabled .mains-icon .vertical-line {
		background-color: white; /* Change to white when enabled */
	}

	button:disabled .mains-icon .vertical-line {
		background-color: #a0a0a0; /* Dimmed gray for disabled state */
	}

	/* Crosses Icon */
	.crosses-icon {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-bottom: 8px;
		align-items: center;
	}

	.horizontal-line {
		width: 35px;
		height: 3px;
		background-color: #333;
		transition: background-color 0.3s ease;
	}

	button.enabled .crosses-icon .horizontal-line {
		background-color: white; /* Change to white when enabled */
	}

	button:disabled .crosses-icon .horizontal-line {
		background-color: #a0a0a0; /* Dimmed gray for disabled state */
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
		gap: 0.5rem;
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

	.small-button:disabled {
		background-color: #f8d7da;
		color: #721c24;
		cursor: not-allowed;
	}

	/* Progress Bar Container */
	.progress-bar {
		width: 100%;
		max-width: 800px;
		height: 1rem;
		background-color: #ccc;
		border-radius: 5px;
		overflow: hidden;
		margin-top: 1rem;
	}

	/* Progress Animation */
	.progress {
		height: 100%;
		width: 100%;
		background-color: #4a90e2;
		animation: progressAnimation 3s linear forwards;
	}

	.adjusting-text {
		margin-top: 0.5rem;
		font-size: 1rem;
		color: #4a90e2;
		text-align: center;
		font-weight: bold;
	}

	@keyframes progressAnimation {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}
</style>
