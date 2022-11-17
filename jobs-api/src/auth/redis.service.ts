import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async set({ key, value, time }) {
    await this.cacheManager.set(key, value, time);
  }
  async get(key) {
    return await this.cacheManager.get(key);
  }
}
