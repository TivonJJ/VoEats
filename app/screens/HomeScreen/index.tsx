import React from "react";
import { View } from "react-native";
import Screen from "app/components/Screen";
import { makeStyles } from "@rneui/themed";
import Cart from "./Cart";
import Header from "./Header";
import Menu from "./Menu";

export const HomeScreen = () => {
    const styles = useStyles();
    return (
        <Screen contentContainerStyle={styles.container}>
            <View style={styles.menu}>
                <Header />
                <Menu />
            </View>
            <View style={styles.cart}>
                <Cart />
            </View>
        </Screen>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "row",
        height: "100%",
    },
    menu: {
        flex: 1,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.lg,
    },
    cart: {
        width: 360,
        backgroundColor: theme.colors.white,
    },
}));
