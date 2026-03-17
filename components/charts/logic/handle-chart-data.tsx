export const handelChartConfig = (data: any) => {
  const classifications = data.classifications;
  const result = {
    percentile: {
      label: "Percentiles",
    },
    current: {
      label: "Logged Data",
    },
  };

  for (const key in classifications) {
    if (classifications.hasOwnProperty(key)) {
      // @ts-ignore
      result[key] = {
        label: classifications[key].label,
        // color: "rgba(0, 0, 0, 1)",
        color: classifications[key].borderColor,
      };
    }
  }

  return result;
};
