import { useEffect, useMemo, useState } from "react";

import SyncStore from "../SyncStore";

const useSyncStore = <T extends Record<string, any>>(
  storageName: string,
  initialState: T
): [T, (newState: T) => void] => {
  const [state, setState] = useState<T>(initialState);

  const store = useMemo(() => {
    return new SyncStore(storageName, initialState);
  }, []);

  useEffect(() => {
    setState(store.getState() as any);

    const messageListener = (newState: T) => {
      setState(newState);
    };

    const unsubscribe = store.subscibe(messageListener as any);
    return unsubscribe;
  }, [store]);

  return [state, store.setState.bind(store)];
};
export default useSyncStore;
