import { bindings, defineConfig, defineWorker } from 'cf/config'

export default defineConfig({
  worker: defineWorker({
    name: 'iwdd-net-nextjs',
    entrypoint: 'vinext/server/fetch-handler',
    compatibilityDate: '2026-03-17',
    compatibilityFlags: ['nodejs_compat'],
    observability: { enabled: true },
    domains: ['iwdd.net', 'www.iwdd.net'],
    assets: { notFoundHandling: 'none' },
    env: {
      ASSETS: bindings.assets(),
    },
  }),
})
