import cache from "memory-cache";

const JSONFetch = async (url: string, skipCache = false) => {
  if (!skipCache) {
    const value = cache.get(url);
    if (value) return value;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    // check for error response
    if (!response.ok) {
      // get error message from body or default to response status
      const error = (data && data.message) || response.status;
      return Promise.reject(error);
    }
    cache.put(url, data);
    return data;
  } catch (error) {
    console.error("Oops:", error);
  }
};

export default JSONFetch;
