export function formatDate(date) {
  if (!date) {
    return "";
  }
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-IN", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(d);
}
