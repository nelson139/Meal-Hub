export const getTimeLengthClass = (timeLength: string) => {
  switch (timeLength) {
    case "short":
      return "text-red-600 font-bold";
    case "medium":
      return "text-yellow-600 font-bold";
    case "long":
      return "text-green-600 font-bold";
  }
};
