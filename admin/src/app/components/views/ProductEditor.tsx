import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { client } from '@shared/client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

interface ProductEditorProps {
    onNavigate: (view: string) => void;
}

export function ProductEditor({ onNavigate }: ProductEditorProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        image: '',
        status: 'Active',
        visibility: 'Public',
        priceRange: '',
        margin: '',
        printifySync: 'Synced'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Basic validation
            if (!formData.name || !formData.price) {
                alert('Please fill in required fields');
                setIsLoading(false);
                return;
            }

            const newProduct = {
                ...formData,
                // Default values for fields not in form
                priceRange: formData.price,
                margin: '50%', // Default margin
                lastUpdated: 'Just now',
                visibility: formData.visibility as "Public" | "Hidden" | "Scheduled",
                status: formData.status as "Draft" | "Active" | "Archived",
                printifySync: formData.printifySync as "Synced" | "Pending" | "Error"
            };

            const result = await client.createProduct(newProduct);

            if (result) {
                // Navigate back to products list
                onNavigate('products');
            } else {
                alert('Failed to create product');
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onNavigate('products')}
                    className="h-8 w-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-semibold">Create Product</h1>
                    <p className="text-sm text-muted-foreground">Add a new product to your catalog</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Performance Tee"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(val) => handleSelectChange('category', val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Men">Men</SelectItem>
                                    <SelectItem value="Women">Women</SelectItem>
                                    <SelectItem value="Unisex">Unisex</SelectItem>
                                    <SelectItem value="Accessories">Accessories</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price *</Label>
                            <Input
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="$0.00"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(val) => handleSelectChange('status', val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                    <SelectItem value="Archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="image">Image URL</Label>
                            <Input
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                            <p className="text-xs text-muted-foreground">
                                Enter a direct link to an image.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onNavigate('products')}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        <Save className="w-4 h-4 mr-2" />
                        {isLoading ? 'Saving...' : 'Save Product'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
