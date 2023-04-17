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
		select id,name from employee where id =  @eid
	END
ELSE
	BEGIN
		select id,name from employee where id =  2
	END

UPDATE employee 
SET name = 'Mira' where id = 2

DELETE employee

DELETE employee where id = 3

CREATE PROCEDURE updateEmployee(@name varchar)
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
		select id,name from employee where id =  @eid
	END
ELSE
	BEGIN
		select id,name from employee where id =  2
	END
END
EXEC getEmployeeById @eid = 3

SELECT e.name, p.parent_name, e.age as emp_age, p.age as parent_age, p.relation from employee as e INNER JOIN parent as p ON e.id = p.id 

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


CREATE PROCEDURE addColumn
AS
BEGIN
	alter table employee
	add login BIT default 'false' NOT NULL
END
EXEC addColumn
