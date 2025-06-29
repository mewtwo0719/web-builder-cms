import type { Field } from 'payload'

export const navItem: Field = {
  name: 'navItems',
  type: 'array',
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'radio',
      options: [
        { label: 'Internal link', value: 'reference' },
        { label: 'Custom URL', value: 'custom' },
      ],
      defaultValue: 'reference',
      required: true,
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'reference',
      type: 'relationship',
      relationTo: ['pages', 'posts'],
      required: false,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: false,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'Open in new tab',
    },
    {
      name: 'subItems',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'radio',
          options: [
            { label: 'Internal link', value: 'reference' },
            { label: 'Custom URL', value: 'custom' },
          ],
          defaultValue: 'reference',
          required: true,
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'reference',
          type: 'relationship',
          relationTo: ['pages', 'posts'],
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'reference',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
        },
      ],
    },
  ],
}
