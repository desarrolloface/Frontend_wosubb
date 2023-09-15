# WOSUBB frontend

## APK en carpeta apk listo para desacargar e instalar en un dispositivo android

Solo debe instalarlo en su dispositivo android y estar en la red wifi de la universidad o mediante vpn de la universidad para usar la aplicación.

Tenga en cuenta que debe dar permisos de instalar aplicaciones de terceros en su dispositivo para instalar el apk ya que no se encuentra en
google play

## .aab en carpeta abb listo para subir a google play store

## Primeros pasos para ejecutar codigo del proyecto

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

## Crear APK (Se requiere iniciar sesión a expo.dev con con el correo y contraseña de desarrolloface)

- Comando para iniciar sesión

```bash
eas login
```

- Comando para crear apk

```bash
eas build -p android --profile preview
```

## Si se desea crear .aab debe eliminar archivo eas.json y generar uno nuevo con el siguiente Comando

```bash
eas build:configure
```

- para crear .aab

```bash
eas build
```

- luego debe seleccionar la plataforma Android en el terminal y se generará la el archivo .aab
