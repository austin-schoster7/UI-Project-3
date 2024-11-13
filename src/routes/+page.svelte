<script>
	import { profiles, selectedProfileIndex, selectedProfile } from '../lib/stores';
	import { goto } from '$app/navigation';
	import Header from '$lib/Header.svelte';

	let profileList = [];
	let showConfirmDelete = false; // Controls visibility of delete confirmation
	let profileIndexToDelete = null; // Stores index of profile to delete

	$: profiles.subscribe((value) => (profileList = value));

	function selectStringer(profile) {
		selectedProfile.set(profile);
		goto('/stringing-menu');
	}

	function newStringer() {
		goto('/new-stringer');
	}

	function editStringer(index) {
		selectedProfileIndex.set(index);
		goto('/update-stringer');
	}

	function confirmDeleteProfile(index) {
		profileIndexToDelete = index; // Set the profile to delete
		showConfirmDelete = true; // Show the confirmation modal
	}

	function deleteProfile() {
		if (profileIndexToDelete !== null) {
			profiles.update(currentProfiles => {
				currentProfiles.splice(profileIndexToDelete, 1);
				return currentProfiles;
			});
			profileIndexToDelete = null; // Reset after deletion
			showConfirmDelete = false; // Hide the modal
		}
	}

	function cancelDelete() {
		profileIndexToDelete = null;
		showConfirmDelete = false;
	}
</script>

<Header />

<div class="main-container">
	<div class="button-group">
		<button class="button" on:click={newStringer}>New Stringer</button>
	</div>

	<h2>Stringer Profiles</h2>
	<div class="profile-grid">
		{#if $profiles.length === 0}
			<p>No profiles found. Click "New Stringer" to create a new profile.</p>
		{/if}
		{#each $profiles as profile, index}
			<div class="profile-card" on:click={() => selectStringer(profile)}>
				<div class="profile-name">{profile.name}</div>
				<div class="profile-details">
					Experience: {profile.experienceLevel}<br />
					Height: {profile.height.feet}' {profile.height.inches}"<br />
					Unit: {profile.unit}
				</div>
				<!-- Pencil icon to edit profile -->
				<div class="edit-icon" on:click={(event) => { event.stopPropagation(); editStringer(index); }}>
					<svg width="25" height="25" fill="currentColor" viewBox="0 0 24 24">
						<path d="M14.06 9.02l.92.92-8.14 8.14-1.36-.06.06-1.36 8.14-8.14zm3.31-5.57c.39-.39 1.02-.39 1.41 0l2.22 2.22c.39.39.39 1.02 0 1.41l-2.12 2.12-3.64-3.64 2.13-2.11zm-2.68 2.68l3.64 3.64-9.91 9.91h-3.64v-3.64l9.91-9.91z"/>
					</svg>
				</div>
				<!-- Trash icon to delete profile with confirmation -->
				<div class="delete-icon" on:click={(event) => { event.stopPropagation(); confirmDeleteProfile(index); }}>
					<svg width="25" height="25" fill="currentColor" viewBox="0 0 24 24" stroke-width="3">
						<circle cx="12" cy="12" r="10" stroke="currentColor" fill="none"/>
						<path d="M8 8l8 8M8 16l8-8" stroke="currentColor"/>
					</svg>
				</div>
			</div>
		{/each}
	</div>
</div>

{#if showConfirmDelete}
	<div class="modal">
		<div class="modal-content">
			<p>Are you sure you want to delete this profile?</p>
			<div class="modal-buttons">
				<button class="confirm-button" on:click={deleteProfile}>Yes, Delete</button>
				<button class="cancel-button" on:click={cancelDelete}>Cancel</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.main-container {
		padding: 2rem;
		max-width: 800px;
		margin: auto;
	}

	.button-group {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.button {
		padding: 12px 20px;
		font-size: 1rem;
		color: #fff;
		background-color: #4a90e2;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.button:hover {
		background-color: #357abd;
	}

	.profile-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}

	.profile-card {
		position: relative;
		background-color: #fff;
		padding: 1rem;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		text-align: center;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.profile-card:hover {
		transform: translateY(-5px);
	}

	.profile-name {
		font-size: 1.2rem;
		font-weight: 500;
		color: #4a90e2;
	}

	.profile-details {
		font-size: 0.9rem;
		color: #666;
	}

	.edit-icon {
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
		color: #4a90e2;
		transition: color 0.2s ease, transform 0.2s ease;
	}

	.edit-icon:hover {
		color: #ff5722;
		transform: scale(1.2);
	}

	.delete-icon {
		position: absolute;
		top: 35px;
		right: 10px;
		cursor: pointer;
		color: red;
		transition: color 0.2s ease, transform 0.2s ease;
	}

	.delete-icon:hover {
		color: maroon;
		transform: scale(1.2);
	}

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content {
		background: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		max-width: 300px;
		text-align: center;
	}

	.modal-buttons {
		display: flex;
		justify-content: space-between;
		margin-top: 15px;
	}

	.confirm-button {
		background-color: red;
		color: white;
		border: none;
		padding: 10px;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.confirm-button:hover {
		background-color: #b81d1d;
	}

	.cancel-button {
		background-color: #ccc;
		color: #333;
		border: none;
		padding: 10px;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.cancel-button:hover {
		background-color: #aaa;
	}
</style>
