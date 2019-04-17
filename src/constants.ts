import { checkEnv } from '@pardjs/common';

// checkEnv('PORT');

export const PORT = parseInt(process.env.PORT, 10) || 3000;
export const SERVICE_NAME = 'CMS_SERVICE';
