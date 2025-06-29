import { PropsWithChildren } from 'react'

import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { cache } from 'react'

import { RenderHeader } from '@/components/Header/RenderHeader'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function RootLayout({
  children,
  params: paramsPromise,
}: PropsWithChildren<Args>) {
  console.log('paramsPromise', await paramsPromise)

  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: RequiredDataFromCollectionSlug<'websites'> | null

  page = await queryPageBySlug({
    slug,
  })

  const { hero, layout, header } = page

  return (
    <>
      <RenderHeader {...header} />
      {children}
    </>
  )
}
const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'websites',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
