import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { ru } from '@payloadcms/translations/languages/ru'
import { s3Storage } from '@payloadcms/storage-s3'
import { EXPERIMENTAL_TableFeature, LinkFeature } from '@payloadcms/richtext-lexical'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { CatalogCategories } from './collections/CatalogCategories'
import { CatalogItems } from './collections/CatalogItem'
import { Feedback } from './collections/Feedback'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, CatalogCategories, CatalogItems, Feedback],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures.filter((f) => f.key !== 'link'),
      LinkFeature({
        enabledCollections: [],
      }),
      EXPERIMENTAL_TableFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: process.env.S3_PREFIX || 'generatorgaza',
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        endpoint: process.env.S3_ENDPOINT!,
        region: process.env.S3_REGION!,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY!,
          secretAccessKey: process.env.S3_SECRET_KEY!,
        },
      },
    }),
  ],
  i18n: {
    supportedLanguages: { ru },
  },
})
