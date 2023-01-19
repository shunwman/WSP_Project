-- ALTER TABLE ITEMS ADD COLUMN IMAGE TEXT;
-- UPDATE items set image = '6.jpg' where name = 'Cat';
-- truncate items restart identity CASCADE;
--------------------------------------------------------------------
-- create table categories(
--     id serial primary key,
--     category text not null
-- );
---------------------------------------------------------------------
INSERT INTO categories (id, category)
VALUES (1, 'Electronic products');
INSERT INTO categories (id, category)
VALUES (2, 'Pets');
INSERT INTO categories (id, category)
VALUES (3, 'Bags');
INSERT INTO categories (id, category)
VALUES (4, 'Clothes');
INSERT INTO categories (id, category)
VALUES (5, 'Books');
INSERT INTO categories (id, category)
VALUES (6, 'Accessories');
INSERT INTO categories (id, category)
VALUES (7, 'Other');
INSERT INTO items (
        type,
        name,
        description,
        location,
        happened_at,
        category_id,
        is_free,
        status,
        image,
        created_by
    )
values (
        'found',
        'iPhone 14 pro max',
        'color is purple',
        '134 Queen''s Road West, Sai Ying Pun',
        current_timestamp,
        1,
        true,
        'Not returned',
        '1.jpg',
        2
    );
INSERT INTO items (
        type,
        name,
        description,
        location,
        happened_at,
        category_id,
        is_free,
        status,
        image,
        created_by
    )
values (
        'lost',
        'Dog',
        'Color is skin',
        'no.18 Broadwood Rd, So Kon Po',
        current_timestamp,
        2,
        false,
        'Not found',
        '2.jpg',
        1
    );
INSERT INTO items (
        type,
        name,
        description,
        location,
        happened_at,
        category_id,
        is_free,
        status,
        image,
        created_by
    )
values (
        'found',
        'Hyundai Car Key',
        'hyundai iphone digital key',
        'Shop 327 Level 3 The Mall, Pacific Place, 88 Queensway, Admiralty',
        current_timestamp,
        6,
        false,
        'Returned',
        '3.jpg',
        1
    );
INSERT INTO items (
        type,
        name,
        description,
        location,
        happened_at,
        category_id,
        is_free,
        status,
        image,
        created_by
    )
values (
        'lost',
        'Archetype watch',
        'A self-winding mechanical watch with custom see-through skeleton dial and hands. Individually numbered to 500 pieces.',
        'Kwan Chart Tower, Office 4, 10/F, 6 Tonnochy Rd, Wan Chai',
        current_timestamp,
        7,
        false,
        'Not found',
        '4.jpg',
        2
    );
INSERT INTO items (
        type,
        name,
        description,
        location,
        happened_at,
        category_id,
        is_free,
        status,
        image,
        created_by
    )
values (
        'found',
        'Robin bird',
        'A small insectivorous passerine bird that belongs to the chat subfamily of the Old World flycatcher family. About 14.0 cm (4.9 in) in length, the male and female are similar in colouration, with an orange breast and face lined with grey, brown upper-parts and a whitish belly.',
        '9 Ship St, Wan Chai',
        current_timestamp,
        2,
        false,
        'Not returned',
        '5.jpg',
        1
    );
INSERT INTO items (
        type,
        name,
        description,
        location,
        happened_at,
        category_id,
        is_free,
        status,
        image,
        created_by
    )
values (
        'lost',
        'Cat',
        'Giant eyes, tiny pink paws and noses',
        'FT C, 1/F, BOWRINGTON BLDG, 2-16A BOWRINGTON RD, WAN CHAI, HK',
        current_timestamp,
        2,
        false,
        'found',
        '6.jpg',
        2
    );
INSERT INTO items (
        type,
        name,
        description,
        location,
        happened_at,
        category_id,
        is_free,
        status,
        image,
        created_by
    )
values (
        'lost',
        'Tesla Model S Car Key',
        'The key fob has three buttons with the Tesla badge representing the front.',
        '68 Des Voeux Rd Central, Central',
        current_timestamp,
        7,
        false,
        'Not found',
        '7.jpg',
        1
    );
INSERT INTO items (
        type,
        name,
        description,
        location,
        happened_at,
        category_id,
        is_free,
        status,
        image,
        created_by
    )
values (
        'lost',
        'Women''s Wallet',
        'Two slip pockets, zip coin compartment and three gusset compartments. There is an exterior slip pocket on the back. It has a zip closure',
        '10 Old Peak Rd, Mid-Levels',
        current_timestamp,
        6,
        false,
        'Not found',
        '8.jpg',
        2
    );
INSERT INTO items (
        type,
        name,
        description,
        location,
        happened_at,
        category_id,
        is_free,
        status,
        image,
        created_by
    )
values (
        'lost',
        'Cat',
        '',
        'Bowen Mansion, 7C Bowen Rd, Mid-LevelsK',
        current_timestamp,
        2,
        false,
        'Not found',
        '9.jpg',
        2
    );
INSERT INTO items (
        type,
        name,
        description,
        location,
        happened_at,
        category_id,
        is_free,
        status,
        image,
        created_by
    )
values (
        'lost',
        'Kid''s dress',
        'Color is green',
        'Bowen Mansion, 7C Bowen Rd, Mid-LevelsK',
        current_timestamp,
        4,
        false,
        'found',
        '10.jpg',
        2
    );
INSERT INTO items (
        type,
        name,
        description,
        location,
        happened_at,
        category_id,
        is_free,
        status,
        image,
        created_by
    )
values (
        'lost',
        'Dog',
        '',
        'Hong Kong Zoological And Botanical Gardens',
        current_timestamp,
        2,
        false,
        'Not found',
        '11.jpg',
        2
    );