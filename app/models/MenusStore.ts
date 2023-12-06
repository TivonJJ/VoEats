import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";

export interface Goods {
    name: string;
    description: string;
    image: string;
    id: string;
    inventory: number;
    price: number;
}

export interface Category {
    name: string;
    items: Goods[];
}
export const GoodsModel = types.model("Goods", {
    name: types.string,
    description: types.string,
    image: types.string,
    id: types.string,
    inventory: types.number,
    price: types.number,
});

export const CategoryModel = types.model("Category", {
    name: types.string,
    items: types.array(GoodsModel),
});
export const MenusStoreModel = types
    .model("MenusStore")
    .props({
        categories: types.array(CategoryModel),
    })
    .actions(withSetPropAction)
    .actions((store) => ({
        fetchMenus() {
            const menus = require("../mock/menus.json");
            store.setProp("categories", menus);
        },
        getGoodsById(id: string) {
            const categories = store.categories;
            for (const category of categories) {
                for (const item of category.items) {
                    if (item.id === id) {
                        return item;
                    }
                }
            }
            return undefined;
        },
    }));

export interface MenusStore extends Instance<typeof MenusStoreModel> {}
export interface MenusStoreSnapshot extends SnapshotOut<typeof MenusStoreModel> {}
