-- Lekker Anatolia — Menu seed data
-- Run: sqlite3 .tmp/data.db < scripts/seed-menu.sql

PRAGMA foreign_keys = ON;

-- Clear existing
DELETE FROM menu_items_category_lnk;
DELETE FROM menu_items;
DELETE FROM menu_categories;

-- ——— Categories ———

INSERT INTO menu_categories (document_id, name, slug, description, sort_order, created_at, updated_at, published_at)
VALUES
  ('cat_lahmacun_001', 'Lahmacun', 'lahmacun',
   'Onze knapperige, dunne Turkse pizza — het paradepaardje van Lekker Anatolia. Vers uit de oven, opgediend met citroen en peterselie.',
   1, datetime('now'), datetime('now'), datetime('now')),

  ('cat_pide_001', 'Pide', 'pide',
   'Gevulde Turkse bootbroodjes uit de oven — sappig, smaakvol en perfect voor elk gezelschap.',
   2, datetime('now'), datetime('now'), datetime('now')),

  ('cat_mezze_001', 'Mezze & Salades', 'mezze',
   'Kleine hapjes en salades — perfect als starter of bijgerecht bij catering.',
   3, datetime('now'), datetime('now'), datetime('now')),

  ('cat_desserts_001', 'Desserts', 'desserts',
   'Zoete afsluiting met authentieke Anatolische lekkernijen.',
   4, datetime('now'), datetime('now'), datetime('now'));

-- ——— Menu items ———

-- Lahmacun items
INSERT INTO menu_items (document_id, name, description, price, is_vegetarian, is_vegan, is_halal, allergens, is_available, sort_order, created_at, updated_at, published_at)
VALUES
  ('itm_trad_lah_001', 'Traditionele lahmacun',
   'Gekruid lamsgehakt op flinterdun deeg, afgemaakt met verse peterselie en citroen.',
   3.50, 0, 0, 1, 'gluten', 1, 1, datetime('now'), datetime('now'), datetime('now')),

  ('itm_veg_lah_001', 'Vegetarische lahmacun',
   'Groentevulling met paprika, tomaat en ui — volledig plantaardig en heerlijk licht.',
   3.50, 1, 1, 0, 'gluten', 1, 2, datetime('now'), datetime('now'), datetime('now')),

  ('itm_kaas_lah_001', 'Kaas & spinazie lahmacun',
   'Romige kaas met verse spinazie op krokant deeg.',
   4.00, 1, 0, 0, 'gluten, lactose', 1, 3, datetime('now'), datetime('now'), datetime('now')),

  ('itm_sucuk_lah_001', 'Sucuklu lahmacun',
   'Pittige Turkse worst (sucuk) op krokant deeg met tomatensaus.',
   4.00, 0, 0, 1, 'gluten', 1, 4, datetime('now'), datetime('now'), datetime('now'));

-- Pide items
INSERT INTO menu_items (document_id, name, description, price, is_vegetarian, is_vegan, is_halal, allergens, is_available, sort_order, created_at, updated_at, published_at)
VALUES
  ('itm_kaas_pid_001', 'Kaas pide',
   'Gesmolten kaas (beyaz peynir & kaşar) op versgebakken pidedeeg.',
   5.00, 1, 0, 0, 'gluten, lactose', 1, 1, datetime('now'), datetime('now'), datetime('now')),

  ('itm_geha_pid_001', 'Gehakt pide',
   'Gekruid rundergehakt met verse kruiden, tomaat en paprika.',
   5.50, 0, 0, 1, 'gluten', 1, 2, datetime('now'), datetime('now'), datetime('now')),

  ('itm_geme_pid_001', 'Gemengde pide',
   'Combinatie van kaas, rundergehakt en geroosterde paprika — de favoriet.',
   6.00, 0, 0, 1, 'gluten, lactose', 1, 3, datetime('now'), datetime('now'), datetime('now')),

  ('itm_spin_pid_001', 'Spinazie & ei pide',
   'Verse spinazie met ei en beyaz peynir op warm pidedeeg.',
   5.50, 1, 0, 0, 'gluten, lactose, eieren', 1, 4, datetime('now'), datetime('now'), datetime('now'));

-- Mezze items
INSERT INTO menu_items (document_id, name, description, price, is_vegetarian, is_vegan, is_halal, allergens, is_available, sort_order, created_at, updated_at, published_at)
VALUES
  ('itm_humm_mez_001', 'Hummus',
   'Huisgemaakte hummus van kikkererwten, tahini en citroen — afgewerkt met olijfolie en paprikapoeder.',
   NULL, 1, 1, 0, 'sesam', 1, 1, datetime('now'), datetime('now'), datetime('now')),

  ('itm_caci_mez_001', 'Cacık',
   'Verse komkommer in Turkse yoghurt met knoflook en dille — verfrissend en romig.',
   NULL, 1, 0, 0, 'lactose', 1, 2, datetime('now'), datetime('now'), datetime('now')),

  ('itm_tabu_mez_001', 'Tabouli',
   'Fijngesneden peterseliesalade met tomaat, bulgur, munt en citroen.',
   NULL, 1, 1, 0, 'gluten', 1, 3, datetime('now'), datetime('now'), datetime('now')),

  ('itm_dolm_mez_001', 'Dolma',
   'Gevulde druivenbladeren met kruidenrijst, pijnboompitten en citroen.',
   NULL, 1, 1, 0, NULL, 1, 4, datetime('now'), datetime('now'), datetime('now')),

  ('itm_ezme_mez_001', 'Ezme',
   'Gekruide tomatensalsa met ui, peterselie en rode peper — perfect als dipsaus.',
   NULL, 1, 1, 0, NULL, 1, 5, datetime('now'), datetime('now'), datetime('now'));

-- Dessert items
INSERT INTO menu_items (document_id, name, description, price, is_vegetarian, is_vegan, is_halal, allergens, is_available, sort_order, created_at, updated_at, published_at)
VALUES
  ('itm_bakl_des_001', 'Baklava',
   'Krokant filodeeg gevuld met fijngehakte pistachenoten, overgoten met honing- en rozenwatersiroop.',
   NULL, 1, 0, 0, 'gluten, noten (pistache)', 1, 1, datetime('now'), datetime('now'), datetime('now')),

  ('itm_kune_des_001', 'Künefe',
   'Warm kaasdessert van engelenhaar-deeg, overgoten met suikerwater en bestrooid met pistache.',
   NULL, 1, 0, 0, 'gluten, lactose, noten', 1, 2, datetime('now'), datetime('now'), datetime('now')),

  ('itm_reva_des_001', 'Revani',
   'Luchtige griesmeel cake gedrenkt in citroensiroop — zacht en aromatisch.',
   NULL, 1, 0, 0, 'gluten, eieren, lactose', 1, 3, datetime('now'), datetime('now'), datetime('now'));

-- ——— Relations ———

-- Lahmacun category id = 1, items 1-4
INSERT INTO menu_items_category_lnk (menu_item_id, menu_category_id, menu_item_ord)
SELECT id, (SELECT id FROM menu_categories WHERE slug = 'lahmacun'), sort_order
FROM menu_items WHERE document_id LIKE 'itm_%_lah_%';

-- Pide category id = 2, items 5-8
INSERT INTO menu_items_category_lnk (menu_item_id, menu_category_id, menu_item_ord)
SELECT id, (SELECT id FROM menu_categories WHERE slug = 'pide'), sort_order
FROM menu_items WHERE document_id LIKE 'itm_%_pid_%';

-- Mezze category id = 3, items 9-13
INSERT INTO menu_items_category_lnk (menu_item_id, menu_category_id, menu_item_ord)
SELECT id, (SELECT id FROM menu_categories WHERE slug = 'mezze'), sort_order
FROM menu_items WHERE document_id LIKE 'itm_%_mez_%';

-- Desserts category id = 4, items 14-16
INSERT INTO menu_items_category_lnk (menu_item_id, menu_category_id, menu_item_ord)
SELECT id, (SELECT id FROM menu_categories WHERE slug = 'desserts'), sort_order
FROM menu_items WHERE document_id LIKE 'itm_%_des_%';

-- Verify
SELECT 'Categories: ' || COUNT(*) FROM menu_categories;
SELECT 'Items: ' || COUNT(*) FROM menu_items;
SELECT 'Links: ' || COUNT(*) FROM menu_items_category_lnk;
