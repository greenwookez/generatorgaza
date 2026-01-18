import type { CollectionConfig, Option } from 'payload'

export const UserRoleDefault = 'default'
export const UserRoleAdmin = 'admin'

const Roles: Option[] = [
  { label: 'Менеджер', value: UserRoleDefault },
  { label: 'Администратор', value: UserRoleAdmin },
]

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      ru: 'Пользователь',
    },
    plural: {
      ru: 'Пользователи',
    },
  },
  admin: {
    useAsTitle: 'email',
    group: 'Система',
  },
  access: {
    admin: ({ req: { user } }) => {
      return user?.role === UserRoleAdmin
    },
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: UserRoleDefault,
      options: Roles,
      label: {
        ru: 'Права доступа',
      },
    },
  ],
}
