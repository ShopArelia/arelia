type DividerProps = {
    light?: boolean;
}
export default function Divider({ light = true } : DividerProps) {
    return (
        <div className={`w-full h-px ${light ? "bg-surface-200" : "bg-surface-300"}`} />
    )
}