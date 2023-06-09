import { stripHtml } from 'string-strip-html';

export const sanitizeObject = (object) => {
  for (const key of Object.keys(object)) {
    object[key] = typeof object[key] === 'string' ? stripHtml(object[key]).result.trim() : sanitizeObject(object[key]);
  }

  return object;
};