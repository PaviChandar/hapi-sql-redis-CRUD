CREATE PROCEDURE insertEmployee
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
EXEC insertEmployee @id = 7, @name = 'Stefan',age = 25, @city = 'Virginia', @salary = 32540 



CREATE PROCEDURE updateEmployeeById
AS
BEGIN
	declare @uid int
	select * from employee where id = @uid
END

ALTER PROCEDURE updateEmployeeById(@uid int, @uname varchar(50), @uage int, @ucity varchar(50), @usalary int)
AS
BEGIN
	update employee
	set name = @uname, age = @uage, city = @ucity, salary = @usalary where id = @uid
END

EXEC updateEmployeeById @uid = 100, @uname = 'Klaus', @uage = 27, @ucity = 'New Orleans', @usalary = 10300



CREATE PROCEDURE getEmployeeById(@eid int)
AS
BEGIN
	select * from employee where id = @eid
END
EXEC getEmployeeById @eid = 1



CREATE PROCEDURE getAllEmployee
AS
BEGIN
	select * from employee
END
EXEC getAllEmployee



CREATE PROCEDURE deleteEmployeeById(@did int)
AS 
BEGIN
	delete from employee where id = @did
END
EXEC deleteEmployeeById @did = 1000