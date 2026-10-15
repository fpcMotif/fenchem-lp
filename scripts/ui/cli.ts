export {};

try {
  const { main } = await import("./main");
  process.exitCode = await main(process.argv.slice(2));
} catch (error) {
  console.error(`cannot measure: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 2;
}
