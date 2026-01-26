import type { Access, CollectionConfig, Option } from 'payload'

export const UserRoleDefault = 'default'
export const UserRoleAdmin = 'admin'

const Roles: Option[] = [
  { label: 'Менеджер', value: UserRoleDefault },
  { label: 'Администратор', value: UserRoleAdmin },
]

export const isAdmin: Access = ({ req }) => {
  const user = req.user
  return user?.role === UserRoleAdmin
}

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
    create: isAdmin,
    delete: isAdmin,
    update: isAdmin,
  },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 30,
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      required: true,
      label: {
        ru: 'Имя',
      },
    },
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
