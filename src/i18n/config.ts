import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        explore: 'Explore',
        trends: 'Trending',
        cars: 'Cars',
        motorbikes: 'Motorbikes',
        art: 'Art',
        customize: 'Customize',
        cart: 'Cart',
        account: 'Account',
        admin: 'Admin',
      },
      // Home
      home: {
        hero: 'Frame Your Moments',
        subtitle: 'Custom frames for your special memories',
        cta: 'Start Customizing',
        categories: 'Shop by Category',
        trending: 'Trending Now',
      },
      // Common
      common: {
        addToCart: 'Add to Cart',
        customize: 'Customize',
        price: 'Price',
        startingFrom: 'Starting from',
        egp: 'EGP',
        logout: 'Logout',
        login: 'Login',
        signup: 'Sign Up',
        submit: 'Submit',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        save: 'Save',
      },
      // Categories
      categories: {
        cars: 'Cars Lovers',
        motorbikes: 'Motorbikes Lovers',
        art: 'Art & Creative',
        misc: 'Miscellaneous',
      },
      // Auth
      auth: {
        welcomeBack: 'Welcome Back',
        createAccount: 'Create Account',
        email: 'Email',
        password: 'Password',
        name: 'Full Name',
        phone1: 'Primary Phone',
        phone2: 'Secondary Phone',
        phone1Required: 'Primary phone is required',
        phone2Required: 'Secondary phone is required',
        phoneFormat: 'Phone must be 11 digits starting with 01',
      },
      // Checkout
      checkout: {
        title: 'Checkout',
        deliveryInfo: 'Delivery Information',
        governorate: 'Governorate',
        city: 'City',
        street: 'Street Address',
        postalCode: 'Postal Code',
        deliveryFee: 'Delivery Fee',
        total: 'Total',
        placeOrder: 'Place Order',
        codOnly: 'Cash on Delivery Only',
      },
      // Admin
      admin: {
        dashboard: 'Admin Dashboard',
        products: 'Products',
        orders: 'Orders',
        addProduct: 'Add Product',
        editProduct: 'Edit Product',
        customOrders: 'Custom Orders',
      },
    },
  },
  ar: {
    translation: {
      // Navigation
      nav: {
        explore: 'استكشف',
        trends: 'الأكثر رواجاً',
        cars: 'للسيارات',
        motorbikes: 'للدراجات',
        art: 'للفنون',
        customize: 'تخصيص',
        cart: 'السلة',
        account: 'الحساب',
        admin: 'الإدارة',
      },
      // Home
      home: {
        hero: 'أطّر لحظاتك',
        subtitle: 'إطارات مخصصة لذكرياتك المميزة',
        cta: 'ابدأ التخصيص',
        categories: 'تسوق حسب الفئة',
        trending: 'الأكثر رواجاً',
      },
      // Common
      common: {
        addToCart: 'أضف للسلة',
        customize: 'تخصيص',
        price: 'السعر',
        startingFrom: 'يبدأ من',
        egp: 'جنيه',
        logout: 'تسجيل الخروج',
        login: 'تسجيل الدخول',
        signup: 'إنشاء حساب',
        submit: 'إرسال',
        cancel: 'إلغاء',
        delete: 'حذف',
        edit: 'تعديل',
        save: 'حفظ',
      },
      // Categories
      categories: {
        cars: 'عشاق السيارات',
        motorbikes: 'عشاق الدراجات',
        art: 'الفن والإبداع',
        misc: 'متنوع',
      },
      // Auth
      auth: {
        welcomeBack: 'مرحباً بعودتك',
        createAccount: 'إنشاء حساب جديد',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        name: 'الاسم الكامل',
        phone1: 'رقم الهاتف الأول',
        phone2: 'رقم الهاتف الثاني',
        phone1Required: 'رقم الهاتف الأول مطلوب',
        phone2Required: 'رقم الهاتف الثاني مطلوب',
        phoneFormat: 'يجب أن يكون الرقم 11 خانة ويبدأ بـ 01',
      },
      // Checkout
      checkout: {
        title: 'إتمام الطلب',
        deliveryInfo: 'معلومات التوصيل',
        governorate: 'المحافظة',
        city: 'المدينة',
        street: 'عنوان الشارع',
        postalCode: 'الرمز البريدي',
        deliveryFee: 'رسوم التوصيل',
        total: 'الإجمالي',
        placeOrder: 'تأكيد الطلب',
        codOnly: 'الدفع عند الاستلام فقط',
      },
      // Admin
      admin: {
        dashboard: 'لوحة الإدارة',
        products: 'المنتجات',
        orders: 'الطلبات',
        addProduct: 'إضافة منتج',
        editProduct: 'تعديل منتج',
        customOrders: 'الطلبات المخصصة',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
