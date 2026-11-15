import Cylinder3DRing from "./cylinder3-d-ring";

export default function DemoPage() {
    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-stone-100 dark:bg-stone-950 p-4 sm:p-6 md:p-8 transition-colors duration-300">
            <div className="w-full max-w-4xl">
                <Cylinder3DRing />
            </div>
        </main>
    );
}
