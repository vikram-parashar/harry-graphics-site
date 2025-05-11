INSERT INTO products(category_id, name, unit, options, price, min_quantity) VALUES
( '534d78a9-84b0-421f-81ea-e9e732ce82b7', 'Metal Yoyo ', 'pc', '{
  "color": [
    {"name": "Silver", "price": 0},
    {"name": "Black", "price": 0}
  ]
}', 12, 100),
( '534d78a9-84b0-421f-81ea-e9e732ce82b7', 'Oval Yoyo ', 'pc', '{
  "color": [
    {"name": "Black", "price": 0},
    {"name": "Red", "price": 0},
    {"name": "White", "price": 0},
    {"name": "Blue", "price": 0}
  ]
}', 12, 100),
( '534d78a9-84b0-421f-81ea-e9e732ce82b7', 'Round Yoyo ', 'pc', '{
  "color": [
    {"name": "Black", "price": 0},
    {"name": "Red", "price": 0},
    {"name": "White", "price": 0},
    {"name": "Blue", "price": 0}
  ]
}', 12, 100);

select * from products;
