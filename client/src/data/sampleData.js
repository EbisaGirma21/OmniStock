// ============================================================
// SAMPLE DATA — replaces all backend API calls
// ============================================================

export const sampleUser = {
  _id: "user_001",
  name: "Admin User",
  email: "admin@omnistock.com",
  role: "super",
  store: "store_001",
  productCatagory: "cat_001",
  token: "mock_token_abc123",
};

// ── Product Categories ────────────────────────────────────────
export const sampleProductCatagories = [
  {
    _id: "cat_001",
    productCatagoryName: "Footwear",
    image: {
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    },
    productNames: [
      {
        _id: "pn_001",
        name: "Sneakers",
        image: {
          url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&q=80",
        },
      },
      {
        _id: "pn_002",
        name: "Running Shoes",
        image: {
          url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
        },
      },
      {
        _id: "pn_003",
        name: "Boots",
        image: {
          url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=200&q=80",
        },
      },
    ],
  },
  {
    _id: "cat_002",
    productCatagoryName: "Clothing",
    image: {
      url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80",
    },
    productNames: [
      {
        _id: "pn_004",
        name: "T-Shirts",
        image: {
          url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
        },
      },
      {
        _id: "pn_005",
        name: "Jeans",
        image: {
          url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80",
        },
      },
      {
        _id: "pn_006",
        name: "Jackets",
        image: {
          url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80",
        },
      },
    ],
  },
  {
    _id: "cat_003",
    productCatagoryName: "Electronics",
    image: {
      url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
    },
    productNames: [
      {
        _id: "pn_007",
        name: "Smartphones",
        image: {
          url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80",
        },
      },
      {
        _id: "pn_008",
        name: "Laptops",
        image: {
          url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80",
        },
      },
      {
        _id: "pn_009",
        name: "Headphones",
        image: {
          url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
        },
      },
    ],
  },
  {
    _id: "cat_004",
    productCatagoryName: "Bags & Accessories",
    image: {
      url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
    },
    productNames: [
      {
        _id: "pn_010",
        name: "Backpacks",
        image: {
          url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80",
        },
      },
      {
        _id: "pn_011",
        name: "Handbags",
        image: {
          url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80",
        },
      },
    ],
  },
  {
    _id: "cat_005",
    productCatagoryName: "Sports",
    image: {
      url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    },
    productNames: [
      {
        _id: "pn_012",
        name: "Gym Equipment",
        image: {
          url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&q=80",
        },
      },
      {
        _id: "pn_013",
        name: "Sports Apparel",
        image: {
          url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&q=80",
        },
      },
    ],
  },
];

// ── Stores ────────────────────────────────────────────────────
export const sampleStores = [
  {
    _id: "store_001",
    storeName: "Main Warehouse",
    location: "Addis Ababa, Bole",
    managerName: "Abebe Kebede",
    phone: "+251 911 234 567",
    email: "main@omnistock.com",
    isActive: true,
  },
  {
    _id: "store_002",
    storeName: "Piassa Branch",
    location: "Addis Ababa, Piassa",
    managerName: "Tigist Alemu",
    phone: "+251 922 345 678",
    email: "piassa@omnistock.com",
    isActive: true,
  },
  {
    _id: "store_003",
    storeName: "Merkato Outlet",
    location: "Addis Ababa, Merkato",
    managerName: "Dawit Haile",
    phone: "+251 933 456 789",
    email: "merkato@omnistock.com",
    isActive: true,
  },
];

// ── Variants (products with sizes) ───────────────────────────
export const sampleVariants = [
  // ── Footwear
  {
    _id: "var_001",
    variantName: "Nike Air Max 270",
    productName: "Sneakers",
    brandName: "Nike",
    modelName: "Air Max 270",
    images: [
      {
        _id: "img_001a",
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      },
      {
        _id: "img_001b",
        url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
      },
      {
        _id: "img_001c",
        url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
      },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    colors: ["Black/White", "Red/Black", "Blue/Grey"],
    price: 4500,
    amount: 48,
    condition: "New",
    gender: "Unisex",
    shortDescription:
      "Lightweight everyday trainer with Max Air cushioning for superior comfort all day long.",
    store: "store_001",
    storeName: "Main Warehouse",
    productCatagory: "cat_001",
  },
  {
    _id: "var_002",
    variantName: "Adidas Ultraboost 22",
    productName: "Running Shoes",
    brandName: "Adidas",
    modelName: "Ultraboost 22",
    images: [
      {
        _id: "img_002a",
        url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
      },
      {
        _id: "img_002b",
        url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80",
      },
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: ["Core Black", "Cloud White", "Solar Yellow"],
    price: 5800,
    amount: 32,
    condition: "New",
    gender: "Men",
    shortDescription:
      "Premium running shoe with Boost midsole delivering incredible energy return mile after mile.",
    store: "store_001",
    storeName: "Main Warehouse",
    productCatagory: "cat_001",
  },
  {
    _id: "var_003",
    variantName: "Timberland Classic Boot",
    productName: "Boots",
    brandName: "Timberland",
    modelName: "Classic 6-Inch Boot",
    images: [
      {
        _id: "img_003a",
        url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80",
      },
      {
        _id: "img_003b",
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      },
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Wheat Nubuck", "Black Smooth"],
    price: 7200,
    amount: 18,
    condition: "New",
    gender: "Men",
    shortDescription:
      "Iconic waterproof leather boot with rustproof speed lace hardware and padded collar.",
    store: "store_002",
    storeName: "Piassa Branch",
    productCatagory: "cat_001",
  },

  // ── Clothing
  {
    _id: "var_004",
    variantName: "Uniqlo Supima T-Shirt",
    productName: "T-Shirts",
    brandName: "Uniqlo",
    modelName: "Supima Cotton Crew Neck",
    images: [
      {
        _id: "img_004a",
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      },
      {
        _id: "img_004b",
        url: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy", "Grey", "Olive"],
    price: 650,
    amount: 120,
    condition: "New",
    gender: "Unisex",
    shortDescription:
      "Soft Supima cotton tee with a relaxed silhouette, perfect for everyday wear.",
    store: "store_001",
    storeName: "Main Warehouse",
    productCatagory: "cat_002",
  },
  {
    _id: "var_005",
    variantName: "Levi's 511 Slim Jeans",
    productName: "Jeans",
    brandName: "Levi's",
    modelName: "511 Slim Fit",
    images: [
      {
        _id: "img_005a",
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
      },
      {
        _id: "img_005b",
        url: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&q=80",
      },
    ],
    sizes: ["28x30", "30x30", "32x30", "32x32", "34x30", "34x32", "36x30"],
    colors: ["Dark Indigo", "Medium Stonewash", "Black"],
    price: 3200,
    amount: 65,
    condition: "New",
    gender: "Men",
    shortDescription:
      "Classic slim-fit jean with a modern cut that sits below the waist.",
    store: "store_001",
    storeName: "Main Warehouse",
    productCatagory: "cat_002",
  },
  {
    _id: "var_006",
    variantName: "North Face Denali Jacket",
    productName: "Jackets",
    brandName: "The North Face",
    modelName: "Denali Fleece Jacket",
    images: [
      {
        _id: "img_006a",
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
      },
      {
        _id: "img_006b",
        url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80",
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["TNF Black", "Shady Blue", "Forest Green"],
    price: 9500,
    amount: 22,
    condition: "New",
    gender: "Unisex",
    shortDescription:
      "Wind-resistant fleece jacket with zip-in compatibility for layering versatility.",
    store: "store_002",
    storeName: "Piassa Branch",
    productCatagory: "cat_002",
  },

  // ── Electronics
  {
    _id: "var_007",
    variantName: "Samsung Galaxy S23",
    productName: "Smartphones",
    brandName: "Samsung",
    modelName: "Galaxy S23",
    images: [
      {
        _id: "img_007a",
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
      },
      {
        _id: "img_007b",
        url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
      },
    ],
    sizes: ["128GB", "256GB"],
    colors: ["Phantom Black", "Cream", "Green", "Lavender"],
    price: 48000,
    amount: 15,
    condition: "New",
    gender: "Unisex",
    shortDescription:
      "Compact flagship smartphone with a 50MP camera system and Snapdragon 8 Gen 2.",
    store: "store_001",
    storeName: "Main Warehouse",
    productCatagory: "cat_003",
  },
  {
    _id: "var_008",
    variantName: "MacBook Air M2",
    productName: "Laptops",
    brandName: "Apple",
    modelName: "MacBook Air M2",
    images: [
      {
        _id: "img_008a",
        url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
      },
      {
        _id: "img_008b",
        url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
      },
    ],
    sizes: ["256GB SSD", "512GB SSD", "1TB SSD"],
    colors: ["Midnight", "Starlight", "Space Grey", "Silver"],
    price: 145000,
    amount: 8,
    condition: "New",
    gender: "Unisex",
    shortDescription:
      "Redesigned fanless laptop with Apple M2 chip, 18-hour battery and stunning Liquid Retina display.",
    store: "store_001",
    storeName: "Main Warehouse",
    productCatagory: "cat_003",
  },
  {
    _id: "var_009",
    variantName: "Sony WH-1000XM5",
    productName: "Headphones",
    brandName: "Sony",
    modelName: "WH-1000XM5",
    images: [
      {
        _id: "img_009a",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      },
      {
        _id: "img_009b",
        url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80",
      },
    ],
    sizes: ["One Size"],
    colors: ["Black", "Silver"],
    price: 22000,
    amount: 25,
    condition: "New",
    gender: "Unisex",
    shortDescription:
      "Industry-leading noise cancellation headphones with 30-hour battery and crystal-clear call quality.",
    store: "store_003",
    storeName: "Merkato Outlet",
    productCatagory: "cat_003",
  },

  // ── Bags
  {
    _id: "var_010",
    variantName: "Nike Brasilia Backpack",
    productName: "Backpacks",
    brandName: "Nike",
    modelName: "Brasilia 9.5",
    images: [
      {
        _id: "img_010a",
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      },
      {
        _id: "img_010b",
        url: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&q=80",
      },
    ],
    sizes: ["24L", "30L"],
    colors: ["Black", "Grey", "Navy", "Red"],
    price: 2800,
    amount: 40,
    condition: "New",
    gender: "Unisex",
    shortDescription:
      "Durable training backpack with padded shoulder straps and multiple zip pockets.",
    store: "store_002",
    storeName: "Piassa Branch",
    productCatagory: "cat_004",
  },

  // ── Sports
  {
    _id: "var_011",
    variantName: "Adidas Training Shorts",
    productName: "Sports Apparel",
    brandName: "Adidas",
    modelName: "Tiro 23 Shorts",
    images: [
      {
        _id: "img_011a",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
      },
      {
        _id: "img_011b",
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black/White", "Navy/White", "Red/White"],
    price: 1200,
    amount: 75,
    condition: "New",
    gender: "Men",
    shortDescription:
      "Slim-fit training shorts with moisture-wicking Aeroready fabric for intense workouts.",
    store: "store_003",
    storeName: "Merkato Outlet",
    productCatagory: "cat_005",
  },
  {
    _id: "var_012",
    variantName: "Nike Air Max 270 Women",
    productName: "Sneakers",
    brandName: "Nike",
    modelName: "Air Max 270 Women",
    images: [
      {
        _id: "img_012a",
        url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
      },
      {
        _id: "img_012b",
        url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
      },
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["Pink/White", "White/Rose Gold", "Black/Purple"],
    price: 4200,
    amount: 35,
    condition: "New",
    gender: "Women",
    shortDescription:
      "Women-specific Air Max with a sleek profile and the same plush Max Air unit.",
    store: "store_002",
    storeName: "Piassa Branch",
    productCatagory: "cat_001",
  },
];

// ── Sells ─────────────────────────────────────────────────────
export const sampleSells = [
  {
    _id: "sell_001",
    seller: "user_001",
    variant: "var_001",
    variantName: "Nike Air Max 270",
    price: 4500,
    amount: 2,
    createdAt: "2023-06-10T09:00:00Z",
  },
  {
    _id: "sell_002",
    seller: "user_001",
    variant: "var_004",
    variantName: "Uniqlo Supima T-Shirt",
    price: 650,
    amount: 5,
    createdAt: "2023-06-11T11:30:00Z",
  },
  {
    _id: "sell_003",
    seller: "user_001",
    variant: "var_007",
    variantName: "Samsung Galaxy S23",
    price: 48000,
    amount: 1,
    createdAt: "2023-06-12T14:00:00Z",
  },
  {
    _id: "sell_004",
    seller: "user_001",
    variant: "var_002",
    variantName: "Adidas Ultraboost 22",
    price: 5800,
    amount: 3,
    createdAt: "2023-06-13T10:15:00Z",
  },
  {
    _id: "sell_005",
    seller: "user_001",
    variant: "var_008",
    variantName: "MacBook Air M2",
    price: 145000,
    amount: 1,
    createdAt: "2023-06-14T16:45:00Z",
  },
  {
    _id: "sell_006",
    seller: "user_001",
    variant: "var_005",
    variantName: "Levi's 511 Slim Jeans",
    price: 3200,
    amount: 2,
    createdAt: "2023-06-15T13:00:00Z",
  },
  {
    _id: "sell_007",
    seller: "user_001",
    variant: "var_009",
    variantName: "Sony WH-1000XM5",
    price: 22000,
    amount: 1,
    createdAt: "2023-06-16T09:30:00Z",
  },
  {
    _id: "sell_008",
    seller: "user_001",
    variant: "var_010",
    variantName: "Nike Brasilia Backpack",
    price: 2800,
    amount: 4,
    createdAt: "2023-06-17T11:00:00Z",
  },
];

// ── Purchases ─────────────────────────────────────────────────
export const samplePurchases = [
  {
    _id: "pur_001",
    purchaser: "user_001",
    variant: "var_001",
    variantName: "Nike Air Max 270",
    price: 3600,
    amount: 20,
    createdAt: "2023-06-01T08:00:00Z",
  },
  {
    _id: "pur_002",
    purchaser: "user_001",
    variant: "var_004",
    variantName: "Uniqlo Supima T-Shirt",
    price: 400,
    amount: 50,
    createdAt: "2023-06-02T10:00:00Z",
  },
  {
    _id: "pur_003",
    purchaser: "user_001",
    variant: "var_007",
    variantName: "Samsung Galaxy S23",
    price: 40000,
    amount: 10,
    createdAt: "2023-06-03T12:00:00Z",
  },
  {
    _id: "pur_004",
    purchaser: "user_001",
    variant: "var_008",
    variantName: "MacBook Air M2",
    price: 120000,
    amount: 5,
    createdAt: "2023-06-04T14:00:00Z",
  },
  {
    _id: "pur_005",
    purchaser: "user_001",
    variant: "var_002",
    variantName: "Adidas Ultraboost 22",
    price: 4500,
    amount: 15,
    createdAt: "2023-06-05T09:00:00Z",
  },
];

// ── Requests ──────────────────────────────────────────────────
export const sampleRequests = [
  {
    _id: "req_001",
    requester: "user_002",
    variantId: "var_011",
    variant: { variantName: "Adidas Training Shorts" },
    store: "store_002",
    requestType: "Transfer",
    requestStatus: "Requested",
    readStatus: "notSeen",
    createdAt: "2023-06-15T07:00:00Z",
  },
  {
    _id: "req_002",
    requester: "user_003",
    variantId: "var_003",
    variant: { variantName: "Timberland Classic Boot" },
    store: "store_003",
    requestType: "Transfer",
    requestStatus: "Approved",
    readStatus: "seen",
    createdAt: "2023-06-16T08:00:00Z",
  },
  {
    _id: "req_003",
    requester: "user_002",
    variantId: "var_006",
    variant: { variantName: "North Face Denali Jacket" },
    store: "store_002",
    requestType: "Transfer",
    requestStatus: "Pending",
    readStatus: "notSeen",
    createdAt: "2023-06-17T06:00:00Z",
  },
];

// ── Transfers ─────────────────────────────────────────────────
export const sampleTransfers = [
  {
    _id: "trf_001",
    variant: "var_001",
    variantName: "Nike Air Max 270",
    amounts: 10,
    receiverStore: "store_002",
    senderStore: "store_001",
    createdAt: "2023-06-10T10:00:00Z",
  },
  {
    _id: "trf_002",
    variant: "var_007",
    variantName: "Samsung Galaxy S23",
    amounts: 3,
    receiverStore: "store_003",
    senderStore: "store_001",
    createdAt: "2023-06-12T15:00:00Z",
  },
  {
    _id: "trf_003",
    variant: "var_004",
    variantName: "Uniqlo Supima T-Shirt",
    amounts: 20,
    receiverStore: "store_002",
    senderStore: "store_001",
    createdAt: "2023-06-14T11:00:00Z",
  },
];

// ── Users ─────────────────────────────────────────────────────
export const sampleUsers = [
  {
    _id: "user_001",
    name: "Admin User",
    username: "admin",
    email: "admin@omnistock.com",
    role: "super",
    store: "store_001",
    storeName: "Main Warehouse",
    isActive: true,
  },
  {
    _id: "user_002",
    name: "Tigist Alemu",
    username: "tigist",
    email: "tigist@omnistock.com",
    role: "sm",
    store: "store_002",
    storeName: "Piassa Branch",
    isActive: true,
  },
  {
    _id: "user_003",
    name: "Dawit Haile",
    username: "dawit",
    email: "dawit@omnistock.com",
    role: "sm",
    store: "store_003",
    storeName: "Merkato Outlet",
    isActive: true,
  },
  {
    _id: "user_004",
    name: "Sara Tesfaye",
    username: "sara",
    email: "sara@omnistock.com",
    role: "admin",
    store: "store_001",
    storeName: "Main Warehouse",
    isActive: true,
  },
];
