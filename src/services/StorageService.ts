import { MMKVLoader } from 'react-native-mmkv-storage';

const MMKV = new MMKVLoader()
  .withEncryption()
  .withInstanceID('bike-ride-app')
  .initialize();

class StorageService {
  private static instance: StorageService;

  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  async setItem(key: string, value: any): Promise<void> {
    try {
      if (typeof value === 'string') {
        await MMKV.setStringAsync(key, value);
      } else {
        await MMKV.setMapAsync(key, value);
      }
    } catch (error) {
      console.error('Storage setItem error:', error);
    }
  }

  async getItem(key: string): Promise<any> {
    try {
      const value = await MMKV.getStringAsync(key);
      if (!value) {
        return await MMKV.getMapAsync(key);
      }
      return value;
    } catch (error) {
      console.error('Storage getItem error:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await MMKV.removeItem(key);
    } catch (error) {
      console.error('Storage removeItem error:', error);
    }
  }

  async clearAll(): Promise<void> {
    try {
      await MMKV.clearStore();
    } catch (error) {
      console.error('Storage clearAll error:', error);
    }
  }
}

export default StorageService.getInstance(); 