import clsx from "clsx";
import type { CSSProperties, HTMLAttributes } from "react";

type MaskedIconProps = Omit<HTMLAttributes<HTMLSpanElement>, "color"> & {
    src: string;
    size?: CSSProperties["width"];
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
    backgroundClassName?: string;
    maskSize?: CSSProperties["maskSize"];
    maskPosition?: CSSProperties["maskPosition"];
    maskRepeat?: CSSProperties["maskRepeat"];
    ariaLabel?: string;
};

export default function MaskedIcon({
    src,
    size,
    width,
    height,
    backgroundClassName = "bg-current",
    maskSize = "contain",
    maskPosition = "center",
    maskRepeat = "no-repeat",
    className,
    style,
    ariaLabel,
    ...props
}: MaskedIconProps) {
    const resolvedWidth = size ?? width;
    const resolvedHeight = size ?? height;

    const maskStyle: CSSProperties = {
        width: resolvedWidth,
        height: resolvedHeight,
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        maskSize,
        WebkitMaskSize: maskSize,
        maskPosition,
        WebkitMaskPosition: maskPosition,
        maskRepeat,
        WebkitMaskRepeat: maskRepeat,
        ...style,
    };

    return (
        <span
            aria-hidden={ariaLabel ? undefined : true}
            aria-label={ariaLabel}
            className={clsx("block shrink-0", backgroundClassName, className)}
            style={maskStyle}
            {...props}
        />
    );
}
