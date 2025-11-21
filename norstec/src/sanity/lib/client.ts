import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
    apiVersion: '2023-01-01',
    useCdn: true,
})
