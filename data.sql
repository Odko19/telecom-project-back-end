use office;


select * from users;
select * from office_list;
select * from data_list;
select * from mail_type;
select * from archives_list;
select now();
select * from users;
truncate table data_list;


select office_list.id , office_list.office_name,password
from office_list
inner join users
ON office_list.id = users.id  where office_list.id=1;


select * from t1;
CREATE TABLE t1 (c1 JSON);
INSERT INTO t1 VALUES ('[3, 5, 7]');


select data_list.id, data_list.office_name_from, data_list.office_name_to,
       data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
       office_from.office_name as office_from,
       office_to.office_name as office_to
from data_list 
inner join office_list office_from
ON data_list.office_name_from = office_from.id 
left join office_list office_to
ON data_list.office_name_to = office_to.id
where data_list.office_name_from = 3;




DELETE FROM data_list where id=5;
SELECT * FROM data_list where id =6;
SELECT * FROM data_list where office_name_from = "Техник технологийн ашиглалтын газар" AND archives = 1;
select * from office_list_to;

CREATE TABLE office_list(
id int not null primary key,
office_name_to varchar(255) NOT NULL
);


CREATE TABLE t1 (ts timestamp );
INSERT INTO t1 VALUES (NOW());

CREATE TABLE users(
id INT not null primary key auto_increment,
password int NOT NULL,
foreign key (id) references office_list(id)
);



INSERT INTO users(password) 
VALUES(12345678);
INSERT INTO office_list( id, office_name) 
VALUES(7,"Админ");


CREATE TABLE data_list(
 id INT not null primary key auto_increment,
 office_name_from varchar(255) NOT NULL,
 office_name_to varchar(255) NOT NULL,
 subject_txt longtext,
 imgUrl varchar(255) NOT NULL,
 dateTime_now timestamp ,
 archives INT DEFAULT 0
);


-- data-list create table

CREATE TABLE data_list(
 id INT not null primary key auto_increment,
 office_name_from INT,
 office_name_to INT,
 subject_txt longtext,
 imgUrl JSON,
 dateTime_now timestamp ,
 archives INT DEFAULT 0,
 new_msg INT DEFAULT 0,
 mail_time varchar(255),
 foreign key (office_name_from) references office_list(id),
 foreign key (office_name_to) references office_list(id)
);

CREATE TABLE archives_list(
 id INT not null primary key auto_increment,
 subject_txt longtext,
 imgUrl JSON,
 dateTime_now timestamp ,
 archives INT,
 mail_id INT,
 office_from varchar(255),
 office_to varchar(255),
 foreign key (mail_id) references data_list(id)
);

INSERT INTO archives_list(subject_txt, imgUrl, dateTime_now, archives, mail_id, office_from, office_to) 
VALUES(
"sdasd", '["http://localhost:3001/uploads/1669697293132.png"]',  "2022-11-29 12:48:13",
0, 1, "Инновац, бизнес хөгжлийн газар","Маркетинг борлуулалтын газар"
);

INSERT INTO archives_list(subject_txt, imgUrl, dateTime_now, archives, mail_id, office_from, office_to) 
VALUES(
"sdasd", '["http://localhost:3001/uploads/1669697293132.png"]',  "2022-11-29 12:48:13",
0, 1, "Инновац, бизнес хөгжлийн газар","Маркетинг борлуулалтын газар"
);


  
CREATE TABLE t1 (
  i INT DEFAULT 0,
  c VARCHAR(10) 
);
  INSERT INTO t1(c) 
  VALUES("Мэ");
  select * from t1;
  
SELECT * FROM upload_data where mail_desc="information tehnology";
SELECT * FROM users WHERE office_name='Инновац, бизнес хөгжлийн газар' AND  passport = 1234543536;

CREATE TABLE mail_type(
 id INT not null primary key auto_increment,
 type varchar(255),
 name varchar(255)
);
    INSERT INTO mail_type(type, name) 
  VALUES("Архивласан майл","archives");

SELECT data_list.id,
    data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
    office_from.office_name as office_from,
    office_to.office_name as office_to
    from data_list
    INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
    LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id
    WHERE data_list.archives =1 and   (data_list.office_name_from = 6 or data_list.office_name_to = 6);


SELECT data_list.id,
      data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
      office_from.office_name as office_from,
      office_to.office_name as office_to
      from data_list
      INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
      LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id
      WHERE data_list.office_name_from = 2 and data_list.dateTime_now > "2022-11-22";
      
      
SELECT data_list.id,
      data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
      office_from.office_name as office_from,
      office_to.office_name as office_to
      from data_list
      INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
      LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id
      WHERE data_list.office_name_from = 2;



SELECT data_list.id, 
    data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
    office_from.office_name as office_from,
    office_to.office_name as office_to
    from data_list
    INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
    LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id 
    WHERE data_list.office_name_to = 1 ORDER BY dateTime_now desc;


