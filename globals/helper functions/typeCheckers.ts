import { DraftifyBlock } from "draftify";

export function isObjectOrDraftifyArr(
  val: unknown,
): val is string | DraftifyBlock[] {
  if (typeof val === "string") return true;

  if (Array.isArray(val)) {
    return (
      val.length > 0 &&
      val.every(
        (item) =>
          typeof item === "object" && item !== null && !Array.isArray(item),
      )
    );
  }

  return false;
}

export function isStringArray(val: unknown): val is string[] {
  return Array.isArray(val) && val.every((item) => typeof item === "string");
}

export function isStringMatrix(val: unknown): val is string[][] {
  return (
    Array.isArray(val) &&
    val.every(
      (item) =>
        Array.isArray(item) && item.every((sub) => typeof sub === "string"),
    )
  );
}
