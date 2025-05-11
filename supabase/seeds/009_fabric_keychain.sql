INSERT INTO products(category_id, name, unit, options, price, min_quantity) VALUES
( '8a9b88c2-aa22-463d-ae68-6f004658fc65', 'Multicolour with Ring', 'pc', '{
  "Length": [
    {"name": "4.5 inch", "price": 0},
    {"name": "6 inch", "price": 0}
  ],
  "Width": [
    {"name": "20mm", "price": 0},
    {"name": "25mm", "price": 0}
  ]
}', 12, 100),
( '8a9b88c2-aa22-463d-ae68-6f004658fc65', 'Multicolour with Ring an Hook', 'pc', '{
  "Length": [
    {"name": "4.5 inch", "price": 0},
    {"name": "6 inch", "price": 0}
  ],
  "Width": [
    {"name": "20mm", "price": 0},
    {"name": "25mm", "price": 0}
  ]
}', 12, 100);

select * from products;
