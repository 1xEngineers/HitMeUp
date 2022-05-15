export const parseQueryString = (urlPath: string) => {
  const url = new URL(urlPath)
  const queryParams = new URLSearchParams(url.search)
  return Object.fromEntries(Array.from(queryParams))
}
