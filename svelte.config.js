import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [vitePreprocess({})],

    onwarn: (warning, handler) => {
        if (warning.code === 'state_referenced_locally') return;
        handler(warning);
    },

    kit: {
        // This is now properly using the Cloudflare adapter you imported
        adapter: adapter(),
        serviceWorker: { register: false },
        files: { serviceWorker: 'src/service-worker.ts' },
        alias: { '.prisma/client/index-browser': require.resolve('@prisma/client/index-browser') }
    }
};

// Export the full config object that contains all the project settings
export default config;