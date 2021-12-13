#!/usr/bin/env node
import yargs from "yargs/yargs";
import fs from "fs";
import path from "path";
import openapiTS from "openapi-typescript";

const parser = yargs(process.argv.slice(2))
  .usage("usage: $0 <command>")
  // help text
  .alias("h", "help")
  .alias("v", "version")
  .help("help")
  .showHelpOnFail(false, "Specify --help for available options")
  .group(["a", "u"], "Environment Variables:")
  .env("STADTPULS")
  .epilogue(
    `All values in group "Environment Variables" can be overwritten with environment variables prefixed by STADTPULS_e.g. STADTPULS_PGPORT\n\n`
  )
  .options({
    a: {
      alias: "anonkey",
      default:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYyNzIwODU0MCwiZXhwIjoxOTc0MzYzNzQwLCJhdWQiOiIiLCJzdWIiOiIiLCJyb2xlIjoiYW5vbiJ9.sUHErUOiKZ3nHQIxy-7jND6B80Uzf9G4NtMLmL6HXPQ",
    },
    u: { alias: "supabaseurl", default: "http://localhost:8000" },
  })
  .command(
    "create",
    "creates fresh type definitions from supabase-url",
    async function (yargs) {
      const args = await yargs.argv;

      const anonKey = args["anonkey"];
      const supabaseUrl = args["supabaseurl"];
      const url = new URL(`${supabaseUrl}/rest/v1/?apikey=${anonKey}`);
      const output = await openapiTS(url.toString());
      fs.writeFile(
        path.resolve(process.cwd(), "./generated.d.ts"),
        output,
        "utf8",
        (err) => {
          if (err) throw err;
        }
      );
    }
  );

async function main() {
  await parser.argv;

  // const output = await openapiTS(url.toString());
  // fs.writeFile(
  //   path.resolve(process.cwd(), "./supabase.ts"),
  //   output,
  //   "utf8",
  //   (err) => {
  //     if (err) throw err;
  //   }
  // );
}

main().catch(console.error);
