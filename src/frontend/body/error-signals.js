// error-signals.js
import { signal } from "@preact/signals-react";

export const errors = signal([]);

export const addError = (error) => {
  errors.value = [...errors.value, { ...error, id: Date.now() }];
};

export const removeError = (id) => {
  errors.value = errors.value.filter(err => err.id !== id);
};