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

use PRODUCT
go

select * from brand

create table brand
(
brand_id int not null IDENTITY(1,1) primary key,
name nvarchar(50),
class nvarchar(50),
model int,
category_id int foreign key references category(category_id) not null
)

create procedure insertBrand
(
@bname varchar(50),
@bclass nvarchar(50),
@bmodel int,
@cid int
)
as
begin
	insert into brand(name,class,model,category_id)
	values(@bname,@bclass,@bmodel,@cid)
end


exec insertBrand @bname = 'Samsung',@bclass= 'Galaxy J4', @bmodel = 2018,@cid=1
exec insertBrand @bname = 'One Plus',@bclass= 'Nord', @bmodel = 2022,@cid=1
exec insertBrand @bname = 'Vivo',@bclass= 'V19', @bmodel = 2019,@cid=1
exec insertBrand @bname = 'Vivo',@bclass= 'Y20', @bmodel = 2019,@cid=1
exec insertBrand @bname='Whirlpool', @bclass='AC 5*', @bmodel=2013,@cid=2
exec insertBrand @bname='Kaitan', @bclass='3 blade fan', @bmodel=2016,@cid=2
exec insertBrand @bname='Lakme', @bclass='Kajal', @bmodel=2022,@cid=3


create procedure displayCategory
as
begin
	select b.name,b.class,b.model,c.category_name from brand as b INNER JOIN category as c on b.category_id = c.category_id
end

exec displayCategory

create procedure displayCategoryId
as
begin
	select name,class,model from brand where category_id in (select category_id from category where category_id = 2)
end

exec displayCategoryId