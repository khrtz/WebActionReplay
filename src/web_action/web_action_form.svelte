<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    let title = '';
    let targetId = '';
    let url = '';
    
    const dispatch = createEventDispatcher();
    
    function handleSubmit() {
      dispatch('add', { title, targetId, url });
      title = '';
      targetId = '';
      url = '';
    }
   </script>
   
   <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" id="title" bind:value={title} required aria-required="true">
    </div>
    <div class="form-group">
      <label for="target-id">Target ID</label>
      <input type="text" id="target-id" bind:value={targetId} required aria-required="true">
    </div>
    <div class="form-group">
      <label for="url">URL</label>
      <input type="text" id="url" bind:value={url} required aria-required="true">
    </div>
    <button type="submit">Add SearchAction</button>
   </form>
   
   <style>
    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      background-color: #252526;
      padding: 20px;
      border-radius: 4px;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    
    label {
      font-size: 1rem;
      font-weight: bold;
      color: #007acc;
    }
    
    input {
      padding: 10px;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      background-color: #3c3c3c;
      color: #e0e0e0;
    }
    
    button {
      padding: 10px 20px;
      background-color: #007acc;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      align-self: flex-end;
    }
   </style>