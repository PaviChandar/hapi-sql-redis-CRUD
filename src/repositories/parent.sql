create table parent (
	id int,
	parent_name varchar(50),
	age int,
	relation varchar(50),
	salary int
)
insert into parent values(1, 'Saravanan', 50, 'Father', 40000)
insert into parent values(2, 'Deepa', 40, 'Mother', 33000)
insert into parent values(3, 'Suresh', 55, 'Father', 45500)


CREATE PROCEDURE relation
AS
BEGIN
	SELECT e.name, e.city, p.parent_name, p.relation FROM employee AS e INNER JOIN parent AS p ON e.id = p.id
END