import { validateBody } from 'decorators';
import {
  calculateMacrosSchema,
  editInfoSchema,
  emailSchema,
  loginSchema,
  passwordSchema,
  signupSchema,
} from 'drizzle/schema';

// Authentication comtroller validations
export const signupValidation = validateBody(signupSchema);
export const loginValidation = validateBody(loginSchema);
export const editInfoVaidation = validateBody(editInfoSchema);
export const emailValidation = validateBody(emailSchema);
export const passwordValidation = validateBody(passwordSchema);

// Diet controller validations
export const calculateMacrosValidation = validateBody(calculateMacrosSchema);
