import { BasketItem } from "../../types/types";
import { EventEmitter } from "../base/events";

interface IBasketModel {
    items: Map<string, BasketItem>;
    add(item: BasketItem): void;    
    remove(id: string): void;
}

export class BasketModel implements IBasketModel {
    items: Map<string, BasketItem> = new Map();
    _events: EventEmitter | null = null;

    constructor(events: EventEmitter) {
        this._events = events
    }

    add(item: BasketItem): void {
        if(!this.items.has(item.id)) this.items.set(item.id, item);

        this._events.emit("basket:change", this.items);
    }

    remove(id: string): void {
        if (!this.items.has(id)) return;
        if (this.items.has(id)) {
            this.items.delete(id);
            this._events.emit("basket:change", this.items);
        }
    }
}