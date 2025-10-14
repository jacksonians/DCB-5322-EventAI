import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Store, Search, Star, MapPin, DollarSign, Filter, Heart } from 'lucide-react';

interface VendorMarketplacePageProps {
  onNavigate: (page: string) => void;
}

export function VendorMarketplacePage({ onNavigate }: VendorMarketplacePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const vendors = [
    {
      id: '1',
      name: 'Grand Vista Venues',
      category: 'venue',
      rating: 4.8,
      reviews: 124,
      location: 'Downtown',
      priceRange: '$$$',
      image: 'venue1',
      specialty: 'Corporate Events',
      availability: 'Available',
      featured: true
    },
    {
      id: '2',
      name: 'Gourmet Catering Co.',
      category: 'catering',
      rating: 4.9,
      reviews: 89,
      location: 'Citywide',
      priceRange: '$$',
      image: 'catering1',
      specialty: 'Fine Dining',
      availability: 'Booked until March',
      featured: false
    },
    {
      id: '3',
      name: 'Harmony Sound Systems',
      category: 'audio',
      rating: 4.7,
      reviews: 156,
      location: 'Metro Area',
      priceRange: '$$',
      image: 'audio1',
      specialty: 'Live Events',
      availability: 'Available',
      featured: true
    },
    {
      id: '4',
      name: 'Bloom & Blossom Florals',
      category: 'decoration',
      rating: 4.6,
      reviews: 203,
      location: 'Garden District',
      priceRange: '$',
      image: 'floral1',
      specialty: 'Wedding & Corporate',
      availability: 'Available',
      featured: false
    },
    {
      id: '5',
      name: 'Elite Photography Studio',
      category: 'photography',
      rating: 4.9,
      reviews: 67,
      location: 'Downtown',
      priceRange: '$$$',
      image: 'photo1',
      specialty: 'Event Coverage',
      availability: 'Limited Slots',
      featured: true
    },
    {
      id: '6',
      name: 'Premier Transportation',
      category: 'transport',
      rating: 4.5,
      reviews: 98,
      location: 'Citywide',
      priceRange: '$$',
      image: 'transport1',
      specialty: 'Group Travel',
      availability: 'Available',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: vendors.length },
    { id: 'venue', name: 'Venues', count: vendors.filter(v => v.category === 'venue').length },
    { id: 'catering', name: 'Catering', count: vendors.filter(v => v.category === 'catering').length },
    { id: 'audio', name: 'Audio/Visual', count: vendors.filter(v => v.category === 'audio').length },
    { id: 'decoration', name: 'Decoration', count: vendors.filter(v => v.category === 'decoration').length },
    { id: 'photography', name: 'Photography', count: vendors.filter(v => v.category === 'photography').length },
    { id: 'transport', name: 'Transportation', count: vendors.filter(v => v.category === 'transport').length }
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getAvailabilityColor = (availability: string) => {
    if (availability === 'Available') return 'bg-green-100 text-green-800 border-green-300';
    if (availability.includes('Limited')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Store size={24} className="text-gray-800" />
          <h1>Vendor Marketplace</h1>
        </div>
      </section>

      {/* Search */}
      <section>
        <Card className="p-4 border-2 border-gray-800 bg-white">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search vendors, services, or specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-2 border-gray-300 focus:border-gray-800"
            />
          </div>
        </Card>
      </section>

      {/* Category Tabs */}
      <section>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-gray-800 text-white" : ""}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </section>



      {/* All Vendors */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2>
            {selectedCategory === 'all' ? 'All Vendors' : categories.find(c => c.id === selectedCategory)?.name}
            <span className="text-gray-500 ml-2">({filteredVendors.length})</span>
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Button variant="outline" size="sm">Rating</Button>
            <Button variant="ghost" size="sm">Price</Button>
            <Button variant="ghost" size="sm">Distance</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {filteredVendors.map((vendor) => (
            <Card key={vendor.id} className="p-4 border-2 border-gray-800 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3>{vendor.name}</h3>
                      {vendor.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{vendor.specialty}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Heart size={16} />
                  </Button>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-current" />
                    <span className="text-sm">{vendor.rating}</span>
                    <span className="text-sm text-gray-500">({vendor.reviews})</span>
                  </div>
                  <Badge className={`border ${getAvailabilityColor(vendor.availability)} text-xs`}>
                    {vendor.availability}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign size={14} />
                    <span>{vendor.priceRange}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white" size="sm">
                  More Information
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}