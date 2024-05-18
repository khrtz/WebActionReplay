<script lang="ts">
    import { onMount } from 'svelte';
    import BookmarkletForm from '../web_action/web_action_form.svelte';
    import BookmarkletList from '..//web_action/web_action_list.svelte';

    let actionList: { title: string; targetId: string; url: string }[] = [];
    let isFormVisible = false;

    onMount(() => {
        chrome.storage.sync.get('actionList', (data) => {
        if (data.actionList && data.actionList.length > 0) {
            actionList = data.actionList;
            isFormVisible = false;
        } else {
            isFormVisible = true;
        }
        });
    });

    function addBookmarklet(event: CustomEvent<{ title: string; targetId: string; url: string }>) {
        actionList = [...actionList, event.detail];
        saveBookmarklets();
    }

    function updateBookmarklet(event: CustomEvent<{ index: number; title: string; targetId: string; url: string }>) {
        actionList[event.detail.index] = { title: event.detail.title, targetId: event.detail.targetId, url: event.detail.url };
        actionList = actionList;
        saveBookmarklets();
    }

    function deleteBookmarklet(event: CustomEvent<{ index: number }>) {
        actionList.splice(event.detail.index, 1);
        actionList = actionList;
        saveBookmarklets();
    }

    function toggleForm() {
        isFormVisible = !isFormVisible;
    }

    function saveBookmarklets() {
        chrome.storage.sync.set({ actionList });
    }
</script>
  
<main>
    <div class="container">
        {#if actionList.length > 0}
        <button on:click={toggleForm}>{isFormVisible ? 'Close' : 'Add Search Action'}</button>
        {/if}
        {#if isFormVisible}
        <BookmarkletForm on:add={addBookmarklet} />
        {/if}
        <BookmarkletList {actionList} on:update={updateBookmarklet} on:delete={deleteBookmarklet} />
    </div>
</main>

<style>
    main {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #e0e0e0;
        background-color: #1e1e1e;
        padding: 20px;
        width: 400px;
        height: 500px;
        overflow-y: auto;
    }

    h1 {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 20px;
        color: #007acc;
    }

    .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style>