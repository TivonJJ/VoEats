import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";
import { Goods, GoodsModel } from "app/models/MenusStore";
import { getRootStore } from "app/models/helpers/getRootStore";

export interface CartItem extends Goods {
    count: number;
    totalAmount: number;
}

export const CartItemModel = types
    .compose(
        "CartItem",
        GoodsModel,
        types.model({
            count: types.number,
        }),
    )
    .views((cartItem) => ({
        get totalAmount() {
            return cartItem.price * cartItem.count;
        },
    }));

export const CartStoreModel = types
    .model("CartStore")
    .props({
        list: types.array(CartItemModel),
    })
    .actions(withSetPropAction)
    .actions((store) => ({
        put(id: string, count = 1) {
            const exist = store.list.find((item) => item.id === id);
            if (exist) {
                this.increase(id, count);
            } else {
                const rootStore = getRootStore(store);
                const goods = rootStore.menusStore.getGoodsById(id);
                if (goods) {
                    store.list.push({
                        ...goods,
                        count,
                    });
                }
            }
        },
        increase(id: string, count = 1) {
            const item = store.list.find((item) => item.id === id)!;
            item.count += count;
        },
        reduce(id: string, count = 1) {
            const item = store.list.find((item) => item.id === id)!;
            if (item.count - count === 0) {
                this.remove(item.id);
            } else {
                item.count -= count;
            }
        },
        remove(id: string) {
            const index = store.list.findIndex((item) => item.id === id);
            store.list.splice(index, 1);
        },
        clear() {
            store.list.length = 0;
        },
    }));

export interface CartStore extends Instance<typeof CartStoreModel> {}
export interface CartStoreSnapshot extends SnapshotOut<typeof CartStoreModel> {}
