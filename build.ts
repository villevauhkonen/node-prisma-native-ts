import { build } from "esbuild";
import { copy } from "esbuild-plugin-copy";
import { execSync } from "child_process";

async function generatePrismaClient() {
  console.log("Generating Prisma client...");
  execSync("npx prisma generate", { stdio: "inherit" });
  console.log("Prisma client generated.");
}

await generatePrismaClient();
console.log("Building...");
await build({
  entryPoints: ["src/index.ts"],
  format: "esm",
  platform: "node",
  bundle: true,
  treeShaking: true,
  packages: "bundle",
  external: ["./src/prisma/client/index.js"],
  outfile: "dist/index.js",
  plugins: [
    copy({
      resolveFrom: "cwd",
      assets: {
        from: ["./src/prisma/**/*"],
        to: ["./dist/prisma"],
      },
      watch: true,
    }),
  ],
});
console.log("Build completed.");
