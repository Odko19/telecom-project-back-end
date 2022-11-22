use office;


select * from users;
select * from office_list;
select * from data_list;
select now();
select * from users;
truncate table data_list;
 CREATE TABLE t1 (c1 JSON);
 select * from t1;
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

SELECT id, office_name, password FROM users where id=1;




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
office_name varchar(255) NOT NULL,
password_ int NOT NULL
);
select * from office_list;
INSERT INTO users( office_name, password) 
VALUES("Мэдээлэл технологийн төв", 123456);



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
 imgUrl varchar(255) NOT NULL,
 dateTime_now timestamp ,
 archives INT DEFAULT 0,
 foreign key (office_name_from) references office_list(id),
 foreign key (office_name_to) references office_list(id)
);

CREATE TABLE data_list(
 id INT not null primary key auto_increment,
 office_name_from INT,
 office_name_to INT,
 subject_txt longtext,
 imgUrl JSON,
 dateTime_now timestamp ,
 archives INT DEFAULT 0,
 foreign key (office_name_from) references office_list(id),
 foreign key (office_name_to) references office_list(id)
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


   SELECT data_list.id,
    data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
    office_from.office_name as office_from,
    office_to.office_name as office_to
    from data_list
    INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
    LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id
    WHERE data_list.archives =1 and   (data_list.office_name_from = 6 or data_list.office_name_to = 6);






