import type { Field } from 'payload'

import {
  defaultColors,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  TextStateFeature,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            // CustomColorFeature,
            TextStateFeature({
              state: {
                color: {
                  ...defaultColors.background,
                  ...defaultColors.text,
                  // fancy gradients!
                  galaxy: {
                    label: 'Galaxy',
                    css: {
                      background: 'linear-gradient(to right, #0000ff, #ff0000)',
                      color: 'white',
                    },
                  },
                  sunset: {
                    label: 'Sunset',
                    css: { background: 'linear-gradient(to top, #ff5f6d, #6a3093)' },
                  },
                  sunset2: {
                    label: 'Sunset',
                    css: { background: 'linear-gradient(to top, #ff5f6d, #6a3093)' },
                  },
                },
                background: {
                  sunrise: {
                    label: 'Sunrise',
                    css: { background: 'linear-gradient(to top, #ff5f6d, #6a3093)' },
                  },
                },
                test: {
                  damn: {
                    label: 'Damn',
                    css: {
                      border: '1px solid red',
                    },
                  },
                },

                // You can have both colored and underlined text at the same time.
                // If you don't want that, you should group them within the same key.
                // (just like I did with defaultColors and my fancy gradients)
                underline: {
                  solid: {
                    label: 'Solid',
                    css: { 'text-decoration': 'underline', 'text-underline-offset': '4px' },
                  },
                  // You'll probably want to use the CSS light-dark() utility.
                  'yellow-dashed': {
                    label: 'Yellow Dashed',
                    css: {
                      'text-decoration': 'underline dashed',
                      'text-decoration-color': 'light-dark(#EAB308,yellow)',
                      'text-underline-offset': '4px',
                    },
                  },
                },
              },
            }),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
