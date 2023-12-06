import React, { useMemo } from "react";
import { Image, ImageProps } from "@rneui/themed";
import { GoodsImages, defaultGoodsImage } from "app/mock/source";
import { ImageRequireSource } from "react-native/Libraries/Image/ImageSource";

export interface GoodsImageProps extends Omit<ImageProps, "source"> {
    name: string;
}
const GoodsImage = (props: GoodsImageProps) => {
    const { name, ...rest } = props;
    const source = useMemo<ImageRequireSource>(() => {
        return GoodsImages[name] || defaultGoodsImage;
    }, [name]);
    return <Image {...rest} source={source} />;
};

export default GoodsImage;
