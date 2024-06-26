<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let actionList: { title: string; targetId: string; url: string }[];
  
  const dispatch = createEventDispatcher();
  
  let editIndex: number | null = null;
  let editTitle = '';
  let editTargetId = '';
  let editUrl = '';
  
  function startEditing(index: number) {
    editIndex = index;
    editTitle = actionList[index].title;
    editTargetId = actionList[index].targetId;
    editUrl = actionList[index].url;
  }
  
  function cancelEditing() {
    editIndex = null;
    editTitle = '';
    editTargetId = '';
    editUrl = '';
  }
  
  function saveEditing() {
    if (editIndex !== null) {
      dispatch('update', { index: editIndex, title: editTitle, targetId: editTargetId, url: editUrl });
      const updatedAction = { title: editTitle, targetId: editTargetId, url: editUrl };
      actionList = actionList.map((action, i) => i === editIndex ? updatedAction : action);
      cancelEditing();
    }
  }
  
  function handleDelete(index: number) {
    dispatch('delete', { index });
    actionList = actionList.filter((_, i) => i !== index);
  }

  function handleOpen(bookmarklet) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: getTargetText,
        args: [bookmarklet.targetId]
      }, function(results) {
        if (results && results.length > 0 && results[0].result) {
          const targetText = results[0].result;
          const newUrl = bookmarklet.url.replace('{TARGET}', encodeURIComponent(targetText));
          chrome.tabs.create({ url: newUrl });
        } else {
          console.error('Failed to get the text from the page');
        }
      });
    });
  }

  function getTargetText(targetId) {
    const element = document.getElementById(targetId);
    return element ? element.textContent : null;
  }

</script>

<ul>
  {#each actionList as bookmarklet, index}
    <li>
      {#if editIndex === index}
        <div class="edit-form">
          <div class="form-group">
            <label for="edit-title">
              Title
              <span class="field-description">(このアクションの名前を入力してください)</span>
              <span class="tooltip">?
                <span class="tooltip-text">例: "Google 検索"</span>
              </span>
            </label>
            <input type="text" id="edit-title" bind:value={editTitle} required aria-required="true">
          </div>
          <div class="form-group">
            <label for="edit-target-id">
              Target ID
              <span class="field-description">(選択する要素のIDを入力してください)</span>
            </label>
            <input type="text" id="edit-target-id" bind:value={editTargetId} required aria-required="true">
          </div>
          <div class="form-group">
            <label for="edit-url">
              URL
              <span class="field-description">
                (検索URLのテンプレートを入力してください。&#123;TARGET&#125;は選択したテキストに置き換わります)
              </span>
            </label>
            <input type="text" id="edit-url" bind:value={editUrl} required aria-required="true">
          </div>
          <div class="button-group">
            <button on:click={saveEditing}>Save</button>
            <button on:click={cancelEditing}>Cancel</button>
          </div>
        </div>
      {:else}
        <div class="bookmarklet-header">
          <h2>{bookmarklet.title}</h2>
          <div class="button-group">
              <button on:click={() => handleOpen(bookmarklet)}>
                Open
              </button>
              <button on:click={() => startEditing(index)}>Edit</button>
              <button on:click={() => handleDelete(index)}>Delete</button>
          </div>
        </div>
      {/if}
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    background-color: #252526;
    margin-bottom: 20px;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .bookmarklet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #2d2d2d;
  }
  
  h2 {
    font-size: 1.1rem;
    margin: 0;
    color: #007acc;
  }
  
  pre {
    padding: 20px;
    margin: 0;
    font-size: 1rem;
    background-color: #1e1e1e;
    color: #e0e0e0;
    overflow-x: auto;
  }
  
  .edit-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
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
  
  .button-group {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  button {
    padding: 7px 10px;
    background-color: #007acc;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .button {
    padding: 7px 10px;
    background-color: #007acc;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;
    display: inline-block;
    text-align: center;
  }

  .button:hover {
    background-color: #005ea2;
  }
  
  .field-description {
    font-size: 0.8rem;
    color: #888;
    margin-left: 5px;
  }
  
  .tooltip {
    color: #007acc;
    margin-left: 5px;
    cursor: pointer;
  }
  
  .tooltip-text {
    visibility: hidden;
    width: 200px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    font-size: 0.8rem;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .tooltip:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
</style>