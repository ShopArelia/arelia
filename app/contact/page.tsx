"use client"

import MaskedIcon from "@/components/MaskedIcon";
import { useState, type ChangeEvent } from "react";
import { buttonClass } from "@/components/Button";

type FormState = {
    name: string;
    email: string;
    reason: string;
    message: string;
};

export default function Page() {
    const [form, setForm] = useState<FormState>({
        name: "", email: "", reason: "", message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch("api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            setStatus("success");
            setForm({ name: "", email: "", reason: "", message: "" });
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="w-full flex bg-white">
            <div className="w-full flex flex-col px-16 py-30 gap-80 bg-primary-400">
                <div className="max-w-2/3 flex flex-col gap-24">
                    <div className="flex flex-col gap-6">
                        <p className='text-body-sm font-DMSans-400 text-primary-200'>GET IN TOUCH</p>
                        <p className='text-display font-DMSerif-Reg text-primary-50 leading-none'>We'd love to <span className="font-DMSerif-Italic">hear from you</span></p>
                        <p className='text-body font-DMSans-400 text-primary-100 text-wrap'>
                            Whether you're a nonprofit looking to list your products, a buyer
                            with a question, or just someone who believes shopping can do more
                            good - we're here.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex gap-2 items-center justify-start">
                            <div className="w-[36px] h-[36px] flex items-center justify-center border-2 rounded-md border-primary-300 cursor-pointer" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                                <MaskedIcon src="/icons/envelope-regular-full.svg" size="24px" className="text-primary-200" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <p className='text-body-sm font-DMSans-400 text-primary-200 leading-none'>EMAIL</p>
                                <p className='text-body font-DMSans-400 text-primary-100 leading-none'>hello@arelia.org</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center justify-start">
                            <div className="w-[36px] h-[36px] flex items-center justify-center border-2 rounded-md border-primary-300 cursor-pointer" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                                <MaskedIcon src="/icons/clock-regular-full.svg" size="24px" className="text-primary-200" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <p className='text-body-sm font-DMSans-400 text-primary-200 leading-none'>RESPONSE TIME</p>
                                <p className='text-body font-DMSans-400 text-primary-100 leading-none'>Within 48 hours</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className='text-body font-DMSerif-Italic text-primary-200'>"Every purchase has a story worth telling."</p>
            </div>

            <div className="w-full flex flex-col px-16 py-24 gap-12 justify-center">
                <div className="flex flex-col gap-6">
                    <h1 className='text-h1 font-DMSerif-Reg text-surface-400 leading-none'>Send us a message</h1>
                    <p className='text-body font-DMSans-400 text-surface-300 leading-none'>Fill in the form and we'll get back to you as soon as we can.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* Full Name */}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="name" className='text-body font-DMSans-400 text-surface-300 leading-none'>Full Name</label>
                        <input id="name" name="name" type="text"
                            placeholder="Jane Smith" value={form.name}
                            onChange={handleChange} required
                            className="p-3 text-body font-DMSans-400 text-surface-400
                                placeholder:text-surface-200 leading-none border border-surface-200
                                rounded-sm outline-none focus:border-primary-200 focus:ring-[3px]
                                focus:ring-primary-300/20 transition-all"
                        />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="email" className='text-body font-DMSans-400 text-surface-300 leading-none'>Email Address</label>
                        <input id="email" name="email" type="email"
                            placeholder="jane@example.com" value={form.email}
                            onChange={handleChange} required
                            className="p-3 text-body font-DMSans-400 text-surface-400
                                placeholder:text-surface-200 leading-none border border-surface-200
                                rounded-sm outline-none focus:border-primary-200 focus:ring-[3px]
                                focus:ring-primary-300/20 transition-all"
                        />
                    </div>

                    {/* Reason */}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="reason" className='text-body font-DMSans-400 text-surface-300 leading-none'>What's this about?</label>
                        <select id="reason" name="reason" value={form.reason}
                            onChange={handleChange} required
                            className="p-3 text-body font-DMSans-400 text-surface-400
                                placeholder:text-surface-200 leading-none border border-surface-200
                                rounded-sm outline-none appearance-none cursor-pointer
                                focus:border-primary-200 focus:ring-[3px] focus:ring-primary-300/20 transition-all"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23B4B2A9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center"
                            }}
                        >
                            <option value="" disabled>Select a reason</option>
                            <option value="nonprofit">I'm a nonprofit looking to partner</option>
                            <option value="product">Question about a product</option>
                            <option value="press">Press or media inquiry</option>
                            <option value="other">Something else</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="message" className='text-body font-DMSans-400 text-surface-300 leading-none'>Message</label>
                        <textarea id="message" name="message"
                            placeholder="Tell us what's on your mind..." value={form.message}
                            onChange={handleChange} required rows={5}
                            className="p-3 text-body font-DMSans-400 text-surface-400
                                placeholder:text-surface-200 leading-none border border-surface-200
                                rounded-sm outline-none focus:border-primary-200 focus:ring-[3px]
                                focus:ring-primary-300/20 transition-all resize-y"
                        />
                    </div>

                    {/* Error */}
                    {status === "error" && (
                        <p className='text-body font-DMSans-400 text-red-600 leading-none'>
                            Something went wrong. Please try again.
                        </p>
                    )}

                    {/* Success */}
                    {status === "success" && (
                        <p className='text-body font-DMSans-400 text-primary-300 leading-none'>
                            Message sent! We'll be in touch within 48 hours.
                        </p>
                    )}

                    {/* Submit button */}
                    <button type="submit" disabled={status === "loading"}
                        className={`${buttonClass} ${status === "loading" ? "btn-disabled" :"btn-primary"} w-fit`}
                    >
                        {status === "loading" ? "Sending..." : "Send message"}
                    </button>

                </form>
            </div>
        </div>
    )
}