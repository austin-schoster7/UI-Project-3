<script>
	import { goto } from '$app/navigation';
  	import { profiles } from '../lib/stores'
	import { page } from '$app/stores';

	function goHome() {
		goto('/');
	}

	function openSettings() {
		goto('/update-stringer');
	}

	let imageUploadButton;
	const triggerFileInput = () => {
		imageUploadButton.click();
	};

  	const handleFileChange = (event) => {
    const profilecsv = new FileReader();
    
    profilecsv.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\r\n');
      lines.pop();

      lines.forEach(element => {
        const profileData = element.split(',');

        let newProfile = {
          name: profileData[0],
          experienceLevel: profileData[1],
          email: profileData[2],
          height: { feet: profileData[3], inches: profileData[4] },
          unit: profileData[5]
        };

        profiles.update((profileList) => [...profileList, newProfile]);
      });
    };

    profilecsv.readAsText(event.target.files[0]);
  };
</script>

<div class="header">
	<span class="header-title">Stringing Machine</span>
	<div class="button-group">
		{#if $page.url.pathname === '/'}
		<button on:click={triggerFileInput} id = "profileButton">Upload Profiles</button>
		{/if}
		{#if $page.url.pathname === '/stringing-menu'}
		<button on:click={goHome}>
			View Profiles
		</button>
		{/if}
		{#if $page.url.pathname === '/stringing-menu'}
			<button on:click={openSettings} class="settings-button">
				Profile Settings
			</button>
		{/if}
		<input type="file" bind:this={imageUploadButton} on:change={handleFileChange} accept=".csv*" id = "profileInputValue" style="display: none;"/>
	</div>
</div>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
		background-color: #4a90e2;
		color: #fff;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.header-title {
		font-size: 1.5rem;
		font-weight: 500;
	}

	.button-group {
		display: flex;
		gap: 10px;
	}

	.button-group button {
		display: flex;
		align-items: center;
		background-color: #fff;
		color: #4a90e2;
		border: none;
		border-radius: 5px;
		padding: 8px 16px;
		cursor: pointer;
		font-size: 1rem;
		transition: background-color 0.3s ease;
	}

	.button-group button:hover {
		background-color: #e0f0ff;
	}

	/* Specific styling for the settings button */
	.settings-button {
		background: none;
		background-color: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	/* Larger settings icon without any padding or white background */
	.settings-icon {
		width: 30px; /* Adjust size as needed */
		height: 30px;
	}
</style>
