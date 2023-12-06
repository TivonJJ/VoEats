import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { makeStyles, Text } from "@rneui/themed";
import { useStores } from "app/models";
import MenuItem from "./Menu.Item";
import { observer } from "mobx-react-lite";

const Menu = observer(() => {
    const styles = useStyles();
    useEffect(() => {
        menusStore.fetchMenus();
    }, []);
    const { menusStore, cartStore } = useStores();
    return (
        <ScrollView style={styles.container}>
            {menusStore.categories.map((category) => (
                <View style={styles.group} key={category.name}>
                    <View style={styles.category}>
                        <Text style={styles.title}>{category.name}</Text>
                    </View>
                    <View style={styles.menu}>
                        {category.items.map((goods) => (
                            <MenuItem
                                goods={goods}
                                key={goods.id}
                                onPress={(goods) => {
                                    cartStore.put(goods.id);
                                }}
                            />
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
});

const useStyles = makeStyles((theme) => ({
    container: {
        paddingVertical: theme.spacing.xl,
    },
    group: {
        marginBottom: theme.spacing.xl,
    },
    category: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.lg,
    },
    icon: {},
    title: {
        fontSize: 22,
        fontWeight: "bold",
    },
    menu: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
}));

export default Menu;
