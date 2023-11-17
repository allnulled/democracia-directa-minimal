CREATE TABLE Usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(255),
    contrasenya VARCHAR(255),
    correo VARCHAR(255)
);

CREATE TABLE Permiso (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(255),
    descripcion VARCHAR(511)
);

CREATE TABLE Permiso_de_usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    id_permiso INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuario (id),
    FOREIGN KEY (id_permiso) REFERENCES Permiso (id)
);

CREATE TABLE Sesion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token VARCHAR(100),
    id_usuario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuario (id)
);

CREATE TABLE Votacion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    presentacion TEXT,
    estado VARCHAR(63),
    fecha_de_presentacion DATETIME,
    fecha_de_problemas DATETIME,
    fecha_de_soluciones DATETIME,
    fecha_de_implementaciones DATETIME,
    fecha_de_aplicaciones DATETIME
);

CREATE TABLE Problema (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(1024),
    descripcion TEXT,
    contenido TEXT,
    id_votacion INTEGER,
    FOREIGN KEY (id_votacion) REFERENCES Votacion (id)
);

CREATE TABLE Solucion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(1024),
    descripcion TEXT,
    contenido TEXT,
    id_votacion INTEGER,
    id_problema INTEGER,
    FOREIGN KEY (id_votacion) REFERENCES Votacion (id),
    FOREIGN KEY (id_problema) REFERENCES Problema (id)
);

CREATE TABLE Implementacion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(1024),
    descripcion TEXT,
    contenido TEXT,
    procedimiento TEXT,
    id_votacion INTEGER,
    id_problema INTEGER,
    id_solucion INTEGER,
    FOREIGN KEY (id_votacion) REFERENCES Votacion (id),
    FOREIGN KEY (id_problema) REFERENCES Problema (id),
    FOREIGN KEY (id_solucion) REFERENCES Solucion (id)
);

CREATE TABLE Voto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_votacion INTEGER,
    id_problema INTEGER,
    id_solucion INTEGER,
    id_implementacion INTEGER,
    id_usuario INTEGER,
    sentido VARCHAR(1),
    FOREIGN KEY (id_votacion) REFERENCES Votacion (id),
    FOREIGN KEY (id_problema) REFERENCES Problema (id),
    FOREIGN KEY (id_solucion) REFERENCES Solucion (id),
    FOREIGN KEY (id_implementacion) REFERENCES Implementacion (id),
    FOREIGN KEY (id_usuario) REFERENCES Usuario (id)
);

CREATE TABLE Ley (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descripcion TEXT,
    contenido TEXT,
    id_implementacion INTEGER,
    FOREIGN KEY (id_implementacion) REFERENCES Implementacion (id)
);