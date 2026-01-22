import { Input } from '../ui/input';
import { Label } from '../ui/label';


export function AddressForm() {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h2 className="font-heading text-xl">Contact Information</h2>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                </div>
            </div>

            <div className="space-y-4 pt-6">
                <h2 className="font-heading text-xl">Shipping Address</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1 grid gap-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="col-span-2 sm:col-span-1 grid gap-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" placeholder="Doe" />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input id="apartment" placeholder="Apt 4B" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3 sm:col-span-1 grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" />
                    </div>
                    <div className="col-span-3 sm:col-span-1 grid gap-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="NY" />
                    </div>
                    <div className="col-span-3 sm:col-span-1 grid gap-2">
                        <Label htmlFor="zipCode">ZIP code</Label>
                        <Input id="zipCode" placeholder="10001" />
                    </div>
                </div>
            </div>
        </div>
    );
}
