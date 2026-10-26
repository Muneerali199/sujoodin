"use client";

import { useCallback, useSyncExternalStore } from "react";

interface PersistApi {
  hasHydrated: () => boolean;
  onFinishHydration: (callback: () => void) => () => void;
}

export function useStoreHydrated(store: { persist: PersistApi }) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => store.persist.onFinishHydration(onStoreChange),
    [store]
  );

  const getSnapshot = useCallback(
    () => store.persist.hasHydrated(),
    [store]
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
