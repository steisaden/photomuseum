import { Upload, Plus, ExternalLink, RefreshCw, Trash } from 'lucide-react';
import { useState } from 'react';

interface Artwork {
  id: number;
  name: string;
  url: string;
  status: 'Ready' | 'Uploading' | 'Error';
}

export function DesignManager() {
  const [selectedBlueprint, setSelectedBlueprint] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null);

  const artworks: Artwork[] = [
    { id: 1, name: 'logo-design-v2.png', url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=200', status: 'Ready' },
    { id: 2, name: 'summer-graphic.png', url: 'https://images.unsplash.com/photo-1626958390898-162d3577f293?w=200', status: 'Ready' },
  ];

  const blueprints = [
    'Unisex T-Shirt',
    'Unisex Hoodie',
    'Unisex Sweatshirt',
    'Tank Top',
    'Long Sleeve',
    'Baseball Hat',
    'Beanie',
  ];

  const providers = [
    'Bella + Canvas',
    'Gildan',
    'Next Level',
    'District',
    'Monster Digital',
  ];

  const colors = [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Black', hex: '#000000' },
    { name: 'Navy', hex: '#001F3F' },
    { name: 'Heather Gray', hex: '#CCCCCC' },
    { name: 'Red', hex: '#DC0000' },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Design Manager</h1>
        <p className="text-sm text-muted-foreground">
          Create and configure print-ready products for Printify
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Panel - Configuration */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Blueprint</label>
              <select
                value={selectedBlueprint}
                onChange={(e) => setSelectedBlueprint(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select blueprint...</option>
                {blueprints.map((bp) => (
                  <option key={bp} value={bp}>{bp}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Print Provider</label>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select provider...</option>
                {providers.map((prov) => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
              {selectedProvider && (
                <p className="text-xs text-muted-foreground mt-2">
                  Base cost: $8.50 - $12.00
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Garment Colors</label>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-lg border-2 ${selectedColor === color.name
                        ? 'border-accent ring-2 ring-accent/20'
                        : 'border-border hover:border-accent/50'
                      }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Print Areas</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-input" />
                  <span className="text-sm">Front</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-input" />
                  <span className="text-sm">Back</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-input" />
                  <span className="text-sm">Left Sleeve</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-input" />
                  <span className="text-sm">Right Sleeve</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Artwork & Preview */}
        <div className="col-span-12 lg:col-span-6 space-y-4">
          {/* Artwork Upload */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Artwork</h3>
              <button className="bg-accent hover:bg-accent/90 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <Upload className="w-4 h-4" />
                Upload
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {artworks.map((artwork) => (
                <div
                  key={artwork.id}
                  onClick={() => setSelectedArtwork(artwork.id)}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${selectedArtwork === artwork.id
                      ? 'border-accent ring-2 ring-accent/20'
                      : 'border-border hover:border-accent/50'
                    }`}
                >
                  <img src={artwork.url} alt={artwork.name} className="w-full h-full object-cover" />
                  <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:bg-red-50 transition-colors">
                    <Trash className="w-3 h-3 text-red-600" />
                  </button>
                </div>
              ))}
              <button className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-accent/50 hover:bg-muted/30 transition-colors">
                <Plus className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add More</span>
              </button>
            </div>

            {selectedArtwork && (
              <div className="pt-4 border-t border-border space-y-4">
                <h4 className="text-sm font-medium">Placement Controls</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Scale</label>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      defaultValue="100"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Rotation</label>
                    <input
                      type="range"
                      min="-45"
                      max="45"
                      defaultValue="0"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">X Position</label>
                    <input
                      type="number"
                      defaultValue="0"
                      className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Y Position</label>
                    <input
                      type="number"
                      defaultValue="0"
                      className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview Mockup */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Preview</h3>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              {selectedArtwork ? (
                <div className="w-3/4 h-3/4 flex items-center justify-center">
                  <img
                    src={artworks.find(a => a.id === selectedArtwork)?.url}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Select artwork to preview</p>
              )}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              This is a basic preview. Use "Open in Printify" for advanced editing.
            </p>
          </div>
        </div>

        {/* Right Panel - Metadata & Actions */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Cost Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Cost:</span>
                  <span className="font-medium">$10.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Print Fee:</span>
                  <span className="font-medium">$2.50</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-medium">Total Cost:</span>
                  <span className="font-semibold">$13.00</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Variant Coverage</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sizes configured:</span>
                  <span className="font-medium text-green-600">6/6</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Colors configured:</span>
                  <span className="font-medium text-yellow-600">1/5</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-3">
              <button className="w-full bg-accent hover:bg-accent/90 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                Create in Printify
              </button>
              <button className="w-full bg-muted hover:bg-muted/80 text-foreground px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Sync Mockups
              </button>
              <button className="w-full bg-muted hover:bg-muted/80 text-foreground px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                Import as Draft
              </button>
              <button className="w-full border border-border hover:bg-muted text-foreground px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                <ExternalLink className="w-4 h-4" />
                Open in Printify
              </button>
            </div>

            <p className="text-xs text-muted-foreground pt-4 border-t border-border">
              This tool creates the base product. Use Printify's advanced editor for complex designs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
