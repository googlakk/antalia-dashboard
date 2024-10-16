// BoradcastChannel

import { json } from "react-router-dom";

// LocalStorage
class SyncStore {
  private channel: BroadcastChannel;
  private storageName: string;
  private initialState: Record<string, any>;
  private subscibers: Array<(newState: Record<string, any>) => void> = [];

  constructor(storageName: string, initialState: Record<string, any>) {
    this.channel = new BroadcastChannel(storageName);
    this.storageName = storageName;
    this.initialState = initialState;
    this.registerListenners();
  }

  public getState(): Record<string, any> {
    const storedState = localStorage.getItem(this.storageName);
    return storedState ? JSON.parse(storedState) : this.initialState;
  }

  public setState(newState: Record<string, any>): void {
    localStorage.setItem(this.storageName, JSON.stringify(newState));
    this.channel.postMessage(newState);
    this.notifySubscribers(newState);
  }

  public subscibe(cb: (newState: Record<string, any>) => void): () => void {
    this.subscibers.push(cb);
    return () =>
      (this.subscibers = this.subscibers.filter((sub) => sub !== cb));
  }

  private notifySubscribers(newState: Record<string, any>): void {
    this.subscibers.forEach((sub) => sub(newState));
  }

  private registerListenners(): void {
    this.channel.addEventListener("message", (event: MessageEvent) => {
      if (event.data && typeof event.data === "object") {
        this.notifySubscribers(event.data);
      }
    });
  }
}
export default SyncStore;
