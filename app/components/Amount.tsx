import React, { useMemo } from "react";
import { Text, TextProps } from "@rneui/themed";

export interface AmountProps extends Omit<TextProps, "children"> {
    value?: number;
    currencySymbol?: string;
}

const Amount = (props: AmountProps) => {
    const { value, currencySymbol = "$", ...rest } = props;
    const formatted = useMemo(() => {
        if (value === undefined) return "";
        return value.toFixed(2);
    }, [value]);
    return (
        <Text {...rest}>
            {currencySymbol}
            {formatted}
        </Text>
    );
};

export default Amount;
