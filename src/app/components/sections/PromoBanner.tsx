import { Button } from '../ui/button';

export function PromoBanner() {
    return (
        <section className="bg-black text-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-accent uppercase tracking-widest text-sm mb-6">
                            Performance First
                        </p>
                        <h2 className="text-5xl lg:text-6xl uppercase tracking-tight mb-8 leading-tight">
                            Built for<br />Champions
                        </h2>
                        <p className="text-lg text-white/80 mb-10 max-w-lg">
                            Every piece is engineered with advanced moisture-wicking technology,
                            four-way stretch, and durability that matches your ambition.
                        </p>
                        <Button className="bg-transparent border-2 border-white text-white h-auto px-10 py-3 uppercase tracking-wider hover:bg-white hover:text-black transition-colors rounded-none text-base">
                            Learn More
                        </Button>
                    </div>
                    <div className="aspect-square bg-accent/10 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1759300642338-c5c7cd576a22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMG1hbiUyMHRyYWluaW5nfGVufDF8fHx8MTc2NzY0MDYyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt="Performance"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
