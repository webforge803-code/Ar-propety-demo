import React, { useState, useEffect } from 'react';
import {
  Home, Search, MapPin, Bed, Bath, Square, Phone,
  Mail, MessageCircle, Calculator, ChevronRight,
  Menu, X, User, Briefcase, Star, Plus, Edit, Trash2, LayoutDashboard,
  CheckCircle
} from 'lucide-react';

// --- DEMO DATA ---
const mockProperties = [
  {
    id: '1',
    title: 'Pavilion Damansara Heights, Luxury Condo',
    price: 1500000,
    listingType: 'Beli',
    propertyType: 'Condominium',
    location: 'Damansara Heights, Kuala Lumpur',
    bedrooms: 3,
    bathrooms: 2,
    builtUp: 1200,
    furnishing: 'Fully Furnished',
    tenure: 'Freehold',
    status: 'Active',
    featured: true,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    description: 'Kondominium mewah dengan kemudahan bertaraf dunia. Terletak bersebelahan stesen MRT dan pusat membeli-belah Pavilion. Sesuai untuk pelaburan atau kediaman sendiri.'
  },
  {
    id: '2',
    title: 'Tropicana Aman, 2-Storey Link House',
    price: 850000,
    listingType: 'Beli',
    propertyType: 'Landed',
    location: 'Kota Kemuning, Selangor',
    bedrooms: 4,
    bathrooms: 3,
    builtUp: 2200,
    furnishing: 'Partially Furnished',
    tenure: 'Leasehold',
    status: 'Active',
    featured: true,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    description: 'Rumah teres 2 tingkat yang luas di persekitaran hijau yang tenang. Komuniti berpagar dan berpengawal dengan rumah kelab persendirian.'
  },
  {
    id: '3',
    title: 'Verve Suites, Mont Kiara',
    price: 3500,
    listingType: 'Sewa',
    propertyType: 'Serviced Residence',
    location: 'Mont Kiara, Kuala Lumpur',
    bedrooms: 1,
    bathrooms: 1,
    builtUp: 650,
    furnishing: 'Fully Furnished',
    tenure: 'Freehold',
    status: 'Active',
    featured: false,
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
    description: 'Unit studio bergaya moden sesuai untuk ekspatriat. Dilengkapi perabot penuh berjenama dan akses terus ke restoran serta pusat membeli-belah.'
  }
];

const AGENT_INFO = {
  name: "Ahmad Razali",
  ren: "REN 12345",
  agency: "Elite Property Realty",
  phone: "60123456789",
  email: "ahmad.razali@property.com",
  experience: "8 Tahun",
  areas: ["Kuala Lumpur", "Petaling Jaya", "Shah Alam", "Damansara"],
  photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
};

const formatPrice = (price) =>
  new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR',
    maximumFractionDigits: 0
  }).format(price);

const generateWhatsAppLink = (text) =>
  `https://wa.me/${AGENT_INFO.phone}?text=${encodeURIComponent(text)}`;

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [properties, setProperties] = useState(mockProperties);
  const [leads, setLeads] = useState([
    {
      id: 'demo-1',
      name: 'Ali Bin Abu',
      phone: '019-1234567',
      email: 'ali@example.com',
      propertyId: '1',
      propertyTitle: 'Pavilion Damansara Heights, Luxury Condo',
      message: 'Hai, saya ingin mengatur sesi tontonan.',
      status: 'Baru',
      date: new Date().toISOString()
    }
  ]);

  const [searchFilters, setSearchFilters] = useState({
    listingType: 'Semua',
    location: '',
    minPrice: '',
    maxPrice: ''
  });

  const navigateTo = (view, propertyId = null) => {
    setCurrentView(view);
    if (propertyId) setSelectedPropertyId(propertyId);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigateTo('search');
  };

  const addMockProperty = () => {
    const newProp = {
      id: `demo-${Date.now()}`,
      title: 'New Mock Listing ' + Math.floor(Math.random() * 1000),
      price: 500000,
      listingType: 'Beli',
      propertyType: 'Condominium',
      location: 'Kuala Lumpur',
      bedrooms: 3,
      bathrooms: 2,
      builtUp: 1000,
      furnishing: 'Fully Furnished',
      tenure: 'Freehold',
      status: 'Active',
      featured: false,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
      description: 'Mock property added via dashboard.'
    };
    setProperties(prev => [...prev, newProp]);
  };

  const deleteProperty = (id) => {
    if (window.confirm('Adakah anda pasti untuk memadam hartanah ini?')) {
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  };

  const submitLead = (lead) => {
    setLeads(prev => [
      ...prev,
      { ...lead, id: `lead-${Date.now()}`, status: 'Baru', date: new Date().toISOString() }
    ]);
  };

  const updateLeadStatus = (id, status) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const Navigation = () => (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                <Home className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-2xl text-blue-900 tracking-tight">AR Property</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigateTo('home')} className="text-gray-600 hover:text-blue-900 font-medium transition-colors">Utama</button>
            <button onClick={() => navigateTo('search')} className="text-gray-600 hover:text-blue-900 font-medium transition-colors">Hartanah</button>
            <button onClick={() => navigateTo('profile')} className="text-gray-600 hover:text-blue-900 font-medium transition-colors">Profil Ejen</button>
            {isAdmin && (
              <button onClick={() => navigateTo('admin')} className="text-red-600 font-bold hover:text-red-800 transition-colors flex items-center gap-1">
                <LayoutDashboard size={18} /> CRM
              </button>
            )}
            <a href={generateWhatsAppLink("Hai Ahmad, saya ingin bertanya tentang servis hartanah anda.")}
              target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
              <MessageCircle size={20} /> WhatsApp Saya
            </a>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-blue-900 focus:outline-none">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <button onClick={() => navigateTo('home')} className="block w-full text-left px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 rounded-md">Utama</button>
            <button onClick={() => navigateTo('search')} className="block w-full text-left px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 rounded-md">Semua Hartanah</button>
            <button onClick={() => navigateTo('profile')} className="block w-full text-left px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 rounded-md">Profil Ejen</button>
            {isAdmin && (
              <button onClick={() => navigateTo('admin')} className="block w-full text-left px-3 py-3 text-base font-bold text-red-600 hover:bg-red-50 rounded-md">CRM Admin</button>
            )}
            <div className="px-3 pt-3">
              <a href={generateWhatsAppLink("Hai Ahmad, saya ingin bertanya tentang servis hartanah anda.")}
                target="_blank" rel="noopener noreferrer"
                className="w-full bg-green-500 text-white px-5 py-3 rounded-md font-semibold flex items-center justify-center gap-2">
                <MessageCircle size={20} /> WhatsApp Sekarang
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full cursor-pointer group"
      onClick={() => navigateTo('property', property.id)}>
      <div className="relative h-56 overflow-hidden">
        <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${property.listingType === 'Beli' ? 'bg-blue-600' : 'bg-orange-500'}`}>
            Untuk {property.listingType}
          </span>
          {property.featured && (
            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
              <Star size={12} className="fill-current" /> Pilihan
            </span>
          )}
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="text-2xl font-bold text-blue-900 mb-1">
          {formatPrice(property.price)}
          {property.listingType === 'Sewa' && <span className="text-sm text-gray-500 font-normal"> /bulan</span>}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
        <p className="text-gray-500 text-sm flex items-center gap-1 mb-4 line-clamp-1">
          <MapPin size={16} /> {property.location}
        </p>
        <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 mt-auto">
          <div className="flex flex-col items-center justify-center text-gray-600">
            <Bed size={18} className="mb-1 text-gray-400" />
            <span className="text-sm font-semibold">{property.bedrooms} Bilik</span>
          </div>
          <div className="flex flex-col items-center justify-center text-gray-600 border-l border-r border-gray-100">
            <Bath size={18} className="mb-1 text-gray-400" />
            <span className="text-sm font-semibold">{property.bathrooms} Bilik Air</span>
          </div>
          <div className="flex flex-col items-center justify-center text-gray-600">
            <Square size={18} className="mb-1 text-gray-400" />
            <span className="text-sm font-semibold">{property.builtUp} kps</span>
          </div>
        </div>
      </div>
    </div>
  );

  const HomeView = () => (
    <div>
      <div className="relative bg-blue-900 h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80"
            alt="Hero Background" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Cari Hartanah Idaman Anda Dengan Yakin</h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Kepakaran saya membantu anda mencari rumah yang tepat, sama ada untuk kediaman atau pelaburan bernilai tinggi di Malaysia.
          </p>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4">
              <select className="p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-1/4"
                value={searchFilters.listingType} onChange={e => setSearchFilters({...searchFilters, listingType: e.target.value})}>
                <option value="Semua">Semua Status</option><option value="Beli">Untuk Dijual</option><option value="Sewa">Untuk Disewa</option>
              </select>
              <div className="relative w-full md:w-2/4">
                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input type="text" placeholder="Kawasan atau Lokasi (cth: Bangsar)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={searchFilters.location} onChange={e => setSearchFilters({...searchFilters, location: e.target.value})} />
              </div>
              <button type="submit" className="w-full md:w-1/4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Search size={20} /> Cari
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div><h2 className="text-3xl font-bold text-gray-900 mb-2">Hartanah Pilihan Eksklusif</h2>
              <p className="text-gray-600">Pilihan hartanah terbaik yang disyorkan oleh ejen anda.</p></div>
            <button onClick={() => navigateTo('search')} className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-800">Lihat Semua <ChevronRight size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.filter(p => p.featured).slice(0,3).map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
          <button onClick={() => navigateTo('search')} className="md:hidden mt-8 w-full py-3 bg-white border border-gray-300 rounded-xl text-gray-700 font-semibold flex justify-center items-center gap-2">Lihat Semua Hartanah</button>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="md:w-2/5 h-64 md:h-auto relative">
              <img src={AGENT_INFO.photo} alt={AGENT_INFO.name} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="md:w-3/5 p-10 md:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Kenali Perunding Hartanah Anda</h2>
              <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                Hai, saya {AGENT_INFO.name}. Dengan pengalaman {AGENT_INFO.experience} dalam pasaran hartanah Malaysia, saya komited untuk membantu anda membuat keputusan pelaburan dan pembelian perumahan yang paling tepat. Hubungi saya untuk perundingan percuma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigateTo('profile')} className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">Profil Penuh Saya</button>
                <a href={generateWhatsAppLink("Hai, saya berminat untuk mendapatkan khidmat nasihat hartanah daripada anda.")}
                  target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors">
                  <MessageCircle size={20} /> Bincang di WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SearchView = () => {
    const filteredProperties = properties.filter(p => {
      const matchType = searchFilters.listingType === 'Semua' || p.listingType === searchFilters.listingType;
      const matchLoc = p.location.toLowerCase().includes(searchFilters.location.toLowerCase());
      const matchMin = !searchFilters.minPrice || p.price >= Number(searchFilters.minPrice);
      const matchMax = !searchFilters.maxPrice || p.price <= Number(searchFilters.maxPrice);
      return matchType && matchLoc && matchMin && matchMax;
    });

    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Senarai Hartanah</h1>
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 flex flex-col md:flex-row gap-4 border border-gray-100">
            <select className="p-3 border border-gray-200 rounded-xl bg-gray-50 w-full md:w-1/4"
              value={searchFilters.listingType} onChange={e => setSearchFilters({...searchFilters, listingType: e.target.value})}>
              <option value="Semua">Semua Status</option><option value="Beli">Beli Sahaja</option><option value="Sewa">Sewa Sahaja</option>
            </select>
            <input type="text" placeholder="Tapis Lokasi..." className="w-full md:w-2/4 p-3 border border-gray-200 rounded-xl bg-gray-50"
              value={searchFilters.location} onChange={e => setSearchFilters({...searchFilters, location: e.target.value})} />
            <input type="number" placeholder="Harga Min" className="w-full md:w-1/8 p-3 border border-gray-200 rounded-xl bg-gray-50"
              value={searchFilters.minPrice} onChange={e => setSearchFilters({...searchFilters, minPrice: e.target.value})} />
            <input type="number" placeholder="Harga Max" className="w-full md:w-1/8 p-3 border border-gray-200 rounded-xl bg-gray-50"
              value={searchFilters.maxPrice} onChange={e => setSearchFilters({...searchFilters, maxPrice: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.length > 0 ? filteredProperties.map(p => <PropertyCard key={p.id} property={p} />) :
              <div className="col-span-full text-center py-20"><Search size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-600">Tiada hartanah dijumpai</h3><p className="text-gray-400">Cuba ubah penapis carian anda.</p>
              </div>}
          </div>
        </div>
      </div>
    );
  };

  const PropertyDetailView = () => {
    const property = properties.find(p => p.id === selectedPropertyId);
    const [price, setPrice] = useState(property?.price || 500000);
    const [downpayment, setDownpayment] = useState(10);
    const [years, setYears] = useState(35);
    const [rate, setRate] = useState(4.0);

    if (!property) return <div className="p-20 text-center">Memuatkan...</div>;

    const loanAmount = price - (price * (downpayment / 100));
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment = monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : loanAmount / numberOfPayments;

    const whatsappMsg = `Hai ${AGENT_INFO.name}, saya berminat dengan hartanah ini: ${property.title} (${formatPrice(property.price)}). Boleh saya dapatkan maklumat lanjut?`;

    const handleLeadSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      submitLead({
        name: form.name.value, phone: form.phone.value, email: form.email.value,
        propertyId: property.id, propertyTitle: property.title, message: form.message.value
      });
      alert("Terima kasih! Pertanyaan anda telah dihantar. Saya akan menghubungi anda segera.");
      form.reset();
    };

    return (
      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="w-full h-[50vh] md:h-[60vh] relative bg-gray-900">
          <img src={property.image} alt={property.title} className="w-full h-full object-cover opacity-80" />
          <button onClick={() => navigateTo('search')} className="absolute top-6 left-6 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg hover:bg-white text-gray-800"><X size={24} /></button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-2 mb-4">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold text-white ${property.listingType === 'Beli' ? 'bg-blue-600' : 'bg-orange-500'}`}>Untuk {property.listingType}</span>
                  <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">{property.propertyType}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <p className="text-gray-500 flex items-center gap-2 mb-6 text-lg"><MapPin size={20}/> {property.location}</p>
                <div className="text-4xl font-bold text-blue-900 mb-8 pb-8 border-b border-gray-100">
                  {formatPrice(property.price)} {property.listingType === 'Sewa' && <span className="text-xl font-normal text-gray-500">/ bulan</span>}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3"><Bed className="text-blue-600" size={24}/><div><div className="text-sm text-gray-500">Bilik Tidur</div><div className="font-bold text-lg">{property.bedrooms}</div></div></div>
                  <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3"><Bath className="text-blue-600" size={24}/><div><div className="text-sm text-gray-500">Bilik Air</div><div className="font-bold text-lg">{property.bathrooms}</div></div></div>
                  <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3"><Square className="text-blue-600" size={24}/><div><div className="text-sm text-gray-500">Keluasan</div><div className="font-bold text-lg">{property.builtUp} <span className="text-sm">kps</span></div></div></div>
                  <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3"><Home className="text-blue-600" size={24}/><div><div className="text-sm text-gray-500">Pegangan</div><div className="font-bold text-lg">{property.tenure}</div></div></div>
                </div>
                <h3 className="text-xl font-bold mb-4">Penerangan</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>

              {property.listingType === 'Beli' && (
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Calculator /> Kalkulator Pinjaman Perumahan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Harga Hartanah (RM)</label><input type="number" value={price} onChange={e=>setPrice(Number(e.target.value))} className="w-full p-3 border rounded-xl bg-gray-50"/></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Wang Pendahuluan (%)</label><input type="number" value={downpayment} onChange={e=>setDownpayment(Number(e.target.value))} className="w-full p-3 border rounded-xl bg-gray-50"/></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Kadar Faedah (%)</label><input type="number" step="0.1" value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full p-3 border rounded-xl bg-gray-50"/></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Tempoh Pinjaman (Tahun)</label><input type="number" value={years} onChange={e=>setYears(Number(e.target.value))} className="w-full p-3 border rounded-xl bg-gray-50"/></div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <div className="text-sm text-blue-800 mb-1">Anggaran Ansuran Bulanan</div>
                    <div className="text-3xl font-bold text-blue-900">{formatPrice(monthlyPayment)} <span className="text-base font-normal">/ bulan</span></div>
                    <p className="text-xs text-blue-600 mt-2">*Pengiraan ini adalah untuk panduan dan anggaran sahaja.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:w-1/3 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                <div className="flex items-center gap-4 mb-6">
                  <img src={AGENT_INFO.photo} alt="Agent" className="w-16 h-16 rounded-full object-cover shadow-md" />
                  <div><h3 className="font-bold text-lg">{AGENT_INFO.name}</h3><p className="text-sm text-gray-500">{AGENT_INFO.ren} | {AGENT_INFO.agency}</p></div>
                </div>
                <div className="flex flex-col gap-3 mb-8">
                  <a href={generateWhatsAppLink(whatsappMsg)} target="_blank" rel="noopener noreferrer" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-center flex items-center justify-center gap-2 transition-colors shadow-md"><MessageCircle size={20}/> Tanya di WhatsApp</a>
                  <a href={`tel:${AGENT_INFO.phone}`} className="w-full bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold py-3 px-4 rounded-xl text-center flex items-center justify-center gap-2 transition-colors border border-blue-200"><Phone size={20}/> Hubungi Sekarang</a>
                </div>
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Tinggalkan Pesanan</h4>
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <input name="name" type="text" placeholder="Nama Anda" required className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-sm"/>
                    <input name="phone" type="tel" placeholder="Nombor Telefon" required className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-sm"/>
                    <input name="email" type="email" placeholder="Alamat Emel" required className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-sm"/>
                    <textarea name="message" rows="3" placeholder="Mesej anda..." defaultValue={`Hai, saya ingin mengatur sesi tontonan untuk ${property.title}.`} className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-sm"/>
                    <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl transition-colors">Hantar Pertanyaan</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProfileView = () => (
    <div className="bg-white min-h-screen">
      <div className="bg-blue-900 pt-20 pb-32 px-4 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Profil Perunding Hartanah</h1>
        <p className="text-blue-200 text-lg">Pakar rujukan anda dalam pasaran hartanah Malaysia.</p>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10">
            <div className="md:w-1/3">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white"><img src={AGENT_INFO.photo} alt={AGENT_INFO.name} className="w-full h-full object-cover"/></div>
              <div className="mt-8 space-y-4">
                <a href={generateWhatsAppLink("Hai Ahmad, mari bincang tentang perancangan hartanah saya.")} target="_blank" rel="noopener noreferrer" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"><MessageCircle size={20}/> WhatsApp</a>
                <a href={`tel:${AGENT_INFO.phone}`} className="w-full bg-blue-50 text-blue-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2"><Phone size={20}/> Hubungi</a>
                <a href={`mailto:${AGENT_INFO.email}`} className="w-full bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2"><Mail size={20}/> Emel</a>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{AGENT_INFO.name}</h2>
              <p className="text-xl text-blue-600 font-medium mb-1">{AGENT_INFO.agency}</p>
              <p className="text-gray-500 font-mono mb-8">{AGENT_INFO.ren}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Mengenai Saya</h3>
              <p className="text-gray-600 leading-relaxed mb-8">Saya adalah perunding hartanah berdaftar dengan pengalaman lebih {AGENT_INFO.experience}. Kepakaran utama saya adalah hartanah subsale, projek baru (new launch), dan pengurusan sewaan di sekitar Lembah Klang. Misi saya adalah untuk menjadikan proses jual beli rumah yang rumit menjadi lancar dan selamat untuk anda.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100"><Briefcase className="text-blue-900 mb-3" size={28}/><h4 className="font-bold text-gray-900 mb-2">Kepakaran</h4><ul className="text-sm text-gray-600 space-y-2"><li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Jual Beli Subsale</li><li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Projek Hartanah Baru</li><li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Khidmat Nasihat Pelaburan</li></ul></div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100"><MapPin className="text-blue-900 mb-3" size={28}/><h4 className="font-bold text-gray-900 mb-2">Kawasan Liputan</h4><div className="flex flex-wrap gap-2">{AGENT_INFO.areas.map(area => <span key={area} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">{area}</span>)}</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminDashboardView = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const totalListings = properties.length;
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'Baru').length;

    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8 overflow-x-auto">
              <button onClick={() => setActiveTab('overview')} className={`py-4 font-semibold whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-500 hover:text-gray-900'}`}>Dashboard</button>
              <button onClick={() => setActiveTab('listings')} className={`py-4 font-semibold whitespace-nowrap ${activeTab === 'listings' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-500 hover:text-gray-900'}`}>Urus Senarai ({totalListings})</button>
              <button onClick={() => setActiveTab('leads')} className={`py-4 font-semibold whitespace-nowrap flex items-center gap-2 ${activeTab === 'leads' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-500 hover:text-gray-900'}`}>Leads CRM {newLeads > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{newLeads} Baru</span>}</button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Ringkasan Prestasi</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"><div><p className="text-gray-500 text-sm font-medium mb-1">Jumlah Hartanah</p><p className="text-3xl font-bold text-gray-900">{totalListings}</p></div><div className="bg-blue-100 p-3 rounded-xl"><Home className="text-blue-600" size={24}/></div></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"><div><p className="text-gray-500 text-sm font-medium mb-1">Jumlah Leads</p><p className="text-3xl font-bold text-gray-900">{totalLeads}</p></div><div className="bg-green-100 p-3 rounded-xl"><User className="text-green-600" size={24}/></div></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"><div><p className="text-gray-500 text-sm font-medium mb-1">Leads Baru</p><p className="text-3xl font-bold text-red-600">{newLeads}</p></div><div className="bg-red-100 p-3 rounded-xl"><MessageCircle className="text-red-600" size={24}/></div></div>
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div>
              <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-900">Urus Senarai Hartanah</h2><button onClick={addMockProperty} className="bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"><Plus size={18}/> Tambah Baru (Demo)</button></div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200"><thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hartanah</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Tindakan</th></tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">{properties.map(p => <tr key={p.id} className="hover:bg-gray-50"><td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><img className="h-10 w-10 rounded object-cover" src={p.image} alt=""/><div className="ml-4"><div className="text-sm font-medium text-gray-900">{p.title}</div><div className="text-sm text-gray-500">{p.location}</div></div></div></td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{formatPrice(p.price)}</td><td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Aktif</span></td><td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button className="text-blue-600 hover:text-blue-900 mr-3"><Edit size={18}/></button><button onClick={() => deleteProperty(p.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18}/></button></td></tr>)}</tbody></table>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">CRM: Pengurusan Prospek (Leads)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leads.length === 0 && <p className="text-gray-500 col-span-full">Tiada leads buat masa ini.</p>}
                {[...leads].sort((a,b) => new Date(b.date) - new Date(a.date)).map(lead => (
                  <div key={lead.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-4"><div className={`px-2.5 py-1 rounded-full text-xs font-bold ${lead.status === 'Baru' ? 'bg-red-100 text-red-800' : lead.status === 'Dihubungi' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{lead.status || 'Baru'}</div><div className="text-xs text-gray-400">{new Date(lead.date).toLocaleDateString()}</div></div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{lead.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 flex flex-col gap-1"><a href={`tel:${lead.phone}`} className="hover:text-blue-600 flex items-center gap-1"><Phone size={14}/> {lead.phone}</a><span className="flex items-center gap-1"><Mail size={14}/> {lead.email}</span></p>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 mb-4 border border-gray-100"><span className="font-semibold text-xs text-blue-800 block mb-1">Mengenai: {lead.propertyTitle}</span>"{lead.message}"</div>
                    <div className="flex items-center gap-2 mt-auto">
                      <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hai ${lead.name}, saya Ahmad Razali dari Elite Property. Saya terima pertanyaan anda mengenai ${lead.propertyTitle}.`)}`}
                        target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-50 text-green-700 text-center py-2 rounded-lg text-sm font-semibold hover:bg-green-100">WhatsApp</a>
                      <select className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 py-2 px-2 rounded-lg text-sm font-semibold outline-none focus:ring-1 focus:ring-blue-500"
                        value={lead.status || 'Baru'} onChange={e => updateLeadStatus(lead.id, e.target.value)}>
                        <option value="Baru">Baru</option><option value="Dihubungi">Dihubungi</option><option value="Tontonan">Tontonan</option><option value="Berjaya">Berjaya</option><option value="Batal">Batal</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div><div className="flex items-center gap-2 mb-4"><Home className="text-white w-6 h-6"/><span className="font-bold text-xl text-white tracking-tight">AR Property</span></div><p className="text-sm">Membantu anda mencari, membeli, dan melabur dalam hartanah terbaik di Malaysia.</p></div>
        <div><h4 className="text-white font-bold mb-4">Pautan Pantas</h4><ul className="space-y-2 text-sm"><li><button onClick={()=>navigateTo('home')} className="hover:text-white">Halaman Utama</button></li><li><button onClick={()=>navigateTo('search')} className="hover:text-white">Cari Hartanah</button></li><li><button onClick={()=>navigateTo('profile')} className="hover:text-white">Tentang Saya</button></li></ul></div>
        <div><h4 className="text-white font-bold mb-4">Hubungi</h4><ul className="space-y-2 text-sm"><li>{AGENT_INFO.phone}</li><li>{AGENT_INFO.email}</li><li>{AGENT_INFO.ren}</li></ul></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} {AGENT_INFO.name}. Hak Cipta Terpelihara.</p>
        <button onClick={() => { setIsAdmin(!isAdmin); if (!isAdmin) navigateTo('admin'); }} className="mt-4 md:mt-0 text-gray-600 hover:text-white text-xs">
          {isAdmin ? 'Tutup Mod Admin' : 'Log Masuk Admin'}
        </button>
      </div>
    </footer>
  );

  return (
    <div className="font-sans bg-white text-gray-900 antialiased selection:bg-blue-200">
      <Navigation />
      <main className="min-h-screen">
        {currentView === 'home' && <HomeView />}
        {currentView === 'search' && <SearchView />}
        {currentView === 'property' && <PropertyDetailView />}
        {currentView === 'profile' && <ProfileView />}
        {currentView === 'admin' && isAdmin && <AdminDashboardView />}
      </main>
      <Footer />
    </div>
  );
         }
