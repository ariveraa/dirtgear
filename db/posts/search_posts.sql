select * from posts
join profiles on posts.pro_id = profiles.pro_id
where make ilike '%'|| $1|| '%'
    or model ilike '%'|| $1|| '%'
    or username ilike '%'|| $1|| '%'; 