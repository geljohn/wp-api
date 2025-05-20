<script lang="ts">
  export let data: any;
</script>

<form method="POST">
  <label>
    WordPress Site URL:
    <input type="url" name="site_url" required />
  </label><br />

  <label>
    Username:
    <input type="text" name="username" required />
  </label><br />

  <label>
    App Password:
    <input type="password" name="password" required />
  </label><br />

  <button type="submit">Test API</button>
</form>

{#if data?.result}
  <h3>{data.result.site}</h3>
  {#if data.result.users?.length}
    <h4>Users:</h4>
    <ul>
      {#each data.result.users as user}
        <li>{user.id}: {user.slug} &lt;{user.email}&gt;</li>
      {/each}
    </ul>
  {:else}
    <p>No users found or unauthorized.</p>
  {/if}
{/if}

{#if data?.error}
  <p style="color: red;">Error: {data.error}</p>
{/if}

<!-- Add this line below your existing output for debugging -->
<pre>{JSON.stringify(data, null, 2)}</pre>