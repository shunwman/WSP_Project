create table users(
    id serial primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    living_address varchar(255),
    working_address varchar(255),
    phone_number int not null,
    email varchar(255) not null,
    is_google boolean not null,
    image text,
    created_at timestamp default now(),
    updated_at timestamp default now()
);
create table categories(
    id serial primary key,
    category text not null
);
create table items(
    id serial primary key,
    type text not null,
    name varchar(255) not null,
    description text,
    location varchar(255) not null,
    happened_at timestamp not null default now(),
    category_id integer not null,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    is_free boolean not null,
    image text not null default 'demoImg.png',
    created_by integer not null,
    status text default 'pending',
    created_at timestamp default now(),
    updated_at timestamp default now(),
    is_deleted boolean not null default false
);
create table likes(
    id serial primary key,
    user_id int not null,
    FOREIGN KEY (user_id) REFERENCES users(id),
    item_id int not null,
    FOREIGN KEY (item_id) REFERENCES items(id),
    created_at timestamp default now(),
    updated_at timestamp default now()
);
create table tags(id serial primary key, name text);
create table items_tags(
    id serial primary key,
    item_id int not null,
    FOREIGN KEY (item_id) REFERENCES items(id),
    tag_id int not null,
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);
create table notifications(
    id serial primary key,
    receiver_id int not null,
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    sender_id int not null,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    item_id int not null,
    FOREIGN KEY (item_id) REFERENCES items(id),
    content text,
    created_at timestamp default now(),
    updated_at timestamp default now()
);
create table messages(
    id serial primary key,
    receiver_id int not null,
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    sender_id int not null,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    content text,
    created_at timestamp default now(),
    updated_at timestamp default now()
);
-- create table item_images(
--     id serial primary key,
--     item_id int not null,
--     FOREIGN KEY (item_id) REFERENCES items(id),
--     images text
-- );