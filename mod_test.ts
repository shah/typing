import {
  assertEquals,
  assert,
} from "https://deno.land/std@v0.62.0/testing/asserts.ts";
import * as safe from "./mod.ts";

Deno.test("camelCaseToSnakeCasePropNames", () => {
  const changed = safe.camelCaseToSnakeCasePropNames(
    { party: "SYSTEM", partyType: 5, partyIdentifier: 4 },
  );

  // the above will change each property name to snake case equivalent so it's possbile
  // that the IDE will complain about types not existing but the test should pass
  assertEquals("SYSTEM", changed.party);
  //@ts-ignore
  assertEquals(5, changed.party_type);
  //@ts-ignore
  assertEquals(4, changed.party_identifier);
});

Deno.test("camelCaseToSnakeCasePropNamesMap", () => {
  const changed = safe.camelCaseToSnakeCasePropNamesMap(
    { party: "SYSTEM", partyType: 5, partyIdentifier: 4 },
  );

  assertEquals("party", changed.party);
  assertEquals("party_type", changed.partyType);
  assertEquals("party_identifier", changed.partyIdentifier);
});
