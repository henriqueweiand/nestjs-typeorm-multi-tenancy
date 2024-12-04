import * as usersSchema from '../users/users.entity';

export type Schema = typeof usersSchema;

export const schema = {
  ...usersSchema,
};
