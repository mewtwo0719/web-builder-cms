'use client'

import { ToolbarGroupItem } from '@payloadcms/richtext-lexical'
import {
  createClientFeature,
  toolbarAddDropdownGroupWithItems,
  toolbarFormatGroupWithItems,
} from '@payloadcms/richtext-lexical/client'

// Icons (replace with your own or SVGs)
const ColorIcon = () => <span style={{ color: 'red' }}>C</span>
const BackgroundIcon = () => <span style={{ backgroundColor: 'yellow', padding: '0 4px' }}>B</span>

// Define toolbar items for colors
const colorItems: ToolbarGroupItem[] = [
  {
    key: 'color-red',
    label: () => 'Red',
    ChildComponent: () => <span style={{ color: 'red' }}>A</span>,
    onSelect: ({ editor }) => {
      editor.dispatchCommand('TEXT_STATE_TOGGLE', { key: 'color', value: 'red' })
    },
    isActive: ({ editor }) => editor.queryCommandState('color') === 'red',
  },
  {
    key: 'color-blue',
    label: () => 'Blue',
    ChildComponent: () => <span style={{ color: 'blue' }}>B</span>,
    onSelect: ({ editor }) => {
      editor.dispatchCommand('TEXT_STATE_TOGGLE', { key: 'color', value: 'blue' })
    },
    isActive: ({ editor }) => editor.queryCommandState('color') === 'blue',
  },
]

// Define toolbar items for background colors
const backgroundItems: ToolbarGroupItem[] = [
  {
    key: 'bg-yellow',
    label: () => 'Yellow Background',
    ChildComponent: () => <span style={{ backgroundColor: 'yellow', padding: '0 4px' }}>Y</span>,
    onSelect: ({ editor }) => {
      editor.dispatchCommand('TEXT_STATE_TOGGLE', { key: 'background', value: 'yellow' })
    },
    isActive: ({ editor }) => editor.queryCommandState('background') === 'yellow',
  },
  {
    key: 'bg-green',
    label: () => 'Green Background',
    ChildComponent: () => <span style={{ backgroundColor: 'green', padding: '0 4px' }}>G</span>,
    onSelect: ({ editor }) => {
      editor.dispatchCommand('TEXT_STATE_TOGGLE', { key: 'background', value: 'green' })
    },
    isActive: ({ editor }) => editor.queryCommandState('background') === 'green',
  },
]

// Create toolbar groups
const colorToolbarGroup = toolbarAddDropdownGroupWithItems(colorItems)
const backgroundToolbarGroup = toolbarFormatGroupWithItems(backgroundItems)

// Create the client feature that adds the groups to the fixed toolbar
export const CustomColorFeature = createClientFeature({
  key: 'custom-color-feature', // <--- add this
  toolbarFixed: {
    groups: [colorToolbarGroup, backgroundToolbarGroup],
  },
  toolbarInline: {
    groups: [colorToolbarGroup, backgroundToolbarGroup],
  },
})
