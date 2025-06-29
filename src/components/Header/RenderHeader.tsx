import React from 'react'

import type { Page } from '@/payload-types'

import { DefaultHeader } from './Default/DefaultHeader'

const headers = {
  defaultHeader: DefaultHeader,
}

export const RenderHeader: React.FC<Page['header']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeaderToRender = headers[type]

  if (!HeaderToRender) return null

  return <HeaderToRender {...props} />
}
