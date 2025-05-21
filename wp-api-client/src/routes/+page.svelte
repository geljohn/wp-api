<script>
  import { v4 as uuidv4 } from 'uuid';
  import { page } from '$app/stores';

  let domain = $state("");
  let authLink = $state("");
  let app_id = $state("");
  let message = $state("");
  let success_url = $state("");

  // Hardcoded app name
  const app_name = 'test';

  // This is your SvelteKit page's URL (success_url)
  success_url = 'https://' + $page.url.host + $page.url.pathname;

  function generateAuthLink() {
    if (!domain) {
      message = 'Please enter the WordPress Domain.';
      return;
    }
    // Remove trailing slashes from domain
    const cleanDomain = domain.replace(/\/+$/, '');
    app_id = uuidv4();

const params = new URLSearchParams({
  app_name,
  app_id,
  success_url: `https://localhost:5173/callback?app_name=${encodeURIComponent(app_name)}&site_url=${encodeURIComponent(cleanDomain)}`
});


    authLink = `${cleanDomain}/wp-admin/authorize-application.php?${params.toString()}`;
    message = '';
  }
</script>

<form on:submit|preventDefault={generateAuthLink}>
  <label>
    WordPress Domain:
    <input type="url" bind:value={domain} required placeholder="https://example.com" />
  </label>
  <button type="submit">Generate Authorization Link</button>
</form>

{#if authLink}
  <p>
    <a href={authLink} target="_blank" rel="noopener">
      Click here to authorize <strong>{app_name}</strong> on {domain}
    </a>
  </p>
  <p>
    <small>URL: <code>{authLink}</code></small>
  </p>
{/if}

{#if message}
  <p style="color: red;">{message}</p>
{/if}
