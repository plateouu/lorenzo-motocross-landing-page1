export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full overflow-x-hidden bg-[#F4F3EC]">
            {children}
        </div>
    )
}
