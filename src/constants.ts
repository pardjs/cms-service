import { checkEnv } from '@pardjs/common';

// checkEnv('PORT');

export const PORT = parseInt(process.env.PORT, 10) || 3000;
