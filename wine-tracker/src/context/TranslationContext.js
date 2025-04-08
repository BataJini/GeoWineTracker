import React, { createContext, useContext, useState } from 'react';

// Define translations for each language
const translations = {
  en: {
    // App navigation
    home: 'Home',
    explore: 'Explore',
    journal: 'Journal',
    favorites: 'Favorites',
    settings: 'Settings',
    map: 'Map',
    regions: 'Regions',
    
    // App title
    appTitle: 'Georgian Wine Tracker',
    appSubtitle: 'Discover the Birthplace of Wine',
    
    // Wine details
    type: 'Type',
    region: 'Region',
    grape: 'Grape',
    vintage: 'Vintage',
    alcohol: 'Alcohol',
    method: 'Method',
    price: 'Price',
    rating: 'Rating',
    description: 'Description',
    winery: 'Winery',
    priceRange: 'Price Range',
    
    // Actions
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    addToJournal: 'Add to Journal',
    
    // Explore categories
    exploreBy: 'Explore By',
    allWines: 'All Wines',
    redWines: 'Red Wines',
    whiteWines: 'White Wines',
    amberWines: 'Amber Wines',
    exploreRegionDesc: 'Discover the distinctive terroirs of Georgia\'s diverse wine regions',
    popularGrapes: 'Popular Grape Varieties',
    wineTypes: 'Wine Types',
    fermentationMethods: 'Fermentation Methods',
    
    // Wine counts
    winesCount: 'Showing {count} wines',
    noWinesFound: 'No wines found',
    wines: 'wines',
    
    // Settings
    language: 'Language',
    theme: 'Theme',
    notifications: 'Notifications',
    aboutApp: 'About App',
    chooseLanguage: 'Choose your preferred language',
    appVersion: 'Georgian Wine Tracker v1.0.0',
    
    // Languages
    english: 'English',
    georgian: 'Georgian',
    russian: 'Russian',
    
    // Featured sections
    featuredWines: 'Featured Wines',
    
    // Journal
    searchJournal: 'Search journal entries...',
    noJournalEntries: 'You have no journal entries yet',
    addNew: 'Add New',
    notes: 'Notes',
    details: 'Details',
    occasion: 'Occasion',
    location: 'Location',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    date: 'Date',
    save: 'Save',
    cancel: 'Cancel',

    // Wine Regions
    wineRegions: 'Wine Regions',
    exploreGeorgianTerroir: 'Explore the diverse terroir of Georgian winemaking',
    keyGrapes: 'Key Grapes',
    soil: 'Soil',
    andMore: 'and more',
    clickRegionBelow: 'Select a region to explore its wines and terroir',
    exploreWines: 'Explore Wines',
    winesFrom: 'Wines from {region}',
    viewOnMap: 'View on Map',
    onMap: 'on Map',

    // UNESCO Heritage
    unescoHeritage: 'UNESCO Heritage',
    qvevriWinemaking: 'Qvevri Winemaking',
    ancientGeorgianTradition: 'Ancient Georgian tradition',
    qvevriDescription: 'Dating back 8,000 years, the traditional Georgian method of fermenting wine in clay vessels (qvevri) buried underground is recognized by UNESCO as Intangible Cultural Heritage of Humanity.',
    
    // Home Screen
    searchWines: 'Search wines...',
    searchByNameWinery: 'Search by name, winery, grape...',

    // Favorites
    addMoreFavorites: 'Add more wines to favorites',

    // Search
    searchPlaceholder: 'Search by name, winery, grape...',
    searchResults: 'Search Results',
    noSearchResults: 'No results found for your search',
    search: 'Search',

    // Wine Types
    red: 'Red',
    white: 'White',
    amber: 'Amber',
    rosé: 'Rosé',
    sparkling: 'Sparkling',
    semiSweet: 'Semi-Sweet',

    // Form validation
    fieldRequired: 'This field is required',
    invalidDate: 'Invalid date format',

    // Misc
    and: 'and',
    more: 'more',
    showingResultsFor: 'Showing results for',

    // Map Screen
    exploreRegions: 'Explore Regions',
    famousFor: 'Famous For',
    climate: 'Climate',
    soilType: 'Soil Type',
    viewWines: 'View Wines',
    noInfo: 'Information not available',
    noRegionDescription: 'No detailed description available for this region.',
    mapDisclaimer: 'Map is for illustrative purposes only. Visit Georgia to explore these regions in person.',
    georgiaWineMap: 'Georgian Wine Regions Map',
    
    // Map directions and location
    directions: 'Directions',
    openMaps: 'Open Maps',
    viewRegionOnMap: 'View {region} wine region on maps?',
    open: 'Open',
    locationError: 'Location Error',
    noCoordinatesAvailable: 'Coordinates not available for this region',
    getDirections: 'Get Directions',
    nativeMaps: 'Device Maps',
    loadingMap: 'Loading Georgian wine map...',
    mapError: 'Map Error',
    mapLoadFailed: 'Failed to load the map. Please check your internet connection.',
  },
  
  // Georgian translations
  ka: {
    // App navigation
    home: 'მთავარი',
    explore: 'აღმოაჩინე',
    journal: 'ჟურნალი',
    favorites: 'რჩეულები',
    settings: 'პარამეტრები',
    map: 'რუკა',
    regions: 'რეგიონები',
    
    // App title
    appTitle: 'ქართული ღვინის ტრეკერი',
    appSubtitle: 'აღმოაჩინეთ ღვინის სამშობლო',
    
    // Wine details
    type: 'ტიპი',
    region: 'რეგიონი',
    grape: 'ყურძენი',
    vintage: 'მოსავალი',
    alcohol: 'ალკოჰოლი',
    method: 'მეთოდი',
    price: 'ფასი',
    rating: 'შეფასება',
    description: 'აღწერა',
    winery: 'მარანი',
    priceRange: 'ფასის დიაპაზონი',
    
    // Actions
    addToFavorites: 'რჩეულებში დამატება',
    removeFromFavorites: 'რჩეულებიდან წაშლა',
    addToJournal: 'ჟურნალში დამატება',
    
    // Explore categories
    exploreBy: 'მოძებნე',
    allWines: 'ყველა ღვინო',
    redWines: 'წითელი ღვინოები',
    whiteWines: 'თეთრი ღვინოები',
    amberWines: 'ქარვისფერი ღვინოები',
    exploreRegionDesc: 'აღმოაჩინეთ საქართველოს მრავალფეროვანი ღვინის რეგიონების განსხვავებული ტერუარები',
    popularGrapes: 'პოპულარული ყურძნის ჯიშები',
    wineTypes: 'ღვინის ტიპები',
    fermentationMethods: 'დაყენების მეთოდები',
    
    // Wine counts
    winesCount: 'ნაჩვენებია {count} ღვინო',
    noWinesFound: 'ღვინო ვერ მოიძებნა',
    wines: 'ღვინოები',
    
    // Settings
    language: 'ენა',
    theme: 'თემა',
    notifications: 'შეტყობინებები',
    aboutApp: 'აპლიკაციის შესახებ',
    chooseLanguage: 'აირჩიეთ თქვენი სასურველი ენა',
    appVersion: 'ქართული ღვინის ტრეკერი v1.0.0',
    
    // Languages
    english: 'ინგლისური',
    georgian: 'ქართული',
    russian: 'რუსული',
    
    // Featured sections
    featuredWines: 'გამორჩეული ღვინოები',
    
    // Journal
    searchJournal: 'ჩანაწერების ძიება...',
    noJournalEntries: 'ჯერ არ გაქვთ ჟურნალის ჩანაწერები',
    addNew: 'ახლის დამატება',
    notes: 'შენიშვნები',
    details: 'დეტალები',
    occasion: 'შემთხვევა',
    location: 'ადგილმდებარეობა',
    delete: 'წაშლა',
    edit: 'რედაქტირება',
    close: 'დახურვა',
    date: 'თარიღი',
    save: 'შენახვა',
    cancel: 'გაუქმება',

    // Wine Regions
    wineRegions: 'ღვინის რეგიონები',
    exploreGeorgianTerroir: 'გამოიკვლიეთ ქართული ღვინის მწარმოებელი რეგიონები',
    keyGrapes: 'ძირითადი ჯიშები',
    soil: 'ნიადაგი',
    andMore: 'და სხვა',
    clickRegionBelow: 'აირჩიეთ რეგიონი მისი ღვინოების სანახავად',
    exploreWines: 'ღვინოები',
    winesFrom: '{region}-ის ღვინოები',
    viewOnMap: 'რუკაზე ნახვა',
    onMap: 'რუკაზე',

    // UNESCO Heritage
    unescoHeritage: 'UNESCO-ს მემკვიდრეობა',
    qvevriWinemaking: 'ქვევრის ღვინის დაყენება',
    ancientGeorgianTradition: 'უძველესი ქართული ტრადიცია',
    qvevriDescription: '8000 წლის ისტორიის მქონე ქართული ტრადიციული მეთოდი - ღვინის ქვევრში დაყენება მიწაში ჩაფლული თიხის ჭურჭელში - აღიარებულია UNESCO-ს მიერ როგორც კულტურული მემკვიდრეობა.',

    // Home Screen
    searchWines: 'ღვინოების ძიება...',
    searchByNameWinery: 'ძიება სახელით, მარნით, ყურძნით...',

    // Favorites
    addMoreFavorites: 'დაამატეთ მეტი ღვინო რჩეულებში',

    // Search
    searchPlaceholder: 'მოძებნეთ სახელით, მარნით, ყურძნით...',
    searchWines: 'ღვინოების ძიება...',
    searchResults: 'ძიების შედეგები',
    noSearchResults: 'თქვენი ძიებისთვის შედეგები არ მოიძებნა',
    search: 'ძიება',

    // Wine Types
    red: 'წითელი',
    white: 'თეთრი',
    amber: 'ქარვისფერი',
    rosé: 'ვარდისფერი',
    sparkling: 'ცქრიალა',
    semiSweet: 'ნახევრად ტკბილი',

    // Form validation
    fieldRequired: 'ეს ველი აუცილებელია',
    invalidDate: 'არასწორი თარიღის ფორმატი',

    // Misc
    and: 'და',
    more: 'მეტი',
    showingResultsFor: 'შედეგები კატეგორიისთვის',

    // Map Screen
    exploreRegions: 'აღმოაჩინე რეგიონები',
    famousFor: 'ცნობილია',
    climate: 'კლიმატი',
    soilType: 'ნიადაგის ტიპი',
    viewWines: 'ღვინოების ნახვა',
    noInfo: 'ინფორმაცია არ არის ხელმისაწვდომი',
    noRegionDescription: 'ამ რეგიონისთვის დეტალური აღწერა არ არის ხელმისაწვდომი.',
    mapDisclaimer: 'რუკა არის მხოლოდ საილუსტრაციო მიზნებისთვის. ეწვიეთ საქართველოს ამ რეგიონების პირადად გასაცნობად.',
    georgiaWineMap: 'საქართველოს ღვინის რეგიონების რუკა',
    
    // Map directions and location
    directions: 'მიმართულებები',
    openMaps: 'რუკის გახსნა',
    viewRegionOnMap: 'გსურთ {region} ღვინის რეგიონის ნახვა რუკაზე?',
    open: 'გახსნა',
    locationError: 'ადგილმდებარეობის შეცდომა',
    noCoordinatesAvailable: 'ამ რეგიონისთვის კოორდინატები არ არის ხელმისაწვდომი',
    getDirections: 'მიმართულების მიღება',
    nativeMaps: 'მოწყობილობის რუკები',
    loadingMap: 'ქართული ღვინის რუკის ჩატვირთვა...',
    mapError: 'რუკის შეცდომა',
    mapLoadFailed: 'ვერ მოხერხდა რუკის ჩატვირთვა. გთხოვთ, შეამოწმოთ თქვენი ინტერნეტ კავშირი.',
  },
  
  // Russian translations
  ru: {
    // App navigation
    home: 'Главная',
    explore: 'Исследовать',
    journal: 'Журнал',
    favorites: 'Избранное',
    settings: 'Настройки',
    map: 'Карта',
    regions: 'Регионы',
    
    // App title
    appTitle: 'Трекер Грузинских Вин',
    appSubtitle: 'Откройте родину вина',
    
    // Wine details
    type: 'Тип',
    region: 'Регион',
    grape: 'Виноград',
    vintage: 'Год',
    alcohol: 'Алкоголь',
    method: 'Метод',
    price: 'Цена',
    rating: 'Рейтинг',
    description: 'Описание',
    winery: 'Винодельня',
    priceRange: 'Ценовой диапазон',
    
    // Actions
    addToFavorites: 'Добавить в избранное',
    removeFromFavorites: 'Удалить из избранного',
    addToJournal: 'Добавить в журнал',
    
    // Explore categories
    exploreBy: 'Просмотр по',
    allWines: 'Все вина',
    redWines: 'Красные вина',
    whiteWines: 'Белые вина',
    amberWines: 'Янтарные вина',
    exploreRegionDesc: 'Откройте для себя уникальные терруары различных винодельческих регионов Грузии',
    popularGrapes: 'Популярные сорта винограда',
    wineTypes: 'Типы вин',
    fermentationMethods: 'Методы ферментации',
    
    // Wine counts
    winesCount: 'Показано {count} вин',
    noWinesFound: 'Вина не найдены',
    wines: 'вина',
    
    // Settings
    language: 'Язык',
    theme: 'Тема',
    notifications: 'Уведомления',
    aboutApp: 'О приложении',
    chooseLanguage: 'Выберите предпочитаемый язык',
    appVersion: 'Трекер Грузинских Вин v1.0.0',
    
    // Languages
    english: 'Английский',
    georgian: 'Грузинский',
    russian: 'Русский',
    
    // Featured sections
    featuredWines: 'Рекомендуемые вина',
    
    // Journal
    searchJournal: 'Поиск по записям...',
    noJournalEntries: 'У вас еще нет записей в журнале',
    addNew: 'Добавить',
    notes: 'Заметки',
    details: 'Детали',
    occasion: 'Случай',
    location: 'Место',
    delete: 'Удалить',
    edit: 'Редактировать',
    close: 'Закрыть',
    date: 'Дата',
    save: 'Сохранить',
    cancel: 'Отмена',

    // Wine Regions
    wineRegions: 'Винные регионы',
    exploreGeorgianTerroir: 'Исследуйте разнообразный терруар грузинского виноделия',
    keyGrapes: 'Основные сорта',
    soil: 'Почва',
    andMore: 'и другие',
    clickRegionBelow: 'Выберите регион для просмотра его вин',
    exploreWines: 'Вина региона',
    winesFrom: 'Вина региона {region}',
    viewOnMap: 'На карте',
    onMap: 'на карте',

    // UNESCO Heritage
    unescoHeritage: 'Наследие ЮНЕСКО',
    qvevriWinemaking: 'Виноделие в квеври',
    ancientGeorgianTradition: 'Древняя грузинская традиция',
    qvevriDescription: 'Насчитывающий 8000 лет, традиционный грузинский метод ферментации вина в глиняных сосудах (квеври), закопанных в землю, признан ЮНЕСКО нематериальным культурным наследием человечества.',
    
    // Home Screen
    searchWines: 'Поиск вин...',
    searchByNameWinery: 'Поиск по названию, винодельне, сорту...',

    // Favorites
    addMoreFavorites: 'Добавьте больше вин в избранное',

    // Search
    searchPlaceholder: 'Поиск по названию, винодельне, сорту...',
    searchWines: 'Поиск вин...',
    searchResults: 'Результаты поиска',
    noSearchResults: 'По вашему запросу ничего не найдено',
    search: 'Поиск',

    // Wine Types
    red: 'Красное',
    white: 'Белое',
    amber: 'Янтарное',
    rosé: 'Розовое',
    sparkling: 'Игристое',
    semiSweet: 'Полусладкое',

    // Form validation
    fieldRequired: 'Это поле обязательно',
    invalidDate: 'Неверный формат даты',

    // Misc
    and: 'и',
    more: 'больше',
    showingResultsFor: 'Результаты для категории',

    // Map Screen
    exploreRegions: 'Исследуйте Регионы',
    famousFor: 'Славится',
    climate: 'Климат',
    soilType: 'Тип Почвы',
    viewWines: 'Смотреть Вина',
    noInfo: 'Информация недоступна',
    noRegionDescription: 'Подробное описание этого региона недоступно.',
    mapDisclaimer: 'Карта предназначена только для иллюстративных целей. Посетите Грузию, чтобы исследовать эти регионы лично.',
    georgiaWineMap: 'Карта винных регионов Грузии',
    
    // Map directions and location
    directions: 'Направления',
    openMaps: 'Открыть Карты',
    viewRegionOnMap: 'Просмотреть винный регион {region} на картах?',
    open: 'Открыть',
    locationError: 'Ошибка определения местоположения',
    noCoordinatesAvailable: 'Координаты для этого региона недоступны',
    getDirections: 'Проложить маршрут',
    nativeMaps: 'Карты устройства',
    loadingMap: 'Загрузка карты грузинских вин...',
    mapError: 'Ошибка карты',
    mapLoadFailed: 'Не удалось загрузить карту. Пожалуйста, проверьте подключение к интернету.',
  }
};

// Create context
const TranslationContext = createContext();

// Translation provider component
export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Function to change language
  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  // Function to get translation for a key
  const t = (key, params = {}) => {
    const translation = translations[currentLanguage][key] || key;
    
    // Handle parameter substitution
    if (Object.keys(params).length > 0) {
      return Object.keys(params).reduce((result, param) => {
        return result.replace(`{${param}}`, params[param]);
      }, translation);
    }
    
    return translation;
  };

  // Provide the translation context to children
  return (
    <TranslationContext.Provider value={{ t, currentLanguage, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use translations
export const useTranslation = () => useContext(TranslationContext);

export default TranslationContext; 