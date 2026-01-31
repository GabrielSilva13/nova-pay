const KEY = "bank-demo:auth";

export function readAuth(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) === "1";
}

export function writeAuth(value: boolean) {
  window.localStorage.setItem(KEY, value ? "1" : "0");
}
