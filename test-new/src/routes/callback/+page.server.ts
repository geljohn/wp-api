import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  // These are the GET params sent by WordPress after approval
  const domain = url.searchParams.get('site_url');
  const username = url.searchParams.get('user_login');
  const app_password = url.searchParams.get('password');
  // You may want to pass app_name as a query param in your success_url
  const app_name = url.searchParams.get('app_name') ?? 'test';

  if (!domain || !username || !app_password) {
    return { error: 'Missing required parameters in callback URL.' };
  }

  // Save to Supabase
  const { error } = await supabase.from('wordpress_apps').insert([
    {
      app_name,
      app_password,
      domain,
      username
    }
  ]);

  if (error) {
    return { error: error.message };
  }

  return {
    saved: true,
    app_name,
    app_password,
    domain,
    username
  };
};
