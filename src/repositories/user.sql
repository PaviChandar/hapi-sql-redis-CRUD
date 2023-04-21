CREATE TABLE Users
(
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	username NVARCHAR(50) NOT NULL,
	email NVARCHAR(100) NOT NULL,
	passwordhash BINARY(64) NOT NULL
)



CREATE PROCEDURE insertUser
(
@iUsername nvarchar(50),
@iEmail nvarchar(100),
@iPassword nvarchar(100)
)
AS
BEGIN
	INSERT INTO Users(username,email,userpassword)
	VALUES (@iUsername, @iEmail, @iPassword)
END

EXEC insertUser @iUsername = 'sample1', @iEmail = 'sample1@gmail.com', @iPassword = 'sample1234'




CREATE PROCEDURE loginUser
	@lemail varchar(100)
AS
BEGIN
	IF EXISTS(select email from Users where email = @lemail)
		BEGIN
			select username,email,userpassword,passwordhash from Users where email = @lemail
		END
	ELSE
		BEGIN
			PRINT 'Cant login'
		END
END	

EXEC loginUser @lemail = 'snehasaravana@gmail.com'
EXEC loginUser @lemail = 'pavi@gmail.com'