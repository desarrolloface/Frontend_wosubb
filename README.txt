# WOSUBB frontend

## APK en carpeta apk listo para usar

## Primeros pasos

A continuacion se encuentran las intrucciones que permitiran hacer correr el proyecto en su ordenador.

### Prerequisitos

- [Node v18.17.0](https://nodejs.org/es/)

### Instalación

Clonar el repositorio

```bash
git clone https://github.com/desarrolloface/Frontend_wosubb.git
```

Ingresar a la capeta

```bash
cd Frontend_wosubb
```

Agregar la siguiente informacion al env.js

```bash
URL_CONNECT_BACKEND:'' #dirección ip para la conexión con el backend
```

Agregar la siguiente informacion en android\app\src\main\AndroidManifest.xml

```bash
<meta-data android:name="com.google.android.geo.API_KEY" android:value="key aqui"/> #key api google maps
```

Key de google se encuentra en https://console.cloud.google.com/project/_/google/maps-apis/credentials?utm_source=Docs_Credentials&hl=es-419&_gl=1*1q7xbvn*_ga*NDMwNzI1MDUzLjE2OTQ1Mjg5ODA.*_ga_NRWSTWS78N*MTY5NDc4NTY5Ni40LjAuMTY5NDc4NTcwMS4wLjAuMA..

Se deba usar correo y contraseña de desarrollo face para iniciar sesión

Instalar las dependencias

```bash
npm install
```

Iniciar el front

```bash
npx expo start
```

Crear APK (Se requiere iniciar sesión a expo.dev con con el correo y contraseña de desarrolloface)

- Comando para iniciar sesión

```bash
eas login
```

- Comando para crear apk

```bash
eas build -p android --profile preview
```