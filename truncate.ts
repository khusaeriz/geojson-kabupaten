// mengatur presisi koordinat 
// usage: deno --allow-read --allow-write truncate.ts -p {ukuran_presisi}

import {
  writeJson,
  walk,
  ensureDir,
  readJson,
} from 'https://deno.land/std/fs/mod.ts';
import { parse } from 'https://deno.land/std/flags/mod.ts';
import { globToRegExp } from 'https://deno.land/std/path/glob.ts';
import truncate from 'https://cdn.pika.dev/@spatial/truncate@^1.0.5';

const { args } = Deno;
const { p } = parse(args);

if (isNaN(parseInt(p, 10))) {
  console.error('Invalid argument');
  console.log('example: deno --allow-read --allow-write truncate.ts -p 6');

  Deno.exit(1);
}

await ensureDir('truncated');
for await (const file of walk('./data')) {
  if (file.path.match(globToRegExp('data/*.geojson'))) {
    const geojson = await readJson(file.path);

    const truncated = truncate(geojson, { precision: p });
    writeJson(`truncated/${file.name}`, truncated);
  }
}
