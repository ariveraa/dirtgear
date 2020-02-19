select * from posts
join profiles on posts.pro_id = profiles.pro_id
where post_id = $1; 