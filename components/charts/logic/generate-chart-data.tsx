export function generateChartData(
  data: {
    classifications?: Record<
      string,
      { percentile: string; label: string; borderColor: string; data: number[] }
    >;
    child?: { data: (number | null)[]; current?: Record<string, unknown> };
  } | null | undefined,
  length: number
): Array<{ age: number; P97: number | null; P85: number | null; P50: number | null; P15: number | null; P3: number | null; current: number | null }> {
  if (!data?.classifications?.P97?.data) {
    return [];
  }
  const ages = Array.from({ length }, (_, i) => i);
  const childData = data?.child?.data ?? [];
  const ifArrayisNullable = isArrayOfNulls(childData);
  const currentVal = (data?.child?.current as Record<string, unknown>)?.height ?? (data?.child?.current as Record<string, unknown>)?.weight;
  const currentChildWeightOrHeight = extractNumber(currentVal != null ? String(currentVal) : "");
  const currentChildData = ifArrayisNullable
    ? pushChildWeightOrHeightIfNullable(childData, currentChildWeightOrHeight)
    : childData;

  return ages.map((age, i) => ({
    age,
    P97: data.classifications!.P97.data[i] ?? null,
    P85: data.classifications!.P85.data[i] ?? null,
    P50: data.classifications!.P50.data[i] ?? null,
    P15: data.classifications!.P15.data[i] ?? null,
    P3: data.classifications!.P3.data[i] ?? null,
    current: currentChildData[i] ?? null,
  }));
}

function isArrayOfNulls(arr: Array<null | any>): boolean {
  return arr.every((item) => item === null);
}

function pushChildWeightOrHeightIfNullable(
  arr: Array<null | any>,
  pushValue: number | null
): Array<null | any> {
  if (isArrayOfNulls(arr)) {
    // Clone the array to make it mutable
    const mutableArr = [...arr];
    mutableArr[0] = pushValue;
    return mutableArr;
  }
  return arr;
}

// extract numbers from number-string
function extractNumber(value: string): number | null {
  const match = value.match(/[-+]?\d*\.?\d+/); // Matches numbers with optional sign and decimal point
  return match ? parseFloat(match[0]) : null; // Parse the matched string to a number
}
