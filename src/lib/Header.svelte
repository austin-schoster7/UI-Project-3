<script>
	import { goto } from '$app/navigation';
  import { profiles } from '../lib/stores'

	function goHome() {
		goto('/');
	}

	function openSettings() {
		goto('/settings');
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
		<button on:click={goHome}>Home</button>
		<button on:click={openSettings}>Settings</button>
    <input type="file" bind:this={imageUploadButton} on:change={handleFileChange} accept=".csv*" id = "profileInputValue" style="display: none;"/>
		<button on:click={triggerFileInput} id = "profileButton">Upload Profiles</button>
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

	.button-group button {
		background-color: #fff;
		color: #4a90e2;
		border: none;
		border-radius: 5px;
		padding: 8px 16px;
		margin-left: 10px;
		cursor: pointer;
		font-size: 1rem;
		transition: background-color 0.3s ease;
	}

	.button-group button:hover {
		background-color: #e0f0ff;
	}
</style>
