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
hours int, 
discription varchar(1000),
aval_from date,
aval_to date
)