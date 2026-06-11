import { readFileSync, writeFileSync } from 'fs';

const filePath = './prisma/schema/generated/zod/index.ts';
const content = readFileSync(filePath, 'utf-8');
const fixed = content.replaceAll('z.cuid()', 'z.string().cuid()');
writeFileSync(filePath, fixed);
console.log('Fixed z.cuid() → z.string().cuid() in generated zod schema');
