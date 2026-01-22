import { Button } from '../ui/button';

export function Hero() {
    return (
        <section className="relative h-[85vh] bg-black overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1664673605025-413c63a88ad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdvbWFuJTIwd29ya291dHxlbnwxfHx8fDE3Njc2Mjk0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Hero"
                    className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="relative h-full mx-auto max-w-7xl px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl">
                    <p className="text-accent uppercase tracking-widest text-sm mb-6">
                        2026 Collection
                    </p>
                    <h2 className="text-6xl lg:text-8xl uppercase tracking-tight text-white mb-8 leading-[0.9]">
                        Unleash<br />Your<br />Power
                    </h2>
                    <p className="text-lg text-white/90 mb-12 max-w-md">
                        Performance-driven athletic wear designed for those who refuse to settle for ordinary.
                    </p>
                    <Button className="bg-accent text-white h-auto px-12 py-4 uppercase tracking-wider hover:bg-accent/90 transition-colors text-base rounded-none">
                        Shop Now
                    </Button>
                </div>
            </div>
        </section>
    );
}
