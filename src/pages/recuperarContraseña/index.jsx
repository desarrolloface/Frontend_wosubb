import React from "react"
import { View, Text, Keyboard, TouchableOpacity, TextInput } from "react-native"
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styles from "./styles"
import {recuperarContrasena} from "../../data/usuarios"
import  {validacionCorreo}  from "../../utils/validaciones";
import { Formik } from "formik"
import Toast from 'react-native-toast-message';
import Icons from '../../../node_modules/@expo/vector-icons/FontAwesome5'

export default function RecuperarContra({navigation}) {

    const initialValues = {
        correo: ""
    }

    return (
        <View style={styles.container}>
            
                {/* atras */}
             <TouchableOpacity style={{flex:0.2, width: '100%', marginLeft: '8%',marginTop:'17%', justifyContent: 'center'}} onPress={()=> navigation.goBack()}>
                <Icons name="chevron-left" size={18} color='#1c405f'></Icons>
            </TouchableOpacity>
            <Formik
                initialValues={initialValues}
                validationSchema={validacionCorreo}
                onSubmit={(values) => {
                    Keyboard.dismiss();
                    recuperarContrasena(values).then((res)=>{
                        Toast.show({
                            type: 'success',
                            text1: 'Se envio tu contraseña a tu correo',
                            visibilityTime: 3000,
                        });
                       
                    }).catch((err)=>{
                        if(err.response.status === 400){
                            Toast.show({
                                type: 'error',
                                text1: 'El correo ingresado no le pertenece a la universidad',
                                visibilityTime: 3000,
                            });
                        }else{
                            Toast.show({
                                type: 'error',
                                text1: 'No se encontró cuenta asociada al correo ingresado',
                                visibilityTime: 3000,
                                
                             })
                        }
                    })
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        
                        <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
                        {/* titulo */}
                        <View style={{flex:0.2, alignItems: "center", paddingTop: "10%", paddingBottom: "17%"}}>
                            <Text style={styles.text}>Recuperar contraseña</Text>
                        </View>
                        {/* subtitulo */}
                        <View style={{alignItems: "center"}}>
                            <Text style={{fontWeight: 'bold', color:'#1c405f'}}>Ingresa el correo con el que te registraste</Text>
                        </View>
                        {/* inpunt */}
                        <View style={{flex:1, paddingTop: "3%"}}>
                            <TextInput 
                                style={styles.textInput}
                                onBlur={handleBlur('correo')}
                                onChangeText={handleChange('correo')}
                                value={values.correo}
                                placeholder='Correo' >
                            </TextInput>
                            {errors.correo && touched.correo ? 
                                (
                                    <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.correo}</Text>
                                    </View>
                                ):(null)
                             }
                        </View>
                        {/* espacio */}
                        <View style={{flex:1}}></View>
                        </KeyboardAwareScrollView>
                        {/* boton */}
                        <View style={{flex:0.5,marginTop: '5%'}}>
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Recuperar contraseña</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>     
            
        </View>
    )
}
