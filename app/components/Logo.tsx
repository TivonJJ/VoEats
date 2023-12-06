import React from "react";
import { View, ViewProps } from "react-native";
import { Text, Image, ImageProps } from "@rneui/themed";

const logo = require("assets/images/logo.png");

export interface LogoProps extends ViewProps {
    size?: number;
    imageProps?: Omit<ImageProps, "source" | "resizeMode" | "style">;
}

const Logo: React.FC<LogoProps> = (props) => {
    const { size = 46, style, imageProps, ...rest } = props;
    return (
        <View
            style={[
                style,
                {
                    flexDirection: "row",
                    alignItems: "center",
                },
            ]}
            {...rest}
        >
            <Image
                source={logo}
                style={{ width: size, height: size }}
                resizeMode={"contain"}
                {...imageProps}
            />
            <Text h4 style={{ marginLeft: 10 }}>
                VoEats
            </Text>
        </View>
    );
};

export default Logo;
