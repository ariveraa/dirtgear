create table profiles( 
pro_id serial primary key, 
username varchar(150), 
password varchar(150), 
phone_number varchar(11), 
profile_pic varchar(500)
)

create table posts( 
post_id serial primary key, 
pro_id int references profiles(pro_id), 
make varchar(50), 
model varchar(50), 
hours int, 
price float,
description varchar(1000),
aval_from date,
aval_to date, 
photo_1 varchar(1000), 
photo_2 varchar(1000), 
photo_3 varchar(1000)
)