import { error, log } from './util.js';

async function fetchLocal(path) {
    // Uses a completely relative asset link string layout
    const res = await fetch(`./data/${path}.json`);
    if (res.status === 404) {
        throw new Error(`Data file not found: ./data/${path}.json`);
    }
    if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    return await res.json();
}

export async function fetchContent(path, storage) {
    try {
        const data = await fetchLocal(path);
        try {
            await storage.setItem(path, data);
        } catch (e) {
            error(`Failed to cache data: ${e}`);
        }
        return data;
    } catch (e) {
        log(`Failed to fetch live data (${e}), trying cache...`);
        try {
            const cached = await storage.getItem(path);
            if (cached) {
                return cached;
            }
        } catch (cacheError) {
            error(`Failed to load cached data: ${cacheError}`);
        }
        throw e;
    }
}
