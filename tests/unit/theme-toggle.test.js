const test = require("node:test");
const assert = require("node:assert/strict");
const { readChoice, saveChoice, applyChoice } = require("../../assets/js/theme-toggle.js");

function fakeStorage(initial = {}) {
  const data = { ...initial };
  return {
    data,
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = String(v); },
    removeItem: (k) => { delete data[k]; },
  };
}

const throwing = {
  getItem() { throw new Error("blocked"); },
  setItem() { throw new Error("blocked"); },
  removeItem() { throw new Error("blocked"); },
};

function fakeRoot() {
  const attrs = {};
  return {
    attrs,
    setAttribute: (k, v) => { attrs[k] = v; },
    removeAttribute: (k) => { delete attrs[k]; },
  };
}

test("readChoice returns a stored light or dark choice", () => {
  assert.equal(readChoice(fakeStorage({ theme: "light" })), "light");
  assert.equal(readChoice(fakeStorage({ theme: "dark" })), "dark");
});

test("readChoice falls back to system for missing, unknown or blocked storage", () => {
  assert.equal(readChoice(fakeStorage()), "system");
  assert.equal(readChoice(fakeStorage({ theme: "sepia" })), "system");
  assert.equal(readChoice(throwing), "system");
});

test("saveChoice stores light and dark and clears system", () => {
  const storage = fakeStorage();
  saveChoice(storage, "dark");
  assert.deepEqual(storage.data, { theme: "dark" });
  saveChoice(storage, "light");
  assert.deepEqual(storage.data, { theme: "light" });
  saveChoice(storage, "system");
  assert.deepEqual(storage.data, {});
});

test("saveChoice swallows storage errors", () => {
  assert.doesNotThrow(() => saveChoice(throwing, "dark"));
  assert.doesNotThrow(() => saveChoice(throwing, "system"));
});

test("applyChoice sets data-theme for explicit choices and removes it for system", () => {
  const root = fakeRoot();
  applyChoice(root, "dark");
  assert.deepEqual(root.attrs, { "data-theme": "dark" });
  applyChoice(root, "light");
  assert.deepEqual(root.attrs, { "data-theme": "light" });
  applyChoice(root, "system");
  assert.deepEqual(root.attrs, {});
});
