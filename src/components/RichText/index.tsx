import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  RichText as ConvertRichText,
  JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,

  ...LinkJSXConverter({ internalDocToHref }),

  paragraph: ({ node }) => {
    return (
      <p>
        {node.children.map((child, i) => {
          if (child.type === 'text') {
            const text = child.text
            const stateAttrs = (child as any)['$'] || {}
            const style: React.CSSProperties = {}

            // Custom color styles
            switch (stateAttrs.color) {
              case 'galaxy':
                style.background = 'linear-gradient(to right, #0000ff, #ff0000)'
                style.color = 'white'
                break
              case 'sunset':
                style.background = 'linear-gradient(to top, #ff5f6d, #6a3093)'
                style.color = 'white'
                break
              case 'text-pink':
                style.color = 'pink'
                break
              case 'bg-red':
                style.background = 'red'
                style.color = 'white'
                break
            }

            // Underline styles
            switch (stateAttrs.underline) {
              case 'solid':
                style.textDecoration = 'underline'
                style.textUnderlineOffset = '4px'
                break
              case 'yellow-dashed':
                style.textDecoration = 'underline dashed'
                style.textDecorationColor = 'yellow'
                style.textUnderlineOffset = '4px'
                break
            }

            return (
              <span key={i} style={style}>
                {text}
              </span>
            )
          } else {
            // Not a text node: fallback to default rendering (you can expand this as needed)
            return null
          }
        })}
      </p>
    )
  },

  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
