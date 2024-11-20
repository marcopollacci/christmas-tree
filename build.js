import {
  readdirSync,
  statSync,
  readFileSync,
  existsSync,
  mkdirSync,
  writeFileSync,
} from "fs";
import { emptyDir } from "fs-extra";
import { join, dirname } from "path";
import { minify } from "minify";
import { rmdir } from "fs/promises";

const siteFolder = "site";
const distFolder = "dist";

async function minifyFiles(folder) {
  await emptyDir(distFolder);

  readdirSync(folder).forEach(async (file) => {
    const filePath = join(folder, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      minifyFiles(filePath);
    } else {
      const distPath = filePath.replace(siteFolder, distFolder);
      const distDir = dirname(distPath);
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true });
      }

      try {
        const minifiedContent = await minify(filePath);
        writeFileSync(distPath, minifiedContent);
      } catch (error) {
        //write file as is
        writeFileSync(distPath, readFileSync(filePath));
      }
    }
  });
}

minifyFiles(siteFolder);
