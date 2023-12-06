import React from "react";
import { View } from "react-native";
import Logo from "app/components/Logo";
import { navigate } from "app/navigators";

const Header = () => {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 32,
                paddingBottom: 12,
            }}
        >
            <Logo
                imageProps={{
                    onLongPress: () => {
                        navigate("Setting");
                    },
                }}
            />
        </View>
    );
};

export default Header;
