/**
 * Seed script — populates menu_categories and menu_items in the Strapi SQLite DB.
 *
 * IMPORTANT: In Strapi v5, Draft & Publish stores TWO rows per document:
 *   • the DRAFT   → published_at = NULL
 *   • the PUBLISHED copy → published_at = <ms timestamp>
 * Both rows share the same `document_id`. The admin Content Manager lists
 * documents by their DRAFT row — if only the published row exists, the admin
 * shows nothing even though the REST API returns the published data.
 *
 * Strapi also stores dates as INTEGER milliseconds (not ISO strings).
 *
 * Run with Strapi STOPPED: node scripts/seed-menu.mjs
 */

import Database from "better-sqlite3";
import { randomBytes } from "crypto";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "../.tmp/data.db");

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Strapi v5 stores timestamps as ms integers
const now = Date.now();

function docId() {
  return randomBytes(12).toString("base64url").slice(0, 20);
}

// ——— Categories ———

const categories = [
  {
    name: "Lahmacun",
    slug: "lahmacun",
    description:
      "Onze knapperige, dunne Turkse pizza — het paradepaardje van Lekker Anatolia. Vers uit de oven, opgediend met citroen en peterselie.",
    sort_order: 1,
  },
  {
    name: "Pide",
    slug: "pide",
    description:
      "Gevulde Turkse bootbroodjes uit de oven — sappig, smaakvol en perfect voor elk gezelschap.",
    sort_order: 2,
  },
  {
    name: "Mezze & Salades",
    slug: "mezze",
    description:
      "Kleine hapjes en salades — perfect als starter of bijgerecht bij catering.",
    sort_order: 3,
  },
  {
    name: "Desserts",
    slug: "desserts",
    description: "Zoete afsluiting met authentieke Anatolische lekkernijen.",
    sort_order: 4,
  },
];

// ——— Menu items (per category slug) ———

const items = {
  lahmacun: [
    {
      name: "Traditionele lahmacun",
      description:
        "Gekruid lamsgehakt op flinterdun deeg, afgemaakt met verse peterselie en citroen.",
      price: 3.5,
      is_halal: 1,
      is_vegetarian: 0,
      is_vegan: 0,
      allergens: "gluten",
      sort_order: 1,
    },
    {
      name: "Vegetarische lahmacun",
      description:
        "Groentevulling met paprika, tomaat en ui — volledig plantaardig en heerlijk licht.",
      price: 3.5,
      is_vegetarian: 1,
      is_vegan: 1,
      is_halal: 0,
      allergens: "gluten",
      sort_order: 2,
    },
    {
      name: "Kaas & spinazie lahmacun",
      description: "Romige kaas met verse spinazie op krokant deeg.",
      price: 4.0,
      is_vegetarian: 1,
      is_vegan: 0,
      is_halal: 0,
      allergens: "gluten, lactose",
      sort_order: 3,
    },
    {
      name: "Sucuklu lahmacun",
      description:
        "Pittige Turkse worst (sucuk) op krokant deeg met tomatensaus.",
      price: 4.0,
      is_halal: 1,
      is_vegetarian: 0,
      is_vegan: 0,
      allergens: "gluten",
      sort_order: 4,
    },
  ],
  pide: [
    {
      name: "Kaas pide",
      description:
        "Gesmolten kaas (beyaz peynir & kaşar) op versgebakken pidedeeg.",
      price: 5.0,
      is_vegetarian: 1,
      is_vegan: 0,
      is_halal: 0,
      allergens: "gluten, lactose",
      sort_order: 1,
    },
    {
      name: "Gehakt pide",
      description:
        "Gekruid rundergehakt met verse kruiden, tomaat en paprika.",
      price: 5.5,
      is_halal: 1,
      is_vegetarian: 0,
      is_vegan: 0,
      allergens: "gluten",
      sort_order: 2,
    },
    {
      name: "Gemengde pide",
      description:
        "Combinatie van kaas, rundergehakt en geroosterde paprika — de favoriet.",
      price: 6.0,
      is_halal: 1,
      is_vegetarian: 0,
      is_vegan: 0,
      allergens: "gluten, lactose",
      sort_order: 3,
    },
    {
      name: "Spinazie & ei pide",
      description: "Verse spinazie met ei en beyaz peynir op warm pidedeeg.",
      price: 5.5,
      is_vegetarian: 1,
      is_vegan: 0,
      is_halal: 0,
      allergens: "gluten, lactose, eieren",
      sort_order: 4,
    },
  ],
  mezze: [
    {
      name: "Hummus",
      description:
        "Huisgemaakte hummus van kikkererwten, tahini en citroen — afgewerkt met olijfolie en paprikapoeder.",
      is_vegetarian: 1,
      is_vegan: 1,
      is_halal: 0,
      allergens: "sesam",
      sort_order: 1,
    },
    {
      name: "Cacık",
      description:
        "Verse komkommer in Turkse yoghurt met knoflook en dille — verfrissend en romig.",
      is_vegetarian: 1,
      is_vegan: 0,
      is_halal: 0,
      allergens: "lactose",
      sort_order: 2,
    },
    {
      name: "Tabouli",
      description:
        "Fijngesneden peterseliesalade met tomaat, bulgur, munt en citroen.",
      is_vegetarian: 1,
      is_vegan: 1,
      is_halal: 0,
      allergens: "gluten",
      sort_order: 3,
    },
    {
      name: "Dolma",
      description:
        "Gevulde druivenbladeren met kruidenrijst, pijnboompitten en citroen.",
      is_vegetarian: 1,
      is_vegan: 1,
      is_halal: 0,
      sort_order: 4,
    },
    {
      name: "Ezme",
      description:
        "Gekruide tomatensalsa met ui, peterselie en rode peper — perfect als dipsaus.",
      is_vegetarian: 1,
      is_vegan: 1,
      is_halal: 0,
      sort_order: 5,
    },
  ],
  desserts: [
    {
      name: "Baklava",
      description:
        "Krokant filodeeg gevuld met fijngehakte pistachenoten, overgoten met honing- en rozenwatersiroop.",
      is_vegetarian: 1,
      is_vegan: 0,
      is_halal: 0,
      allergens: "gluten, noten (pistache)",
      sort_order: 1,
    },
    {
      name: "Künefe",
      description:
        "Warm kaasdessert van engelenhaar-deeg, overgoten met suikerwater en bestrooid met pistache.",
      is_vegetarian: 1,
      is_vegan: 0,
      is_halal: 0,
      allergens: "gluten, lactose, noten",
      sort_order: 2,
    },
    {
      name: "Revani",
      description:
        "Luchtige griesmeel cake gedrenkt in citroensiroop — zacht en aromatisch.",
      is_vegetarian: 1,
      is_vegan: 0,
      is_halal: 0,
      allergens: "gluten, eieren, lactose",
      sort_order: 3,
    },
  ],
};

// ——— Prepared statements ———

const insertCat = db.prepare(`
  INSERT INTO menu_categories
    (document_id, name, slug, description, sort_order, created_at, updated_at, published_at, locale)
  VALUES
    (@document_id, @name, @slug, @description, @sort_order, @now, @now, @published_at, NULL)
`);

const insertItem = db.prepare(`
  INSERT INTO menu_items
    (document_id, name, description, price, price_label, is_vegetarian, is_vegan, is_halal,
     allergens, is_available, sort_order, created_at, updated_at, published_at, locale)
  VALUES
    (@document_id, @name, @description, @price, @price_label, @is_vegetarian, @is_vegan, @is_halal,
     @allergens, 1, @sort_order, @now, @now, @published_at, NULL)
`);

const insertLink = db.prepare(`
  INSERT OR IGNORE INTO menu_items_category_lnk
    (menu_item_id, menu_category_id, menu_item_ord)
  VALUES
    (@menu_item_id, @menu_category_id, @menu_item_ord)
`);

// Clear existing data
db.prepare("DELETE FROM menu_items_category_lnk").run();
db.prepare("DELETE FROM menu_items").run();
db.prepare("DELETE FROM menu_categories").run();

/**
 * For each entity we insert TWO rows sharing the same document_id:
 *   1. a DRAFT row with published_at = NULL
 *   2. a PUBLISHED row with published_at = <now>
 * The admin panel reads the draft row, the REST API reads the published row.
 * Relations (menu_items_category_lnk) must link both draft↔draft and
 * published↔published rows, otherwise the admin won't show the relation.
 */
const seedAll = db.transaction(() => {
  for (const cat of categories) {
    const catDocId = docId();

    // 1. DRAFT category
    const catDraftRes = insertCat.run({
      document_id: catDocId,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      sort_order: cat.sort_order,
      now,
      published_at: null,
    });
    const catDraftId = catDraftRes.lastInsertRowid;

    // 2. PUBLISHED category (same document_id)
    const catPubRes = insertCat.run({
      document_id: catDocId,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      sort_order: cat.sort_order,
      now,
      published_at: now,
    });
    const catPubId = catPubRes.lastInsertRowid;

    const catItems = items[cat.slug] ?? [];
    catItems.forEach((item, idx) => {
      const itemDocId = docId();

      // 1. DRAFT item
      const itemDraftRes = insertItem.run({
        document_id: itemDocId,
        name: item.name,
        description: item.description ?? null,
        price: item.price ?? null,
        price_label: item.price_label ?? null,
        is_vegetarian: item.is_vegetarian ?? 0,
        is_vegan: item.is_vegan ?? 0,
        is_halal: item.is_halal ?? 0,
        allergens: item.allergens ?? null,
        sort_order: item.sort_order ?? idx + 1,
        now,
        published_at: null,
      });

      // 2. PUBLISHED item
      const itemPubRes = insertItem.run({
        document_id: itemDocId,
        name: item.name,
        description: item.description ?? null,
        price: item.price ?? null,
        price_label: item.price_label ?? null,
        is_vegetarian: item.is_vegetarian ?? 0,
        is_vegan: item.is_vegan ?? 0,
        is_halal: item.is_halal ?? 0,
        allergens: item.allergens ?? null,
        sort_order: item.sort_order ?? idx + 1,
        now,
        published_at: now,
      });

      // Link DRAFT item ↔ DRAFT category
      insertLink.run({
        menu_item_id: itemDraftRes.lastInsertRowid,
        menu_category_id: catDraftId,
        menu_item_ord: idx + 1,
      });

      // Link PUBLISHED item ↔ PUBLISHED category
      insertLink.run({
        menu_item_id: itemPubRes.lastInsertRowid,
        menu_category_id: catPubId,
        menu_item_ord: idx + 1,
      });
    });

    console.log(`  ✓ ${cat.name} (${catItems.length} items, draft + published)`);
  }
});

console.log("Seeding menu data (draft + published rows, ms timestamps)...");
seedAll();
console.log("Done.");

db.close();
