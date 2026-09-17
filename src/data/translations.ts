export type Language = 'en' | 'ar';

export interface Translation {
  nav: {
    home: string;
    products: string;
    about: string;
    gallery: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
    badge: string;
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
    stats: {
      years: string;
      yearsLabel: string;
      projects: string;
      projectsLabel: string;
      clients: string;
      clientsLabel: string;
      fabrics: string;
      fabricsLabel: string;
    };
  };
  gallery: {
    title: string;
    subtitle: string;
    all: string;
    sofas: string;
    curtains: string;
    majlis: string;
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
      contact: 'Contact',
    },
    hero: {
      title: 'Crafting Timeless Elegance for Your Home',
      subtitle: 'Premium sofas, curtains, and traditional Arabic majlis — custom-tailored to perfection',
      cta: 'Explore Collections',
      ctaSecondary: 'Free Consultation',
      badge: 'Luxury Interior Craftsmanship',
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
      storyP1: 'Tafseel Curtains & Majlis was founded with a passion for preserving the rich heritage of Arabian interior design while embracing modern luxury. For over two decades, we have been crafting premium sofas, curtains, and traditional majlis seating for discerning clients across the Gulf region.',
      storyP2: 'Our journey began in a small workshop where master artisans poured their skill into every stitch and seam. Today, we have grown into a trusted name in luxury home furnishings, serving hundreds of families who appreciate the art of fine craftsmanship.',
      storyP3: 'Every piece we create tells a story — of tradition, of elegance, and of the timeless beauty of Arabian interiors. We invite you to be part of our story.',
      missionTitle: 'Our Mission',
      missionText: 'To bring the warmth and elegance of Arabian interior design into every home, combining traditional craftsmanship with contemporary luxury to create spaces that are both beautiful and deeply comfortable.',
      craftTitle: 'Our Craftsmanship',
      craftText: 'Each piece is handcrafted by skilled artisans who have honed their craft over generations. From selecting the finest fabrics to the final stitch, every step is carried out with meticulous attention to detail.',
      stats: {
        years: '20+',
        yearsLabel: 'Years of Experience',
        projects: '500+',
        projectsLabel: 'Projects Completed',
        clients: '300+',
        clientsLabel: 'Happy Clients',
        fabrics: '100+',
        fabricsLabel: 'Premium Fabrics',
      },
    },
    gallery: {
      title: 'Our Gallery',
      subtitle: 'A showcase of our completed projects and craftsmanship',
      all: 'All',
      sofas: 'Sofas',
      curtains: 'Curtains',
      majlis: 'Majlis',
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
      addressValue: 'King Fahd Road, Riyadh, Saudi Arabia',
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
      contact: 'تواصل معنا',
    },
    hero: {
      title: 'نصنع الأناقة الخالدة لمنزلك',
      subtitle: 'أرائك فاخرة وستائر ومجالس عربية تقليدية — مصممة بعناية لإتقان التفاصيل',
      cta: 'تصفح المجموعات',
      ctaSecondary: 'استشارة مجانية',
      badge: 'حرفية داخلية فاخرة',
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
      storyP1: 'تأسست تفصيل ستائر ومجالس بشغف الحفاظ على التراث الغني للتصميم الداخلي العربي مع احتضان الفخامة الحديثة. لأكثر من عقدين، نصنع أرائك وستائر ومجالس عربية تقليدية فاخرة لعملاء مميزين في جميع أنحاء منطقة الخليج.',
      storyP2: 'بدأت رحلتنا في ورشة صغيرة حيث صب الحرفيون المهرة إبداعهم في كل غرزة وخيط. اليوم، أصبحنا اسماً موثوقاً في الأثاث المنزلي الفاخر، نخدم مئات العائلات التي تقدر فن الحرفية الدقيقة.',
      storyP3: 'كل قطعة نصنعها تروي قصة — قصة التقاليد والأناقة والجمال الخالد للتصميم الداخلي العربي. ندعوك لتكون جزءاً من قصتنا.',
      missionTitle: 'مهمتنا',
      missionText: 'إدخال دفء وأناقة التصميم الداخري العربي إلى كل منزل، مع الجمع بين الحرفية التقليدية والفخامة المعاصرة لخلق مساحات جميلة ومريحة في آن واحد.',
      craftTitle: 'حرفيتنا',
      craftText: 'كل قطعة مصنوعة يدوياً من قبل حرفيين مهرة صقلوا حرفتهم على مدى أجيال. من اختيار أجود الأقمشة إلى الغرزة الأخيرة، كل خطوة تتم بعناية فائقة واهتمام بأدق التفاصيل.',
      stats: {
        years: '+20',
        yearsLabel: 'سنوات خبرة',
        projects: '+500',
        projectsLabel: 'مشروع مكتمل',
        clients: '+300',
        clientsLabel: 'عميل سعيد',
        fabrics: '+100',
        fabricsLabel: 'قماش فاخر',
      },
    },
    gallery: {
      title: 'معرض أعمالنا',
      subtitle: 'عرض لمشاريعنا المكتملة وحرفيتنا',
      all: 'الكل',
      sofas: 'أرائك',
      curtains: 'ستائر',
      majlis: 'مجالس',
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
      addressValue: 'طريق الملك فهد، الرياض، المملكة العربية السعودية',
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
    whatsapp: {
      label: 'تحدث معنا',
      message: 'مرحباً! أنا مهتم بمنتجاتكم. هل يمكنك مساعدتي؟',
    },
    languageName: 'العربية',
    direction: 'rtl',
  },
};
