<script>
    import { goto } from '$app/navigation';
  
    function goHome() {
      goto('/');
    }
  
    function openSettings() {
      goto('/settings');
    }
  </script>
  
  <style>
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background-color: #4A90E2;
      color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .header-title {
      font-size: 1.5rem;
      font-weight: 500;
    }
  
    .button-group button {
      background-color: #fff;
      color: #4A90E2;
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
  
  <div class="header">
    <span class="header-title">Stringer Machine</span>
    <div class="button-group">
      <button on:click={goHome}>Home</button>
      <button on:click={openSettings}>Settings</button>
    </div>
  </div>
  