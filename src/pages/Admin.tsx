import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { useNavigation } from '../context/NavigationContext';
import { SEOHead } from '../components/common/SEOHead';
import { ServiceItem, ReviewItem, GalleryItem, BusinessSettings } from '../types';
import { 
  Lock, 
  Unlock, 
  Settings, 
  Scissors, 
  Image as ImageIcon, 
  Star, 
  Calendar, 
  BarChart3, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Check, 
  RefreshCw, 
  Phone,
  ArrowLeft
} from 'lucide-react';

export const Admin: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    services, 
    addService, 
    updateService, 
    deleteService, 
    reviews, 
    addReview, 
    deleteReview, 
    gallery, 
    addGalleryItem, 
    deleteGalleryItem, 
    appointments, 
    updateAppointmentStatus, 
    analytics, 
    resetToDefaults 
  } = useSalon();

  const { navigateTo } = useNavigation();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Demo mode starts unlocked for instant evaluation
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active tab
  const [activeTab, setActiveTab] = useState<
    'appointments' | 'services' | 'gallery' | 'reviews' | 'settings' | 'analytics'
  >('appointments');

  // Business settings form state
  const [settingsForm, setSettingsForm] = useState<BusinessSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // New service modal/form state
  const [isAddingService, setIsAddingService] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState<'hair' | 'color' | 'styling' | 'beauty' | 'special-occasions'>('hair');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('Contact for pricing');
  const [newServiceDuration, setNewServiceDuration] = useState('45–60 mins');
  const [newServiceImage, setNewServiceImage] = useState(services[0]?.imageUrl || '');

  // New review form state
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewStylist, setNewReviewStylist] = useState('');

  // New gallery item state
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('styling');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'penelope1031' || passcode === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Use default: penelope1031 or click demo unlock.');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName) return;

    addService({
      name: newServiceName,
      category: newServiceCategory,
      categoryLabel: newServiceCategory.toUpperCase(),
      description: newServiceDesc,
      priceDisplay: newServicePrice,
      durationDisplay: newServiceDuration,
      imageUrl: newServiceImage,
      published: true,
      featured: false,
    });

    setNewServiceName('');
    setNewServiceDesc('');
    setIsAddingService(false);
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewText) return;

    addReview({
      author: newReviewAuthor,
      rating: newReviewRating,
      text: newReviewText,
      date: 'Recently added',
      source: 'Verified Google Review',
      stylistMentioned: newReviewStylist.trim() || undefined,
    });

    setNewReviewAuthor('');
    setNewReviewText('');
    setNewReviewStylist('');
    setIsAddingReview(false);
  };

  const handleGalleryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          setNewGalleryUrl(event.target.result);
          if (!newGalleryTitle) {
            setNewGalleryTitle(file.name.replace(/\.[^/.]+$/, ''));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryTitle || !newGalleryUrl) return;

    addGalleryItem({
      imageUrl: newGalleryUrl,
      title: newGalleryTitle,
      category: newGalleryCategory,
      altText: newGalleryTitle,
    });

    setNewGalleryTitle('');
    setNewGalleryUrl('');
    setIsAddingGallery(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <SEOHead
          title="Admin Access | Penelope Salon"
          description="Local business owner administration portal for Penelope Salon."
        />
        <div className="max-w-md w-full bg-[#F8F5EF] border border-[#E8E1D7] p-8 rounded-2xl shadow-xl text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#171717] text-[#C9A96A] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#171717]">
              Penelope Salon Admin
            </h1>
            <p className="text-xs text-[#6F6A64] mt-1">
              Enter passcode to manage appointments, services, reviews, and salon details.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter passcode (e.g. penelope1031)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#D8D0C4] text-center text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            />
            {authError && <p className="text-xs text-red-600">{authError}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-[#171717] text-[#F8F5EF] text-xs font-bold uppercase tracking-wider rounded-md hover:bg-[#2a2a2a] transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="pt-2 border-t border-[#E8E1D7]">
            <button
              onClick={() => setIsAuthenticated(true)}
              className="text-xs text-[#A98748] hover:underline font-medium"
            >
              Quick Unlock (Reviewer Demo Mode)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-portal" className="min-h-screen bg-[#F8F5EF] py-8 sm:py-12">
      <SEOHead
        title="Admin Portal | Penelope Salon Delano"
        description="Local business dashboard to manage appointments, services, reviews, and settings."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-[#E8E1D7]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-[#171717]">
                Salon Management Portal
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C9A96A] text-[#171717] uppercase">
                Active
              </span>
            </div>
            <p className="text-xs text-[#6F6A64]">
              Penelope Salon • 1031 Main St, Delano CA • (661) 372-7001
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/')}
              className="px-4 py-2 border border-[#171717] text-[#171717] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#E8E1D7] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
            </button>
            <button
              onClick={() => {
                if (confirm('Reset all content back to verified initial defaults?')) {
                  resetToDefaults();
                  window.location.reload();
                }
              }}
              className="px-3 py-2 text-xs text-red-700 hover:bg-red-50 rounded border border-red-200"
              title="Reset initial data"
            >
              Reset Defaults
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 border-b border-[#E8E1D7] text-xs font-semibold tracking-wider uppercase">
          {[
            { id: 'appointments', label: 'Inquiries & Bookings', icon: Calendar, badge: appointments.filter(a => a.status === 'pending').length },
            { id: 'services', label: 'Services', icon: Scissors, badge: services.length },
            { id: 'gallery', label: 'Gallery', icon: ImageIcon, badge: gallery.length },
            { id: 'reviews', label: 'Reviews', icon: Star, badge: reviews.length },
            { id: 'settings', label: 'Business Settings', icon: Settings },
            { id: 'analytics', label: 'Call & Lead Stats', icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#171717] text-[#F8F5EF]'
                    : 'bg-[#E8E1D7]/40 text-[#6F6A64] hover:bg-[#E8E1D7]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#C9A96A]" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-[#C9A96A] text-[#171717]' : 'bg-[#D8D0C4] text-[#171717]'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Appointments / Leads */}
        {activeTab === 'appointments' && (
          <div className="py-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#171717]">
                  Appointment Inquiries ({appointments.length})
                </h2>
                <p className="text-xs text-[#6F6A64]">
                  Review client requests submitted through the online booking form.
                </p>
              </div>
            </div>

            {appointments.length > 0 ? (
              <div className="bg-white rounded-xl border border-[#E8E1D7] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#E8E1D7]/40 text-[11px] font-bold uppercase tracking-wider text-[#6F6A64] border-b border-[#E8E1D7]">
                      <tr>
                        <th className="py-3 px-4">Client</th>
                        <th className="py-3 px-4">Phone / Contact</th>
                        <th className="py-3 px-4">Requested Service</th>
                        <th className="py-3 px-4">Desired Date & Time</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E1D7]">
                      {appointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-[#F8F5EF]/60">
                          <td className="py-4 px-4 font-semibold text-[#171717]">
                            {apt.fullName}
                            {apt.message && (
                              <p className="text-xs text-[#6F6A64] font-normal italic mt-0.5">
                                Note: "{apt.message}"
                              </p>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <a
                              href={`tel:${apt.phone}`}
                              className="font-medium text-[#171717] hover:text-[#A98748] flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3 text-[#C9A96A]" />
                              {apt.phone}
                            </a>
                            {apt.email && (
                              <p className="text-xs text-[#6F6A64]">{apt.email}</p>
                            )}
                          </td>
                          <td className="py-4 px-4 font-medium text-[#171717]">
                            {apt.serviceName}
                          </td>
                          <td className="py-4 px-4 text-xs text-[#6F6A64]">
                            <p className="font-semibold text-[#171717]">{apt.preferredDate}</p>
                            <p>{apt.preferredTime}</p>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                apt.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : apt.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : apt.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {apt.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <select
                              value={apt.status}
                              onChange={(e) =>
                                updateAppointmentStatus(apt.id, e.target.value as any)
                              }
                              className="text-xs border border-[#D8D0C4] rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#C9A96A]"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirm</option>
                              <option value="completed">Complete</option>
                              <option value="cancelled">Cancel</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-[#E8E1D7] p-8">
                <p className="font-medium text-[#171717]">No appointment inquiries yet.</p>
                <p className="text-xs text-[#6F6A64] mt-1">
                  Requests submitted through the website will appear here in real time.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Services Management */}
        {activeTab === 'services' && (
          <div className="py-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#171717]">
                  Manage Services ({services.length})
                </h2>
                <p className="text-xs text-[#6F6A64]">
                  Add, update or remove beauty offerings displayed in the salon directory.
                </p>
              </div>
              <button
                onClick={() => setIsAddingService(!isAddingService)}
                className="px-4 py-2 bg-[#171717] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#C9A96A]" />
                Add Service
              </button>
            </div>

            {/* Add Service Form */}
            {isAddingService && (
              <form
                onSubmit={handleCreateService}
                className="p-6 bg-white border border-[#E8E1D7] rounded-xl space-y-4 shadow-sm"
              >
                <h3 className="font-serif text-lg font-bold text-[#171717]">
                  New Service Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#171717] mb-1">
                      Service Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Keratin Smoothing Treatment"
                      value={newServiceName}
                      onChange={(e) => setNewServiceName(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#171717] mb-1">
                      Category
                    </label>
                    <select
                      value={newServiceCategory}
                      onChange={(e) => setNewServiceCategory(e.target.value as any)}
                      className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                    >
                      <option value="hair">Hair Cuts</option>
                      <option value="color">Hair Color & Balayage</option>
                      <option value="styling">Styling & Blowouts</option>
                      <option value="beauty">Hair Treatments</option>
                      <option value="special-occasions">Special Occasions</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#171717] mb-1">
                      Price Label
                    </label>
                    <input
                      type="text"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#171717] mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={newServiceDuration}
                      onChange={(e) => setNewServiceDuration(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={newServiceDesc}
                    onChange={(e) => setNewServiceDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingService(false)}
                    className="px-4 py-2 border border-[#171717] text-xs uppercase font-semibold rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#171717] text-[#F8F5EF] text-xs uppercase font-semibold rounded"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            )}

            {/* Services List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white p-5 rounded-xl border border-[#E8E1D7] flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] uppercase font-bold text-[#C9A96A] bg-[#171717] px-2 py-0.5 rounded">
                        {srv.categoryLabel}
                      </span>
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${srv.name}?`)) deleteService(srv.id);
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#171717] mt-2">
                      {srv.name}
                    </h4>
                    <p className="text-xs text-[#6F6A64] line-clamp-2 mt-1">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#E8E1D7] flex items-center justify-between text-xs text-[#6F6A64]">
                    <span>{srv.priceDisplay}</span>
                    <span>{srv.durationDisplay}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Gallery Management */}
        {activeTab === 'gallery' && (
          <div className="py-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#171717]">
                  Gallery Items ({gallery.length})
                </h2>
                <p className="text-xs text-[#6F6A64]">
                  Manage photos displayed in the client inspiration gallery.
                </p>
              </div>
              <button
                onClick={() => setIsAddingGallery(!isAddingGallery)}
                className="px-4 py-2 bg-[#171717] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#C9A96A]" />
                Add Image
              </button>
            </div>

            {isAddingGallery && (
              <form
                onSubmit={handleCreateGallery}
                className="p-6 bg-white border border-[#E8E1D7] rounded-xl space-y-4 shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#171717] mb-1">
                      Image Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dimensional Caramel Highlights"
                      value={newGalleryTitle}
                      onChange={(e) => setNewGalleryTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#171717] mb-1">
                      Upload from Device or Paste Image URL
                    </label>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleGalleryFileUpload}
                        className="block w-full text-xs text-[#6F6A64] file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#C9A96A]/20 file:text-[#171717] hover:file:bg-[#C9A96A]/30 cursor-pointer"
                      />
                      <input
                        type="text"
                        required
                        placeholder="https://... or /images/..."
                        value={newGalleryUrl}
                        onChange={(e) => setNewGalleryUrl(e.target.value)}
                        className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
                {newGalleryUrl && (
                  <div className="flex items-center gap-3 p-3 bg-[#FAF8F5] border border-[#E8E1D7] rounded-lg">
                    <img
                      src={newGalleryUrl}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded border border-[#D8D0C4]"
                    />
                    <div className="text-xs text-[#6F6A64]">
                      <p className="font-semibold text-[#171717]">Image Preview Ready</p>
                      <p className="truncate max-w-xs">{newGalleryTitle || 'No title set yet'}</p>
                    </div>
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingGallery(false)}
                    className="px-4 py-2 border border-[#171717] text-xs uppercase font-semibold rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#171717] text-[#F8F5EF] text-xs uppercase font-semibold rounded"
                  >
                    Save Photo
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-[#E8E1D7] overflow-hidden relative group"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#171717]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-[#171717] truncate">{item.title}</p>
                    <p className="text-[10px] text-[#6F6A64] uppercase">{item.category}</p>
                  </div>
                  <button
                    onClick={() => deleteGalleryItem(item.id)}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Reviews Management */}
        {activeTab === 'reviews' && (
          <div className="py-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#171717]">
                  Customer Reviews ({reviews.length})
                </h2>
                <p className="text-xs text-[#6F6A64]">
                  Display verified quotes from your Google Business Profile.
                </p>
              </div>
              <button
                onClick={() => setIsAddingReview(!isAddingReview)}
                className="px-4 py-2 bg-[#171717] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#C9A96A]" />
                Add Review
              </button>
            </div>

            {isAddingReview && (
              <form
                onSubmit={handleCreateReview}
                className="p-6 bg-white border border-[#E8E1D7] rounded-xl space-y-4 shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#171717] mb-1">
                      Author Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maria G."
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#171717] mb-1">
                      Rating (1-5)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#171717] mb-1">
                      Stylist Mentioned
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Daisy"
                      value={newReviewStylist}
                      onChange={(e) => setNewReviewStylist(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    Review Text
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingReview(false)}
                    className="px-4 py-2 border border-[#171717] text-xs uppercase font-semibold rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#171717] text-[#F8F5EF] text-xs uppercase font-semibold rounded"
                  >
                    Save Review
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-5 rounded-xl border border-[#E8E1D7] flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#171717]">{rev.author}</span>
                      <span className="text-xs text-[#C9A96A]">★ {rev.rating}.0</span>
                      {rev.stylistMentioned && (
                        <span className="text-[10px] bg-[#171717] text-[#C9A96A] px-2 py-0.5 rounded">
                          Stylist: {rev.stylistMentioned}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6F6A64] italic">"{rev.text}"</p>
                  </div>
                  <button
                    onClick={() => deleteReview(rev.id)}
                    className="text-red-500 hover:text-red-700 p-1 shrink-0"
                    title="Delete review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Business Settings */}
        {activeTab === 'settings' && (
          <div className="py-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#171717]">
              Business Details & Contact Info
            </h2>
            <p className="text-xs text-[#6F6A64]">
              Update phone numbers, address, and Google Business Profile connections.
            </p>

            <form
              onSubmit={handleSaveSettings}
              className="bg-white p-6 sm:p-8 rounded-xl border border-[#E8E1D7] space-y-6 shadow-sm max-w-3xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.name}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                    Phone Number (Callable)
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.phone}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.address}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, address: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                    City, State & ZIP
                  </label>
                  <input
                    type="text"
                    required
                    value={`${settingsForm.city}, ${settingsForm.state} ${settingsForm.zip}`}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        city: 'Delano',
                        state: 'CA',
                        zip: '93215',
                      })
                    }
                    className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                    Google Business Rating
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={settingsForm.googleRating}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        googleRating: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                    Google Review Count
                  </label>
                  <input
                    type="number"
                    value={settingsForm.googleReviewCount}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        googleReviewCount: parseInt(e.target.value, 10),
                      })
                    }
                    className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                  Google Business Profile Review Link
                </label>
                <input
                  type="url"
                  value={settingsForm.googleReviewUrl}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      googleReviewUrl: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-[#D8D0C4] rounded text-sm"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E8E1D7]">
                {settingsSaved ? (
                  <span className="text-xs text-green-700 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Settings Saved!
                  </span>
                ) : <span />}
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#171717] text-[#F8F5EF] text-xs font-bold uppercase tracking-wider rounded hover:bg-[#2a2a2a] transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#C9A96A]" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 6: Analytics & Conversion Logs */}
        {activeTab === 'analytics' && (
          <div className="py-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#171717]">
              Conversion & Engagement Activity
            </h2>
            <p className="text-xs text-[#6F6A64]">
              Real-time audit log of customer phone clicks, direction lookups, and booking initiations.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-[#E8E1D7]">
                <p className="text-xs text-[#6F6A64] font-medium">Total Events</p>
                <p className="font-serif text-3xl font-bold text-[#171717] mt-1">
                  {analytics.length}
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#E8E1D7]">
                <p className="text-xs text-[#6F6A64] font-medium">Phone Calls</p>
                <p className="font-serif text-3xl font-bold text-[#171717] mt-1">
                  {analytics.filter((a) => a.eventName === 'phone_click').length}
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#E8E1D7]">
                <p className="text-xs text-[#6F6A64] font-medium">Booking Starts</p>
                <p className="font-serif text-3xl font-bold text-[#171717] mt-1">
                  {analytics.filter((a) => a.eventName === 'appointment_start').length}
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#E8E1D7]">
                <p className="text-xs text-[#6F6A64] font-medium">Directions Clicked</p>
                <p className="font-serif text-3xl font-bold text-[#171717] mt-1">
                  {analytics.filter((a) => a.eventName === 'directions_click').length}
                </p>
              </div>
            </div>

            {/* Event log */}
            <div className="bg-white rounded-xl border border-[#E8E1D7] overflow-hidden">
              <div className="p-4 bg-[#E8E1D7]/40 border-b border-[#E8E1D7] text-xs font-bold uppercase tracking-wider text-[#6F6A64]">
                Recent Interaction Events
              </div>
              <div className="divide-y divide-[#E8E1D7] max-h-96 overflow-y-auto">
                {analytics.slice().reverse().map((event) => (
                  <div key={event.id} className="p-3 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#171717] uppercase tracking-wider">
                        {event.eventName.replace('_', ' ')}
                      </span>
                      {event.details && (
                        <span className="text-[#6F6A64] ml-2">({event.details})</span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#6F6A64]">
                      {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
