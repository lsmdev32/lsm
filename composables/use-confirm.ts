import { ref } from "vue";

export interface ConfirmRequest {
  cancelLabel?: string;
  confirmLabel?: string;
  description?: string;
  title: string;
  tone?: "default" | "destructive";
}

/**
 * Page-level confirmation dialog state. Module scoped so render functions in
 * plain `.ts` files (table column definitions) can await a confirmation
 * without owning a component instance.
 */
const activeRequest = ref<ConfirmRequest | null>(null);

let pending: { resolve: (confirmed: boolean) => void } | null = null;

function settle(confirmed: boolean) {
  const resolver = pending;

  pending = null;
  activeRequest.value = null;
  resolver?.resolve(confirmed);
}

/**
 * Opens the confirmation dialog mounted by the admin layout and resolves with
 * the user's answer. Cancel counts as `false`.
 */
export async function confirmAction(request: ConfirmRequest): Promise<boolean> {
  settle(false);

  const { promise, resolve } = Promise.withResolvers<boolean>();

  activeRequest.value = request;
  pending = { resolve };

  return await promise;
}

export function useConfirmDialogState() {
  return {
    request: activeRequest,
    accept: () => {
      settle(true);
    },
    cancel: () => {
      settle(false);
    },
    /**
     * The dialog closes itself before a button's click handler runs, so an
     * accept click would lose to the close event. Deferring the cancel lets
     * the click settle the promise first; `settle` is then a no-op.
     */
    handleOpenChange: (open: boolean) => {
      if (open) {
        return;
      }

      queueMicrotask(() => {
        settle(false);
      });
    },
  };
}
