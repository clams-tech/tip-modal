export function truncateValue(
  val: string,
  length = 8,
  elipsisPosition = "center"
): string {
  return val.length <= length * 2
    ? val
    : elipsisPosition === "center"
    ? `${val.slice(0, length)}...${val.slice(-length)}`
    : `${val.slice(0, length * 2)}...`;
}
