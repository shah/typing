import * as inflect from "https://denopkg.com/shah/text-inflect@v1.0.4/mod.ts";

// from [this discussion](https://stackoverflow.com/questions/44323441/changing-property-name-in-typescript-mapped-type)

type ValueOf<T> = T[keyof T];
type KeyValueTupleToObject<T extends [keyof any, any]> = {
  [K in T[0]]: Extract<T, [K, any]>[1];
};
type MapKeys<T, M extends Record<string, string>> =
  & KeyValueTupleToObject<
    ValueOf<
      {
        [K in RequiredKeys<T>]-?: [K extends keyof M ? M[K] : K, T[K]];
      }
    >
  >
  & Partial<
    KeyValueTupleToObject<
      ValueOf<
        {
          [K in OptionalKeys<T>]-?: [K extends keyof M ? M[K] : K, T[K]];
        }
      >
    >
  > extends infer O ? { [K in keyof O]: O[K] } : never;

type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T];
type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T];

type TransientPropertyMap = {};

export function camelCaseToSnakeCasePropNames<T>(
  source: T,
): MapKeys<T, TransientPropertyMap> {
  const result = {} as MapKeys<T, TransientPropertyMap>;
  for (var k in source) {
    // lots of any needed here; hard to convince the type system you're doing the right thing
    var nk: keyof typeof result = <any> inflect.camelToSnakeLowerCase(k);
    result[nk] = <any> source[k];
  }
  return result;
}

export function camelCaseToSnakeCasePropNamesMap<T>(
  source: T,
): Record<string, string> {
  var result = {} as Record<string, string>;
  for (var k in source) {
    result[k] = <any> inflect.camelToSnakeLowerCase(k);
  }
  return result;
}
