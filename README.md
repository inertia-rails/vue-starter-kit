# Inertia Rails Vue Starter Kit

A modern full-stack starter application with Rails backend and Vue.js frontend using Inertia.js based on the [Laravel Starter Kit](https://github.com/laravel/vue-starter-kit).

## About this repo

This starter kit is generated output of [inertia-rails/generator](https://github.com/inertia-rails/generator):
each generator release regenerates the app and opens an automated sync PR here, so most files in this repo
are overwritten on every sync. **To contribute changes to the app itself, open a PR against the generator** —
only this README and the deploy workflow are kit-owned.

Prefer different options (framework, JavaScript instead of TypeScript, feature set)? Generate your own app:

```sh
rails new myapp -m https://raw.githubusercontent.com/inertia-rails/generator/dist/template.rb
```

## Features

- [Inertia Rails](https://inertia-rails.dev) & [Vite Rails](https://vite-ruby.netlify.app) setup
- [Vue.js](https://vuejs.org) frontend with TypeScript & [shadcn/vue](https://shadcn-vue.com) component library
- User authentication system (based on [Authentication Zero](https://github.com/lazaronixon/authentication-zero))
- [Kamal](https://kamal-deploy.org/) for deployment
- Optional SSR support

See also:
- [React Starter Kit](https://github.com/inertia-rails/react-starter-kit) for Inertia Rails with React
- [Svelte Starter Kit](https://github.com/inertia-rails/svelte-starter-kit) for Inertia Rails with Svelte

<a href="https://evilmartians.com/?utm_source=inertia-rails-vue-starter-kit&utm_campaign=project_page">
<img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg" alt="Built by Evil Martians" width="236" height="54">
</a>

## Setup

1. Clone this repository
2. Setup dependencies & run the server:
   ```bash
   bin/setup
   ```
3. Open http://localhost:3000

## Enabling SSR

This starter kit comes with optional SSR support. To enable it, follow these steps:

1. Open `app/frontend/entrypoints/inertia.ts` and uncomment part of the `setup` function:
   ```ts
    // Uncomment the following to enable SSR hydration:
    // if (el.hasChildNodes()) {
    //   createSSRApp({ render: () => h(App, props) })
    //     .use(plugin)
    //     .mount(el)
    //   return
    // }
   ```
2. Open `config/deploy.yml` and uncomment several lines:
   ```yml
   servers:
     # Uncomment to enable SSR:
     # vite_ssr:
     #   hosts:
     #     - 192.168.0.1
     #   cmd: bundle exec vite ssr
     #   options:
     #     network-alias: vite_ssr
      
   # ...
      
   env:
     clear:
       # Uncomment to enable SSR:
       # INERTIA_SSR_ENABLED: true
       # INERTIA_SSR_URL: "http://vite_ssr:13714"
      
   # ...
      
   builder:
     # Uncomment to enable SSR:
     # dockerfile: Dockerfile-ssr
   ```

That's it! Now you can deploy your app with SSR support.

## License

The project is available as open source under the terms of the [MIT License](LICENSE).
