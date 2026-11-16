CREATE DATABASE IF NOT EXISTS cafeteria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cafeteria;

DROP TABLE IF EXISTS contactos, precios, fotos, nosotros, especialidades, servicios, inicio;

CREATE TABLE inicio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(120) NOT NULL,
  subtitulo VARCHAR(255) NOT NULL,
  video_url VARCHAR(500) NOT NULL,
  poster_url VARCHAR(500)
);

CREATE TABLE servicios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT NOT NULL,
  icono VARCHAR(10),
  imagen VARCHAR(500)
);

CREATE TABLE especialidades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT NOT NULL,
  especialista VARCHAR(120),
  imagen VARCHAR(500)
);

CREATE TABLE nosotros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  historia TEXT NOT NULL,
  mision TEXT,
  direccion VARCHAR(255) NOT NULL,
  telefono VARCHAR(30) NOT NULL,
  email VARCHAR(120) NOT NULL,
  horario VARCHAR(160) NOT NULL,
  fundador_nombre VARCHAR(120),
  fundador_cita TEXT,
  fundador_foto VARCHAR(500)
);

CREATE TABLE fotos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(500) NOT NULL,
  descripcion VARCHAR(160)
);

CREATE TABLE precios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  categoria VARCHAR(60) NOT NULL,
  servicio VARCHAR(120) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  detalle VARCHAR(255)
);

CREATE TABLE contactos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL,
  telefono VARCHAR(30),
  mensaje TEXT NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO inicio (titulo, subtitulo, video_url, poster_url) VALUES
('Café Luchito', 'Café de especialidad tostado en casa con granos de los Yungas. Ven por tu taza favorita.', 'https://videos.pexels.com/video-files/7487668/7487668-hd_1920_1080_24fps.mp4', '/img/hero.jpg');

INSERT INTO servicios (nombre, descripcion, icono, imagen) VALUES
('Cafetería en sala', 'Ambiente cálido con wifi, enchufes y música tranquila para trabajar o conversar.', '☕', '/img/cafe.jpg'),
('Para llevar', 'Pide en barra o por WhatsApp y recoge tu bebida sin hacer fila.', '🥤', '/img/iced-latte.jpg'),
('Delivery', 'Llevamos tu café y postres a domicilio en la zona Sur y Sopocachi.', '🛵', '/img/window.jpg'),
('Venta de grano', 'Café en grano o molido al momento según tu método de preparación.', '🫘', '/img/beans-bag.jpg'),
('Catering y eventos', 'Barra de café para reuniones, cumpleaños y eventos de empresa.', '🎉', '/img/cheers.jpg'),
('Talleres de barismo', 'Clases de latte art y métodos de filtrado los sábados.', '🎓', '/img/prep.jpg');

INSERT INTO especialidades (nombre, descripcion, especialista, imagen) VALUES
('Espresso de la casa', 'Blend de los Yungas con notas a chocolate y caramelo.', 'Barista: Diego Mamani', '/img/espresso.jpg'),
('Cappuccino', 'Espresso doble con leche texturizada y latte art.', 'Barista: Valeria Choque', '/img/cappuccino.jpg'),
('Flat White', 'Más café y menos leche, sabor intenso y suave.', 'Barista: Diego Mamani', '/img/flat-white.jpg'),
('Cold Brew', 'Infusión en frío por 18 horas, refrescante y poco ácida.', 'Barista: Andrea Flores', '/img/cold-brew.jpg');

INSERT INTO nosotros (nombre, historia, mision, direccion, telefono, email, horario, fundador_nombre, fundador_cita, fundador_foto) VALUES
('Café Luchito', 'Empezamos en 2018 con una pequeña barra en Sopocachi y una tostadora de 1 kg. Hoy tostamos nuestro propio café traído directamente de productores de Caranavi y servimos a más de 300 clientes por día.', 'Servir café de especialidad boliviano con calidad y apoyar a los productores locales.', 'Av. 20 de Octubre #2215, Sopocachi, La Paz - Bolivia', '+591 2 2415566', 'hola@cafeluchito.bo', 'Lunes a sábado 7:30 a 21:00. Domingos 9:00 a 14:00', 'Luis Ángel "Luchito" Hurtado', 'Abrí Café Luchito para que cada taza cuente la historia de los productores de los Yungas. Aquí el café se toma con calma y se comparte con amigos.', '/img/fundador.jpg');

INSERT INTO fotos (url, descripcion) VALUES
('/img/cafe.jpg', 'Nuestra sala'),
('/img/roast.jpg', 'Tostado artesanal'),
('/img/beans.jpg', 'Granos de Caranavi'),
('/img/prep.jpg', 'Barra de preparación'),
('/img/window.jpg', 'Vista a la calle'),
('/img/latte.jpg', 'Latte art');

INSERT INTO precios (categoria, servicio, precio, detalle) VALUES
('Bebidas calientes', 'Espresso', 12, 'Simple o doble'),
('Bebidas calientes', 'Americano', 14, '8 oz'),
('Bebidas calientes', 'Cappuccino', 18, '8 oz con latte art'),
('Bebidas calientes', 'Latte', 20, '12 oz, leche entera o de almendra'),
('Bebidas calientes', 'Flat White', 20, '8 oz'),
('Bebidas frías', 'Cold Brew', 22, '12 oz con hielo'),
('Bebidas frías', 'Iced Latte', 22, '12 oz'),
('Bebidas frías', 'Frappé de moca', 25, '16 oz con crema'),
('Para acompañar', 'Cheesecake de maracuyá', 24, 'Porción'),
('Para acompañar', 'Croissant de mantequilla', 15, 'Recién horneado'),
('Para acompañar', 'Sándwich de jamón y queso', 22, 'En pan de masa madre'),
('Para llevar a casa', 'Café en grano 250 g', 65, 'Tostado de la semana'),
('Para llevar a casa', 'Café molido 500 g', 120, 'Molienda a pedido');
