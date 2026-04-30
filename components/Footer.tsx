import Link from "next/link";
import Divider from "./Divider";
import MaskedIcon from "./MaskedIcon";

export default function Footer() {
    return (
        <div className="w-full flex flex-col px-16 py-6 gap-6 bg-surface-400">
            <div className="w-full flex gap-12">

                <div className="w-full flex flex-col gap-3">
                    <Link href='/' className="flex items-center gap-1 text-surface-50">
                        <MaskedIcon src="/web_logo.svg" size="40px" />
                        <p className="text-h1 text-surface-50 font-DMSerif-Reg">Arelia</p>
                    </Link>
                    <p className="text-body-sm text-surface-200 font-DMSans-400">A marketplace where every purchase supports a verified nonprofit. Shop with purpose.</p>
                    <div className="flex gap-3">
                        <Link href="https://www.instagram.com/areliaforgood" target="_blank" rel="noopener noreferrer" className="w-[36px] h-[36px] flex items-center justify-center border-2 rounded-md border-surface-300">
                            <MaskedIcon src="/icons/instagram.svg" size="24px" className="text-primary-200" />
                        </Link>
                        {/* <Link href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="w-[36px] h-[36px] flex items-center justify-center border-2 rounded-md border-surface-300">
                            <MaskedIcon src="/icons/x-twitter.svg" size="24px" className="text-primary-200" />
                        </Link> */}
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

            <Divider light={false} />

            <div className="flex gap-6">
                <p className="text-caption text-surface-300 font-DMSans-400">© 2026 Arelia</p>
                <p className="text-caption text-surface-300 font-DMSans-400 underline">Privacy</p>
                <p className="text-caption text-surface-300 font-DMSans-400 underline">Terms</p>
                <p className="text-caption text-surface-300 font-DMSans-400 underline">Credit</p>
            </div>
        </div>
    )
}
