# Movie App

## Descripción

Este proyecto es una aplicación web desarrollada en Angular que permite a los usuarios explorar una lista de películas, agregar las que les interesan a una watchlist y consultar más detalles sobre cada película. La información se obtiene de la API de [TMDB](https://developers.themoviedb.org/3).

### Problema a resolver
El objetivo es proporcionar una interfaz atractiva e intuitiva para que los usuarios puedan:
- Navegar por una lista de películas con portada y sinopsis.
- Consultar más detalles sobre cada película.
- Agregar o quitar películas a su watchlist (requiere iniciar sesión).
- Ver y gestionar su lista de películas marcadas para ver más tarde (requiere iniciar sesión).

## Funcionalidades Principales

### 1. Vistas

#### Home
- Lista de películas disponibles con scroll infinito, cargando más al llegar al final.
- Películas ordenadas por calificación (mejor evaluadas primero).
- Cada película incluye un botón para agregarla o quitarla de la watchlist.
- Las películas son clickables para mostrar más detalles.
- Las imágenes se cargan solo cuando son visibles en pantalla (lazy loading).

#### Watchlist (Requiere inicio de sesión)
- Lista de películas agregadas a la watchlist, ordenadas por fecha de adición y calificación como segundo criterio.
- Solo está disponible para usuarios registrados e iniciados en la sesión.
- Posibilidad de eliminar películas de la watchlist.
- Detalles de cada película disponibles con un clic.
- Botón "Iniciar Sesión" si no hay un usuario autenticado.

#### Detalles de Películas
- Cada película tendrá su propia página de detalles, accesible desde la vista principal o la watchlist.
- Los detalles incluirán una sinopsis ampliada, el reparto, la fecha de lanzamiento, el género, y la calificación.
- Botón para agregar o quitar la película de la watchlist (requiere inicio de sesión).
- Posibilidad de regresar a la vista anterior sin perder la posición en la lista.

#### Búsqueda
- Función de búsqueda para encontrar películas por título.
- Los resultados de búsqueda muestran las películas que coinciden con el criterio ingresado, ordenadas por relevancia.
- Cada película en los resultados también será clickable para ver los detalles.
- Los resultados incluyen la posibilidad de agregar o quitar películas a la watchlist (requiere inicio de sesión).

### 2. Rutas
- La aplicación contiene rutas específicas para cada vista:
  - `/home`: Para la lista de películas.
  - `/watchlist`: Para la lista de películas guardadas (requiere inicio de sesión).
  - `/movie/:id`: Para los detalles de cada película.
  - `/search`: Para mostrar los resultados de búsqueda.

### 3. Autenticación
- Es necesario que los usuarios se registren y autentiquen para acceder a la *watchlist*.
- La autenticación permite guardar la lista de películas asociada a cada usuario.

## Requisitos del Sistema

- **Node.js** (versión especificada en `.nvmrc`)
- **Angular CLI** (versión recomendada: 13 o superior)
- Una clave de API de [TMDB](https://developers.themoviedb.org/3) para acceder a los datos de las películas.


# Requisitos del Sistema

- **Node.js** (versión especificada en .nvmrc)
- **Angular CLI** (versión recomendada: 14 o superior)
- Una clave de **API de TMD**B para acceder a los datos de las películas.

## Instalación
### Clonar este repositorio:

```bash
git clone https://github.com/tu-usuario/movie-app.git
cd movie-app
```

### Instalar dependencias:

```bash
npm install
```

### Configurar la clave de la API de TMDB:

1. Crea una cuenta en [TheMovieDB](https://www.themoviedb.org).
2. Sigue los pasos para la creación de tu clave de API en la página de [TheMovieDB - Getting Started](https://developers.themoviedb.org/3/getting-started/introduction).
3. Una vez que tengas tu clave, agrégala en el archivo `src/environments/environment.ts` en la sección `apiKey` de la siguiente manera:


```typescript
export const environment = {
  production: false,
  apiKey: 'TU_API_KEY',
  appUrl: 'https://tu-app.com'
};
```

Si tienes nvm instalado, asegúrate de usar la versión de Node especificada en el archivo .nvmrc:

```bash 
nvm use
```

Si no tienes nvm instalado, asegúrate de usar una versión de Node compatible (recomendamos Node.js 14 o superior). Puedes verificar y cambiar la versión con los siguientes comandos:

```bash
node -v
nvm install 14  # Si necesitas instalar Node 14
```

### Ejecutar la aplicación en modo desarrollo:

```bash
ng serve
```

La aplicación estará disponible en http://localhost:4200.

## Tecnologías Utilizadas
- Framework: Angular 14
- Bootstrap 4
- Librerías adicionales:
    - Angular Router (para gestión de rutas)
    - Lazy Loading (para optimización de imágenes)