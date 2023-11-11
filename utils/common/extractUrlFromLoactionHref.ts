export default function extractUrlFromLocationHref(locationHref: string): string {
  const urlRegex = /(https?|http):\/\/[^\s/$.?#].[^\s]*/;
  const match = locationHref.match(urlRegex);

  if (match) {
    return match[0].slice(0, -2);
  }
  throw new Error("Invalid location href");
}
