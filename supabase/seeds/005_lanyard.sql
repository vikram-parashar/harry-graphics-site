-- Lanyard
INSERT INTO products(category_id, name, unit, options, price, min_quantity) VALUES
( 'a72b61ea-a85e-4299-976c-a3db131364a1', 'Bombay Border', 'pc', '{ 
  "color": [
    {"name": "Red", "price": 0},
    {"name": "Green", "price": 0},
    {"name": "Blue", "price": 0},
    {"name": "Yellow", "price": 0},
    {"name": "Orange", "price": 0},
    {"name": "Black", "price": 0}
  ],
  "Hook":[
     {"name": "No Hook", "price": 0},
     {"name": "Choose hook", "price": 0}
  ],
  "Holder":[
     {"name": "No Holder", "price": 0},
     {"name": "Choose Holder", "price": 0}
  ]
}', 12, 100),
( 'a72b61ea-a85e-4299-976c-a3db131364a1', 'Polyster Lanyard', 'pc', '{ 
  "color": [
    {"name": "Red", "price": 0},
    {"name": "Green", "price": 0},
    {"name": "Blue", "price": 0},
    {"name": "Yellow", "price": 0},
    {"name": "Orange", "price": 0},
    {"name": "Black", "price": 0}
  ],
  "Hook":[
     {"name": "No Hook", "price": 0},
     {"name": "Choose hook", "price": 0}
  ],
  "Holder":[
     {"name": "No Holder", "price": 0},
     {"name": "Choose Holder", "price": 0}
  ]
}', 12, 100),
( 'a72b61ea-a85e-4299-976c-a3db131364a1', 'Digital Lanyard', 'pc', '{ 
  "size": [
    { "name": "12mm", "price": 0 },
    { "name": "16mm", "price": 0 },
    { "name": "20mm", "price": 0 },
    { "name": "25mm", "price": 0 }
  ],
  "Hook":[
     {"name": "No Hook", "price": 0},
     {"name": "Choose hook", "price": 0}
  ]
}', 12, 100),
( 'a72b61ea-a85e-4299-976c-a3db131364a1', 'Satin Lanyard', 'pc', '{ 
  "size": [
    { "name": "12mm", "price": 0 },
    { "name": "16mm", "price": 0 },
    { "name": "20mm", "price": 0 },
    { "name": "25mm", "price": 0 }
  ],
  "Hook":[
     {"name": "No Hook", "price": 0},
     {"name": "Choose hook", "price": 0}
  ]
}', 12, 100);
select * from products;
