export const textSubstr = (text, length) => {
  if (text.length > length) return text.substring(0, length) + "...";
  else return text;
};
export const voteSubstr = (text) => {
  if (text.length > 3 && text.length < 7)
    return text.substring(0, text.length - 3) + "K";
  else if (text.length > 6 && text.length < 8)
    return text.substring(0, text.length - 6) + "M";
  else return text;
};
