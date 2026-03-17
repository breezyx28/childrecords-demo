// import createPersistedState from 'use-persisted-state';
"use client";
interface localStorageIF {
  key: string;
  data?: any;
  flag: "" | "set" | "get" | "remove";
}

export default function localStorageHelper(prop: localStorageIF) {
  const { key, data, flag } = prop;

  const local: any = typeof window !== "undefined" ? window.localStorage : null;

  if (flag === "" || flag === null || flag === "set") {
    local?.setItem(key, JSON.stringify(data));
    return true;
  }

  if (flag === "get") {
    try {
      const data = JSON.parse(`${local.getItem(key)}`);
      return data;
    } catch (error) {
      return false;
    }
  }

  if (flag === "remove") {
    try {
      local?.removeItem(key);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return null;
}
