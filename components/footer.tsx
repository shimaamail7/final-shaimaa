import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { Logo } from "./logo"
import { useRef } from "react"

// Custom X (Twitter) icon
function XIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}

const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: XIcon, href: "https://x.com", label: "X" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
]

const navLinksColumn1 = [
    { label: "About us", href: "/about" },
    { label: "Our lenses", href: "/lenses" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Order system", href: "/order-system" },
    { label: "Quality standards", href: "/quality" },
]

const navLinksColumn2 = [
    { label: "Manufacturing", href: "/manufacturing" },
    { label: "Support", href: "/support" },
    { label: "Contact us", href: "/contact" },
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
]

export function Footer() {
    const logoRef = useRef<SVGSVGElement>(null)
    return (
        < footer className="relative bg-black content-end-safe " >
            {/* Main footer content */}
            < div className="mx-auto max-w-7xl px-6 pb-10  sm:px-10 md:px-16 lg:px-[120px] lg:pb-12 lg:pt-20 content-end-safe " >
                <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-20">
                    {/* Left Side - Logo, Address, Contact, Social */}
                    <div className="space-y-8">
                        {/* Logo */}
                        <Link href="/" className="inline-block">
                            <Logo
                                ref={logoRef}
                                className="relative z-10 w-16 max-w-[24vw] md:w-32 lg:w-40"
                                fill="#ffffff"
                            />
                        </Link>

                        {/* Address */}
                        <div>
                            <p className="text-sm font-semibold text-white">Address</p>
                            <p className="mt-1 text-sm text-white">Prague, Czech Republic</p>
                        </div>

                        {/* Contact */}
                        <div>
                            <p className="text-sm font-semibold text-white">Contact</p>
                            <div className="mt-1 space-y-0.5">
                                <Link
                                    href="tel:+420257311111"
                                    className="block text-sm text-white underline transition-opacity hover:opacity-80"
                                >
                                    +420 2 5731 1111
                                </Link>
                                <Link
                                    href="mailto:hello@optika.com"
                                    className="block text-sm text-white underline transition-opacity hover:opacity-80"
                                >
                                    hello@optika.com
                                </Link>
                            </div>
                        </div>

                        {/* Social icons */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center text-white transition-opacity hover:opacity-80"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Navigation Columns */}
                    <nav aria-label="Footer navigation" className="flex items-end gap-16 sm:gap-24 lg:gap-28">
                        {/* Column 1 */}
                        <ul className="space-y-4">
                            {navLinksColumn1.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-medium text-white transition-opacity hover:opacity-80"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Column 2 */}
                        <ul className="space-y-4">
                            {navLinksColumn2.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-medium text-white transition-opacity hover:opacity-80"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div >

            {/* Divider */}
            < div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-[120px] " >
                <div className="border-t border-white/20" />
            </div >

            {/* Bottom bar */}
            < div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 md:px-16 lg:px-[120px]" >
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <p className="text-sm text-white">
                        &copy; 2025 Optika. All rights reserved.
                    </p>
                    <nav aria-label="Legal links" className="flex flex-wrap items-center gap-6">
                        <Link
                            href="/privacy"
                            className="text-sm text-white underline transition-opacity hover:opacity-80"
                        >
                            Privacy policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-sm text-white underline transition-opacity hover:opacity-80"
                        >
                            Terms of service
                        </Link>
                        <Link
                            href="/cookies"
                            className="text-sm text-white underline transition-opacity hover:opacity-80"
                        >
                            Cookies settings
                        </Link>
                    </nav>
                </div>
            </div >
        </footer >
    )
}
