# WOSUBB frontend

## Construido con

- [React Native](https://reactnative.dev/)
- [Javascript](https://www.javascript.com/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Formik](https://formik.org/)

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
expo start
```

Crear APK

```bash
eas build -p android --profile preview
```
