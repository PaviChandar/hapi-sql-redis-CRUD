create database PRODUCT

use PRODUCT 
go

create table product
(
id int primary key IDENTITY(1,1) not null,
category_id int,
brand_id int,
name varchar(50),
price decimal(6,5)
)

create table category
(
category_id int not null IDENTITY(1,1) primary key,
name varchar(50)
)

create table brand
(
brand_id int not null IDENTITY(1,1) primary key,
name nvarchar(50),
class nvarchar(50),
model int
)

create procedure insertCategory
(
@cname varchar(50)
)
as 
begin
	insert into category(name)
	values(@cname)
end

exec insertCategory @cname = 'Electrical'
exec insertCategory @cname = 'Electronics'
exec insertCategory @cname = 'Cosmetics'

select * from category

create procedure insertBrand
(
@bname varchar(50),
@bclass nvarchar(50),
@bmodel int
)
as
begin
	insert into brand(name,class,model)
	values(@bname,@bclass,@bmodel)
end

drop procedure insertBrand
drop table brand

exec insertBrand @bname = 'Samsung',@bclass= 'Galaxy J4', @bmodel = 2018
exec insertBrand @bname = 'One Plus',@bclass= 'Nord', @bmodel = 2022
exec insertBrand @bname = 'Vivo',@bclass= 'V19', @bmodel = 2019
exec insertBrand @bname = 'Vivo',@bclass= 'Y20', @bmodel = 2019

select * from brand