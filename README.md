![Henry Logo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# Proyecto Individual: POKEMON

## Índice

- [Proyecto Individual: POKEMON](#proyecto-individual-pokemon)
  - [Índice](#índice)
  - [Introducción](#introducción)
  - [Objetivos](#objetivos)
  - [Duración](#duración)
  - [Funcionalidades Principales](#funcionalidades-principales)
  - [Estructura del Proyecto](#estructura-del-proyecto)
    - [Cliente (Frontend)](#cliente-frontend)
    - [API (Backend)](#api-backend)
  - [Instrucciones de Instalación y Ejecución](#instrucciones-de-instalación-y-ejecución)
  - [Herramientas y Tecnologías Utilizadas](#herramientas-y-tecnologías-utilizadas)
  - [Agradecimientos](#agradecimientos)
  - [Licencia](#licencia)

## Introducción

Este proyecto fue desarrollado como parte del bootcamp de Henry, con el objetivo de construir una aplicación web que permita a los usuarios interactuar con la data de Pokémon a través de la [PokeAPI](https://pokeapi.co/). Este proyecto pone a prueba las habilidades adquiridas en React, Redux, Node, Express y Sequelize, implementando prácticas de diseño y desarrollo web moderno.

## Objetivos

- Construir una Single Page Application (SPA) utilizando React para el frontend y Node junto con Express en el backend.
- Utilizar Sequelize como ORM para interactuar con la base de datos PostgreSQL.
- Implementar Redux para manejar el estado de la aplicación.
- Diseñar e implementar una interfaz de usuario amigable y accesible.
- Integrar pruebas de software para asegurar la calidad y funcionalidad de la aplicación.
- Practicar y mejorar el flujo de trabajo utilizando GIT.

## Duración

El proyecto tiene una duración máxima de tres semanas, comenzando con un Kick-Off y finalizando con una presentación demostrativa del trabajo realizado.

## Funcionalidades Principales

- **Buscar Pokémons**: Permite a los usuarios buscar pokémons por nombre o ID a través de la PokeAPI.
- **Visualización de Información**: Los usuarios pueden ver detalles específicos de cada pokémon, incluyendo estadísticas, habilidades y más.
- **Filtrado y Ordenado**: La aplicación ofrece opciones para filtrar pokémons por tipo, habilidades, entre otros, además de ordenarlos según diferentes criterios.
- **Creación de Pokémons**: Los usuarios pueden añadir nuevos pokémons a la base de datos, completando un formulario con la información requerida.

## Estructura del Proyecto

El proyecto se divide en dos partes principales: el **cliente** (frontend) y la **API** (backend), cada uno con su propia estructura de carpetas y archivos necesarios para su funcionamiento.

### Cliente (Frontend)

Desarrollado con React y Redux, implementa llamadas a la API para mostrar y gestionar los datos de pokémons. Incluye componentes para la búsqueda, filtrado, visualización y creación de pokémons.

### API (Backend)

Construido con Node, Express y Sequelize. Se encarga de interactuar con la base de datos PostgreSQL para realizar operaciones CRUD sobre los pokémons, además de servir los datos necesarios al cliente.

## Instrucciones de Instalación y Ejecución

1. **Clonar el repositorio**:

```bash
  git clone https://github.com/Thayrov/PI-Pokemon.git
```

2. **Instalación de dependencias**:

- Backend (API):
  ```
  cd api
  npm install
  ```
- Frontend (Cliente):
  ```
  cd client
  npm install
  ```

## Herramientas y Tecnologías Utilizadas

- Frontend: React, Redux, Vite, Styled Components
- Backend: Node.js, Express, Sequelize, PostgreSQL
- Testing: Jest
- Otros: ESLint, Babel, Axios

## Agradecimientos

Quisiera expresar mi gratitud a los creadores de los siguientes CodePen, cuyas ideas e implementaciones fueron una fuente de inspiración para el desarrollo de componentes en este proyecto:

- [Loader Animation by rss](https://codepen.io/rss/pen/nyVddp)
- [Pikachu CSS Art by lichin-lin](https://codepen.io/lichin-lin/pen/ZOoGvx)
- [Pure CSS Pokeball by kai-wu](https://codepen.io/kai-wu/pen/xxKgzdr)
- [CSS Loader by trulymittal](https://codepen.io/trulymittal/pen/LMOJWv)

## Licencia

Este proyecto está bajo la licencia MIT. Consulte el archivo [LICENSE](LICENSE) para obtener más detalles.
