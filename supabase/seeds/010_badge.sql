INSERT INTO products(category_id, name, unit, options, price, min_quantity) VALUES
( '3baad6e2-430e-4b6f-aab6-ffd6813dfed8', 'Round Button Badge', 'pc', '{
  "Size": [
    {"name": "58 mm", "price": 0},
    {"name": "46 mm", "price": 0}
  ]
  }', 12, 100),
( '3baad6e2-430e-4b6f-aab6-ffd6813dfed8', 'Pasting Name Badge', 'pc', '{}', 12, 100),
( '3baad6e2-430e-4b6f-aab6-ffd6813dfed8', 'Acrylic Sandwitch Name Badge', 'pc', '{}', 12, 100),
( '3baad6e2-430e-4b6f-aab6-ffd6813dfed8', 'Metal Name Badge', 'pc', '{}', 12, 100);

select * from products;
