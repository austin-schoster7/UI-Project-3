<script>
	import { goto } from '$app/navigation';
	import Header from '$lib/Header.svelte';

	// Default tension value
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
	</div>

	<div class="function-buttons">
		<button>Button 1</button>
		<button>Button 2</button>
		<button>Button 3</button>
		<button>Button 4</button>
		<button>Button 5</button>
		<button>Button 6</button>
	</div>
</div>

<style>
	.main-menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background-color: #f5f5f5;
		padding: 2rem;
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
		font-size: 1.5rem;
		background: none;
		border: none;
		color: #4a90e2;
		cursor: pointer;
	}

	.decimal-point {
		font-size: 4rem;
		font-weight: bold;
		color: #333;
		margin: 0 0.2rem;
	}

	.arrow-button:hover {
		color: #357abd;
	}

	.tension-place {
		font-size: 4rem;
		font-weight: bold;
		color: #333;
		margin: 0.5rem 0;
	}

	.function-buttons {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		width: 100%;
		max-width: 400px;
	}

	.function-buttons button {
		padding: 1rem;
		font-size: 1rem;
		background-color: #e0e0e0;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
</style>
