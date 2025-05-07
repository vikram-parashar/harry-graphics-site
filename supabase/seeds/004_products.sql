DELETE from products;

-- Id Cards
INSERT INTO products(category_id, name, unit, options, price, min_quantity) VALUES
( '896a088f-9599-407c-b25b-42fec82f107d', 'Pasting School ID Card', 'pc', '{ "size": [{"name": "86mm x 54mm", "price": 0}], "printing": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}] }', 12, 100),
( '896a088f-9599-407c-b25b-42fec82f107d', 'PVC School ID Card', 'pc', '{ "size": [{"name": "86mm x 54mm", "price": 0}], "printing": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}] }', 12, 100),
( '896a088f-9599-407c-b25b-42fec82f107d', 'Employee ID Card', 'pc', '{ "size": [{"name": "86mm x 54mm", "price": 0}], "printing": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}] }', 12, 100),
( '896a088f-9599-407c-b25b-42fec82f107d', 'Conference Card', 'pc', '{ "size": [{"name": "86mm x 54mm", "price": 0}], "printing": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}] }', 12, 100),
( '896a088f-9599-407c-b25b-42fec82f107d', 'EV Certificate Card', 'pc', '{ "size": [{"name": "86mm x 54mm", "price": 0}], "printing": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}] }', 12, 100),
( '896a088f-9599-407c-b25b-42fec82f107d', 'Membership Card', 'pc', '{ "size": [{"name": "86mm x 54mm", "price": 0}], "printing": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}] }', 12, 100),
( '896a088f-9599-407c-b25b-42fec82f107d', 'Silver Card', 'pc', '{ "size": [{"name": "86mm x 54mm", "price": 0}], "printing": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}] }', 12, 100),
( '896a088f-9599-407c-b25b-42fec82f107d', 'Golden Card', 'pc', '{ "size": [{"name": "86mm x 54mm", "price": 0}], "printing": [{"name": "single side", "price": 0}, {"name": "double side", "price": 0}] }', 12, 100);

select * from products;
