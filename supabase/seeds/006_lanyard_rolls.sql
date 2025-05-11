INSERT INTO products(category_id, name, unit, options, price, min_quantity) VALUES
( '3efbd649-2b94-48d8-9b0f-9357d49ff525', 'Bombay Border', 'pc', '{ 
  "color": [
    {"name": "Red", "price": 0},
    {"name": "Green", "price": 0},
    {"name": "Blue", "price": 0},
    {"name": "Yellow", "price": 0},
    {"name": "Orange", "price": 0},
    {"name": "Black", "price": 0}
  ]
}', 12, 100),
( '3efbd649-2b94-48d8-9b0f-9357d49ff525', 'Polyster Border', 'pc', '{ 
  "color": [
    {"name": "Red", "price": 0},
    {"name": "Green", "price": 0},
    {"name": "Blue", "price": 0},
    {"name": "Yellow", "price": 0},
    {"name": "Orange", "price": 0},
    {"name": "Black", "price": 0}
  ]
}', 12, 100),
( '3efbd649-2b94-48d8-9b0f-9357d49ff525', 'Satin Border', 'pc', '{ 
  "color": [
    {"name": "Red", "price": 0},
    {"name": "Green", "price": 0},
    {"name": "Blue", "price": 0},
    {"name": "Yellow", "price": 0},
    {"name": "Orange", "price": 0},
    {"name": "Black", "price": 0}
  ],
  "size": [
    { "name": "16mm", "price": 0 },
    { "name": "20mm", "price": 0 }
  ]
}', 12, 100);
select * from products;
