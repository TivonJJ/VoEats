import React, { useEffect, useRef } from "react";
import { ScrollView, View } from "react-native";
import { makeStyles, Text, Icon, Button } from "@rneui/themed";
import { observer } from "mobx-react-lite";
import { useStores } from "app/models";
import Dialog from "app/components/Dialog";
import CartItem from "./Cart.Item";
import { onAction } from "mobx-state-tree";

const Cart = observer(() => {
    useEffect(() => {
        // 根据model数据变化自动定位cart滚动位置
        const dispatcher = onAction(cartStore, (call) => {
            if (call.name === "remove") return;
            const id = call.args?.at(0);
            scrollToItem(id);
        });
        return () => {
            dispatcher();
        };
    }, []);
    const scroller = useRef<ScrollView>(null);
    const styles = useStyle();
    const { cartStore } = useStores();
    const scrollToItem = (id: string) => {
        if (!scroller.current) return;
        const itemHeight = 100;
        const cartIndex = cartStore.list.findIndex((n) => n.id === id);
        if (cartIndex === -1) {
            scroller.current.scrollToEnd();
        } else {
            scroller.current?.scrollTo({ x: 0, y: cartIndex * itemHeight });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Cart</Text>
                {cartStore.list.length > 0 && (
                    <Icon
                        name={"trash-o"}
                        type={"font-awesome"}
                        iconStyle={styles.trash}
                        onPress={() => {
                            Dialog.confirm({
                                message: "Are you sure to clear the cart?",
                            }).then(() => {
                                cartStore.clear();
                            });
                        }}
                    />
                )}
            </View>
            <ScrollView style={styles.list} ref={scroller}>
                {cartStore.list.map((item) => (
                    <CartItem item={item} key={item.id} />
                ))}
                <View style={{ height: 60 }} />
            </ScrollView>
            <View style={styles.footer}>
                <Button disabled size={"lg"}>
                    Order
                </Button>
            </View>
        </View>
    );
});

const useStyle = makeStyles((theme) => ({
    container: {
        paddingBottom: 22,
        height: "100%",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 20,
        paddingBottom: 6,
        paddingHorizontal: 14,
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
    },
    trash: {
        fontSize: 22,
        color: theme.colors.error,
    },
    list: {
        flex: 1,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
    },
    footer: {
        paddingHorizontal: theme.spacing.xl,
    },
}));

export default Cart;
