import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {colorInput} from "@sanity/color-input";

export default defineConfig({
  name: 'default',
  title: 'new-norstec-website',

  //projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  // dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  projectId: "z54h7oke",
  dataset: "production",
  plugins: [structureTool(), visionTool(), colorInput()],

  schema: {
    types: schemaTypes,
  },
})
