import { validateBody } from 'decorators';
import {
  editInfoSchema,
  emailSchema,
  loginSchema,
  passwordSchema,
  signupSchema,
} from 'drizzle/schema';

export const signupValidation = validateBody(signupSchema);
export const loginValidation = validateBody(loginSchema);
export const editInfoVaidation = validateBody(editInfoSchema);
export const emailValidation = validateBody(emailSchema);
export const passwordValidation = validateBody(passwordSchema);
