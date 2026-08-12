DevAuth2026!Cloud#Db



🚀 Probar que todo funciona:

1 Para iniciar tu servidor backend Express:



bash

npm run dev



2 Para abrir la interfaz visual de tu base de datos:

(Verás: 🚀 Servidor escuchando en http://localhost:3000)



bash

npx prisma studio


|Comando	|¿Para qué sirve?|
|-|-|
|npx prisma studio|Ver y editar visualmente los datos de la base de datos.|
|npx prisma db push|Actualizar la estructura de las tablas en Supabase si editas schema.prisma.|
|npm run dev|	Iniciar tu servidor Backend Express en desarrollo.|


npx prisma migrate dev --name init_users // Aplica los cambios a la base de datos y guarda un historial de migraciones

npx prisma db push //Sincroniza los cambios directamente con la base de datos sin guardar historial de migraciones (útil para pruebas muy rápidas).


# comando para crear un archivo TS
touch src/carpetas/archivos.ts
ejemplo
touch src/middlewares/auth.middleware.ts


# Crear carpetas de controladores y rutas
mkdir -p carpeta/subcarpeta1/subcarpeta2/
ejemplo
mkdir -p src/controllers src/routes

# comando para correr el proyecto
npm run dev