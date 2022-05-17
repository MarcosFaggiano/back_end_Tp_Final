INSERT INTO user (id, firstname, lastname, username, password,
country, city, created_at, updated_at)

VALUES (1,'Matias','Duarte','DuarteM','123456','Argentina',
'Cordoba','2022-05-05','2022-05-05'
),(2,'Marcos','Faggiano','FaggianoM','123123','Argentina',
'Cordoba','2022-05-05','2022-05-05'
),(3,'Jose','Lopez','LopezJ','1234567','Bolivia',
'La Paz','2022-05-05','2022-05-05'
);

INSERT INTO messages (id, message, id_user, id_receiver, isRead, created_at, updated_at)

VALUES (1,'Hola Marcos!! Como estas', 1, 2, 1,'2022-05-05','2022-05-05'),
(2,'Muy bien !! Gracias', 2, 1, 0, '2022-05-05','2022-05-05');