<script>
  export let data;
</script>

{#if data?.error}
  <h2 style="color: red;">{data.error}</h2>
{:else if data?.saved}
  <h2>Application Password Generated!</h2>
  <p><strong>App Name:</strong> {data.app_name}</p>
  <p><strong>Domain:</strong> {data.domain}</p>
  <p><strong>Username:</strong> {data.username}</p>
  <p style="color: green;">Saved to Supabase!</p>
{:else}
  <h2>Waiting for callback...</h2>
{/if}