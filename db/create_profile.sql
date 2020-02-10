insert into profiles(
    username, 
    password, 
    phone_number
)
values( 
    $1,
    $2,
    $3
)
returning id,username, phone_number; 