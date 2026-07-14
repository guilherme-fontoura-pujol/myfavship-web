const apiUrl = import.meta.env.VITE_API_URL;

export function getImageUrl(
  imageUrl: string | null | undefined
): string | null {
  if (!imageUrl) {
    return null;
  }

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {
    return imageUrl;
  }

  return `${apiUrl}${imageUrl}`;
}