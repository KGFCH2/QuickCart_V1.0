import { Product, ProductCategory, User, UserRole } from './types';

const DB_KEY = 'quickcart_db';

interface DBState {
  users: User[];
  products: Product[];
  orders: any[];
  currentUser: User | null;
}

const INITIAL_STATE: DBState = {
  users: [
    { id: '2', name: 'Test Customer', email: 'customer@test.com', role: UserRole.CUSTOMER, password: 'password123' }
  ],
  products: [
    // Men's Wear
    { id: 'mw1', name: 'Tailored Linen Blazer', category: ProductCategory.MENS_WEAR, price: 4999, stock: 20, description: 'Premium slim-fit linen blazer in sandstone beige.', image: 'https://frenchcrown.in/cdn/shop/products/BL2260-SB-PP_1.jpg?v=1700648066&width=3600' },
    { id: 'mw2', name: 'Indigo Oxford Shirt', category: ProductCategory.MENS_WEAR, price: 1899, stock: 45, description: 'Classic oxford weave cotton shirt with button-down collar.', image: 'https://www.thestiffcollar.com/cdn/shop/files/DENIMDARKBLUE_3.jpg?v=1764082965&width=1300' },
    { id: 'mw3', name: 'Raw Selvedge Denim', category: ProductCategory.MENS_WEAR, price: 3299, stock: 30, description: 'Heavyweight indigo denim that fades uniquely over time.', image: 'https://denimhunters.com/wp-content/uploads/LVC-1947-501XX-1024x1024.jpg' },
    { id: 'mw4', name: 'Merino Wool Polo', category: ProductCategory.MENS_WEAR, price: 2499, stock: 25, description: 'Fine-knit merino wool for a sophisticated casual look.', image: 'https://www.fashiola.in/product-list/120382040.webp' },
    { id: 'mw5', name: 'Classic Chino Shorts', category: ProductCategory.MENS_WEAR, price: 1299, stock: 50, description: 'Comfortable cotton twill chinos in navy blue.', image: 'https://images.napali.app/global/element-products/all/default/xlarge/elyws00104_element,f_kha_frt1.jpg' },
    { id: 'mw6', name: 'Cashmere V-Neck Sweater', category: ProductCategory.MENS_WEAR, price: 6999, stock: 12, description: 'Luxurious 100% Mongolian cashmere in charcoal grey.', image: 'https://images-cdn.ubuy.co.in/6942ae35c630eabde700445c-100-goat-cashmere-v-neck-sweater-mens.jpg' },
    { id: 'mw7', name: 'Technical Parka Jacket', category: ProductCategory.MENS_WEAR, price: 5499, stock: 15, description: 'Waterproof and wind-resistant technical outer layer.', image: 'https://m.media-amazon.com/images/I/81QTGezgM9L._AC_UY1100_.jpg' },
    { id: 'mw8', name: 'Premium Cotton Kurta', category: ProductCategory.MENS_WEAR, price: 1999, stock: 40, description: 'Bespoke hand-loomed cotton kurta with intricate embroidery.', image: 'https://i.etsystatic.com/22456625/r/il0b56e5/4075336478/il_570xN.4075336478_e3bu.jpg' },
    { id: 'mw9', name: 'Formal Pinstripe Suit', category: ProductCategory.MENS_WEAR, price: 12999, stock: 8, description: 'Italian wool pinstripe suit for the executive wardrobe.', image: 'https://images-cdn.ubuy.co.in/65e899345d0a792d5b1d5f98-mens-suits-2-piece-pinstripe-suit-double.jpg' },
    { id: 'mw10', name: 'Graphic Urban Hoodie', category: ProductCategory.MENS_WEAR, price: 2199, stock: 35, description: 'Heavyweight fleece hoodie with minimalist back print.', image: 'https://m.media-amazon.com/images/I/61y9n7U1sTL._AC_UY1100_.jpg' },

    // Women's Wear
    { id: 'ww1', name: 'Silk Wrap Midi Dress', category: ProductCategory.WOMENS_WEAR, price: 3499, stock: 15, description: 'Elegant mulberry silk wrap dress in emerald green.', image: 'https://1861.ca/cdn/shop/files/akamari-ES-1.jpg?v=1717530479&width=2048' },
    { id: 'ww2', name: 'Cashmere Oversized Sweater', category: ProductCategory.WOMENS_WEAR, price: 5999, stock: 10, description: 'Ultra-soft grade A cashmere sweater for cozy luxury.', image: 'https://m.media-amazon.com/images/I/61asxzpEoTL._AC_UY1000_.jpg' },
    { id: 'ww3', name: 'High-Waist Wide Leg Jeans', category: ProductCategory.WOMENS_WEAR, price: 2799, stock: 25, description: 'Vintage-inspired denim with a modern flattering silhouette.', image: 'https://assets.ajio.com/medias/sys_master/root/20230912/ARsa/65005191afa4cf41f5dd608d/-1117Wx1400H-441945793-blue-MODEL.jpg' },
    { id: 'ww4', name: 'Tailored Satin Blazer', category: ProductCategory.WOMENS_WEAR, price: 4299, stock: 20, description: 'Sharp-shouldered satin blazer in midnight black.', image: 'https://media.neimanmarcus.com/f_auto,q_auto:low,ar_4:5,c_fill,dpr_2.0,w_790/01/nm_4662356_100550_m' },
    { id: 'ww5', name: 'Floral Chiffon Maxi', category: ProductCategory.WOMENS_WEAR, price: 3899, stock: 18, description: 'Hand-painted floral print chiffon for garden events.', image: 'https://i.pinimg.com/736x/04/bf/10/04bf1054e2431bfe798bea4eaa24154d.jpg' },
    { id: 'ww6', name: 'Classic Trench Coat', category: ProductCategory.WOMENS_WEAR, price: 7499, stock: 12, description: 'Double-breasted gabardine trench coat in iconic camel.', image: 'https://www.missmosa.in/cdn/shop/files/DE1FCFEB-6E02-43F1-92BD-053C4AA780DE.jpg?v=1749207685' },
    { id: 'ww7', name: 'Hand-Woven Silk Saree', category: ProductCategory.WOMENS_WEAR, price: 15999, stock: 5, description: 'Banarasi silk saree with authentic gold zari work.', image: 'https://www.faburra.com/cdn/shop/files/1690737416502.jpg?v=1690803556' },
    { id: 'ww8', name: 'Linen Button-Up Shirt', category: ProductCategory.WOMENS_WEAR, price: 1999, stock: 40, description: 'Breathable organic linen shirt for summer layering.', image: 'https://www.everlane.com/cdn/shop/files/65a48c0f_4d16.jpg?v=1753411631&width=1000' },
    { id: 'ww9', name: 'Ribbed Knit Cardigan', category: ProductCategory.WOMENS_WEAR, price: 2299, stock: 30, description: 'Soft mohair-blend cardigan with tortoiseshell buttons.', image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/H99983s5.jpg?im=Resize,width=750' },
    { id: 'ww10', name: 'Leather Biker Jacket', category: ProductCategory.WOMENS_WEAR, price: 8999, stock: 8, description: 'Buttery soft lambskin leather with silver hardware.', image: 'https://www.hugme.fashion/image/cache/catalog/LJK49/s-l1600-600x764.jpg' },

    // Kids' Wear
    { id: 'kw1', name: 'Organic Cotton Romper', category: ProductCategory.KIDS_WEAR, price: 999, stock: 60, description: 'GOTS certified organic cotton for sensitive baby skin.', image: 'https://www.momshome.in/cdn/shop/files/romper_mockups._lemon_front.jpg?v=1765350971' },
    { id: 'kw2', name: 'Graphic Dinosaur Tee', category: ProductCategory.KIDS_WEAR, price: 599, stock: 100, description: 'Fun interactive print on soft combed cotton.', image: 'https://m.media-amazon.com/images/I/81GeJH87rfL._AC_UY1100_.jpg' },
    { id: 'kw3', name: 'Denim Dungaree Set', category: ProductCategory.KIDS_WEAR, price: 1499, stock: 35, description: 'Durable denim dungarees paired with a striped tee.', image: 'https://m.media-amazon.com/images/I/719x0Dnx68L._AC_UY1100_.jpg' },
    { id: 'kw4', name: 'Tulle Party Dress', category: ProductCategory.KIDS_WEAR, price: 2199, stock: 20, description: 'Sparkly tulle layers with a satin bow for special days.', image: 'https://nakshatrakids.com/cdn/shop/files/www.nakshatrakids.com527801.webp?v=1757841167&width=1946' },
    { id: 'kw5', name: 'Puffer Winter Jacket', category: ProductCategory.KIDS_WEAR, price: 2599, stock: 25, description: 'Lightweight down-filled jacket for ultimate warmth.', image: 'https://m.media-amazon.com/images/I/51cSYQ426wL._AC_UY1100_.jpg' },
    { id: 'kw6', name: 'Soft Fleece Pajamas', category: ProductCategory.KIDS_WEAR, price: 899, stock: 80, description: 'Snug-fit fleece set for a cozy night’s sleep.', image: 'https://m.media-amazon.com/images/I/61M1UfUjGcL._AC_UY1100_.jpg' },
    { id: 'kw7', name: 'Canvas School Sneakers', category: ProductCategory.KIDS_WEAR, price: 1299, stock: 45, description: 'Comfortable non-slip sole with easy velcro straps.', image: 'https://m.media-amazon.com/images/I/81+lagZfxrL._AC_UY1000_.jpg' },
    { id: 'kw8', name: 'Knitted Beanie & Scarf', category: ProductCategory.KIDS_WEAR, price: 699, stock: 70, description: 'Colorful wool blend set for winter outings.', image: 'https://www.woolcouturecompany.com/cdn/shop/files/kids-pom-pom-scarf-beanie-hat-knitting-kit-748095_700x700.jpg?v=1747174699' },
    { id: 'kw9', name: 'Rainy Day Yellow Mac', category: ProductCategory.KIDS_WEAR, price: 1599, stock: 30, description: 'Classic waterproof raincoat with a breathable lining.', image: 'https://www.trotters.co.uk/cdn/shop/files/petit-breton-rainmac-rain-mac-in-yellow-31355821391933.jpg?v=1736783406&width=1100' },
    { id: 'kw10', name: 'Cotton Chino Shorts', category: ProductCategory.KIDS_WEAR, price: 799, stock: 55, description: 'Casual khaki shorts for everyday playground fun.', image: 'https://www.iconicindia.com/cdn/shop/files/1_ef2f4297-3067-455d-b0e3-ddf9fd318bc8.jpg?v=1752586700' },

    // Men's Watches
    { id: 'mwa1', name: 'Silver Chronograph Elite', category: ProductCategory.MENS_WATCHES, price: 12500, stock: 12, description: 'Stainless steel timepiece with sapphire glass and automatic movement.', image: 'https://m.media-amazon.com/images/I/615wOT8l2dL._AC_UY350_.jpg' },
    { id: 'mwa2', name: 'Titanium Diver Pro', category: ProductCategory.MENS_WATCHES, price: 18900, stock: 8, description: '200m water resistance with helium escape valve.', image: 'https://i.ytimg.com/vi/00qDeYJ0koI/maxresdefault.jpg' },
    { id: 'mwa3', name: 'Leather Heritage Classic', category: ProductCategory.MENS_WATCHES, price: 8500, stock: 15, description: 'Italian leather strap with a minimalist cream dial.', image: 'https://watchempires.com/cdn/shop/files/longines_heritage_classic_l478_1728463141_9381d524_progressive_grande.jpg?v=1728524951' },
    { id: 'mwa4', name: 'Smart Graphite Sport', category: ProductCategory.MENS_WATCHES, price: 15999, stock: 25, description: 'OLED display with advanced health and GPS tracking.', image: 'https://www.gosupps.com/media/catalog/product/cache/25/image/1500x/040ec09b1e35df139433887a97daa66f/7/1/716dMImEeSL._AC_SL1500_.jpg' },
    { id: 'mwa5', name: 'Skeleton Automatic Gold', category: ProductCategory.MENS_WATCHES, price: 25000, stock: 5, description: 'Exposed movement architecture with 18k gold plating.', image: 'https://finebuy.co.in/wp-content/uploads/2024/05/fossil-auto1.webp' },
    { id: 'mwa6', name: 'Matte Black Field Watch', category: ProductCategory.MENS_WATCHES, price: 6200, stock: 20, description: 'Tactical durability with luminous hands and nylon strap.', image: 'https://m.media-amazon.com/images/I/8180x4sLPfL._AC_UY1000_.jpg' },
    { id: 'mwa7', name: 'Azure Solar Chrono', category: ProductCategory.MENS_WATCHES, price: 9800, stock: 18, description: 'Solar-powered with a deep blue sunburst dial.', image: 'https://cdn.shopify.com/s/files/1/0322/8424/6155/files/SSB445P1.png?v=1767175193' },
    { id: 'mwa8', name: 'Rose Gold Executive', category: ProductCategory.MENS_WATCHES, price: 14500, stock: 10, description: 'Slim profile dress watch with genuine alligator strap.', image: 'https://m.media-amazon.com/images/I/81xygsaGMXL._AC_UY1000_.jpg' },
    { id: 'mwa9', name: 'Digital Retro Steel', category: ProductCategory.MENS_WATCHES, price: 3500, stock: 50, description: 'Classic 80s digital aesthetic in brushed stainless steel.', image: 'https://m.media-amazon.com/images/I/612VqhABaiL._AC_UY1000_.jpg' },
    { id: 'mwa10', name: 'Pilot GMT Master', category: ProductCategory.MENS_WATCHES, price: 21000, stock: 7, description: 'Dual time zone complication for the global traveler.', image: 'https://img.chrono24.com/images/uhren/42738929-g3cmmwef7h33z1v27ewjhmfr-ExtraLarge.jpg' },

    // Women's Watches
    { id: 'wwa1', name: 'Rose Gold Mesh Classic', category: ProductCategory.WOMENS_WATCHES, price: 6500, stock: 30, description: 'Elegance redefined with a magnetic mesh strap.', image: 'https://www.carlington.in/cdn/shop/files/Carlington_elite_analog_ladies_watch_CT_2007_roseold.jpg?v=1696689630&width=2400' },
    { id: 'wwa2', name: 'Petite Diamond Accents', category: ProductCategory.WOMENS_WATCHES, price: 12900, stock: 15, description: 'Small 24mm dial with authentic diamond hour markers.', image: 'https://images-cdn.ubuy.co.in/6694063943a203306206160a-women-s-watch-love-diamond-gift-gift.jpg' },
    { id: 'wwa3', name: 'Ceramic White Lux', category: ProductCategory.WOMENS_WATCHES, price: 15500, stock: 10, description: 'Scratch-resistant high-tech ceramic in pearl white.', image: 'https://m.media-amazon.com/images/I/71SMYZ2xXLL._AC_UY350_.jpg' },
    { id: 'wwa4', name: 'Floral Dial Leather', category: ProductCategory.WOMENS_WATCHES, price: 4200, stock: 40, description: 'Delicate hand-painted dial with soft pastel strap.', image: 'https://www.buyhautesauce.com/cdn/shop/products/SS22_HSWC1035_1.jpg?v=1659008814' },
    { id: 'wwa5', name: 'Silver Bangle Watch', category: ProductCategory.WOMENS_WATCHES, price: 8900, stock: 20, description: 'Timepiece that doubles as a sophisticated jewelry piece.', image: 'https://waldorandco.com/cdn/shop/files/IMG_14627.jpg?v=1731600264&width=767' },
    { id: 'wwa6', name: 'Smart Bloom Band', category: ProductCategory.WOMENS_WATCHES, price: 12500, stock: 35, description: 'Sleek smart tracker with jewelry-style metal links.', image: 'https://img.joomcdn.net/9360e7680e595f63e29eef8e3b91b6c290a868d9_original.jpeg' },
    { id: 'wwa7', name: 'Midnight Square Dial', category: ProductCategory.WOMENS_WATCHES, price: 7400, stock: 25, description: 'Bold rectangular dial with deep blue sapphire finish.', image: 'https://www.sonatawatches.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw8d9ea8de/images/Sonata/Catalog/87068WL01_1.jpg?sw=800&sh=800' },
    { id: 'wwa8', name: 'Champagne Gold Link', category: ProductCategory.WOMENS_WATCHES, price: 9500, stock: 18, description: 'Classic link bracelet with a champagne sunray dial.', image: 'https://www.luxurygallery.in/cdn/shop/files/FCW18GM_1080x.jpg?v=1761883872' },
    { id: 'wwa9', name: 'Minimalist Charcoal', category: ProductCategory.WOMENS_WATCHES, price: 3900, stock: 50, description: 'Ultra-thin case with grey dial and black leather.', image: 'https://m.media-amazon.com/images/I/5185fNPvo7L._AC_UY1000_.jpg' },
    { id: 'wwa10', name: 'Mother of Pearl Lux', category: ProductCategory.WOMENS_WATCHES, price: 18000, stock: 5, description: 'Iridescent mother of pearl dial with rose gold bezel.', image: 'https://cdn4.ethoswatches.com/the-watch-guide/wp-content/uploads/2021/10/Mother-Of-Pearl-Dials-Masthead-Mobile-1.jpg' },

    // Electronics
    { id: 'e1', name: 'Quantum Noise Cancelling Headphones', category: ProductCategory.ELECTRONICS, price: 18999, stock: 40, description: 'Industry-leading noise cancellation with 40h battery life.', image: 'https://www.harmanaudio.in/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw0a00fd34/pdp/JBL_Quantum_ONE_Lifestyle2.png?sw=904&sh=560' },
    { id: 'e2', name: 'Studio Hi-Fi Speaker', category: ProductCategory.ELECTRONICS, price: 12500, stock: 20, description: 'Room-filling audio with wooden cabinet design.', image: 'https://cdn.mos.cms.futurecdn.net/HKTb4g4pLXvuaZskiWZaHK.jpg' },
    { id: 'e3', name: 'Mechanical RGB Keyboard', category: ProductCategory.ELECTRONICS, price: 8999, stock: 35, description: 'Cherry MX Blue switches with per-key lighting.', image: 'https://www.simplygaming.in/cdn/shop/files/HyperX_Alloy_Origins_65_RGB_Mechanical_Gaming_Keyboard_-_Red_Switch.webp?v=1733906591' },
    { id: 'e4', name: 'Precision Wireless Mouse', category: ProductCategory.ELECTRONICS, price: 4500, stock: 50, description: 'Ergonomic design with 26k DPI optical sensor.', image: 'https://www.jiomart.com/images/product/original/rvo9vj4ge8/zebion-precision-4g-wireless-mouse-black-product-images-orvo9vj4ge8-p608141357-4-202402222248.jpg?im=Resize=(420,420)' },
    { id: 'e5', name: 'Ultra-Thin 4K Tablet', category: ProductCategory.ELECTRONICS, price: 45000, stock: 15, description: '12.9-inch OLED display with stylus support.', image: 'https://image.made-in-china.com/202f0j00pCZobvWqlQcJ/Dual-SIM-Tablet-Computer-Portable-Ultra-Slim-Tablets-PC-Android-12-GPS-G-Sensor.webp' },
    { id: 'e6', name: 'Mirrorless Pro Camera', category: ProductCategory.ELECTRONICS, price: 125000, stock: 10, description: 'Full-frame sensor with 4K 60fps video capabilities.', image: 'https://gppro.in/wp-content/uploads/2024/11/a7R-V-1.jpg' },
    { id: 'e7', name: 'Curved Gaming Monitor', category: ProductCategory.ELECTRONICS, price: 32000, stock: 12, description: '34-inch ultrawide with 144Hz refresh rate.', image: 'https://m.media-amazon.com/images/I/71YsSgR-KpL._AC_UF1000,1000_QL80_.jpg' },
    { id: 'e8', name: 'Mesh Wi-Fi 6 Router', category: ProductCategory.ELECTRONICS, price: 14999, stock: 25, description: 'Tri-band coverage for homes up to 5000 sq ft.', image: 'https://boxnube.in/cdn/shop/files/X504G2.jpg?v=1717414090&width=1000' },
    { id: 'e9', name: 'Smart Home Soundbar', category: ProductCategory.ELECTRONICS, price: 21000, stock: 18, description: 'Dolby Atmos support with wireless subwoofer.', image: 'https://m.media-amazon.com/images/I/71mp9OsK4ZL.jpg?odnHeight=372&odnWidth=372&odnBg=FFFFFF' },
    { id: 'e10', name: 'MagSafe Power Bank', category: ProductCategory.ELECTRONICS, price: 3999, stock: 60, description: '10000mAh portable charger with wireless magnetic snap.', image: 'https://spacething.in/cdn/shop/files/7_836d720c-4f8a-4b7f-a38d-8d7d1d5b53c0.png?v=1722500782' },

    // Grocery
    { id: 'g1', name: 'Artisanal Coffee Blend', category: ProductCategory.GROCERY, price: 850, stock: 100, description: 'Dark roast Arabica beans sourced from Coorg estates.', image: 'https://artisante.in/cdn/shop/products/matador-blend-521641_595x.jpg?v=1663919906' },
    { id: 'g2', name: 'Organic Cold-Pressed Oil', category: ProductCategory.GROCERY, price: 1200, stock: 50, description: 'Extra virgin olive oil from Mediterranean groves.', image: 'https://www.greendna.in/cdn/shop/products/sunflower2_1024x.jpg?v=1562518227' },
    { id: 'g3', name: 'Premium California Almonds', category: ProductCategory.GROCERY, price: 950, stock: 80, description: 'Lightly roasted and salted jumbo almonds.', image: 'https://eatanytime.in/cdn/shop/products/Eat_Almonds_Lifestyle-188921.jpg?v=1704714095&width=1445' },
    { id: 'g4', name: 'Exotic Darjeeling Tea', category: ProductCategory.GROCERY, price: 650, stock: 120, description: 'First-flush loose leaf tea with floral notes.', image: 'https://www.goldentipstea.in/cdn/shop/files/Darjeeling_Pyramid_tea_bags.jpg' },
    { id: 'g5', name: 'Dark Chocolate 85%', category: ProductCategory.GROCERY, price: 450, stock: 150, description: 'Single-origin cocoa bars from sustainable farms.', image: 'https://www.bakersandlarners.co.uk/media/catalog/product/cache/1d5f1b4c3dea9b8c9a73ece9e4a00f36/l/i/lindt0282.jpg' },
    { id: 'g6', name: 'Aged Basmati Rice', category: ProductCategory.GROCERY, price: 1100, stock: 70, description: '2-year aged long-grain fragrant Himalayan rice.', image: 'https://indianspicesandgroceries.com/cdn/shop/files/aged_basmati_rice.jpg?v=1751276782' },
    { id: 'g7', name: 'Wild Forest Honey', category: ProductCategory.GROCERY, price: 799, stock: 90, description: 'Raw unprocessed honey collected from high altitudes.', image: 'https://houseofveda.com/cdn/shop/files/Honey-1.jpg?v=1713351671' },
    { id: 'g8', name: 'Toasted Berry Granola', category: ProductCategory.GROCERY, price: 550, stock: 110, description: 'Oats, nuts, and dried berries toasted in honey.', image: 'https://img.delicious.com.au/EG8YYayR/w1200-h900-cfill-q80/del/2015/10/katie-quinn-davies-toasted-berry-granola-14291-2.jpg' },
    { id: 'g9', name: 'Protein Nut Bars', category: ProductCategory.GROCERY, price: 1200, stock: 200, description: 'Pack of 12 sugar-free high protein energy bars.', image: 'https://m.media-amazon.com/images/I/71YBXYies8L._AC_UF894,1000_QL80_.jpg' },
    { id: 'g10', name: 'Durum Wheat Pasta', category: ProductCategory.GROCERY, price: 350, stock: 130, description: 'Traditional bronze-cut pasta from Italy.', image: 'https://www.jiomart.com/images/product/original/491298305/chef-s-basket-durum-wheat-penne-pasta-500-g-product-images-o491298305-p590108580-0-202401260853.jpg?im=Resize=(1000,1000)' },

    // Mobile
    { id: 'mob1', name: 'iPhone 15 Pro Max', category: ProductCategory.MOBILE, price: 159900, stock: 15, description: 'Titanium design, A17 Pro chip, and the most powerful iPhone camera system ever.', image: 'https://kirtisales.in/wp-content/uploads/2024/04/APPLE-IPHONE-15-PRO-MAX-512GB-BLUE-TITANIUM.jpg' },
    { id: 'mob2', name: 'Samsung Galaxy S24 Ultra', category: ProductCategory.MOBILE, price: 129999, stock: 12, description: 'The ultimate Galaxy Ultra experience with Galaxy AI and built-in S Pen.', image: 'https://static.toiimg.com/thumb/msid-108204868,width-400,resizemode-4/108204868.jpg' },
    { id: 'mob3', name: 'Google Pixel 8 Pro', category: ProductCategory.MOBILE, price: 106999, stock: 8, description: 'The all-pro Google phone with the best Pixel Camera yet.', image: 'https://www.theodist.com/Images/ProductImages/Large/PIX8PRO_1.jpg' },
    { id: 'mob4', name: 'OnePlus 12', category: ProductCategory.MOBILE, price: 64999, stock: 20, description: 'Smooth Beyond Belief. Powered by Snapdragon 8 Gen 3.', image: 'https://oasis.opstatics.com/content/dam/oasis/page/2023/cn/12/12-black.png' },
    { id: 'mob5', name: 'Nothing Phone (2)', category: ProductCategory.MOBILE, price: 44999, stock: 25, description: 'A new way to interact. Featuring the iconic Glyph Interface.', image: 'https://acko-cms.ackoassets.com/Nothing_Phone_2_2_9da103def9.jpg' },
    { id: 'mob6', name: 'iPhone 14', category: ProductCategory.MOBILE, price: 69900, stock: 30, description: 'Powerful A15 Bionic chip and incredible dual-camera system.', image: 'https://kirtisales.in/wp-content/uploads/2024/04/APPLE-IPHONE-14-128GB.jpg' },
    { id: 'mob7', name: 'Galaxy Z Fold 5', category: ProductCategory.MOBILE, price: 154999, stock: 5, description: 'The ultimate 7.6-inch screen for gaming and productivity.', image: 'https://cliktodeal.com/wp-content/uploads/2024/09/Samsung-Galaxy-Z-Fold5-img1.jpg' },
    { id: 'mob8', name: 'Xiaomi 14', category: ProductCategory.MOBILE, price: 69999, stock: 15, description: 'Leica Summilux optical lens and Snapdragon 8 Gen 3 performance.', image: 'https://m.media-amazon.com/images/I/71MsYJjQhBL.jpg' },
    { id: 'mob9', name: 'Google Pixel 7a', category: ProductCategory.MOBILE, price: 43999, stock: 40, description: 'The high-performance Google phone that’s built for you.', image: 'https://www.triveniworld.com/cdn/shop/products/google-pixel-7a-blue-8-gb-ram-61-128-gb-refurbished-triveni-world-1.jpg?v=1711858568' },
    { id: 'mob10', name: 'Motorola Razr 40 Ultra', category: ProductCategory.MOBILE, price: 89999, stock: 10, description: 'The largest, most advanced external display on a flip phone.', image: 'https://m.media-amazon.com/images/I/617WN7I3E4L.jpg' },

    // Home
    { id: 'hm1', name: 'Smart Ambient Floor Lamp', category: ProductCategory.HOME, price: 4500, stock: 25, description: '16 million colors with voice control and music sync.', image: 'https://smartlivingindia.com/wp-content/uploads/2025/09/Philips-WiZ-Gradient-Floor-Lamp-Smart-WiFi-RGBIC-LED-Corner-Pole-Light-04.jpg' },
    { id: 'hm2', name: 'Minimalist Ceramic Vase Set', category: ProductCategory.HOME, price: 1800, stock: 30, description: 'Handcrafted matte ceramic vases for a modern aesthetic.', image: 'https://m.media-amazon.com/images/I/717lSe47sjL.jpg' },
    { id: 'hm3', name: 'Ergonomic Mesh Office Chair', category: ProductCategory.HOME, price: 12500, stock: 15, description: 'High-back mesh chair with adjustable lumbar support.', image: 'https://thesleepcompany.in/cdn/shop/files/UltronPremiumErgonomicmobileblack_1.webp?v=1758116717' },
    { id: 'hm4', name: 'Robot Vacuum Cleaner Pro', category: ProductCategory.HOME, price: 24999, stock: 10, description: 'Lidar navigation with auto-empty station and mopping.', image: 'https://ecovacsindia.in/images/deebot-n30-pro-omni/Thumbnil/DEEBOT-N30-OMNI-Black-02.webp' },
    { id: 'hm5', name: 'HEPA Air Purifier 4', category: ProductCategory.HOME, price: 8999, stock: 20, description: 'Purifies 20m² room in 10 minutes. Quiet operation.', image: 'https://mahajanelectronics.com/cdn/shop/files/81GvW_xQa7L._SL1500.jpg?v=1761815262&width=1500' },
    { id: 'hm6', name: 'Orthopedic Memory Foam Pillow', category: ProductCategory.HOME, price: 2200, stock: 50, description: 'Cooling gel infused memory foam for neck support.', image: 'https://drtrust.in/cdn/shop/files/buy-memory-foam-cervical-neck-pillow-online-cervical-pillow-for-stiffed-neck-1191797202.jpg?v=1758020060&width=1000' },
    { id: 'hm7', name: 'Digital Smart Kitchen Scale', category: ProductCategory.HOME, price: 1200, stock: 45, description: 'Precision measurements with app connectivity for macros.', image: 'https://images-cdn.ubuy.co.in/69412042a1709927710501bc-etekcity-smart-food-kitchen-scale-with.jpg' },
    { id: 'hm8', name: 'Velvet Soft Throw Blanket', category: ProductCategory.HOME, price: 1500, stock: 60, description: 'Ultra-soft microfiber velvet for chilly evenings.', image: 'https://m.media-amazon.com/images/I/71nH7MACxeL._AC_UF894,1000_QL80_.jpg' },
    { id: 'hm9', name: 'Nordic Style Bedside Table', category: ProductCategory.HOME, price: 3800, stock: 12, description: 'Solid wood legs with a clean white finish and drawer.', image: 'https://m.media-amazon.com/images/I/61WewYJ8uwL._AC_UF1000,1000_QL80_.jpg' },
    { id: 'hm10', name: 'Luxury Scented Soy Candle', category: ProductCategory.HOME, price: 950, stock: 80, description: 'Lavender and Sandalwood scent for relaxation.', image: 'https://www.myonearth.com/cdn/shop/products/luxury-scented-candle-with-cork-lid-soy-wax-1-wick-pack-of-midnight-jasmine-home-decor-709.jpg?v=1639142836' },

    // Beauty
    { id: 'bt1', name: 'Vitamin C Brightening Serum', category: ProductCategory.BEAUTY, price: 899, stock: 100, description: '15% stabilized Vitamin C for radiant, even skin tone.', image: 'https://www.goodvibesonly.in/cdn/shop/files/1_2558ef58-0557-4f85-950c-82a68e3706ac.jpg?v=1744280637' },
    { id: 'bt2', name: 'Matte Liquid Lipstick - Crimson', category: ProductCategory.BEAUTY, price: 650, stock: 150, description: '12-hour wear smudge-proof bold red matte finish.', image: 'https://assets.ajio.com/medias/sys_master/root/20241106/nu8A/672b0109f9b8ef490b055741/-1117Wx1400H-4944979910-crimson-MODEL2.jpg' },
    { id: 'bt3', name: 'Hyaluronic Acid Hydrating Gel', category: ProductCategory.BEAUTY, price: 750, stock: 120, description: 'Deeply hydrates and plumps skin for a dewy look.', image: 'https://ponds.in/cdn/shop/files/27497_FOP_8901030875700.jpg?v=1692706211' },
    { id: 'bt4', name: 'Volumizing Waterproof Mascara', category: ProductCategory.BEAUTY, price: 499, stock: 200, description: 'Dramatic volume that stays put all day and night.', image: 'https://m.media-amazon.com/images/I/51pSlXaDrxL._AC_UF1000,1000_QL80_.jpg' },
    { id: 'bt5', name: 'Ultra-Light Sunscreen SPF 50', category: ProductCategory.BEAUTY, price: 599, stock: 180, description: 'No white cast, non-greasy formula for daily protection.', image: 'https://images.mamaearth.in/catalog/product/1/_/1_187.jpg?format=auto&height=600' },
    { id: 'bt6', name: 'Rose Water Toning Mist', category: ProductCategory.BEAUTY, price: 350, stock: 90, description: 'Pure steam-distilled rose water for instant refreshment.', image: 'https://m.media-amazon.com/images/I/71GoVm0TEVL._AC_UF1000,1000_QL80_.jpg' },
    { id: 'bt7', name: 'Argan Oil Deep Repair Mask', category: ProductCategory.BEAUTY, price: 1200, stock: 60, description: 'Restores shine and softness to damaged hair.', image: 'https://m.media-amazon.com/images/I/71UJb0DOjXL._AC_UF1000,1000_QL80_.jpg' },
    { id: 'bt8', name: 'Exfoliating Coffee Body Scrub', category: ProductCategory.BEAUTY, price: 450, stock: 110, description: 'Organic coffee grounds with coconut oil for smooth skin.', image: 'https://innovist.com/cdn/shop/files/First-images-guidelinesBody-Scrub_e761e88a-4b32-4995-a608-a3a46e52e862.jpg?v=1756545580&width=900' },
    { id: 'bt9', name: 'Electric Silicone Face Cleanser', category: ProductCategory.BEAUTY, price: 2500, stock: 35, description: 'Sonic vibrations for deep pore cleansing and massage.', image: 'https://5.imimg.com/data5/SELLER/Default/2023/12/371499413/BN/KS/OI/55776541/facial-cleansing-brush-silicone-antiageing-electric-rechargeable-massage-brush-waterproof-face-brush.jpg' },
    { id: 'bt10', name: 'Luxury Midnight Perfume Mist', category: ProductCategory.BEAUTY, price: 3200, stock: 25, description: 'Enchanting notes of jasmine, patchouli, and vanilla.', image: 'https://m.media-amazon.com/images/I/61lR3E532KL._AC_UF1000,1000_QL80_.jpg' },
  ],
  orders: [],
  currentUser: null
};

export const getDB = (): DBState => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : INITIAL_STATE;
};

export const saveDB = (state: DBState) => {
  localStorage.setItem(DB_KEY, JSON.stringify(state));
};

export const clearDB = () => {
  localStorage.removeItem(DB_KEY);
  window.location.reload();
};