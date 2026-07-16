import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 引数パース
const args = new Set(process.argv.slice(2));

// ヘルプ表示
if (args.has("--help") || args.has("-h")) {
  console.log(`
📋 ENV Setup - Copy .env.example files to .env files

Usage:
  node scripts/setup-env.mjs [options]

Options:
  -h, --help      Show this help message
  -f, --force     Overwrite existing files
  --dry-run       Show what would be created without actually creating
  -v, --verbose   Show detailed output

Examples:
  node scripts/setup-env.mjs              # Create missing .env files
  node scripts/setup-env.mjs --force      # Overwrite all .env files
  node scripts/setup-env.mjs --dry-run    # Preview changes
  `);
  process.exit(0);
}

const force = args.has("--force") || args.has("-f");
const dryRun = args.has("--dry-run");
const verbose = args.has("--verbose") || args.has("-v");

/**
 * プロジェクトルートを探す
 * @returns プロジェクトルート
 */
const findRoot = () => {
  // 環境変数で明示的に指定可能
  if (process.env.PROJECT_ROOT) {
    return path.resolve(process.env.PROJECT_ROOT);
  }

  // スクリプトのディレクトリから上に遡る
  let current = __dirname;
  const fsRoot = path.parse(current).root;
  let lastPackageJsonDir = null;

  while (current !== fsRoot) {
    const pkgPath = path.join(current, "package.json");

    if (fs.existsSync(pkgPath)) {
      lastPackageJsonDir = current; // 最後に見つかった package.json の位置を記録

      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
        // workspaces があればルート（モノレポの標準判定）
        if (pkg.workspaces) return current;
      } catch {}
    }

    current = path.dirname(current);
  }

  // workspaces が見つからなかった場合（単一プロジェクトの場合）、最後に見つかった package.json の位置を返す
  return lastPackageJsonDir || __dirname;
};

const tasks = [
  { dir: ".", dests: [".env"] },
  { dir: "apps/server", dests: [".env"] },
  { dir: "apps/admin", dests: [".env.local", ".env.development"] },
  { dir: "apps/student", dests: [".env.local", ".env.development"] },
  { dir: "apps/elearning", dests: [".env.local", ".env.development"] },
];

const cwd = findRoot();
const exampleName = ".env.example";
const result = { created: [], skipped: [], missingExample: [], errors: [] };

if (verbose) {
  console.log(`🔍 Working directory: ${cwd}`);
  console.log(`🔧 Options: force=${force}, dryRun=${dryRun}\n`);
}

const copyIfNeeded = (src, dest) => {
  const rel = path.relative(cwd, dest);

  try {
    // 既存ファイルはスキップ（--force で上書き）
    if (fs.existsSync(dest) && !force) {
      result.skipped.push(rel);
      if (verbose) console.log(`⊘ Skipped: ${rel}`);
      return;
    }

    if (dryRun) {
      result.created.push(`${rel} (dry-run)`);
      if (verbose) console.log(`⊙ Would create: ${rel}`);
      return;
    }

    fs.copyFileSync(src, dest);
    result.created.push(rel);
    if (verbose) console.log(`✓ Created: ${rel}`);
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    result.errors.push({ dest: rel, error: errMsg });
    if (verbose) console.error(`✗ Error: ${rel} - ${errMsg}`);
  }
};

// メイン処理
for (const t of tasks) {
  const base = path.resolve(cwd, t.dir);
  const src = path.join(base, exampleName);

  if (!fs.existsSync(src)) {
    const rel = path.relative(cwd, src);
    result.missingExample.push(rel);
    if (verbose) console.log(`⚠ Missing: ${rel}`);
    continue;
  }

  for (const destName of t.dests) {
    copyIfNeeded(src, path.join(base, destName));
  }
}

// 結果の表示 (verbose でない場合のみサマリー)
if (!verbose) {
  console.log("\n" + "=".repeat(50));
  console.log("📋 ENV Setup Summary");
  console.log("=".repeat(50));

  if (result.created.length > 0) {
    console.log("\n✅ Created:");
    result.created.forEach((f) => console.log(`   ${f}`));
  }

  if (result.skipped.length > 0) {
    console.log("\n⏭️  Skipped (use --force to overwrite):");
    result.skipped.forEach((f) => console.log(`   ${f}`));
  }

  if (result.missingExample.length > 0) {
    console.log("\n⚠️  Missing .env.example:");
    result.missingExample.forEach((f) => console.log(`   ${f}`));
  }

  if (result.errors.length > 0) {
    console.log("\n❌ Errors:");
    result.errors.forEach((e) => console.log(`   ${e.dest}: ${e.error}`));
  }

  console.log("\n" + "=".repeat(50));
} else {
  console.log("\n" + "=".repeat(50));
  console.log(`✅ ${result.created.length} created, ⏭️ ${result.skipped.length} skipped, ⚠️ ${result.missingExample.length} missing, ❌ ${result.errors.length} errors`);
  console.log("=".repeat(50));
}

process.exit(result.errors.length > 0 ? 1 : 0);
