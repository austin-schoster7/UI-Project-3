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
      padding: 10px;
      background-color: #333;
      color: #fff;
      font-size: 1.2rem;
    }
  
    .header button {
      background: none;
      border: none;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      margin-left: 10px;
    }
  
    .header button:hover {
      text-decoration: underline;
    }
  </style>
  
  <div class="header">
    <span>Stringer Machine</span>
    <div>
      <button on:click={goHome}>Home</button>
      <button on:click={openSettings}>Settings</button>
    </div>
  </div>
  