export const getFormattedDate = () => {
  const date = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${monthName} ${day}, ${year}`;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const formatTime = (iso: string) => {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateTime = (iso: string) => {
  return new Date(iso).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
