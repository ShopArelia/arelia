'use client'

import { useState } from "react";
import Header from "@/components/Header";
import Divider from "@/components/Divider";

export default function Page() {
    const [text, setText] = useState<string>('');
    return (
        <div>
            <Header title="Shop" description="320 products from 30 verified nonprofits" inputPlaceholder="Search products..." text={text} onChange={setText} />
            <Divider />
        </div>
    )
}