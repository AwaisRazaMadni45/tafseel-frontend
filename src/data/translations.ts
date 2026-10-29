export type Language = 'en' | 'ar';

export interface Translation {
  nav: {
    home: string;
    products: string;
    about: string;
    gallery: string;
    quote: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    ctaWhatsapp: string;
    badge: string;
  };
  trust: {
    craftsmanship: string;
    custom: string;
    direct: string;
  };
  categories: {
    title: string;
    subtitle: string;
    sofas: string;
    sofasDesc: string;
    curtains: string;
    curtainsDesc: string;
    majlis: string;
    majlisDesc: string;
    explore: string;
  };
  whyChooseUs: {
    title: string;
    subtitle: string;
    quality: string;
    qualityDesc: string;
    custom: string;
    customDesc: string;
    consultation: string;
    consultationDesc: string;
    delivery: string;
    deliveryDesc: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
  newsletter: {
    title: string;
    subtitle: string;
    placeholder: string;
    button: string;
    success: string;
  };
  products: {
    title: string;
    subtitle: string;
    all: string;
    sofas: string;
    curtains: string;
    majlis: string;
    enquire: string;
    noResults: string;
  };
  about: {
    title: string;
    subtitle: string;
    storyTitle: string;
    storyP1: string;
    storyP2: string;
    storyP3: string;
    missionTitle: string;
    missionText: string;
    craftTitle: string;
    craftText: string;
    badgeText: string;
    values: {
      detail: string;
      passion: string;
      materials: string;
      personal: string;
    };
  };
  gallery: {
    title: string;
    subtitle: string;
    all: string;
    sofas: string;
    curtains: string;
    majlis: string;
    noResults: string;
  };
  contact: {
    title: string;
    subtitle: string;
    formTitle: string;
    name: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    success: string;
    infoTitle: string;
    address: string;
    addressValue: string;
    phoneLabel: string;
    email: string;
    hours: string;
    hoursValue: string;
    whatsapp: string;
  };
  footer: {
    about: string;
    aboutText: string;
    quickLinks: string;
    categories: string;
    contactInfo: string;
    rights: string;
    follow: string;
  };
  quote: {
    eyebrow: string;
    heading: string;
    description: string;
    formTitle: string;
    formSubtitle: string;
    neighborhood: string;
    neighborhoodPlaceholder: string;
    name: string;
    namePlaceholder: string;
    service: string;
    serviceSofas: string;
    serviceCurtains: string;
    serviceMajlis: string;
    serviceOther: string;
    details: string;
    detailsPlaceholder: string;
    send: string;
    whatsappCard: string;
    directCard: string;
    areaCard: string;
    areaValue: string;
  };
  whatsapp: {
    label: string;
    message: string;
  };
  languageName: string;
  direction: 'ltr' | 'rtl';
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      about: 'About Us',
      gallery: 'Gallery',
      quote: 'Get a Quote',
      contact: 'Contact',
    },
    hero: {
      title: 'Crafting Timeless Elegance for Your Home',
      subtitle: 'Premium sofas, curtains, and traditional Arabic majlis — custom-tailored to perfection',
      cta: 'Explore Collections',
      ctaWhatsapp: 'Chat on WhatsApp',
      badge: 'Luxury Interior Craftsmanship',
    },
    trust: {
      craftsmanship: 'Handcrafted with Care',
      custom: 'Tailored to Your Space',
      direct: 'Direct Communication, No Middlemen',
    },
    categories: {
      title: 'Our Collections',
      subtitle: 'Explore our curated range of premium home furnishings',
      sofas: 'Luxury Sofas',
      sofasDesc: 'Handcrafted sofas blending comfort with timeless elegance',
      curtains: 'Custom Curtains',
      curtainsDesc: 'Bespoke drapery tailored to your windows and style',
      majlis: 'Arabic Majlis',
      majlisDesc: 'Traditional floor seating with authentic Arabian craftsmanship',
      explore: 'Explore',
    },
    whyChooseUs: {
      title: 'Why Choose Us',
      subtitle: 'Our commitment to excellence in every detail',
      quality: 'Premium Quality',
      qualityDesc: 'We source only the finest fabrics and materials from trusted suppliers worldwide',
      custom: 'Custom Designs',
      customDesc: 'Every piece is tailored to your exact specifications and personal style',
      consultation: 'Free Consultation',
      consultationDesc: 'Our expert designers help you choose the perfect pieces for your space',
      delivery: 'Delivery & Installation',
      deliveryDesc: 'Professional delivery and installation services across the Gulf region',
    },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Trusted by families across the Gulf region',
    },
    newsletter: {
      title: 'Stay Connected With Us',
      subtitle: 'Subscribe to receive updates on new collections and exclusive offers',
      placeholder: 'Enter your email address',
      button: 'Subscribe',
      success: 'Thank you for subscribing!',
    },
    products: {
      title: 'Our Products',
      subtitle: 'Browse our full collection of premium home furnishings',
      all: 'All Products',
      sofas: 'Sofas',
      curtains: 'Curtains',
      majlis: 'Majlis',
      enquire: 'Enquire Now',
      noResults: 'No products found in this category',
    },
    about: {
      title: 'About Tafseel',
      subtitle: 'A legacy of craftsmanship and elegance',
      storyTitle: 'Our Story',
      storyP1: 'Tafseel was born from a simple belief: every home deserves pieces made with real care, not mass-produced on an assembly line. From the first fabric sample to the final stitch, we work closely with each client to bring their vision to life.',
      storyP2: 'We keep things honest — quality materials, fair pricing, and getting the details right the first time. Whether it is a single curtain or a full majlis, we treat every project with the same attention and respect.',
      storyP3: 'Every piece we create tells a story — of tradition, of elegance, and of the timeless beauty of Arabian interiors. We invite you to be part of our story.',
      missionTitle: 'Our Mission',
      missionText: 'To bring the warmth and elegance of Arabian interior design into every home, combining traditional craftsmanship with contemporary luxury to create spaces that are both beautiful and deeply comfortable.',
      craftTitle: 'Our Craftsmanship',
      craftText: 'Each piece is handcrafted by skilled artisans who have honed their craft over generations. From selecting the finest fabrics to the final stitch, every step is carried out with meticulous attention to detail.',
      badgeText: 'Trusted Craftsmanship',
      values: {
        detail: 'Attention to Every Detail',
        passion: 'Passion-Driven Work',
        materials: 'Premium Materials Only',
        personal: 'A Personal Touch',
      },
    },
    gallery: {
      title: 'Our Gallery',
      subtitle: 'A showcase of our completed projects and craftsmanship',
      all: 'All',
      sofas: 'Sofas',
      curtains: 'Curtains',
      majlis: 'Majlis',
      noResults: 'No photos found in this category',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'We would love to hear from you. Reach out for inquiries or consultations.',
      formTitle: 'Send Us a Message',
      name: 'Your Name',
      namePlaceholder: 'Enter your full name',
      phone: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      message: 'Your Message',
      messagePlaceholder: 'Tell us about your project or inquiry...',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Your message has been sent successfully!',
      infoTitle: 'Contact Information',
      address: 'Address',
      addressValue: 'Al-Arid District, Abdullah Bin Al-Aas Road, Riyadh, Saudi Arabia',
      phoneLabel: 'Phone',
      email: 'Email',
      hours: 'Working Hours',
      hoursValue: 'Sat - Thu: 9:00 AM - 10:00 PM\nFriday: 4:00 PM - 10:00 PM',
      whatsapp: 'Chat on WhatsApp',
    },
    footer: {
      about: 'About Tafseel',
      aboutText: 'Premium sofas, curtains, and traditional Arabic majlis seating — crafted with passion and precision for the discerning homeowner.',
      quickLinks: 'Quick Links',
      categories: 'Categories',
      contactInfo: 'Contact Info',
      rights: 'All rights reserved.',
      follow: 'Follow Us',
    },
    quote: {
      eyebrow: 'Get a Quote',
      heading: "Let's start designing your space today",
      description: 'We are happy to receive your inquiries and requests. Fill in a few details and our team will get back to you on WhatsApp to arrange a preview appointment.',
      formTitle: 'Request a Quote',
      formSubtitle: 'Fill in the details and your request will be sent directly to us via WhatsApp.',
      neighborhood: 'Neighborhood',
      neighborhoodPlaceholder: 'Example: Al-Arid neighborhood',
      name: 'Name',
      namePlaceholder: 'Your name',
      service: 'Service Required',
      serviceSofas: 'Sofas',
      serviceCurtains: 'Curtains',
      serviceMajlis: 'Majlis',
      serviceOther: 'Other / Not sure yet',
      details: 'Order Details',
      detailsPlaceholder: 'Number of windows, approximate sizes, preferred colors...',
      send: 'Send the Request via WhatsApp',
      whatsappCard: 'WhatsApp',
      directCard: 'Direct Contact',
      areaCard: 'Service Area',
      areaValue: 'Riyadh, Saudi Arabia',
    },
    whatsapp: {
      label: 'Chat with us',
      message: "Hello! I'm interested in your products. Can you help me?",
    },
    languageName: 'English',
    direction: 'ltr',
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      products: 'المنتجات',
      about: 'من نحن',
      gallery: 'معرض الأعمال',
      quote: 'اطلب عرض سعر',
      contact: 'تواصل معنا',
    },
    hero: {
      title: 'نصنع الأناقة الخالدة لمنزلك',
      subtitle: 'أرائك فاخرة وستائر ومجالس عربية تقليدية — مصممة بعناية لإتقان التفاصيل',
      cta: 'تصفح المجموعات',
      ctaWhatsapp: 'تواصل عبر واتساب',
      badge: 'حرفية داخلية فاخرة',
    },
    trust: {
      craftsmanship: 'صناعة يدوية بعناية',
      custom: 'مصمم خصيصاً لمساحتك',
      direct: 'تواصل مباشر بدون وسطاء',
    },
    categories: {
      title: 'مجموعاتنا',
      subtitle: 'اكتشف مجموعتنا المنتقاة من الأثاث الفاخر',
      sofas: 'أرائك فاخرة',
      sofasDesc: 'أرائك مصنوعة يدوياً تجمع بين الراحة والأناقة الخالدة',
      curtains: 'ستائر حسب الطلب',
      curtainsDesc: 'ستائر مفصلة خصيصاً لنوافذك وذوقك الخاص',
      majlis: 'مجالس عربية',
      majlisDesc: 'جلوس أرضي تقليدي بحرفية عربية أصيلة',
      explore: 'تصفح',
    },
    whyChooseUs: {
      title: 'لماذا تختارنا',
      subtitle: 'التزامنا بالتميز في كل تفصيل',
      quality: 'جودة فاخرة',
      qualityDesc: 'نختار أجود الأقمشة والمواد من موردين موثوقين حول العالم',
      custom: 'تصاميم مخصصة',
      customDesc: 'كل قطعة مصممة خصيصاً لتناسب مواصفاتك وذوقك الشخصي',
      consultation: 'استشارة مجانية',
      consultationDesc: 'يساعدك مصمموونا الخبراء في اختيار القطع المثالية لمساحتك',
      delivery: 'التوصيل والتركيب',
      deliveryDesc: 'خدمات توصيل وتركيب احترافية في جميع أنحاء منطقة الخليج',
    },
    testimonials: {
      title: 'ماذا يقول عملاؤنا',
      subtitle: 'موثوق من العائلات في جميع أنحاء منطقة الخليج',
    },
    newsletter: {
      title: 'ابق على تواصل معنا',
      subtitle: 'اشترك لتصلك تحديثات المجموعات الجديدة والعروض الحصرية',
      placeholder: 'أدخل بريدك الإلكتروني',
      button: 'اشترك',
      success: 'شكراً لاشتراكك!',
    },
    products: {
      title: 'منتجاتنا',
      subtitle: 'تصفح مجموعتنا الكاملة من الأثاث الفاخر',
      all: 'كل المنتجات',
      sofas: 'أرائك',
      curtains: 'ستائر',
      majlis: 'مجالس',
      enquire: 'استفسر الآن',
      noResults: 'لا توجد منتجات في هذه الفئة',
    },
    about: {
      title: 'عن تفصيل',
      subtitle: 'إرث من الحرفية والأناقة',
      storyTitle: 'قصتنا',
      storyP1: 'انطلقت تفصيل من فكرة بسيطة: كل منزل يستحق قطعاً مصنوعة بعناية حقيقية، لا إنتاجاً مكرراً بلا روح. من اختيار القماش الأول وحتى آخر غرزة، نعمل عن قرب مع كل عميل لتحويل فكرته إلى واقع.',
      storyP2: 'نحرص على الصدق في كل تفصيل — خامات عالية الجودة، أسعار عادلة، وإتقان التفاصيل من أول مرة. سواء كانت ستارة واحدة أو مجلساً كاملاً، نتعامل مع كل مشروع بنفس الاهتمام والاحترام.',
      storyP3: 'كل قطعة نصنعها تروي قصة — قصة التقاليد والأناقة والجمال الخالد للتصميم الداخلي العربي. ندعوك لتكون جزءاً من قصتنا.',
      missionTitle: 'مهمتنا',
      missionText: 'إدخال دفء وأناقة التصميم الداخري العربي إلى كل منزل، مع الجمع بين الحرفية التقليدية والفخامة المعاصرة لخلق مساحات جميلة ومريحة في آن واحد.',
      craftTitle: 'حرفيتنا',
      craftText: 'كل قطعة مصنوعة يدوياً من قبل حرفيين مهرة صقلوا حرفتهم على مدى أجيال. من اختيار أجود الأقمشة إلى الغرزة الأخيرة، كل خطوة تتم بعناية فائقة واهتمام بأدق التفاصيل.',
      badgeText: 'حرفية موثوقة',
      values: {
        detail: 'اهتمام بكل التفاصيل',
        passion: 'عمل نابع من الشغف',
        materials: 'خامات فاخرة فقط',
        personal: 'لمسة شخصية',
      },
    },
    gallery: {
      title: 'معرض أعمالنا',
      subtitle: 'عرض لمشاريعنا المكتملة وحرفيتنا',
      all: 'الكل',
      sofas: 'أرائك',
      curtains: 'ستائر',
      majlis: 'مجالس',
      noResults: 'لا توجد صور في هذه الفئة',
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'يسعدنا سماعك. تواصل معنا للاستفسارات أو الاستشارات.',
      formTitle: 'أرسل لنا رسالة',
      name: 'اسمك',
      namePlaceholder: 'أدخل اسمك الكامل',
      phone: 'رقم الهاتف',
      phonePlaceholder: 'أدخل رقم هاتفك',
      message: 'رسالتك',
      messagePlaceholder: 'أخبرنا عن مشروعك أو استفسارك...',
      send: 'إرسال الرسالة',
      sending: 'جارٍ الإرسال...',
      success: 'تم إرسال رسالتك بنجاح!',
      infoTitle: 'معلومات الاتصال',
      address: 'العنوان',
      addressValue: 'حي العارض، طريق عبدالله بن العاص، الرياض، المملكة العربية السعودية',
      phoneLabel: 'الهاتف',
      email: 'البريد الإلكتروني',
      hours: 'ساعات العمل',
      hoursValue: 'السبت - الخميس: 9:00 ص - 10:00 م\nالجمعة: 4:00 م - 10:00 م',
      whatsapp: 'تحدث عبر واتساب',
    },
    footer: {
      about: 'عن تفصيل',
      aboutText: 'أرائك فاخرة وستائر ومجالس عربية تقليدية — مصنوعة بشغف ودقة لأصحاب المنازل المميزين.',
      quickLinks: 'روابط سريعة',
      categories: 'الفئات',
      contactInfo: 'معلومات الاتصال',
      rights: 'جميع الحقوق محفوظة.',
      follow: 'تابعنا',
    },
    quote: {
      eyebrow: 'اطلب عرض سعر',
      heading: 'لنبدأ بتصميم مساحتك اليوم',
      description: 'يسعدنا استقبال استفساراتكم وطلباتكم. املأ بعض التفاصيل وسيتواصل معك فريقنا عبر واتساب لترتيب موعد معاينة.',
      formTitle: 'اطلب عرض سعر',
      formSubtitle: 'املأ التفاصيل وسيتم إرسال طلبك مباشرة إلينا عبر واتساب.',
      neighborhood: 'الحي',
      neighborhoodPlaceholder: 'مثال: حي العارض',
      name: 'الاسم',
      namePlaceholder: 'اسمك',
      service: 'الخدمة المطلوبة',
      serviceSofas: 'كنب وأرائك',
      serviceCurtains: 'ستائر',
      serviceMajlis: 'مجالس',
      serviceOther: 'أخرى / غير محدد بعد',
      details: 'تفاصيل الطلب',
      detailsPlaceholder: 'عدد النوافذ، المقاسات التقريبية، الألوان المفضلة...',
      send: 'إرسال الطلب عبر واتساب',
      whatsappCard: 'واتساب',
      directCard: 'تواصل مباشر',
      areaCard: 'منطقة الخدمة',
      areaValue: 'الرياض، المملكة العربية السعودية',
    },
    whatsapp: {
      label: 'تحدث معنا',
      message: 'مرحباً! أنا مهتم بمنتجاتكم. هل يمكنك مساعدتي؟',
    },
    languageName: 'العربية',
    direction: 'rtl',
  },
};
