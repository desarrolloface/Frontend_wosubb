import React,{useState, useEffect} from "react"
import { View, Text, TouchableOpacity, Image, BackHandler} from 'react-native';
import styles from "./styles"
import { Dialog, Portal, Provider, Button } from 'react-native-paper';
import ModalSugerencia from "../../components/CrearSugerencia";
import ModalLugaresProblematicos from "../../components/GenerarReporte";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfiguracionNotificaciones from "../../components/ConfiguracionNotificaciones";
import ModalVerSugerencias from "../../components/VerSugerencias";
import {limpiarRedux} from "../../redux/actions/usuarioActions";
import ModificarContraseña from "../../components/ModificarContraseña"
import ModificarTipos from "../../components/ModificarTipos"
import {useSelector, useDispatch} from "react-redux"
import * as Animatable from 'react-native-animatable';
import Icons from '@expo/vector-icons/FontAwesome5';
import io from "socket.io-client"
import { guardarSugerenciaRedux, eliminarSugerenciaRedux } from '../../redux/actions/sugerenciasActions';
import { guardarNotificacionRedux } from '../../redux/actions/notificacionesActions';
import {URL_CONNECT_BACKEND} from "../../../env"
import {MessagesSquare, Unlock, LogOut, ClipboardEdit, UserCog, Bell}  from 'lucide-react-native';

const socket = io(URL_CONNECT_BACKEND);

export default function Menu({navigation}){
    const [isVisibleLugares, setModalLugaresProblematicos] = useState(false);
    const [isVisibleSugerencia, setModalSugerencia] = useState(false);
    const [isVisibleCerrarSesion, setIsVisibleCerrarSesion] = useState(false);
    const [isVisibleVerSugerencias, setIsVisibleVerSugerencias] = useState(false);
    const [isVisibleCambiarContraseña, setIsVisibleCambiarContraseña] = useState(false); 
    const [isVisibleModificarTipos, setIsVisibleModificarTipos] = useState(false);
    const [isVisibleConfiguracionNotificaciones, setVisibleConfiguracionNotificaciones] = useState(false);
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    const dispatch = useDispatch();

    const eliminarToken = async () => {
        try {
          await AsyncStorage.removeItem('usuario')
        } catch(e) {
            console.log("error al remover el usuario");
        }

        setIsVisibleCerrarSesion(false); 
        dispatch(limpiarRedux());
        //handlePressButtons("mapa");
        navigation.navigate("Login");
    }

    const [alertaCambioTipo, setAlertaCambioTipo] = useState(false);
    const  usuario = useSelector((state) => state.usuario.usuario);

    useEffect(() => {

        const backAction = () => {
            BackHandler.exitApp()
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        ); 

        return () => backHandler.remove();
    }, [])
  

    useEffect(() => {

    if(usuario.tipo === "Administrador"){
      socket.on("guardarSugerencia", (sugerencia) => {
        dispatch(guardarSugerenciaRedux(sugerencia));
      })

      socket.on("eliminarSugerencia", (sugerencia) => {
        dispatch(eliminarSugerenciaRedux(sugerencia));
      })
    }
    
    socket.on("notificacion", (notificacion) => {
      dispatch(guardarNotificacionRedux(notificacion));
    });

    socket.on("cambioTipo", async (datos) => {
      if(usuario.correo.toLowerCase() === datos.correo.toLowerCase()){
        try {
          await AsyncStorage.mergeItem('usuario', JSON.stringify({tipo: datos.tipo}))
        } catch(e) {
            console.log("error al editar el tipo de usuario");
        }
        setAlertaCambioTipo(true);
      }
    })

    return () => {
      socket.off("eliminarSugerencia");
      socket.off("notificacion");
    }
    
  }, [])
    
    return(
        <>
        {isVisibleLugares ? <ModalLugaresProblematicos navigation={navigation} setModalLugaresProblematicos={setModalLugaresProblematicos} />:(null)} 
        {isVisibleSugerencia ? <ModalSugerencia setModalSugerencia={setModalSugerencia} socket={socket} navigation={navigation}/>:(null)}
        {isVisibleCambiarContraseña ? <ModificarContraseña navigation={navigation} setIsVisible={setIsVisibleCambiarContraseña} />:(null)}
        {isVisibleModificarTipos ? <ModificarTipos navigation={navigation} setIsVisible={setIsVisibleModificarTipos} socket={socket}/>:(null)}
        {isVisibleConfiguracionNotificaciones ? <ConfiguracionNotificaciones navigation={navigation} setVisibleConfiguracionNotificaciones={setVisibleConfiguracionNotificaciones} />:(null)}
        {isVisibleVerSugerencias ? <ModalVerSugerencias navigation={navigation} setModalVerSugerencias={setIsVisibleVerSugerencias} socket={socket} />:(null)}
        
        
        
        <View style={styles.container}>
            <Provider>
              {/* ekis */}
            <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', paddingLeft: '85%'}} onPress={()=>{navigation.navigate("Home")}}>
               <Icons name="times" size={25} color='#ffffff'></Icons>
            </TouchableOpacity>

            {/* Nombre */}
            <View style={{flex:1.5, width: '100%', flexDirection:'row', justifyContent: 'center', paddingBottom: '10%'}}>
                <View style={{flex:0.4, alignItems: 'center',justifyContent: 'center', paddingHorizontal:'8%'}}>
                    <Image source={require('../../assets/Group_6.png')}></Image>
                </View>
                <View style={{flex:2, justifyContent: 'center'}}>
                    <Text style={{fontSize: 23, fontWeight: 'bold',color: '#ffffff'}}>{usuarioRedux.nombre} {usuarioRedux.apellido}</Text>
                    <Text style={{fontSize: 12, color: '#ffffff'}} >{usuarioRedux.correo}</Text>
                </View>
            </View>
            {/* Notificaciones */}
            <TouchableOpacity style={{flex:0.8, flexDirection: 'row'}} onPress={()=>{setVisibleConfiguracionNotificaciones(true)}}>
                <View style={{flex:0.4, alignItems: 'center',justifyContent: 'center', paddingLeft:'7.5%'}}>
                    <Bell size={25} color='#ffffff'></Bell>   
                </View>
                <View style={{flex:2, justifyContent: 'center', paddingLeft:'5%'}}>
                    <Text style={{color: '#ffffff', fontSize: 17, fontWeight: 'bold'}} >Notificaciones</Text>
                </View>
            </TouchableOpacity>
             
            {/* Crear sugerencias */}

            {
                usuarioRedux.tipo !== "Administrador" ? <TouchableOpacity style={{flex:0.8, flexDirection: 'row'}} onPress={()=>{setModalSugerencia(true)}}>
                <View style={{flex:0.4, alignItems: 'center',justifyContent: 'center', paddingLeft:'7.5%'}}>
                    <MessagesSquare size={25} color='#ffffff'></MessagesSquare>   
                </View>
                <View style={{flex:2, justifyContent: 'center'}}>
                    <Text style={{color: '#ffffff', fontSize: 17, paddingLeft:'5%', fontWeight: 'bold'}} >Enviar sugerencia</Text>
                </View>
                </TouchableOpacity>
                :(null)
            }
            {/* Sugerencias */}
            {
                usuarioRedux.tipo === "Administrador" ? 
                <TouchableOpacity style={{flex:0.8, flexDirection: 'row'}} onPress={()=>{setIsVisibleVerSugerencias(true)}}>
                    <View style={{flex:0.4, alignItems: 'center',justifyContent: 'center', paddingLeft:'7.5%'}}>
                        <MessagesSquare size={25} color='#ffffff'></MessagesSquare>   
                    </View>
                    <View style={{flex:2, justifyContent: 'center'}}>
                        <Text style={{color: '#ffffff', fontSize: 17, paddingLeft:'5%', fontWeight: 'bold'}} >Sugerencias</Text>
                    </View>
                </TouchableOpacity>
                :(null)
            }
            
            {/* Modificar contraseña */}
            <TouchableOpacity style={{flex:0.8, flexDirection: 'row'}} onPress={()=>{setIsVisibleCambiarContraseña(true)}}>
                <View style={{flex:0.4, alignItems: 'center',justifyContent: 'center', paddingLeft:'7.5%'}}>
                    <Unlock size={25} color='#ffffff'></Unlock>   
                </View>
                <View style={{flex:2, justifyContent: 'center'}}>
                    <Text style={{color: '#ffffff', fontSize: 17, paddingLeft:'5%', fontWeight: 'bold'}} >Modificar contraseña</Text>
                </View>
            </TouchableOpacity>
            {/* Modificar tipo de usuario */}

            {
               usuarioRedux.tipo === "Administrador" ?  <TouchableOpacity style={{flex:0.8, flexDirection: 'row'}} onPress={()=>{setIsVisibleModificarTipos(true)}}>
                <View style={{flex:0.4, alignItems: 'center',justifyContent: 'center', paddingLeft:'7.5%'}}>
                   <UserCog size={25} color='#ffffff'></UserCog>   
                </View>
                <View style={{flex:2, justifyContent: 'center'}}>
                   <Text style={{color: '#ffffff', fontSize: 17, paddingLeft:'5%', fontWeight: 'bold'}} >Modificar tipo de usuario</Text>
                </View>
                </TouchableOpacity>
                

               :(null) 
            }
            {/* Generar reporte */}
            {
                usuarioRedux.tipo === "Administrador" ? <TouchableOpacity style={{flex:0.8, flexDirection: 'row'}} onPress={()=>{setModalLugaresProblematicos(true)}}>
                <View style={{flex:0.4, alignItems: 'center',justifyContent: 'center', paddingLeft:'7.5%'}}>
                    <ClipboardEdit size={25} color='#ffffff'></ClipboardEdit>   
                </View>
                <View style={{flex:2, justifyContent: 'center'}}>
                    <Text style={{color: '#ffffff', fontSize: 17, paddingLeft:'5%', fontWeight: 'bold'}} >Generar reporte</Text>
                </View>
                </TouchableOpacity>
                :(null)
            }
            
            {/* Cerrar Sesión */}
            
            <TouchableOpacity style={{flex:1, flexDirection: 'row', marginTop: '20%'}} onPress={()=>{setIsVisibleCerrarSesion(true)}}>
                <View style={{flex:0.4, alignItems: 'center',justifyContent: 'center', paddingLeft:'7.5%'}}>
                    <LogOut size={40} color='#ffffff'></LogOut>   
                </View>
                <View style={{flex:2, justifyContent: 'center'}}>
                    <Text style={{color: '#ffffff', fontSize: 17, paddingLeft:'5%', fontWeight: 'bold'}} >Cerrar Sesión</Text>
                </View>
            </TouchableOpacity>
                    <View style={{flex: 1}}></View>
                    <Portal>
                        <Dialog style={{backgroundColor: "white"}} visible={isVisibleCerrarSesion} onDismiss={()=>setIsVisibleCerrarSesion(false)}>
                            <Dialog.Content style={{ flex:1,width: '100%', justifyContent: "center", alignItems: 'center', paddingBottom: '20%', paddingTop: '15%'}}>
                                <View style={{width: '13%',
                                    height: '15%',
                                    padding :'15%',
                                    marginTop: '6%',
                                    justifyContent: "center",
                                    backgroundColor: 'red',
                                    alignItems: 'center',
                                    borderRadius: 100,}}>
                                    <LogOut size={40} color='#ffffff'></LogOut>
                                </View>   
                            </Dialog.Content>   
                            <Dialog.Content style={styles.containerAlertaCerrarSesion}>
                                <Text style={styles.textoAlertaCerrarSesion}>¿Estás seguro/a que deseas</Text>
                                <Text style={styles.textoAlertaCerrarSesion}>cerrar sesión?</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                            <Button style={styles.BotonSi} onPress={eliminarToken}><Text style={{color: "#ffffff",}}>Si</Text></Button>
                            <Button style={styles.BotonNo} onPress={()=>setIsVisibleCerrarSesion(false)} ><Text style={{color: "#0140b1",}}>No</Text></Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    <Portal>
                        <Dialog style={{backgroundColor: "white"}} visible={alertaCambioTipo} dismissable={false} >
                            <Dialog.Icon icon="alert" />
                            <Dialog.Content style={styles.containerTituloAlerta}>
                                <Text style={styles.textoTituloAlerta}>
                                    Modificación de tipo de usuario
                                </Text>
                            </Dialog.Content>
                            <Dialog.Content style={styles.containerTextoAlerta}>
                                <Text>Su cuenta ha sido modificada, por favor reinicie la aplicación.</Text>
                            </Dialog.Content>
                        </Dialog>
                    </Portal>
                </Provider>
               {/*  <Provider >
                    <Portal>
                        <Dialog style={{backgroundColor: "white"}} visible={alertaCambioTipo} dismissable={false} >
                            <Dialog.Icon icon="alert" />
                            <Dialog.Content style={styles.containerTituloAlerta}>
                                <Text style={styles.textoTituloAlerta}>
                                    Modificación de tipo de usuario
                                </Text>
                            </Dialog.Content>
                            <Dialog.Content style={styles.containerTextoAlerta}>
                                <Text>Su cuenta ha sido modificada, por favor reinicie la aplicación.</Text>
                            </Dialog.Content>
                        </Dialog>
                    </Portal>
                </Provider>  */}
            </View>
        </>
        
    )
}