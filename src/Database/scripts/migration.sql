INSERT INTO Usuario (nombre, contrasenya) VALUES ('admin', 'admin');
INSERT INTO Usuario (nombre, contrasenya) VALUES ('noadmin', 'noadmin');
INSERT INTO Permiso (nombre, descripcion) VALUES ('permiso de administración', 'Permiso global de administración de la aplicación');
INSERT INTO Permiso_de_usuario (id_permiso, id_usuario) VALUES (1, 1);