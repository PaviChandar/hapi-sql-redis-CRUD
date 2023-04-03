USE Employee
GO

CREATE PROCEDURE employeeList 
AS 
BEGIN 
select id,name,salary from employee
END

DECLARE @eid int
IF EXISTS (select name from employee where id = @eid)
	BEGIN
		SELECT id,name from employee where id =  @eid
	END
ELSE
	BEGIN
		SELECT id,name from employee where id =  2
	END

UPDATE employee 
SET name = 'Mira' where id = 2

DELETE employee

DELETE employee where id = 3

create procedure insertEmployee
( 
    @id int,
    @name nvarchar(50),
    @age int,
    @city nvarchar(50), 
    @salary int
) 
AS
BEGIN 
    insert into dbo.employee(id,name,age,city,salary) values(@id,@name,@age,@city,@salary) 
END 
exec insertEmployee @id = 7, @name = 'Stefan',age = 25, @city = 'Virginia', @salary = 32540 

create procedure updateEmployee(@name varchar)
AS
BEGIN
	update employee
	set city = 'Chicago' where name = 'Sneha'
END

CREATE PROCEDURE getEmployeeById(@eid int)
AS
BEGIN
	IF EXISTS (select name from employee where id = @eid)
	BEGIN
		SELECT id,name from employee where id =  @eid
	END
ELSE
	BEGIN
		SELECT id,name from employee where id =  2
	END
END

exec getEmployeeById @eid = 3

select e.name, p.parent_name, e.age as emp_age, p.age as parent_age, p.relation from employee as e INNER JOIN parent as p ON e.id = p.id 

CREATE PROCEDURE updateEmployee
(
@name varchar(50), 
@city varchar(50)
)
AS
BEGIN
	update employee
	set city = @city where name = @name
END

EXEC updateEmployee @city = 'hiiiiii', @name = 'Pavi'

CREATE PROCEDURE updateEmployeeById
AS
BEGIN
	declare @uid int
	select * from employee where id = @uid
END

ALTER PROCEDURE updateEmployeeById(@uid int, @uname varchar(50), @uage int, @ucity varchar(50), @usalary int)
AS
BEGIN
	UPDATE employee
	SET name = @uname, age = @uage, city = @ucity, salary = @usalary where id = @uid
END

EXEC updateEmployeeById @uid = 100, @uname = 'Klaus', @uage = 27, @ucity = 'New Orleans', @usalary = 10300