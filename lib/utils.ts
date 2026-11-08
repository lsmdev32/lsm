import type { Updater } from "@tanstack/vue-table";
import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Ref } from "vue";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isUpdaterFunction<T>(value: Updater<T>): value is (old: T) => T {
  return typeof value === "function";
}

export function valueUpdater<T>(updaterOrValue: Updater<T>, state: Ref<T>) {
  if (isUpdaterFunction(updaterOrValue)) {
    state.value = updaterOrValue(state.value);

    return;
  }

  state.value = updaterOrValue;
}
