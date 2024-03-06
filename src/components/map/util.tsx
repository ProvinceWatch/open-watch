/**
 * Loads a script into the DOM
 */
export const loadScript = (src: string): Promise<void> => {
  if (typeof window !== "undefined") {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject();
      };
      document.body.appendChild(script);
    });
  }
  return new Promise((res, rej) => { });
};