import Link from "next/link";
import Image from "next/image";
import Divider from "./Divider";

export default function Footer() {
    return (
        <div className="w-full flex flex-col px-16 py-6 gap-6 bg-surface-400">
            <div className="w-full flex gap-12">

                <div className="w-full flex flex-col gap-3">
                    <div className="flex gap-1">
                        <Image src='./web_logo.svg' alt="Arelia logo"  width={24} height={24} unoptimized />
                        Arelia
                    </div>
                </div>

                <div className="w-full flex flex-col gap-5">
                    <p className="text-caption text-surface-200 font-DMSans-400 leading-0">EXPLORE</p>
                    <div className="flex flex-col gap-4">
                        <p className="text-body-sm text-surface-50 font-DMSans-400 leading-0">Browse Products</p>
                        <p className="text-body-sm text-surface-50 font-DMSans-400 leading-0">Nonprofit Directory</p>
                        <p className="text-body-sm text-surface-50 font-DMSans-400 leading-0">Causes</p>
                        <p className="text-body-sm text-surface-50 font-DMSans-400 leading-0">Blog</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-5">
                    <p className="text-caption text-surface-200 font-DMSans-400 leading-0">COMPANY</p>
                    <div className="flex flex-col gap-4">
                        <p className="text-body-sm text-surface-50 font-DMSans-400 leading-0">About Arelia</p>
                        <p className="text-body-sm text-surface-50 font-DMSans-400 leading-0">How it works</p>
                        <p className="text-body-sm text-surface-50 font-DMSans-400 leading-0">Partner with us</p>
                        <p className="text-body-sm text-surface-50 font-DMSans-400 leading-0">Press</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-5">
                    <p className="text-caption text-surface-200 font-DMSans-400 leading-0">SUPPORT</p>
                    <div className="flex flex-col gap-4">
                        <p className="text-body-sm text-surface-50 font-DMSans-400 leading-0">FAQs</p>
                        <p className="text-body-sm text-surface-50 font-DMSans-400 leading-0">Contact</p>
                        <p className="text-body-sm text-surface-50 font-DMSans-400 leading-0">Privacy policy</p>
                        <p className="text-body-sm text-surface-50 font-DMSans-400 leading-0">Terms of use</p>
                    </div>
                </div>

            </div>
            <Divider />
        </div>
    )
}