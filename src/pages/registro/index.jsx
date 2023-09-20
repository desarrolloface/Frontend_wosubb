import React, {useState} from "react"
import { View, Text, Keyboard, TouchableOpacity, TextInput} from 'react-native';
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
//import { TextInput, Button } from "react-native-paper";
import  styles  from "./styles";
import { Formik } from "formik";
import  {validacionesRegistro}  from "../../utils/validaciones";
import { crearUsuario } from "../../data/usuarios";
import Toast from "react-native-toast-message";
import formatText from "../../utils/modificarPrimeraLetra";
import Icons from '../../../node_modules/@expo/vector-icons/FontAwesome5'

export default function Registro({navigation}) {
 
    const initialValues = {
        nombre: "",
        apellido: "",
        correo: "",
    }

    return (
        <View style={styles.container}>
                      
                {/* atras */}
             <TouchableOpacity style={{flex:1, width: '100%', marginLeft: '8%',marginTop:'17%', justifyContent: 'center'}} onPress={()=> navigation.goBack()}>
                <Icons name="chevron-left" size={18} color='#1c405f'></Icons>
            </TouchableOpacity>
            <Formik
                initialValues={initialValues}
                validationSchema={validacionesRegistro}
                onSubmit={(values) => {
                    Keyboard.dismiss();

                    const body = {
                        nombre: formatText(values.nombre),
                        apellido: formatText(values.apellido),
                        correo: values.correo,
                    }

                    crearUsuario(body).then((res)=>{
                        Toast.show({
                            type: 'success',
                            text1: 'Registro exitoso',
                            text2: 'Tu contraseña ha sido enviada a tu correo electrónico',
                            visibilityTime: 3000,
                            autoHide: true,
                            topOffset: 60,
                        })

                        setRegistro(false);

                    }).catch((err)=>{
                        if(err.response.status === 406){
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'Ya existe una cuenta con el correo ingresado',
                                visibilityTime: 3000,
                                autoHide: true,
                                topOffset: 60,
                            })
                           
                        }else{
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'El correo ingresado no corresponde a un correo institucional',
                                visibilityTime: 3000,
                                autoHide: true,
                                topOffset: 60,
                            })
                        }
                    })
                    
                }}
            >
                {({ handleChange, handleSubmit, values, errors, handleBlur, touched }) => (
                <>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
                    {/* titulo */}
                    <View style={{flex:0.8, alignItems: "center", paddingTop: "5%", paddingBottom: "5%"}}>
                        <Text style={styles.text}>¡Regístrate!</Text>
                    </View>
                    {/* subtitulo */}
                    <View style={{alignItems: "center"}}>
                        <Text style={{fontWeight: 'bold', color: '#1c405f'}}>Introduce tus datos para recibir una contraseña de acceso</Text>
                    </View>
                    {/* inpunt */}
                    <View style={{flex:1,}}>
                        <TextInput
                                  style={styles.textInput}
                                  onBlur={handleBlur('nombre')}
                                  onChangeText={handleChange('nombre')}
                                  value={values.nombre}
                                  placeholder='Nombre' 
                                  >
                        </TextInput>
                        {errors.nombre && touched.nombre ? 
                              (
                                  <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.nombre}</Text>
                                  </View>
                              ):(null)
                        }
                        <TextInput 
                              style={styles.textInput}
                              onBlur={handleBlur('apellido')}
                              value={values.apellido}
                              placeholder="Apellido"
                              onChangeText={handleChange('apellido')}>
                        </TextInput>
                        {errors.apellido && touched.apellido ? 
                              (
                                  <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.apellido}</Text>
                                  </View>
                              ):(null)
                        }
                        <TextInput 
                              onBlur={handleBlur('correo')}
                              style={styles.textInput}
                              value={values.correo}
                              placeholder="Correo"
                              onChangeText={handleChange('correo')}>
                        </TextInput>
                        {errors.correo && touched.correo ? 
                              (
                                  <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.correo}</Text>
                                  </View>
                              ):(null)
                        }
                    </View>
                    </KeyboardAwareScrollView>
                    <View style={{flex:1, margin: '1%', paddingBottom:'6%', paddingTop: '10%'}}>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>Regístrate</Text>
                        </TouchableOpacity>
                    </View>                    
                </>
                )}
            </Formik>
            </View>
        
    )
}