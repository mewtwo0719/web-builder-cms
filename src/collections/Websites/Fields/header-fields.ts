import { navItem } from '@/blocks/NavItems/nav-items.block'
import type { Field } from 'payload'

export const header: Field = {
  name: 'header',
  type: 'group',
  label: 'Header Settings',
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Header Type',
      defaultValue: 'defaultHeader',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Default Header', value: 'defaultHeader' },
      ],
      required: true,
    },
    navItem,
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'defaultHeader',
      },
      validate: (val, { siblingData }) => {
        if (siblingData.type === 'defaultHeader' && !val) {
          return 'Logo is required for Default Header'
        }
        return true
      },
    },
  ],
}
