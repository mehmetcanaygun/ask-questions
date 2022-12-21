export const shortenStr = (text: string, maxLength: number): string => {
  return text.length < maxLength ? text : `${text.substring(0, maxLength)}...`;
};
