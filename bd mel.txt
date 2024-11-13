Create Table Usuarios(
	userId int primary key,
	email varchar(100) not null,
	username varchar(100) ,
	passwd varchar(100) ,
	)

Create table Proyectos(
	projectId int primary key,
	projectName varchar(100) not null,
	total decimal(10,2),
	usuarioId int,
	fechaInicio date,
	foreign key (usuarioId) references Usuarios(userId) on delete cascade,
	)

Create table Gastos(
	gastoId int primary key,
	descripcion varchar(250),
	subtotal decimal(10,2),
	fecha date,
	proyectoId int,
	foreign key (proyectoId) references Proyectos(projectId) on delete cascade
)

CREATE TABLE usuarios_gastos (
    usuario_id INT,
    gasto_id INT,
    porcentaje_contribuido int,
    PRIMARY KEY (usuario_id, gasto_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(userId) ON DELETE CASCADE,
    FOREIGN KEY (gasto_id) REFERENCES Gastos(gastoId) ON DELETE CASCADE
);

/*supongo q esta tabla no es necesaria (TABLA MIEMBROSPROYECTOS)*/
CREATE TABLE miembrosProyectos(
	miembro_id int primary key,
	id_proyecto  int, 
	id_usuario int,
	porcentaje_participacion decimal(10,2),
	FOREIGN KEY (id_proyecto) REFERENCES Proyectos(projectId) ON DELETE CASCADE,
	FOREIGN KEY (id_usuario) REFERENCES Usuarios(userId) ON DELETE CASCADE
);

CREATE TABLE tickets(
	id_ticket int primary key,
	id_proyecto int, 
	url_img varchar(100),
	fecha Date,
	descripcion varchar(250),
	monto decimal(10,2),
	FOREIGN KEY (id_proyecto) REFERENCES Proyectos(projectId) ON DELETE CASCADE,
)