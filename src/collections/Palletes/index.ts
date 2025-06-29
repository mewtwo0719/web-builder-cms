import { CollectionConfig } from 'payload'

export const Palettes: CollectionConfig = {
  slug: 'palettes',
  labels: {
    singular: 'Palette',
    plural: 'Palettes',
  },
  access: {
    read: () => true, // adjust per your security needs
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'label',
      label: 'Palette Label',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name for the palette',
      },
    },
    {
      name: 'colors',
      label: 'Colors',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'id',
          label: 'Color ID',
          type: 'text',
          required: true,
          admin: {
            description: 'Unique key for this color inside the palette (e.g. "coral")',
          },
        },
        {
          name: 'label',
          label: 'Color Label',
          type: 'text',
          required: true,
        },
        {
          name: 'css',
          label: 'CSS Styles',
          type: 'group',
          fields: [
            {
              name: 'color',
              label: 'Text Color',
              type: 'text',
              required: false,
              admin: {
                description: 'CSS color value like "#FF6F61" or "red"',
              },
            },
            {
              name: 'background',
              label: 'Background',
              type: 'text',
              required: false,
              admin: {
                description: 'CSS background value like "linear-gradient(...)" or "yellow"',
              },
            },
          ],
        },
      ],
    },
  ],
}
