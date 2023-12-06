import React, { useCallback, useEffect, useRef } from "react";
import { Icon, makeStyles, useTheme, ListItem, TextProps } from "@rneui/themed";
import { View } from "react-native";
import { CartItem as ICartItem } from "app/models/CartStore";
import { observer } from "mobx-react-lite";
import { useStores } from "app/models";
import Amount from "app/components/Amount";
import Dialog from "app/components/Dialog";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import GoodsImage from "app/mock/GoodsImage";
import throttle from "lodash/throttle";

const CartItem: React.FC<{
    item: ICartItem;
    onItemChange?: (item: ICartItem, action: string) => void;
}> = observer(({ item, onItemChange = () => null }) => {
    const {
        theme: { colors },
    } = useTheme();
    const { cartStore } = useStores();

    const handleIncrease = useCallback(
        throttle(() => {
            cartStore.increase(item.id);
            onItemChange(item, "increase");
        }, 800),
        [],
    );
    const handleReduce = useCallback(
        throttle(() => {
            if (item.count === 1) {
                handleRemove();
            } else {
                cartStore.reduce(item.id);
                onItemChange(item, "reduce");
            }
        }, 800),
        [],
    );

    const styles = useStyles();
    const transitionDuration = 300;
    const transitionOffset = -360;

    const offset = useSharedValue(transitionOffset);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));
    const transitionIn = () => {
        offset.value = withTiming(0, { duration: transitionDuration });
    };

    const handleRemove = (confirm = true) => {
        const remove = () => {
            cartStore.remove(item.id);
        };
        const removeWithTransition = () => {
            offset.value = withTiming(
                transitionOffset,
                { duration: transitionDuration },
                (finished) => {
                    if (finished) {
                        runOnJS(remove)();
                    }
                },
            );
            onItemChange(item, "remove");
        };
        if (confirm) {
            Dialog.confirm({
                message: "Are you sure to remove this?",
            }).then(() => {
                removeWithTransition();
            });
        } else {
            removeWithTransition();
        }
    };

    return (
        <Animated.View style={animatedStyles}>
            <ListItem
                containerStyle={styles.goodsItem}
                onLongPress={() => {
                    handleRemove();
                }}
                onLayout={() => {
                    transitionIn();
                }}
            >
                <GoodsImage name={item.image} style={styles.goodsImage} resizeMode={"contain"} />
                <ListItem.Content>
                    <ListItem.Title
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                        style={styles.goodsName}
                    >
                        {item.name}
                    </ListItem.Title>
                    <View style={styles.goodsContent}>
                        <Amount value={item.totalAmount} style={styles.goodsPrice} />
                        <View style={styles.action}>
                            <Icon
                                name={"minus"}
                                type={"feather"}
                                color={colors.primary}
                                size={18}
                                style={styles.actionIcon}
                                onPress={handleReduce}
                            />
                            <GoodCount style={styles.goodsCount} value={item.count} />
                            <Icon
                                name={"plus"}
                                type={"feather"}
                                color={colors.primary}
                                size={18}
                                style={styles.actionIcon}
                                onPress={handleIncrease}
                            />
                        </View>
                    </View>
                </ListItem.Content>
            </ListItem>
        </Animated.View>
    );
});

const GoodCount = (props: TextProps & { value: number }) => {
    const { value, style, ...rest } = props;
    const isFirstTime = useRef<boolean>(true);
    const { theme } = useTheme();
    const scale = useSharedValue(1);
    const color = useSharedValue(theme.colors.grey1);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        color: color.value,
    }));

    useEffect(() => {
        if (!isFirstTime.current) {
            scale.value = withRepeat(withSpring(3), 2, true, (finished) => {
                if (!finished) {
                    scale.value = 1;
                }
            });
            color.value = withTiming(theme.colors.primary, { duration: 600 }, () => {
                color.value = theme.colors.grey1;
            });
        }
        isFirstTime.current = false;
    }, [value]);
    return (
        <Animated.Text {...rest} style={[style, animatedStyles]}>
            {value}
        </Animated.Text>
    );
};

const useStyles = makeStyles((theme) => ({
    goodsItem: {
        borderBottomWidth: 1,
        borderColor: theme.colors.grey5,
        backgroundColor: "transparent",
    },
    goodsImage: {
        width: 62,
        height: 62,
        borderRadius: 100,
    },
    goodsName: {
        fontSize: 20,
    },
    goodsContent: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: theme.spacing.lg,
    },
    goodsPrice: {
        fontSize: 16,
    },
    action: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 3,
        borderColor: theme.colors.grey5,
    },
    actionIcon: {
        padding: 10,
    },
    goodsCount: {
        width: 40,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "400",
    },
}));

export default CartItem;
