import React,{useState} from "react"
import { View, Text, TouchableOpacity, TextInput, Image, Linking, Keyboard, ScrollView} from "react-native"
import { Button, Provider, Portal, Dialog } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFA5 from 'react-native-vector-icons/FontAwesome';
import styles from "./styles"
import { Formik } from "formik";
import Camara from "../Camara"
import PortadaAfterLogin from '../../pages/portadaAfterLogin';
import {crearAlerta} from "../../data/alertas"
import {useDispatch, useSelector} from "react-redux"
import { guardarAlertaRedux } from "../../redux/actions/alertasActions";
import {validacionReportarAlerta} from "../../utils/validaciones"
import {guardarImagen} from "../../data/imagenes"
import Toast from 'react-native-toast-message';
import {Camera} from "expo-camera"
import Cargando from "../Cargando"
import formatText from "../../utils/modificarPrimeraLetra";
import {Camera as Camarita} from 'lucide-react-native';

export default function CrearAlerta3({tipoAlerta, navigation, handlePressButtons, socket,Ubicacioncoord,ubicacion, descripcion_ubicacion}){

    const [visibleCamara, setVisibleCamara] = useState(false);
    const [imagen, setImagen] = useState("");
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    const dispatch = useDispatch();
    const [permisoCamara, setPermisoCamara] = useState(false);
    const [loading, setLoading] = useState(false);
    const [portadaAfterLogin, setPortadaAfterLogin] = useState(false);
     
    const valoresIniciales = {
      tipo: "",
      descripcion: "",
      ubicacion: "",
      latitude: 0,
      longitude: 0,
      descripcion_ubicacion: ""
    }
  
  
    const handleBotonImagen = async () => {
      Keyboard.dismiss();
      setLoading(true)
      const {status} = await Camera.requestCameraPermissionsAsync()
      
      if(status !== "granted"){
        setPermisoCamara(true);
      }else{
        setVisibleCamara(true);
        setPermisoCamara(false);
      }
      setLoading(false)
    }
    
    return( 

        <>  
            {portadaAfterLogin ? <PortadaAfterLogin navigation={navigation} setPortadaAfterLogin={setPortadaAfterLogin}/> : null}
            {loading ? <Cargando/> : (null)}
            {visibleCamara ? <Camara setVisibleCamara={setVisibleCamara} setImagen={setImagen} setLoading={setLoading}/> : (null)}
            <View style={styles.containerModal}>
                    <View style={{height: '13%', width: '100%', flexDirection: 'row'}}>
                        <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', marginRight: '55%', alignItems: 'center'}} onPress={()=>{handlePressButtons("Crear2")}}>
                            <Icon name="chevron-left" size={18} color='black'></Icon>
                        </TouchableOpacity>
                
                        <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', alignItems: 'center'}} onPress={()=>{navigation.navigate("Home")}}>
                            <Icon name="times" size={20} color='black'></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'center', width: '100%', paddingTop: "2%"}}>
                        <Text style={{fontSize: 23, fontWeight: 'bold',color: 'black'}}>Crear Alertas</Text>
                        <Text style={{fontSize: 20,color: 'black'}}>Paso 3 de 3</Text>
                    </View>
                    <Formik
                        initialValues={valoresIniciales} 
                        validationSchema={validacionReportarAlerta}
                        onSubmit={async (values) => {
                          
                          
                          values.tipo = tipoAlerta
                          values.longitude = Ubicacioncoord.longitude
                          values.latitude = Ubicacioncoord.latitude
                          values.ubicacion = ubicacion
                          values.descripcion_ubicacion = descripcion_ubicacion
                          
                          
                          const body = {
                            tipo: values.tipo,
                            descripcion: formatText(values.descripcion),
                            ubicacion: values.ubicacion,
                            descripcion_ubicacion: formatText(values.descripcion_ubicacion),
                            latitude: values.latitude,
                            longitude: values.longitude,
                            usuarioId: usuarioRedux.id
                            
                          }     
      
                          let nuevaAlerta = null;
                          setLoading(true);
                         
                            await crearAlerta(body).then((result) => {
                            nuevaAlerta=result.alerta
                            Toast.show({
                                type: 'success',
                                position: 'top',
                                text1: 'La alerta fue creada con éxito',
                                visibilityTime: 3000,
                              });
                            }).catch((err) => {
                              Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'Error al crear la alerta',
                                visibilityTime: 3000,
                              });; 
                            }); 
      
                          setLoading(false); 
      
                           let tipoSinEspacios = values.tipo.replace(/ /g,"_");
      
                          if(imagen !== ""){
      
                            const data = new FormData();
      
                            data.append('archivo', {
                              uri: imagen,
                              type: 'image/jpeg',
                              name: 'imagen.jpg',
                            });
                           
                            guardarImagen(nuevaAlerta.id, data, tipoSinEspacios).then(() => {
                            }).catch((err) => {
                              console.log(err);
                            }); 
                          }     
                          
                          await socket.emit("alerta", nuevaAlerta);
                          dispatch(guardarAlertaRedux(nuevaAlerta)); 
                          setImagen("");
                          setPortadaAfterLogin(true);
                        }} 
                    >
                        
                        {({ handleChange, handleBlur, handleSubmit, errors, values, touched}) => (
                        <>
                            <View style={{height:'25%'}}>
                                <View style={{marginTop: '5%', marginBottom: '2%'}}>
                                    <Text style={{fontWeight: 'bold', marginLeft: '10%'}}>¿Qué está ocurriendo? </Text>
                                </View>
                                <View style={styles.textInput2}>
                                        <TextInput                                            
                                            value={values.descripcion}
                                            placeholder='Sucede que...'
                                            multiline={true} 
                                            //numberOfLines={6} 
                                            maxLength={200} 
                                            onBlur={handleBlur('descripcion')} 
                                            onChangeText={handleChange('descripcion')}
                                            style={{paddingVertical:'2%', width:'100%', height:'100%'}}>
                                            
                                        </TextInput>   
                                </View> 
                                {errors.descripcion && touched.descripcion ? 
                                (
                                  <View style={styles.containerError}>
                                    <Text style={styles.textoError}>{errors.descripcion}</Text>
                                  </View>
                                ):(null)
                                }
                                {ubicacion === 'Estoy en...' ? 
                                (
                                  <View style={styles.containerError}>
                                    <Text style={styles.textoError}>Por favor, ingresa una ubicación en Paso 2</Text>
                                  </View>
                                ):(null)
                                }
                            </View>
                            <ScrollView style={{width: '100%', height:'20%'}}>
                            <View style={styles.containerFoto}>
                             
                            {
                                imagen !== "" ? (
                                    
                                        <Image source={{uri: imagen}} style={styles.foto}/>
                                    
                                ):(null)
                            }
                            
                            </View>
                            </ScrollView>

                            <View style={{height:'10%', justifyContent:'center', alignItems:'center'}}>
                              <View style={{padding:'3%', backgroundColor:'#BFCEE6', marginHorizontal:'40%', borderRadius:100,}}>    
                                <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={handleBotonImagen}>
                                    <Camarita size={35} color='#1C405F'/>
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View style={{ flex: 2.25, padding:'1%'}}>
                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                    <Text style={{color: 'white', fontWeight: 'bold'}}>Crear alerta</Text>
                                </TouchableOpacity>
                                <View style={{flex:3, flexDirection:'row', justifyContent: 'center'}}>
                                  <View style={{margin:'2%'}}><IconFA5 name="circle" size={10} color="#BFCEE7"/></View>
                                  <View style={{margin:'2%'}}><IconFA5 name="circle" size={10} color="#BFCEE7"/></View>
                                  <View style={{margin:'2%'}}><IconFA5 name="circle" size={10} color="#0140b1"/></View>
                              </View>
                            </View>    
                        </> 
                        )}
                    </Formik>
                    <Provider>
                        <Portal>
                            <Dialog style={{backgroundColor: "white"}} visible={permisoCamara} dismissable={false} >
                                <Dialog.Icon icon="alert" />
                                <Dialog.Content style={styles.containerTituloAlerta}><Text style={styles.tituloAlerta}>Permiso de Cámara</Text></Dialog.Content>
                                <Dialog.Content style={styles.containerTextoAlerta}>
                                <Text style={styles.textoAlerta}>Para el uso de la cámara, es necesario que se active el permiso en configuración, si usted rechaza este permiso, no podrá acceder a la cámara.</Text>
                                </Dialog.Content>
                                <Dialog.Actions style={styles.containerBotonAlerta}>
                                    <Button onPress={()=>setPermisoCamara(false)}><Text style={styles.textoBotonAlerta}>Rechazar</Text></Button>
                                    <Button onPress={() => Linking.openSettings()}><Text style={styles.textoBotonAlerta}>ir a Configuración</Text></Button>
                                    <Button onPress={handleBotonImagen}><Text style={styles.textoBotonAlerta}>Verificar</Text></Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                    </Provider>       
            </View>
        </>
        
    )
}

