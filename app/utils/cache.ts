
export class Cache {
    private cache : Map<string,Date>;
    private static instance: Cache;
    constructor() {
        this.cache = new Map();
    }
    static getInstance() {
        if (!this.instance) {
          this.instance = new Cache();
        }
        return this.instance;
    }
    add(key: string,expires : Date) {
        this.cache.set(key,expires);
    }
    has(key: string) {
        if(this.cache.has(key)) {
            const presentDate = new Date();
            const cachedValue = this.cache.get(key);
            if(cachedValue && presentDate>cachedValue) {
                this.delete(key);
                return false;
            }
            return true;
        }
        return false;
    }
    delete(key: string) {
        this.cache.delete(key);
    }

}