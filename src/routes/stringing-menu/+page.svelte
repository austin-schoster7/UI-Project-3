<script>
	import { goto } from '$app/navigation';
	import Header from '$lib/Header.svelte';

	let tension = 55.0;

	function incrementTension(step) {
		tension += step;
	}

	function decrementTension(step) {
		tension -= step;
	}
</script>

<Header />

<div class="main-menu">
	<!-- Increment and Decrement Arrows for each place value -->
	<div class="tension-controls">
		<div class="tension-column">
			<button class="arrow-button" on:click={() => incrementTension(10)}>▲</button>
			<div class="tension-place">{Math.floor(tension / 10)}</div>
			<button class="arrow-button" on:click={() => decrementTension(10)}>▼</button>
		</div>
		<div class="tension-column">
			<button class="arrow-button" on:click={() => incrementTension(1)}>▲</button>
			<div class="tension-place">{Math.floor(tension % 10)}</div>
			<button class="arrow-button" on:click={() => decrementTension(1)}>▼</button>
		</div>

		<div class="decimal-point">.</div>

		<div class="tension-column">
			<button class="arrow-button" on:click={() => incrementTension(0.1)}>▲</button>
			<div class="tension-place">{(tension % 1).toFixed(1).split('.')[1]}</div>
			<button class="arrow-button" on:click={() => decrementTension(0.1)}>▼</button>
		</div>

		<!-- Lbs Unit Display -->
		<div class="unit-label">lbs</div>
	</div>

	<!-- Larger, square function buttons with more spacing -->
	<div class="function-buttons">
		<button>Button 1</button>
		<button>Button 2</button>
		<button>Button 3</button>
		<button>Button 4</button>
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

	.tension-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		margin-bottom: 2rem;
		margin-left: 6rem;
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

	.decimal-point {
		font-size: 12rem;
		font-weight: bold;
		color: #333;
		margin: 0 0.2rem;
	}

	.unit-label {
		font-size: 4rem; /* Matches the other elements for a cohesive look */
		font-weight: bold;
		color: #333;
		margin-left: 0.5rem;
	}

	.arrow-button:hover {
		color: #357abd;
	}

	.tension-place {
		font-size: 12rem;
		font-weight: 500;
		color: #333;
		margin: 0.5rem 0;
	}

	.function-buttons {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		width: 100%;
		max-width: 500px;
	}

	.function-buttons button {
		padding: 3rem; /* Square buttons */
		font-size: 1.2rem;
		background-color: #e0e0e0;
		border: none;
		border-radius: 10px;
		cursor: pointer;
	}
</style>
