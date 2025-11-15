import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {colorInput} from "@sanity/color-input";
import {structure, singletonTypes} from './structure'
import './styles.css'

export default defineConfig({
  name: 'default',
  title: 'new-norstec-website',

  // projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  // dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  projectId: "z54h7oke",
  dataset: "production",
  plugins: [structureTool({structure}), visionTool(), colorInput(),],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Hindrer delete/duplicate på singletons
    actions: (prev, {schemaType}) =>
        singletonTypes.includes(schemaType)
            ? prev.filter(
                ({action}) => action !== 'delete' && action !== 'duplicate',
            )
            : prev,

    // Hindrer å opprette nye dokumenter av singleton-typer
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type !== 'global') {
        return prev
      }

      return prev.filter(
          (templateItem) => !singletonTypes.includes(templateItem.templateId),
      )
    },
  },
})
