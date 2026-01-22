import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div>
                        <h3 className="uppercase tracking-tight mb-6">Shop</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Women</a></li>
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Men</a></li>
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Collections</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="uppercase tracking-tight mb-6">Support</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Contact Us</a></li>
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Shipping Info</a></li>
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Returns</a></li>
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Size Guide</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="uppercase tracking-tight mb-6">Company</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">About Us</a></li>
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Careers</a></li>
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Sustainability</a></li>
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="uppercase tracking-tight mb-6">Newsletter</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Get exclusive access to new drops and special offers.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 bg-input-background focus-visible:ring-accent"
                            />
                            <Button className="bg-accent text-white hover:bg-accent/90 uppercase tracking-wide">
                                Join
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-border">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            © 2026 Asshole Athletic. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                                Terms
                            </a>
                            <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                                Privacy
                            </a>
                            <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
