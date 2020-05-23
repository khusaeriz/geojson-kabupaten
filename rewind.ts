// rewind/mengatur arah koordinat koordinat agar sesuai spesifikasi GeoJSON

import {
  writeJson,
  walk,
  ensureDir,
  readJson,
} from 'https://deno.land/std/fs/mod.ts';
import { globToRegExp } from 'https://deno.land/std/path/glob.ts';
import { FeatureCollection } from 'https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/geojson/index.d.ts';
import rewind from './deps/rewind.js';

await ensureDir('rewinded');
for await (const file of walk('./data')) {

  if (file.path.match(globToRegExp('data/*.geojson'))) {
    const geojson = (await readJson(file.path)) as FeatureCollection;
    const rewinded = rewind(geojson);

    writeJson(`rewinded/${file.name}`, rewinded);
  }
}
