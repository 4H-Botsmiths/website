import * as dirTree from 'directory-tree';
import * as fs from 'fs';
import * as path from 'path';



//@ts-ignore
const tree = dirTree(path.join(__dirname, "../src/assets/images"), { exclude: /map.json|.DS_Store/ });
fs.writeFileSync(path.join(__dirname, "../src/assets/images/map.json"), JSON.stringify(tree, null, 2).split(path.join(__dirname, '../src').split('\\').join('\\\\')).join('').split('\\\\').join('/'));
