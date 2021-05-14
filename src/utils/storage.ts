function setLocal(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getLocal<T>(key: string): T | null {
  try {
    return JSON.parse(window.localStorage.getItem(key) || '');
  } catch (err) {
    return null;
  }
}

function removeLocal(key: string) {
  window.localStorage.removeItem(key);
}

function setSession(key: string, value: any) {
  window.sessionStorage.setItem(key, JSON.stringify(value));
}

function getSession<T>(key: string): T {
  return JSON.parse(window.sessionStorage.getItem(key) || '');
}

function removeSession(key: string) {
  window.sessionStorage.removeItem(key);
}

export const localStorage = {
  setItem: setLocal,
  getItem: getLocal,
  removeItem: removeLocal
};

export const sessionStorage = {
  setItem: setSession,
  getItem: getSession,
  removeItem: removeSession
};
