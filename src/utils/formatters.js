export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);

export const formatNumber = (value, suffix = "") =>
  `${new Intl.NumberFormat("en-ID").format(value)}${suffix}`;
