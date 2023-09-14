# WOSUBB frontend

## Construido con

- [React Native](https://reactnative.dev/)
- [Javascript](https://www.javascript.com/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Formik](https://formik.org/)

## APK en carpeta apk

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

Instalar las dependencias

```bash
npm install
```

Iniciar el front

```bash
npx expo start
```

Crear APK (Se requiere iniciar sesión a expo.dev con con el mismo correo y contraseña de esta cuenta de github)

- Comando para iniciar sesión

```bash
eas login
```
- Comando para crear apk

```bash
eas build -p android --profile preview
```

- Si se quiere publicar en Play Store no se debe crear un apk, si no que un archivo .aab, para esto se debe borrar el archivo eas.js y realizar el siguiente comando

```bash
eas build:configure
```
- Esto realizara un nuevo archivo eas.js, con este nuevo archivo ya se puede crear un archivo .aab para subir a Play Store

```bash
eas build --profile android
```
