import React,{useState,useRef, useEffect} from "react";
import { View, Text, Keyboard, TouchableOpacity, TextInput } from "react-native";
import styles from "./styles";
import { Button, Dialog, Portal, Provider, } from 'react-native-paper'
import {validacionCorreo} from "../../utils/validaciones"
import {modificarTipoUsuario} from "../../data/usuarios"
import {useSelector} from "react-redux"
import { Formik } from "formik";
import Toast  from "react-native-toast-message";
import Icons from '@expo/vector-icons/FontAwesome5';
import {Check}  from 'lucide-react-native';
export default function ModificarTipos({navigation, setIsVisible,socket}){
    const [valorSeleccionado, setValorSeleccionado] = useState("Usuario");
    const [modal, setModal] = useState(false)
    const usuario = useSelector(state => state.usuario.usuario)

    const initialValues = {
        correo: ""
    }

    const pickerRef = useRef();

    function open() {
    pickerRef.current.focus();
    }

    function close() {
    pickerRef.current.blur();
    }
    
    useEffect (()=>{
        console.log(valorSeleccionado)
    }, [valorSeleccionado, setValorSeleccionado])
    return (
        <View style={styles.containerModificarTipos}>
            {/* ekis */}
            <Provider >
            <View style={{height: '13%', width: '100%', flexDirection: 'row'}}>
                <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', marginRight: '55%', alignItems: 'center'}} onPress={()=>{setIsVisible(false)}}>
                    <Icons name="chevron-left" size={20} color='#ffffff'></Icons>
                </TouchableOpacity>
                
                <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', alignItems: 'center'}} onPress={()=>{navigation.navigate("Home")}}>
                    <Icons name="times" size={20} color='#ffffff'></Icons>
                </TouchableOpacity>
            </View>
            
            <View style={styles.modificarTipos}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validacionCorreo}
                    onSubmit={(values) => {
                        Keyboard.dismiss();
                        if(values.correo.toLowerCase() !== usuario.correo.toLowerCase()){
                            const body = {
                                correo: values.correo,
                                tipo: valorSeleccionado
                            }
    
                            modificarTipoUsuario(body).then(async (result) => {
                                
                                Toast.show({
                                    type: "success",
                                    text1: "Usuario modificado con éxito.",
                                    visibilityTime: 3000,
                                    autoHide: true,
                                    topOffset: 60,
                                });
    
                                await socket.emit("cambioTipo", body)
                                setModal(true);
                                /* setIsVisible(false); */
                                
                            }).catch((err) => {
                                if(err.response.status === 404){
                                    Toast.show({
                                        type: "error",
                                        text1: "El usuario no existe.",
                                        visibilityTime: 3000,
                                        autoHide: true,
                                        topOffset: 60,
                                    });
                                }else{
                                    
                                    Toast.show({
                                        type: "info",
                                        text1: "El usuario ya posee ese tipo.",
                                        visibilityTime: 3000,
                                        autoHide: true,
                                        topOffset: 60,
                                    });
                                }
                            });
                        }else{
                            Toast.show({
                                type: "error",
                                text1: "No puedes modificar tu propio tipo de usuario.",
                                visibilityTime: 3000,
                                autoHide: true,
                                topOffset: 60,
                            }); 
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>  
                            
                            <View style={styles.containerTitle}>
                                <Text style={styles.title}>Modificar tipo de usuario</Text>
                            </View>
                            <View style={styles.modificarTipos} keyboardShouldPersistTaps="always" >
                                <View style={styles.containerSelect}>
                                    <TouchableOpacity style={[styles.botonUsuario, valorSeleccionado === "Usuario" ? {backgroundColor: "#ffffff"}:({backgroundColor: "#4D79C8"})]} onPress={()=>{setValorSeleccionado("Usuario")}}>
                                        <Text style={[{fontWeight: 'bold'}, valorSeleccionado === "Usuario" ? {color:'#0140B1'}:({color:'#ffffff'})]}>Usuario</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.botonAdmin, valorSeleccionado === "Administrador" ? {backgroundColor: "#ffffff"}:({backgroundColor: "#4D79C8"})]} onPress={()=>{setValorSeleccionado("Administrador")}}>
                                        <Text style={[{fontWeight: 'bold'}, valorSeleccionado === "Administrador" ? {color:'#0140B1'}:({color:'#ffffff'})]}>Administrador</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.containerInputCorreo}>
                                    <View style={styles.inputCorreo}>
                                    <TextInput
                                        style={{marginLeft: '5%', color:'#ffffff'}}
                                        placeholder='Correo' 
                                        placeholderTextColor='#ffffff' 
                                        onChangeText={handleChange('correo')}
                                        onBlur={handleBlur('correo')}
                                        value={values.correo}
                                        maxLength={50}
                                    />
                                    </View>
                                    {errors.correo && touched.correo ? 
                                            (
                                                <View style={styles.containerError}>
                                                    <Text style={styles.textoError} >{errors.correo}</Text>
                                                </View>
                                            ):(null)
                                    }
                                </View>
                            </View>
                            
                            <View style={styles.containerBotonModificar}>
                                <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                                    <Text style={{color: '#0140b1', fontWeight: 'bold'}}>Modificar </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 1}}></View>
                        </>
                    )}
                </Formik>
            </View>
            <Portal>
                <Dialog style={{backgroundColor: "white"}} visible={modal} onDismiss={()=>{setIsVisible(false)}}>
                    <Dialog.Content style={{ flex:1,width: '100%', justifyContent: "center", alignItems: 'center', paddingBottom: '20%', paddingTop: '15%'}}>
                        <View style={{width: '13%',
                            height: '15%',
                            padding :'15%',
                            marginTop: '6%',
                            justifyContent: "center",
                            backgroundColor: '#5FC14D',
                            alignItems: 'center',
                            borderRadius: 100,}}>
                            <Check size={40} color='#ffffff'></Check>
                        </View>   
                        </Dialog.Content>   
                        <Dialog.Content style={styles.containerAlertaCerrarSesion}>
                            <Text style={styles.textoAlertaCerrarSesion}>¡Los cambios se han</Text>
                            <Text style={styles.textoAlertaCerrarSesion}>realizado con éxito!</Text>
                        </Dialog.Content>
                        <Dialog.Actions style={{justifyContent: 'center', alignItems:'center'}}>
                        <Button style={styles.BotonSi} onPress={()=>{setIsVisible(false)}}><Text style={{color: "#ffffff",}}>OK</Text></Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </Provider> 
        </View>
    )

    
}
