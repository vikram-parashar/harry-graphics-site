DELETE from products;

-- Id Cards
INSERT INTO products(category_id, name, unit, options,price) VALUES
(
  '896a088f-9599-407c-b25b-42fec82f107d',
  'Pasting School ID Card',
  'pc',
  '{
    "size": [{"name": "86mm x 54mm", "price": 0}],
    "print on": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}]
  }',
  10
),
(
  '896a088f-9599-407c-b25b-42fec82f107d',
  'PVC School ID Card',
  'pc',
  '{
    "size": [{"name": "86mm x 54mm", "price": 0}],
    "print on": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}],
    "weight": [{"name": "800 Micron", "price": 0}]
  }',
  24.22
);
INSERT INTO products(category_id, name, unit, options) VALUES
(
  '896a088f-9599-407c-b25b-42fec82f107d',
  'Employee ID Card',
  'pc',
  '{
    "size": [{"name": "86mm x 54mm", "price": 0}],
    "print on": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}],
    "weight": [{"name": "800 Micron", "price": 0},{"name": "1100 Micron", "price": 0}]
  }'
),
(
  '896a088f-9599-407c-b25b-42fec82f107d',
  'Conference Card',
  'pc',
  '{
    "size": [{"name": "86mm x 135mm", "price": 0}],
    "print on": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}],
    "weight": [{"name": "800 Micron", "price": 0},{"name": "1100 Micron", "price": 0}]
  }'
),
(
  '896a088f-9599-407c-b25b-42fec82f107d',
  'EV Certificate Card',
  'pc',
  '{
    "size": [{"name": "86mm x 54mm", "price": 0}],
    "print on": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}],
    "weight": [{"name": "800 Micron", "price": 0},{"name": "1100 Micron", "price": 0}]
  }'
),
(
  '896a088f-9599-407c-b25b-42fec82f107d',
  'Membership Card',
  'pc',
  '{
    "size": [{"name": "86mm x 54mm", "price": 0}],
    "print on": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}],
    "weight": [{"name": "800 Micron", "price": 0},{"name": "1100 Micron", "price": 0}]
  }'
),
(
  '896a088f-9599-407c-b25b-42fec82f107d',
  'Golden Card',
  'pc',
  '{
    "size": [{"name": "86mm x 54mm", "price": 0}],
    "print on": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}],
    "weight": [{"name": "800 Micron", "price": 0}]
  }'
),
(
  '896a088f-9599-407c-b25b-42fec82f107d',
  'Digital Lanyard',
  'pc',
  '{
    "size": [{"name": "86mm x 54mm", "price": 0}],
    "print on": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}],
    "weight": [{"name": "800 Micron", "price": 0}]
  }'
);

select * from products;
