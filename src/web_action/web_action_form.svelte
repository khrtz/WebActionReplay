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
    <label for="title">Title (この検索アクションの名前)</label>
    <input type="text" id="title" bind:value={title} placeholder="例: Google 検索" required aria-required="true">
    <p class="field-description">検索アクションの名前を入力します。例えば「YouTube検索」や「Yahoo検索」など</p>
  </div>

  <div class="form-group">
    <label for="target-id">Target ID (選択したテキストが含まれる要素のID)</label>
    <input type="text" id="target-id" bind:value={targetId} placeholder="例: search-input" required aria-required="true">
    <p class="field-description">Webページ上で選択したテキストが含まれる要素のIDを入力します。IDが分からない場合は、ウェブブラウザの開発者ツール(F12)で確認できます。</p>
  </div>

  <div class="form-group">
    <label for="url">URL (検索や操作を行うWebサイトのURL)</label>
    <input type="text" id="url" bind:value={url} placeholder="例: https://www.youtube.com/results?search_query=#123;TARGET&#125;" required aria-required="true">
    <p class="field-description">検索や操作を行うWebサイトのURLを入力します。&#123;TARGET&#125;はWebページから選択したテキストに置き換わります。例えば「https://www.google.com/search?q=&#123;TARGET&#125;」などです。</p>
  </div>

  <button type="submit">Add Search Action</button>
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