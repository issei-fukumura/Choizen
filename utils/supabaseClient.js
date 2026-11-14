const { createServerClient } = require('@supabase/ssr');

module.exports = (req, res) => {
    return createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll: () =>
        Object.entries(req.cookies).map(([name, value]) => ({ name, value })),
      setAll: (list) =>
        list.forEach(({ name, value, options }) => res.cookie(name, value, options)),
    },
  })
}
