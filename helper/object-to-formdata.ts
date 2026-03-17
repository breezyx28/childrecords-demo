/**
 * Converts an object to FormData format, handling nested objects and arrays.
 * @param data - The object containing data to be appended to FormData.
 * @returns A FormData instance with appended data.
 */
export function objectToFormData(data: Record<string, any>): FormData {
  const formData = new FormData();

  function buildFormData(formData: FormData, data: any, parentKey?: string) {
    if (data && typeof data === "object" && !(data instanceof File)) {
      // Handle arrays and nested objects
      Object.keys(data).forEach((key) => {
        const value = data[key];
        const fullKey = parentKey ? `${parentKey}[${key}]` : key;

        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            buildFormData(formData, item, `${fullKey}[${index}]`);
          });
        } else {
          buildFormData(formData, value, fullKey);
        }
      });
    } else {
      // For basic data types or File objects, append directly
      formData.append(parentKey as string, data);
    }
  }

  buildFormData(formData, data);

  return formData;
}

export default objectToFormData;
