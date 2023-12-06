import React from "react";
import { Goods } from "app/models/MenusStore";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { makeStyles, Text } from "@rneui/themed";
import Amount from "app/components/Amount";
import GoodsImage from "app/mock/GoodsImage";

const MenuItem: React.FC<{
    goods: Goods;
    style?: StyleProp<ViewStyle>;
    onPress?: (goods: Goods) => void;
}> = ({ goods, style, onPress }) => {
    const styles = useStyles();
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            activeOpacity={0.6}
            onPress={() => onPress?.(goods)}
        >
            <View style={styles.inner}>
                <GoodsImage name={goods.image} style={styles.image} resizeMode={"cover"} />
                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={2} ellipsizeMode={"tail"}>
                        {goods.name}
                    </Text>
                    <Text style={styles.desc} numberOfLines={2} ellipsizeMode={"tail"}>
                        {goods.description}
                    </Text>
                    <Amount style={styles.price} value={goods.price}></Amount>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        width: "33.33%",
        paddingRight: 16,
        paddingBottom: 16,
    },
    inner: {
        backgroundColor: theme.colors.white,
        paddingBottom: 8,
    },
    info: {
        padding: theme.spacing.md,
    },
    image: {
        width: "100%",
        height: 220,
        marginTop: -12,
        marginBottom: -12,
    },
    name: {
        fontSize: 20,
    },
    price: {
        color: theme.colors.primary,
        marginTop: 6,
        fontSize: 18,
        // textAlign: "right",
    },
    desc: {
        fontSize: 12,
        height: 36,
        color: theme.colors.grey1,
    },
}));
export default MenuItem;
