// This app uses Local Storage on the frontend
// No backend storage is needed

export interface IStorage {
  // Storage interface for future extension if needed
}

export class MemStorage implements IStorage {
  constructor() {
    // No backend storage needed for this app
  }
}

export const storage = new MemStorage();
