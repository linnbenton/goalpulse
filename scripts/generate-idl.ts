import idl from "../idl/txoracle.json";

const txIdl = idl as any;

console.log("========== TYPES ==========\n");

for (const t of txIdl.types ?? []) {
  console.log("TYPE:", t.name);
  console.log(JSON.stringify(t, null, 2));
  console.log("");
}
