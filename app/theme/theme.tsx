import { createTheme, ThemeProvider } from "@rneui/themed";
import React, { PropsWithChildren } from "react";
import { CreateThemeOptions } from "@rneui/themed/dist/config/ThemeProvider";

export const theme = createTheme({
    lightColors: {
        background: "#F7F7F7",
        primary: "#FF2351",
    },
    // darkColors: {
    //     primary: "blue",
    // },
    // components: {
    //     Button: {
    //         raised: true,
    //     },
    // },
}) as Required<CreateThemeOptions>;

export const ThemeProviderContainer = ({ children }: PropsWithChildren) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export function getColors() {
    return theme.mode === "dark" ? theme.darkColors : theme.lightColors;
}
