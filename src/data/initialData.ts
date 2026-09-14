import { 
  BusinessSettings, 
  ServiceItem, 
  ReviewItem, 
  GalleryItem, 
  FAQItem 
} from '../types';
import { salonImages } from '../assets/images';

export const initialBusinessSettings: BusinessSettings = {
  id: 'penelope_settings_01',
  businessName: 'Penelope Salon',
  phone: '+1-661-372-7001',
  displayPhone: '661-372-7001',
  email: 'contact@penelopesalon-delano.com',
  address: '1031 Main St',
  city: 'Delano',
  state: 'CA',
  zip: '93215',
  hoursNote: 'Hours are based on the current business listing. Please call to confirm appointment availability.',
  hours: [
    { day: 'Sunday', hours: 'Open 24 hours' },
    { day: 'Monday', hours: 'Open 24 hours' },
    { day: 'Tuesday', hours: 'Open 24 hours' },
    { day: 'Wednesday', hours: 'Open 24 hours' },
    { day: 'Thursday', hours: 'Open 24 hours' },
    { day: 'Friday', hours: 'Open 24 hours' },
    { day: 'Saturday', hours: 'Open 24 hours' },
  ],
  googleRating: 4.4,
  googleReviewCount: 69,
  googleProfileUrl: 'https://share.google/BFp3kJDRRqVW2DKQX',
  googleReviewUrl: 'https://share.google/BFp3kJDRRqVW2DKQX',
  primaryKeyword: 'beauty salon in Delano CA',
  latitude: 35.770239,
  longitude: -119.246060,
};

export const initialServices: ServiceItem[] = [
  {
    id: 'service-haircut',
    name: 'Haircut & Styling',
    slug: 'haircut-styling',
    category: 'hair',
    categoryLabel: 'Hair Services',
    description: 'Personalized haircut and styling tailored to your desired look, face shape, and lifestyle in Delano, CA.',
    priceDisplay: 'Contact for pricing',
    durationDisplay: '45–60 mins',
    imageUrl: salonImages.haircut,
    featured: true,
    published: true,
    seoTitle: 'Haircut & Hair Styling in Delano, CA | Penelope Salon',
    seoDescription: 'Looking for a precision haircut in Delano, CA? Penelope Salon at 1031 Main St provides custom cuts, texturizing, and professional styling for women, men, and children.',
    benefits: [
      'Tailored cut designed for your unique face shape, hair density, and everyday routine',
      'Removes split ends and restores healthy movement, volume, and bounce',
      'Includes a relaxing hair wash, scalp massage, and complete blowout finish',
      'Easy-to-manage silhouette that holds its shape between salon visits'
    ],
    whatToExpect: [
      'One-on-one consultation to discuss your ideal cut and maintenance routine',
      'Relaxing hair wash and scalp massage in our comfortable lounge',
      'Precision scissor or razor cut with personalized texturing',
      'Professional blowout and finishing style'
    ],
    preparationTips: [
      'Bring reference photos of styles, lengths, or bangs you admire',
      'Wear your hair how you normally wear it day-to-day for consultation',
      'Feel free to share any styling challenges you face at home'
    ],
    aftercareTips: [
      'Schedule a routine trim every 6 to 8 weeks to maintain shape and prevent split ends',
      'Use professional salon-grade shampoos and heat protectant sprays when heat styling',
      'Avoid high heat settings on hair dryers to preserve cuticle hydration'
    ],
    idealFor: [
      'Refreshing your current shape or trying a brand new silhouette',
      'Removing split ends and restoring hair bounce',
      'Everyday manageability and clean volume'
    ],
    faqs: [
      {
        q: 'Should I arrive with clean hair?',
        a: 'We provide a relaxing wash and conditioning before your cut, so feel free to come as you are.'
      },
      {
        q: 'Can I bring reference photos?',
        a: 'Absolutely! Reference photos of lengths and styles you like are always welcome during consultation.'
      },
      {
        q: 'Do you cut all hair textures?',
        a: 'Yes, our stylists are experienced with straight, wavy, curly, and thick hair textures.'
      }
    ],
    isEditablePlaceholder: true,
  },
  {
    id: 'service-color-balayage',
    name: 'Custom Hair Color & Balayage',
    slug: 'custom-hair-color-balayage',
    category: 'color',
    categoryLabel: 'Hair Color',
    description: 'Personalized color services tailored to your desired look, from seamless sun-kissed balayage to rich full-coverage color in Delano, CA.',
    priceDisplay: 'Contact for pricing',
    durationDisplay: '2–3.5 hours',
    imageUrl: salonImages.balayage,
    featured: true,
    published: true,
    seoTitle: 'Hair Color & Balayage in Delano, CA | Penelope Salon',
    seoDescription: 'Expert hair color and balayage at Penelope Salon in Delano, CA. Seamless lived-in blondes, rich brunettes, gray blending, and vibrant tones at 1031 Main St.',
    benefits: [
      'Customized color placement that creates seamless, natural-looking grow-out lines',
      'Formulated with premium conditioning color lines that maintain hair health and shine',
      'Personalized shade selection matching your undertone, eye color, and personal style',
      'Versatile options ranging from subtle sun-kissed dimension to bold full transformations'
    ],
    whatToExpect: [
      'In-depth color consultation and tone assessment',
      'Custom color formulation matching your skin undertone and hair goals',
      'Careful application with hair protection treatments',
      'Toning glaze and hydrating rinse for long-lasting vibrancy'
    ],
    preparationTips: [
      'Do not wash hair with heavy oils immediately before your color appointment',
      'Bring 2-3 inspiration photos illustrating both what you love and what tones you prefer to avoid',
      'Disclose your complete hair history (previous box dyes, bleaches, or henna) for accurate formulation'
    ],
    aftercareTips: [
      'Wait at least 48 hours before washing hair to let the color molecules lock into the cuticle',
      'Always wash with sulfate-free, color-protecting shampoo and lukewarm water',
      'Use a weekly deep-conditioning moisture mask and apply heat protectant before blow-drying'
    ],
    idealFor: [
      'Soft dimensional lived-in blonde, caramel, or mocha tones',
      'Gray blending or complete root touch-up',
      'Vibrant seasonal tone refreshes'
    ],
    faqs: [
      {
        q: 'How do I maintain my color at home?',
        a: 'We recommend sulfate-free, color-safe shampoos and cool water rinses to keep your tone brilliant.'
      },
      {
        q: 'What is the difference between balayage and traditional highlights?',
        a: 'Balayage is a hand-painted technique that creates a soft, graduated sweep of color with a gentle root grow-out. Traditional foil highlights start closer to the scalp for a more uniform brightness from root to tip.'
      }
    ],
    isEditablePlaceholder: true,
  },
  {
    id: 'service-highlights',
    name: 'Dimensional Highlights',
    slug: 'dimensional-highlights',
    category: 'color',
    categoryLabel: 'Hair Color',
    description: 'Fine foil or hand-painted highlights providing multidimensional contrast, brightness, and movement at Penelope Salon in Delano.',
    priceDisplay: 'Contact for pricing',
    durationDisplay: '2–3 hours',
    imageUrl: salonImages.highlights,
    featured: true,
    published: true,
    seoTitle: 'Dimensional Highlights in Delano, CA | Penelope Salon',
    seoDescription: 'Transform your hair with dimensional highlights at Penelope Salon in Delano, CA. Foil highlights, money piece accents, and radiant blonde tones at 1031 Main St.',
    benefits: [
      'Adds depth, brightness, and optical texture to both straight and curly styles',
      'Custom placement that frames your facial features and enhances natural light reflection',
      'Gentle lightening techniques paired with nourishing bond-protecting toners',
      'Customizable from subtle lowlights and baby lights to full-head blonde luminosity'
    ],
    whatToExpect: [
      'Placement mapping for natural light reflection',
      'Gentle lightening process maintaining strand integrity',
      'Custom gloss toner for optimal shine'
    ],
    preparationTips: [
      'Wear a shirt with an open or loose collar (avoid bulky turtlenecks)',
      'Share how frequently you prefer to come in for touch-ups so we choose the right technique'
    ],
    aftercareTips: [
      'Incorporate purple or blue toning shampoo once every 1–2 weeks to keep brassiness at bay',
      'Use leave-in conditioning spray to keep highlighted strands silky and tangle-free'
    ],
    idealFor: [
      'Face-framing brightness ("money piece")',
      'Subtle natural dimension or striking blonde lift'
    ],
    faqs: [
      {
        q: 'Will highlights damage my hair?',
        a: 'We utilize professional lighteners and conditioning gloss toners to maintain strand integrity throughout the highlighting process.'
      }
    ],
    isEditablePlaceholder: true,
  },
  {
    id: 'service-blowout-styling',
    name: 'Signature Blowout & Thermal Styling',
    slug: 'signature-blowout-styling',
    category: 'styling',
    categoryLabel: 'Styling',
    description: 'Professional styling for everyday confidence, weekend outings, or special occasions in Delano, CA.',
    priceDisplay: 'Contact for pricing',
    durationDisplay: '45–60 mins',
    imageUrl: salonImages.stylingStation,
    featured: true,
    published: true,
    seoTitle: 'Signature Blowout & Hair Styling in Delano, CA | Penelope Salon',
    seoDescription: 'Get sleek, bouncy, voluminous hair with our signature blowout and thermal styling at Penelope Salon, 1031 Main St, Delano, CA. Call to book your session.',
    benefits: [
      'Silky smooth texture and long-lasting volume that withstands Central Valley weather',
      'Saves you time preparing for special gatherings, dinners, or business meetings',
      'Includes a clarifying wash and deep conditioner tailored to your scalp type',
      'Choice of sleek glass-hair flat-iron finish, soft Hollywood waves, or voluminous curls'
    ],
    whatToExpect: [
      'Clarifying and moisturizing wash',
      'Heat protection and volumizing primer application',
      'Round-brush blowout followed by wand waves or sleek flat-iron finish'
    ],
    preparationTips: [
      'Simply arrive ready to relax in our wash lounge',
      'Let your stylist know if you have sensitive scalp or preferences on water temperature'
    ],
    aftercareTips: [
      'Sleep with your hair in a loose silk scrunchie or on a satin pillowcase to preserve body',
      'Use dry shampoo at the roots on day 2 and day 3 to prolong the life of your blowout'
    ],
    idealFor: [
      'Date nights, photo sessions, interviews, and celebrations',
      'Long-lasting bounce that lasts through the weekend'
    ],
    faqs: [
      {
        q: 'How long does a blowout usually last?',
        a: 'Most clients enjoy their blowout for 3 to 5 days with proper dry shampoo and nightly satin care.'
      }
    ],
    isEditablePlaceholder: true,
  },
  {
    id: 'service-deep-conditioning',
    name: 'Nourishing Scalp & Hair Treatment',
    slug: 'nourishing-hair-treatment',
    category: 'beauty',
    categoryLabel: 'Beauty & Hair Care',
    description: 'Deep conditioning and restorative care designed to replenish moisture, smooth the cuticle, and strengthen strands at Penelope Salon in Delano.',
    priceDisplay: 'Contact for pricing',
    durationDisplay: '30–45 mins',
    imageUrl: salonImages.treatment,
    featured: false,
    published: true,
    seoTitle: 'Hair Spa & Scalp Treatment in Delano, CA | Penelope Salon',
    seoDescription: 'Revitalize dry, damaged, or color-treated hair with professional hair treatments and relaxing scalp therapy at Penelope Salon in Delano, CA.',
    benefits: [
      'Restores essential hydration, lipids, and amino acids to over-processed or sun-exposed hair',
      'Calms dry or irritated scalps while stimulating healthy circulation with gentle massage',
      'Smooths raised cuticles to combat frizz, reduce breakage, and enhance shine',
      'Ideal booster service to pair with your haircut or color transformation'
    ],
    whatToExpect: [
      'Invigorating scalp massage to promote circulation',
      'Intensive moisture or protein mask application',
      'Gentle warm wrap or steam infusion'
    ],
    preparationTips: [
      'No special prep required; this service can be added to any haircut or color session'
    ],
    aftercareTips: [
      'Keep heat styling to a minimum for 48 hours after your deep conditioning treatment',
      'Use wide-tooth combs on wet hair to avoid stretching delicate wet strands'
    ],
    idealFor: [
      'Dry, brittle, or chemically processed hair',
      'Restoring softness before or after color services'
    ],
    faqs: [
      {
        q: 'How often should I get a deep conditioning treatment?',
        a: 'Once every 4 to 6 weeks is recommended, particularly if you regularly heat-style or color your hair.'
      }
    ],
    isEditablePlaceholder: true,
  },
  {
    id: 'service-special-events',
    name: 'Special Occasion & Updo Styling',
    slug: 'special-occasion-styling',
    category: 'special-occasions',
    categoryLabel: 'Special Occasions',
    description: 'Custom formal styling, textured updos, romantic curls, and event-ready looks for proms, quinceañeras, weddings, and parties in Delano, CA.',
    priceDisplay: 'Contact for pricing',
    durationDisplay: '60–90 mins',
    imageUrl: salonImages.interior,
    featured: false,
    published: true,
    seoTitle: 'Special Occasion & Updo Styling in Delano, CA | Penelope Salon',
    seoDescription: 'Bridal hair, quinceañera updos, prom styles, and formal hair styling in Delano, CA at Penelope Salon. Call 661-372-7001 to discuss your event styling needs.',
    benefits: [
      'Long-lasting hair architecture designed to dance, photograph, and last all evening',
      'Customized to complement the neckline and silhouette of your gown or dress',
      'Expert placement for veils, tiaras, decorative hairpins, and florals',
      'Accommodates individual styling or group celebrations'
    ],
    whatToExpect: [
      'Consultation matching your hairstyle to your event attire',
      'Secure pin placement and long-hold finishing mist',
      'Optional accessory placement (veils, floral pins, or decorative clips)'
    ],
    preparationTips: [
      'Arrive with clean, dry hair washed the evening before for better grip and hold',
      'Wear a button-down shirt or zip-up top so you do not disturb your hairstyle when changing',
      'Bring all hair accessories, clips, or veils you plan to wear'
    ],
    aftercareTips: [
      'Gently remove bobby pins starting from the outer layers before brushing hair out',
      'Use gentle conditioner to break down setting sprays after your event'
    ],
    idealFor: [
      'Weddings, bridesmaids, quinceañera courts, and formal galas'
    ],
    faqs: [
      {
        q: 'Can I do a trial run before my wedding or quinceañera?',
        a: 'Yes! We encourage trial runs so you can test your look and ensure total confidence for your special day.'
      }
    ],
    isEditablePlaceholder: true,
  },
];

export const initialReviews: ReviewItem[] = [
  {
    id: 'rev-01',
    author: 'Elena R.',
    rating: 5,
    date: 'Recent Google Review',
    text: 'One thing that stood out was the relaxing experience overall. The staff created a calm and enjoyable environment, making the appointment feel more like a self-care experience rather than just a quick haircut.',
    source: 'Google',
    featured: true,
  },
  {
    id: 'rev-02',
    author: 'Maria G.',
    rating: 5,
    date: 'Verified Client',
    text: 'Daisy is very talented! I have always been satisfied with her work. She is professional and friendly.',
    source: 'Google',
    stylistMentioned: 'Daisy',
    featured: true,
  },
  {
    id: 'rev-03',
    author: 'Jessica V.',
    rating: 5,
    date: 'Verified Client',
    text: 'I got my hair done by Daisy she was awesome I love my hair!! ... the service ... the restroom very clean, love the decor!!',
    source: 'Google',
    stylistMentioned: 'Daisy',
    featured: true,
  },
  {
    id: 'rev-04',
    author: 'Carmen S.',
    rating: 5,
    date: 'Delano Resident',
    text: 'Great salon right here in Delano on Main St. The space is beautiful with nice chandeliers and comfortable chairs. My hair turned out exactly how I wanted.',
    source: 'Google',
    featured: true,
  },
  {
    id: 'rev-05',
    author: 'Ana P.',
    rating: 4,
    date: 'Verified Customer',
    text: 'Friendly atmosphere and great attention to detail. Definitely glad to have this salon in our community.',
    source: 'Google',
    featured: false,
  },
  {
    id: 'rev-06',
    author: 'Sophia M.',
    rating: 5,
    date: 'Verified Client',
    text: 'Daisy gave me the best dimensional caramel balayage! She took time explaining toning options and keeping my hair silky and healthy. I received so many compliments.',
    source: 'Google',
    stylistMentioned: 'Daisy',
    featured: true,
  },
  {
    id: 'rev-07',
    author: 'Lupita T.',
    rating: 5,
    date: 'Delano Resident',
    text: 'Came in for a cut and tailored blowout before a family celebration. Loved how shiny and bouncy my curls stayed all day. Clean salon, gorgeous chandeliers, and sweet stylists!',
    source: 'Google',
    featured: true,
  },
  {
    id: 'rev-08',
    author: 'Beatriz C.',
    rating: 5,
    date: 'Verified Customer',
    text: 'Delano needed a gem like Penelope Salon right on Main St. The wash lounge chairs are so comfortable and relaxing, and the styling was flawless. Highly recommend!',
    source: 'Google',
    featured: true,
  },
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Penelope Salon Storefront & Entrance',
    imageUrl: '/images/unnamed.webp',
    category: 'salon',
    altText: 'Penelope Salon exterior entrance with arched windows at 1031 Main St, Delano CA',
    featured: true,
    caption: '1031 Main Street, Delano CA — welcoming walk-ins and appointments (661) 372-7001',
  },
  {
    id: 'gal-02',
    title: 'Salon Floor & Crystal Chandeliers',
    imageUrl: '/images/unnamed-3.webp',
    category: 'interior',
    altText: 'Elegant salon interior featuring chevron flooring, crystal chandeliers, vanity stations, and waiting lounge',
    featured: true,
    caption: 'Spacious salon styling stations with illuminated mirrors and luxury crystal chandeliers',
  },
  {
    id: 'gal-03',
    title: 'Ergonomic Wash Lounge & Shampoo Basins',
    imageUrl: '/images/unnamed-4.webp',
    category: 'interior',
    altText: 'Professional hair washing station with ergonomic black shampoo basins and reclining leather chairs',
    featured: true,
    caption: 'Calm wash basin area designed for relaxing scalp treatments and shampoo services',
  },
  {
    id: 'gal-04',
    title: 'Dimensional Caramel Balayage Waves',
    imageUrl: '/images/unnamed-6.webp',
    category: 'results',
    altText: 'Rich caramel and honey balayage color with soft, dimensional waves on long brunette hair',
    featured: true,
    caption: 'Lived-in caramel balayage with soft dimensional movement and healthy shine',
  },
  {
    id: 'gal-05',
    title: 'Seamless Blonde & Ash Foil Highlights',
    imageUrl: '/images/unnamed-5.webp',
    category: 'results',
    altText: 'Seamless dimensional blonde and ash foil highlights on straight hair',
    featured: true,
    caption: 'Seamless micro-foil highlights providing multidimensional brightness and contrast',
  },
  {
    id: 'gal-06',
    title: 'Face-Framing Balayage & Sleek Blowout',
    imageUrl: '/images/unnamed-7.webp',
    category: 'styling',
    altText: 'Client side profile with face-framing blonde highlights and polished blowout',
    featured: true,
    caption: 'Custom face-framing illumination tailored to individual bone structure and personal style',
  },
  {
    id: 'gal-07',
    title: 'Cascading Curls with Ribbon Balayage',
    imageUrl: '/images/unnamed-8.webp',
    category: 'results',
    altText: 'Cascading brunette curls with luminous dimensional ribbon blonde balayage',
    featured: true,
    caption: 'Voluminous ribbon balayage curls designed for high contrast and effortless growth',
  },
  {
    id: 'gal-08',
    title: 'Historic Main Street Delano Walkway',
    imageUrl: '/images/unnamed-2.webp',
    category: 'salon',
    altText: 'Downtown Delano Main Street sidewalk outside Penelope Salon',
    featured: false,
    caption: 'Convenient street parking and easy access in the heart of downtown Delano',
  },
  {
    id: 'gal-09',
    title: 'Modern Salon Lounge & Client TV Area',
    imageUrl: '/images/unnamed-1.webp',
    category: 'interior',
    altText: 'Penelope Salon modern interior partition and relaxation seating',
    featured: false,
    caption: 'Comfortable waiting area with entertainment and welcoming neighborhood hospitality',
  },
  {
    id: 'gal-10',
    title: 'Welcome Door — Walk-Ins Welcome',
    imageUrl: '/images/unnamed.webp',
    category: 'salon',
    altText: 'Penelope Salon front door with phone number and walk-ins welcome signage',
    featured: false,
    caption: 'Visit us anytime during business hours or call ahead at (661) 372-7001',
  },
];

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Do I need an appointment?',
    answer: 'While we welcome walk-in guests when chair availability permits, we strongly recommend requesting an appointment online or calling 661-372-7001 in advance to ensure your preferred date and time.',
    category: 'Appointments',
    published: true,
  },
  {
    id: 'faq-2',
    question: 'How do I book an appointment?',
    answer: 'You can easily request an appointment using our website request form, or call us directly at 661-372-7001. We will reach out to confirm your scheduled time.',
    category: 'Appointments',
    published: true,
  },
  {
    id: 'faq-3',
    question: 'How can I contact Penelope Salon?',
    answer: 'You can call us at 661-372-7001, visit our salon at 1031 Main St, Delano, CA 93215, or send an appointment inquiry directly through this website.',
    category: 'General',
    published: true,
  },
  {
    id: 'faq-4',
    question: 'Where is Penelope Salon located?',
    answer: 'Penelope Salon is conveniently located at 1031 Main St in historic downtown Delano, California (93215). Look for our distinctive white building with black arched windows on the brick sidewalk.',
    category: 'Location',
    published: true,
  },
  {
    id: 'faq-5',
    question: 'What services does Penelope Salon offer?',
    answer: 'We provide haircuts, blowouts, styling, dimensional color, balayage, highlights, deep conditioning treatments, and special occasion styling. Contact us for any custom beauty requests.',
    category: 'Services',
    published: true,
  },
  {
    id: 'faq-6',
    question: 'How much do services cost?',
    answer: 'Because hair length, thickness, condition, and the desired color techniques vary from person to person, pricing is customized. Please call 661-372-7001 for estimated pricing or a personalized consultation.',
    category: 'Pricing',
    published: true,
  },
  {
    id: 'faq-7',
    question: 'Can I request a specific stylist?',
    answer: 'Yes! If you have a preferred stylist (such as Daisy, frequently mentioned in client reviews), simply mention their name when calling or in the notes field of your appointment request.',
    category: 'Appointments',
    published: true,
  },
  {
    id: 'faq-8',
    question: 'What should I do if I need to change or reschedule my appointment?',
    answer: 'If you need to change your appointment date or time, please give us a call at 661-372-7001 as early as possible so we can happily accommodate you at another time.',
    category: 'Appointments',
    published: true,
  },
  {
    id: 'faq-9',
    question: 'What are Penelope Salon\'s listed opening hours?',
    answer: 'According to our official business listing, Penelope Salon is listed as Open 24 hours. Because specific stylist schedules and station availability vary, we recommend calling 661-372-7001 in advance or submitting an appointment request online.',
    category: 'General',
    published: true,
  },
  {
    id: 'faq-10',
    question: 'Where should I park when visiting the salon on Main Street in Delano?',
    answer: 'Convenient street parking is available directly along Main Street and neighboring side streets in downtown Delano, right in front of our storefront at 1031 Main St (coordinates: 35.770239, -119.246060).',
    category: 'Location',
    published: true,
  },
  {
    id: 'faq-11',
    question: 'Do you serve clients from nearby communities around Delano?',
    answer: 'Yes! While located in the heart of Delano, we frequently welcome clients from McFarland, Wasco, Richgrove, Earlimart, Pixley, and throughout the Kern County area.',
    category: 'Location',
    published: true,
  },
  {
    id: 'faq-12',
    question: 'What payment options are accepted?',
    answer: 'We accept standard payment methods including cash and major credit/debit cards. Please call 661-372-7001 if you have any questions before your visit.',
    category: 'Pricing',
    published: true,
  },
];
