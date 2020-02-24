update posts
set make = $2, 
    model = $3, 
    hours =$4,
    price = $5, 
    description =$6,
    aval_from = $7,
    aval_to = $8, 
    photo_1 =$9, 
    photo_2 = $10, 
    photo_3  = $11
where post_id = $1