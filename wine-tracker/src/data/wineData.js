// Georgian wine data collection with detailed information

// Regions of Georgia with wine production
export const regions = [
  {
    id: 'kakheti',
    name: 'Kakheti',
    description: 'Georgia\'s main wine region, producing 70% of the country\'s wine. Known for traditional qvevri methods and rich red wines.',
    grapes: ['Saperavi', 'Rkatsiteli', 'Kisi', 'Khikhvi', 'Mtsvane Kakhuri'],
    climate: 'Continental, hot summers and mild winters',
    soil: 'Clay, limestone, and volcanic soil',
    keyVineyards: ['Pheasant\'s Tears', 'Telavi Wine Cellar', 'Schuchmann Wines']
  },
  {
    id: 'kartli',
    name: 'Kartli',
    description: 'Central region with higher altitudes, producing crisp whites and light reds with good acidity.',
    grapes: ['Chinuri', 'Goruli Mtsvane', 'Tavkveri', 'Shavkapito'],
    climate: 'Continental, cooler than Kakheti with strong winds',
    soil: 'Limestone, loamy soil',
    keyVineyards: ['Chateau Mukhrani', 'Gotsa Family Wines']
  },
  {
    id: 'imereti',
    name: 'Imereti',
    description: 'Western region known for light, fresh wines with less skin contact than Kakheti styles.',
    grapes: ['Tsolikouri', 'Tsitska', 'Krakhuna', 'Dzelshavi'],
    climate: 'Humid subtropical, warm and wet',
    soil: 'Yellow limestone, rich in calcium',
    keyVineyards: ['Vartsikhe Marani', 'Baia\'s Wine']
  },
  {
    id: 'racha',
    name: 'Racha-Lechkhumi',
    description: 'Mountainous northern region famous for the naturally semi-sweet Khvanchkara wine.',
    grapes: ['Aleksandrouli', 'Mujuretuli', 'Tetra', 'Tsolikouri'],
    climate: 'Alpine influence, cool with significant day-night temperature variations',
    soil: 'Sandy clay, limestone',
    keyVineyards: ['Khvanchkara Winery', 'Racha Wine']
  },
  {
    id: 'adjara',
    name: 'Adjara',
    description: 'Southwestern coastal region with high humidity and subtropical climate. Developing wine tourism.',
    grapes: ['Chkhaveri', 'Tsolikouri', 'Ojaleshi'],
    climate: 'Humid subtropical, warm and very wet',
    soil: 'Red clay, rich in iron',
    keyVineyards: ['Adjarian Wine House', 'Batono']
  },
  {
    id: 'samegrelo',
    name: 'Samegrelo',
    description: 'Western region with ancient winemaking traditions, known for Ojaleshi grape variety.',
    grapes: ['Ojaleshi', 'Chvitiluri', 'Tsolikouri'],
    climate: 'Humid subtropical with Black Sea influence',
    soil: 'Alluvial soil, limestone',
    keyVineyards: ['Ojaleshi Wine Cellar', 'Martvili Wines']
  },
  {
    id: 'guria',
    name: 'Guria',
    description: 'Small western region with unique varieties and winemaking traditions.',
    grapes: ['Chkhaveri', 'Jani', 'Mtsvivani Guriuli'],
    climate: 'Warm, humid subtropical climate influenced by the Black Sea',
    soil: 'Red soil with high iron content',
    keyVineyards: ['Guria Wines', 'Bukistsikhe']
  },
  {
    id: 'samtskhe',
    name: 'Samtskhe-Javakheti',
    description: 'High-altitude southern region with emerging wine production and ancient traditions being revived.',
    grapes: ['Meskhuri Mtsvane', 'Akhmetis Tetri'],
    climate: 'Continental with cold winters and cool summers',
    keyVineyards: ['Samtskhe Wine Cellar', 'Vardzia Terraces']
  }
];

// Georgian grape varieties
export const grapeVarieties = [
  {
    id: 'saperavi',
    name: 'Saperavi',
    color: 'Red',
    description: 'Georgia\'s most important red grape. Makes full-bodied, inky dark wines with powerful tannins and aging potential.',
    regions: ['Kakheti', 'Kartli', 'Imereti']
  },
  {
    id: 'rkatsiteli',
    name: 'Rkatsiteli',
    color: 'White/Amber',
    description: 'Most widely planted white grape in Georgia. Versatile variety making crisp whites or amber wines with good acidity.',
    regions: ['Kakheti', 'Kartli']
  },
  {
    id: 'mtsvane',
    name: 'Mtsvane Kakhuri',
    color: 'White/Amber',
    description: 'Aromatic white grape with floral notes and good acidity. Often used in qvevri for amber wines.',
    regions: ['Kakheti']
  },
  {
    id: 'kisi',
    name: 'Kisi',
    color: 'White/Amber',
    description: 'Aromatic variety with stone fruit notes. Makes excellent qvevri amber wines with structure and complexity.',
    regions: ['Kakheti']
  },
  {
    id: 'chinuri',
    name: 'Chinuri',
    color: 'White/Amber/Sparkling',
    description: 'High acid white grape, excellent for sparkling wines and traditional qvevri methods.',
    regions: ['Kartli']
  },
  {
    id: 'tsolikouri',
    name: 'Tsolikouri',
    color: 'White/Amber',
    description: 'Widely planted white grape in western Georgia. Produces balanced wines with subtle aromas.',
    regions: ['Imereti', 'Racha-Lechkhumi', 'Guria']
  },
  {
    id: 'tsitska',
    name: 'Tsitska',
    color: 'White/Sparkling',
    description: 'Western Georgian variety with high acidity, making it ideal for sparkling wines.',
    regions: ['Imereti']
  },
  {
    id: 'krakhuna',
    name: 'Krakhuna',
    color: 'White/Amber',
    description: 'Makes full-bodied white wines with stone fruit and nutty characteristics when made in qvevri.',
    regions: ['Imereti']
  },
  {
    id: 'aleksandrouli',
    name: 'Aleksandrouli',
    color: 'Red',
    description: 'Key component in Khvanchkara semi-sweet wine. Light-bodied with bright acidity and raspberry notes.',
    regions: ['Racha-Lechkhumi']
  },
  {
    id: 'mujuretuli',
    name: 'Mujuretuli',
    color: 'Red',
    description: 'Blending partner with Aleksandrouli in Khvanchkara. Adds deeper color and structure.',
    regions: ['Racha-Lechkhumi']
  },
  {
    id: 'ojaleshi',
    name: 'Ojaleshi',
    color: 'Red',
    description: 'Late-ripening red variety producing semi-sweet wines with distinctive blackberry and cherry notes.',
    regions: ['Samegrelo']
  },
  {
    id: 'chkhaveri',
    name: 'Chkhaveri',
    color: 'Rosé/Light Red',
    description: 'Makes delicate rosé or light red wines with bright strawberry notes and refreshing acidity.',
    regions: ['Adjara', 'Guria']
  },
  {
    id: 'shavkapito',
    name: 'Shavkapito',
    color: 'Red',
    description: 'Ancient Kartli red variety recently revived. Makes medium-bodied wines with spicy character.',
    regions: ['Kartli']
  },
  {
    id: 'tavkveri',
    name: 'Tavkveri',
    color: 'Red',
    description: 'Light-bodied red variety with soft tannins and bright cherry notes.',
    regions: ['Kartli']
  },
  {
    id: 'khikhvi',
    name: 'Khikhvi',
    color: 'White/Amber',
    description: 'Aromatic white variety with tropical fruit notes, makes excellent amber wines in qvevri.',
    regions: ['Kakheti']
  }
];

// Detailed wine collection
export const wines = [
  {
    id: '1',
    name: 'Saperavi Reserve',
    winery: "Pheasant's Tears",
    type: 'Red',
    region: 'Kakheti',
    grape: 'Saperavi',
    fermentation: 'Qvevri',
    vintage: '2019',
    description: 'A powerful, full-bodied Saperavi aged in traditional qvevri clay vessels. Intense dark fruit flavors with notes of blackberry, black cherry, and plum, complemented by savory spice and earthy undertones. Firm tannins with a long finish.',
    rating: 4.7,
    price: '35-45 GEL',
    alcohol: '13.5%',
    image: null  // In a real app, this would be an image path
  },
  {
    id: '2',
    name: 'Rkatsiteli Qvevri',
    winery: 'Teliani Valley',
    type: 'Amber',
    region: 'Kakheti',
    grape: 'Rkatsiteli',
    fermentation: 'Qvevri',
    vintage: '2020',
    description: 'Traditional qvevri-fermented amber wine with extended skin contact. Complex aromatics of dried apricot, orange peel, honey, and walnuts. The palate shows firm tannins with a dry, structured mouthfeel and notes of tea and dried fruits.',
    rating: 4.2,
    price: '25-35 GEL',
    alcohol: '12.5%',
    image: null
  },
  {
    id: '3',
    name: 'Tsolikouri',
    winery: 'Lagvinari',
    type: 'White',
    region: 'Imereti',
    grape: 'Tsolikouri',
    fermentation: 'Qvevri',
    vintage: '2021',
    description: 'Elegant qvevri-fermented white with minimal skin contact. Crisp green apple, pear, and citrus notes with a touch of white flowers. Mineral-driven with refreshing acidity and a clean finish.',
    rating: 4.0,
    price: '30-40 GEL',
    alcohol: '12%',
    image: null
  },
  {
    id: '4',
    name: 'Khvanchkara',
    winery: 'Khvanchkara Winery',
    type: 'Semi-Sweet Red',
    region: 'Racha-Lechkhumi',
    grape: 'Aleksandrouli-Mujuretuli Blend',
    fermentation: 'Steel Tank',
    vintage: '2021',
    description: 'Georgia\'s famous naturally semi-sweet red wine. Vibrant raspberry and red cherry flavors with subtle floral notes. Medium-bodied with balanced sweetness and refreshing acidity, making it elegantly sweet rather than cloying.',
    rating: 4.3,
    price: '40-50 GEL',
    alcohol: '11.5%',
    image: null
  },
  {
    id: '5',
    name: 'Chinuri Sparkling',
    winery: 'Gotsa Family Wines',
    type: 'Sparkling',
    region: 'Kartli',
    grape: 'Chinuri',
    fermentation: 'Traditional Method',
    vintage: '2020',
    description: 'Artisanal sparkling wine made from the indigenous Chinuri grape. Crisp green apple, citrus, and white flower notes with a fine, persistent mousse. Made with zero additions using traditional secondary fermentation in bottle.',
    rating: 4.1,
    price: '45-55 GEL',
    alcohol: '12%',
    image: null
  },
  {
    id: '6',
    name: 'Kisi Amber',
    winery: 'Okro\'s Wines',
    type: 'Amber',
    region: 'Kakheti',
    grape: 'Kisi',
    fermentation: 'Qvevri',
    vintage: '2020',
    description: 'Aromatic amber wine with 6 months of skin contact in qvevri. Complex bouquet of ripe apricot, orange zest, honey, and spices with a distinctive tannic structure and long, dry finish.',
    rating: 4.4,
    price: '40-50 GEL',
    alcohol: '13%',
    image: null
  },
  {
    id: '7',
    name: 'Ojaleshi',
    winery: 'Ojaleshi Wine Cellar',
    type: 'Semi-Sweet Red',
    region: 'Samegrelo',
    grape: 'Ojaleshi',
    fermentation: 'Stainless Steel',
    vintage: '2021',
    description: 'Traditional semi-sweet red from the rare Ojaleshi grape. Rich notes of blackberry, black cherry and pomegranate with a balanced sweetness and soft tannins.',
    rating: 4.2,
    price: '35-45 GEL',
    alcohol: '11.5%',
    image: null
  },
  {
    id: '8',
    name: 'Tsitska-Tsolikouri',
    winery: 'Baia\'s Wine',
    type: 'White',
    region: 'Imereti',
    grape: 'Tsitska-Tsolikouri Blend',
    fermentation: 'Stainless Steel',
    vintage: '2021',
    description: 'Crisp, refreshing white blend with bright citrus, green apple, and subtle herbal notes. Clean mineral finish with mouthwatering acidity.',
    rating: 4.0,
    price: '25-35 GEL',
    alcohol: '12%',
    image: null
  },
  {
    id: '9',
    name: 'Saperavi Classic',
    winery: 'Schuchmann Wines',
    type: 'Red',
    region: 'Kakheti',
    grape: 'Saperavi',
    fermentation: 'Oak Barrel',
    vintage: '2018',
    description: 'Modern-style Saperavi aged in French oak barrels. Concentrated blackberry and dark cherry flavors with hints of chocolate, vanilla, and spice. Full-bodied with smooth tannins and excellent aging potential.',
    rating: 4.5,
    price: '30-40 GEL',
    alcohol: '14%',
    image: null
  },
  {
    id: '10',
    name: 'Mtsvane Dry',
    winery: 'Chateau Mukhrani',
    type: 'White',
    region: 'Kartli',
    grape: 'Mtsvane Kakhuri',
    fermentation: 'Stainless Steel',
    vintage: '2021',
    description: 'Elegant white wine with vibrant aromas of white peach, citrus, and delicate floral notes. Crisp and refreshing with balanced acidity and a clean finish.',
    rating: 4.1,
    price: '25-35 GEL',
    alcohol: '12.5%',
    image: null
  },
  {
    id: '11',
    name: 'Chkhaveri Rosé',
    winery: 'Adjarian Wine House',
    type: 'Rosé',
    region: 'Adjara',
    grape: 'Chkhaveri',
    fermentation: 'Stainless Steel',
    vintage: '2021',
    description: 'Delicate salmon-pink rosé with bright strawberry, raspberry, and subtle floral notes. Light-bodied and refreshing with crisp acidity and a clean finish.',
    rating: 4.0,
    price: '25-35 GEL',
    alcohol: '12%',
    image: null
  },
  {
    id: '12',
    name: 'Krakhuna Qvevri',
    winery: 'Vartsikhe Marani',
    type: 'Amber',
    region: 'Imereti',
    grape: 'Krakhuna',
    fermentation: 'Qvevri',
    vintage: '2019',
    description: 'Full-bodied amber wine with rich texture and complex flavors of dried apricot, quince, and toasted nuts. Made with traditional qvevri fermentation for depth and character.',
    rating: 4.3,
    price: '35-45 GEL',
    alcohol: '13%',
    image: null
  }
];

// Wine fermentation methods
export const fermentationMethods = [
  {
    id: 'qvevri',
    name: 'Qvevri',
    description: 'The ancient Georgian method using clay vessels (qvevri) buried underground. Wines ferment and age with grape skins, stems, and pips for unique character.',
    UNESCO: true
  },
  {
    id: 'steel',
    name: 'Stainless Steel',
    description: 'Modern fermentation in temperature-controlled stainless steel tanks, producing fresh, fruit-forward wines with clean flavor profiles.'
  },
  {
    id: 'oak',
    name: 'Oak Barrel',
    description: 'Fermentation and/or aging in oak barrels, adding complexity, structure, and flavors of vanilla, spice, and toast to the wine.'
  },
  {
    id: 'traditional',
    name: 'Traditional Method',
    description: 'For sparkling wines, secondary fermentation occurs in the bottle, creating fine bubbles and complex flavor development.'
  }
];

// Wine color/type categories
export const wineTypes = [
  {
    id: 'red',
    name: 'Red',
    description: 'Made from red grape varieties with skin contact during fermentation.'
  },
  {
    id: 'white',
    name: 'White',
    description: 'Made from white grape varieties with minimal or no skin contact.'
  },
  {
    id: 'amber',
    name: 'Amber',
    description: 'White wines made with extended skin contact, also known as "orange wine". A traditional Georgian style.'
  },
  {
    id: 'rose',
    name: 'Rosé',
    description: 'Made from red grapes with limited skin contact, resulting in pink coloration.'
  },
  {
    id: 'sparkling',
    name: 'Sparkling',
    description: 'Wines with significant levels of carbon dioxide, creating bubbles.'
  },
  {
    id: 'semi-sweet',
    name: 'Semi-Sweet',
    description: 'Wines with noticeable residual sugar, but not as sweet as dessert wines.'
  }
]; 