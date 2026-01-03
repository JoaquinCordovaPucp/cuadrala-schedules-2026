export default function MainComponentLayout( { children }) {
    return (
        <div className="overflow-y-auto w-full h-full bg-[#F8F7FC] rounded-lg shadow-[0_2px_100px_rgba(0,0,0,0.25)] px-2.5 md:px-6 gap-2 flex flex-col py-3 mb-2 ">
            {children}
        </div>
    );
}