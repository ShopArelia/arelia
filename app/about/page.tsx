import Divider from "@/components/Divider"
import { getAllCounts } from "@/utils/supabase/database";

export default async function Page() {
    const counts = await getAllCounts();

    return (
        <div className="w-full flex flex-col">

            {/* Our Story */}
            <div className='flex flex-col px-16 py-30 gap-6 items-start justify-between bg-primary-400'>
                <p className='text-body-sm font-DMSans-400 text-primary-200'>OUR STORY</p>
                <p className='text-display font-DMSerif-Reg text-primary-50 leading-none'>Shopping that means something <span className='font-DMSerif-Italic'>more</span></p>
                <p className='max-w-1/2 text-body font-DMSans-400 text-primary-100 text-wrap'>Arelia was founded with a simple vision; to create a marketplace showcasing merchandise from nonprofits around the world.</p>
            </div>

            {/* The Problem We're Solving */}
            <div className="flex flex-col px-16 py-24 gap-12 items-center justify-center">
                <p className='text-body-sm font-DMSans-400 text-primary-300'>THE PROBLEM WE'RE SOLVING</p>
                <h1 className='text-h1 font-DMSerif-Reg text-surface-400 text-center leading-none'>Nonprofits do extraordinary work.<br />Most people never <span className='font-DMSerif-Italic text-primary-300'>feel</span> it.</h1>
                <p className='max-w-1/3 text-body font-DMSans-400 text-surface-300 text-center leading-none'>
                    Donating to a cause is a moment. A transaction. You click a button,
                    money moves, and that's usually where the relationship ends. There's
                    no physical reminder of what you did, no ongoing connection to the work,
                    and no reason to come back.
                    <br />
                    <br />
                    Meanwhile, the nonprofits doing the work - the ones running wildlife corridors,
                    school kitchens, and rural craft programs - often sell products that are
                    genuinely worth owning. Beautiful things, made with care, by people whose
                    livelihoods depend on the sale.
                    <br />
                    <br />
                    Those two worlds rarely meet. We built Arelia to change that.
                </p>
            </div>

            <Divider />

            {/* What We Believe */}
            <div className="flex px-16 py-24 gap-12 items-start bg-white">
                <div className="w-full flex flex-col gap-12">
                    <p className='text-body-sm font-DMSans-400 text-primary-300'>WHAT WE BELIEVE</p>
                    <h1 className='text-h1 font-DMSerif-Reg text-surface-400'>Purpose and quality<br />aren't <span className='font-DMSerif-Italic'>opposites.</span></h1>
                    <p className='text-body font-DMSans-400 text-surface-300'>
                        The best case for buying from a nonprofit isn't guilt - it's that the product
                        is worth it. We only list items that stand on their own. If it wouldn't make a
                        good gift, if you wouldn't keep it, if the quality doesn't hold up: it doesn't make the cut.
                        <br />
                        <br />
                        We're not a charity shop. We're a marketplace that happens to direct every cent
                        back to organizations doing work that matters.
                    </p>
                </div>

                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                        <p className='text-body-sm font-DMSans-400 text-primary-300'>01</p>
                        <h1 className='text-h1 font-DMSerif-Reg text-surface-400'>Radical transparency</h1>
                        <p className='text-body font-DMSans-400 text-surface-300'>
                            Every product page links directly to the nonprofit's own store. We never hold
                            inventory, never take a cut of the sale, and never obscure who you're buying from.
                        </p>
                    </div>
                    <Divider />
                    <div className="flex flex-col gap-3">
                        <p className='text-body-sm font-DMSans-400 text-primary-300'>02</p>
                        <h1 className='text-h1 font-DMSerif-Reg text-surface-400'>Quality over quantity</h1>
                        <p className='text-body font-DMSans-400 text-surface-300'>
                            We manually review every product before it's listed. That means a smaller catalog
                            - and a better one. You won't find filler here.
                        </p>
                    </div>
                    <Divider />
                    <div className="flex flex-col gap-3">
                        <p className='text-body-sm font-DMSans-400 text-primary-300'>03</p>
                        <h1 className='text-h1 font-DMSerif-Reg text-surface-400'>Causes, not just charities</h1>
                        <p className='text-body font-DMSans-400 text-surface-300'>
                            We organize by what you care about, not by who's asking. Environment, education,
                            food - your values lead, and the right organizations follow.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex px-16 py-12 gap-12 bg-primary-400 items-stretch justify-center">
                <div className="w-full flex flex-col gap-3 items-center justify-center">
                    <p className='text-display font-DMSerif-Reg text-primary-50 leading-none'>{counts.ngoCount}</p>
                    <p className='text-body font-DMSans-400 text-primary-100'>Verified nonprofit partners</p>
                </div>
                <div className={`w-px bg-primary-200`} />
                <div className="w-full flex flex-col gap-3 items-center justify-center">
                    <p className='text-display font-DMSerif-Reg text-primary-50 leading-none'>{counts.productCount}</p>
                    <p className='text-body font-DMSans-400 text-primary-100'>Products listed</p>
                </div>
                <div className={`w-px bg-primary-200`} />
                <div className="w-full flex flex-col gap-3 items-center justify-center">
                    <p className='text-display font-DMSerif-Reg text-primary-50 leading-none'>{counts.causeCount}</p>
                    <p className='text-body font-DMSans-400 text-primary-100'>Causes covered</p>
                </div>
                <div className={`w-px bg-primary-200`} />
                <div className="w-full flex flex-col gap-3 items-center justify-center">
                    <p className='text-display font-DMSerif-Reg text-primary-50 leading-none'>$0</p>
                    <p className='text-body font-DMSans-400 text-primary-100'>Commission on every sale</p>
                </div>
            </div>

            {/* How It Works */}
            <div className="flex flex-col px-16 py-24 gap-12 items-start bg-white">
                <p className='text-body-sm font-DMSans-400 text-primary-300'>HOW IT WORKS</p>
                <h1 className='text-h1 font-DMSerif-Reg text-surface-400'>We connect the dots.<br /><span className='font-DMSerif-Italic'>You keep the product.</span></h1>

                <div className="w-full flex gap-12">
                    <div className="flex flex-col gap-3">
                        <h1 className='text-h1 font-DMSerif-Reg text-primary-200 leading-none'>01</h1>
                        <h1 className='text-h1 font-DMSerif-Reg text-surface-400'>We find and vet</h1>
                        <p className='text-body font-DMSans-400 text-surface-300'>
                            Our team researches nonprofits with active product lines, verifies their
                            registration and work, and evaluates every item in their catalog for quality
                            and relevance.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className='text-h1 font-DMSerif-Reg text-primary-200 leading-none'>02</h1>
                        <h1 className='text-h1 font-DMSerif-Reg text-surface-400'>You browse and choose</h1>
                        <p className='text-body font-DMSans-400 text-surface-300'>
                            Browse by cause, or just by what catches your eye. Every listing is honest
                            about who made it, what it supports, and where the money goes.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className='text-h1 font-DMSerif-Reg text-primary-200 leading-none'>03</h1>
                        <h1 className='text-h1 font-DMSerif-Reg text-surface-400'>They receive, directly</h1>
                        <p className='text-body font-DMSans-400 text-surface-300'>
                            Clicking a product takes you straight to the nonprofit's own store. The purchase,
                            the payment, and the relationship are entirely between you and them. No middleman.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}