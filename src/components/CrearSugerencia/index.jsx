import React,{useState} from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import styles from "./styles"
import {crearSugerencia} from "../../data/sugerencias"
import {useSelector} from "react-redux"
import Toast from 'react-native-toast-message';
import {validacionSugerencia} from "../../utils/validaciones"
import {Formik} from "formik";
import Cargando from "../Cargando"
import formatText from "../../utils/modificarPrimeraLetra"
import Icons from '@expo/vector-icons/FontAwesome5';

export default function ModalSugerencia({setModalSugerencia,socket, navigation}){
    const [cargando, setCargando] = useState(false);
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    
    const initialValues = {
        sugerencia: ""
    }


    return(
       <>
        {cargando ? <Cargando/> : null}

        <View style={styles.containerModalSugerencia}>
            <View style={{height: '13%', width: '100%', flexDirection: 'row'}}>
                <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', marginRight: '55%', alignItems: 'center'}} onPress={()=>{setModalSugerencia(false)}}>
                    <Icons name="chevron-left" size={20} color='#ffffff'></Icons>
                </TouchableOpacity>
                
                <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', alignItems: 'center'}} onPress={()=>{navigation.navigate("Home")}}>
                    <Icons name="times" size={20} color='#ffffff'></Icons>
                </TouchableOpacity>
            </View> 
            {/* <Appbar handlePressButtonLeft={()=>{setModalSugerencia(false)}} iconoIzquierda="arrowleft" /> */}
             <View bounces={false} style={styles.modalSugerencia}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Enviar sugerencias</Text>
                </View>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validacionSugerencia}
                    onSubmit={values => {
                        setCargando(true)
                        let sugerenciaSinEspacios = values.sugerencia.replace("  ", '_');
                        if(sugerenciaSinEspacios.includes("_")){
                            Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'Error',
                                text2: 'No se permiten espacios dobles en la sugerencia',
                                visibilityTime: 3000,
                                topOffset: 60,
                            });
                            setCargando(false);
                        }else{
                            const body = {
                                sugerencia: formatText(values.sugerencia),
                                usuarioId: usuarioRedux.id
                            }
                    
                            crearSugerencia(body).then(async (res)=>{
                                Toast.show({
                                        type: 'success',
                                        position: 'top',
                                        text1: 'Sugerencia enviada correctamente',
                                        visibilityTime: 2000,
                                        autoHide: true,
                                        topOffset: 30,
                                        bottomOffset: 40,
                                });
                                
                                await socket.emit("guardarSugerencia", res.sugerencia);
                               
                            }).catch((err)=>{
                                Toast.show({
                                    type: 'error',
                                    position: 'top',
                                    text1: 'Error al enviar la sugerencia',
                                    visibilityTime: 2000,
                                    autoHide: true,
                                    topOffset: 30,
                                    bottomOffset: 40,
                                });
                            });
                            setCargando(false);
                            setModalSugerencia(false);
                        } 
                    }}

                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                     <>
                        <View style={styles.containerTextoSugerencia}> 
                            <Text style={styles.texto}>¿Tienes alguna sugerencia para la aplicación? ¡Escríbenos!</Text>
                        </View>
                        <View style={styles.containerInput}>
                            <TextInput 
                            style={styles.input} 
                            multiline={true} 
                            onBlur={handleBlur("sugerencia")} 
                            numberOfLines={10} 
                            values={values.sugerencia} 
                            label="Sugerencia" 
                            maxLength={200} 
                            onChangeText={handleChange("sugerencia")}
                            
                            />
                        </View> 
                        {errors.sugerencia && touched.sugerencia ? 
                        (
                            <View style={styles.containerError}>
                                <Text style={styles.textoError}>{errors.sugerencia}</Text>
                            </View>
                        ):(null)
                        }
                        <View style={styles.containerBotonEnviar}>
                            <TouchableOpacity style={styles.botonEnviar} onPress={handleSubmit}>
                                <Text style={{color: '#0140b1', fontWeight: 'bold'}}>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}></View>
                     </>
                    )}
                </Formik>
            </View>  
        </View>
       
       </>
    );
}
