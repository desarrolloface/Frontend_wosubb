import React,{useState} from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styles from "./styles"
import {modificarContrasena} from "../../data/usuarios"
import  {validacionModificarContrasena}  from "../../utils/validaciones";
import { Formik } from "formik"
import Toast from 'react-native-toast-message';
import { useSelector } from "react-redux";
import Icons from '@expo/vector-icons/FontAwesome5';

export default function ModificarContraseña({navigation, setIsVisible}) {
    const [visibleContraActual, setVisibleContraActual] = useState(false)
    const [visibleContraNueva, setVisibleContraNueva] = useState(false)
    const [visibleVerificacionContra, setVisibleVerificacionContra] = useState(false)
    const usuario = useSelector(state => state.usuario.usuario)

    const initialValues = {
        contrasenaActual: "",
        contrasenaNueva: "",
        verificacionContrasena: ""
    }

    return (
        <View style={styles.containerModificarContraseña}>
            <View style={{height: '13%', width: '100%', flexDirection: 'row'}}>
                <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', marginRight: '55%', alignItems: 'center'}} onPress={()=>{setIsVisible(false)}}>
                    <Icons name="chevron-left" size={20} color='#ffffff'></Icons>
                </TouchableOpacity>
                
                <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', alignItems: 'center'}} onPress={()=>{navigation.navigate("Home")}}>
                    <Icons name="times" size={20} color='#ffffff'></Icons>
                </TouchableOpacity>
            </View>
            <View style={styles.modificarContraseña}>
            <Formik
                initialValues={initialValues}
                validationSchema={validacionModificarContrasena}
                onSubmit={(values) => {

                    const body = {
                        id: usuario.id,
                        contrasenaNueva: values.contrasenaNueva,
                        contrasenaActual: values.contrasenaActual
                    }
                    
                    modificarContrasena(body).then((result) => { 
                        Toast.show({
                            type: 'success',
                            position: 'Top',
                            text1: 'La contraseña fue modificada.',
                            visibilityTime: 3000,
                            topOffset: 60,
                        })

                        setIsVisible(false);
                    }).catch((err) => {
                       if(err.response.status === 400){
                            Toast.show({
                                type: 'error',
                                position: 'Top',
                                text1: 'La contraseña actual no es correcta.',
                                visibilityTime: 3000,
                                topOffset: 60,
                            })
                       }
                    }); 
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>Modificar contraseña</Text>
                        </View>
                        <KeyboardAwareScrollView style={{height: 300, marginTop: '10%', width:'100%'}}  keyboardShouldPersistTaps="always">
                            <View style={styles.textInput}>
                                <TextInput 
                                    placeholder='Contraseña Actual' 
                                    placeholderTextColor='#ffffff' 
                                    style={{flex: 3, color:'#ffffff'}}
                                    onBlur={handleBlur('contrasenaActual')}
                                    onChangeText={handleChange('contrasenaActual')}
                                    value={values.contrasenaActual}
                                    secureTextEntry={!visibleContraActual}
                                ></TextInput>
                                <TouchableOpacity style={{flex: 0.5, justifyContent: 'center'}} onPress={()=>{setVisibleContraActual(!visibleContraActual)}}>
                                    <Icons name="eye" size={20} color='#ffffff'></Icons>
                                </TouchableOpacity> 
                            </View>
                            {errors.contrasenaActual && touched.contrasenaActual ? 
                                (
                                    <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.contrasenaActual}</Text>
                                    </View>
                                ):(null)
                             }
                            <View style={styles.textInput}>
                                <TextInput 
                                    placeholder='Contraseña Nueva' 
                                    placeholderTextColor='#ffffff' 
                                    style={{flex: 3, color:'#ffffff'}}
                                    onBlur={handleBlur('contrasenaNueva')}
                                    onChangeText={handleChange('contrasenaNueva')}
                                    value={values.contrasenaNueva}
                                    secureTextEntry={!visibleContraNueva}
                                    >
                                </TextInput>
                                
                                <TouchableOpacity style={{flex: 0.5, justifyContent: 'center'}} onPress={()=>{setVisibleContraNueva(!visibleContraNueva)}}>
                                    <Icons name="eye" size={20} color='#ffffff'></Icons>
                                </TouchableOpacity>
                            </View>
                            {errors.contrasenaNueva && touched.contrasenaNueva ?
                                (
                                    <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.contrasenaNueva}</Text>
                                    </View>
                                ):(null)
                             }
                            <View style={styles.textInput}>
                                <TextInput 
                                    placeholder='Verificación de Contraseña' 
                                    placeholderTextColor='#ffffff' 
                                    style={{flex: 3, color:'#ffffff'}}
                                    onBlur={handleBlur('correo')}
                                    onChangeText={handleChange('verificacionContrasena')}
                                    value={values.verificacionContrasena}
                                    secureTextEntry={!visibleVerificacionContra}
                                    >
                                </TextInput>
                                <TouchableOpacity style={{flex: 0.5, justifyContent: 'center'}} onPress={()=>{setVisibleVerificacionContra(!visibleVerificacionContra)}}>
                                    <Icons name="eye" size={20} color='#ffffff'></Icons>
                                </TouchableOpacity>
                            </View>
                            {errors.verificacionContrasena && touched.verificacionContrasena ?
                                (
                                    <View style={styles.containerError}>
                                        <Text style={styles.textoError}>{errors.verificacionContrasena}</Text>
                                    </View>
                                ):(null)
                             }                        
                        </KeyboardAwareScrollView>
                       
                        {/* </KeyboardAwareScrollView> */}
                        <View style={{flex:2, width: '100%', marginTop: '10%', paddingBottom: '15%'}}>
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={{fontWeight: 'bold', color: '#0140b1'}}>Modificar contraseña</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:2}}></View> 
                    </>
                )}
            </Formik>     
            </View>
        </View>
    )
}
