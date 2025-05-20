import type { Actions } from './auth/$types';


export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const site_url = form.get('site_url')?.toString() ?? '';
    const username = form.get('username')?.toString() ?? '';
    const password = form.get('password')?.toString() ?? '';

    console.log('Form Submission Received:');
    console.log('Site URL:', site_url);
    console.log('Username:', username);
    // ⚠️ Don't log passwords in production — only for dev/testing
    console.log('Password:', password);

    if (!site_url || !username || !password) {
      return { error: 'Missing form data.' };
    }

    try {
      const api_root = `${site_url.replace(/\/+$/, '')}/wp-json`;
      console.log('API Root:', api_root);
      const siteRes = await fetch(api_root);
      console.log('Fetching site data from:', siteRes);
      if (!siteRes.ok) throw new Error('Invalid WP site or API unavailable.');
      const siteData = await siteRes.json();
    console.log('Fetching users from:', `${api_root}/wp/v2/users?context=view`)
      const usersRes = await fetch(`${api_root}/wp/v2/users?context=view`, {
        
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
        }
      });
      console.log("it made it here")

      if (!usersRes.ok) {
        return {
          result: {
            site: siteData.name,
            users: []
          }
        };
      }

      const users = await usersRes.json();

      return {
        result: {
          site: siteData.name,
          users
        }
      };
    } catch (err: any) {
      return { error: err.message };
    }
  }
};
