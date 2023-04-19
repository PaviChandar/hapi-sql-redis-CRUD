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
	INSERT INTO Users(username,email,passwordhash)
	VALUES (@iUsername, @iEmail, HASHBYTES('SHA2_512',@iPassword))
END

EXEC insertUser @iUsername = 'Sneha', @iEmail = 'snehasaravana@gmail.com', @iPassword = 'sneha0612'
EXEC insertUser @iUsername = 'Mira', @iEmail = 'mirashankar@gmail.com', @iPassword = 'mira3010'