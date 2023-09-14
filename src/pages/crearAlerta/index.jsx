import React,{useState, useEffect} from 'react';
import styles from "./style";
import { View, Text,TouchableOpacity, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFA5 from 'react-native-vector-icons/FontAwesome';
import Alerta2 from "../../components/CrearAlerta2"
import Alerta3 from "../../components/CrearAlerta3"
import Modal from "../../components/modalSelectAlerta";
import {URL_CONNECT_BACKEND} from "../../../env"
import { useDispatch, useSelector } from 'react-redux';
import { guardarAlertaRedux,eliminarAlertaRedux} from '../../redux/actions/alertasActions';
import { guardarNotificacionRedux } from '../../redux/actions/notificacionesActions';
import io from "socket.io-client"

const socket = io(URL_CONNECT_BACKEND);

export default function Crear({navigation}) {
  const [isVisibleAlertas2, setIsVisibleAlertas2] = useState(false);
  const [isVisibleAlertas3, setIsVisibleAlertas3] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [tipoAlerta, setTipoAlerta] = useState("Persona sospechosa");
  const  usuario = useSelector((state) => state.usuario.usuario);
  const [Ubicacioncoord, setUbicacioncoord] = useState('');
  /* const [ubicacion, setUbicacion] = useState('Estoy en...') */
  const [ubicacion, setUbicacion] = useState('Estoy en...')
    
  const [descrip_ubi, setDescrip_ubi] = useState("");

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
  

  const dispatch = useDispatch();

  useEffect(() => {

    socket.on("alerta", (alerta) => {
      dispatch(guardarAlertaRedux(alerta))
    })

    socket.on("eliminarAlerta", (alerta) => {
      dispatch(eliminarAlertaRedux(alerta));
      dispatch(eliminarComentarioRedux(alerta));
      dispatch(borrarTodosLosLikesAlertaRedux(alerta));
    })
   
    socket.on("notificacion", (notificacion) => {
      dispatch(guardarNotificacionRedux(notificacion));
    });

    return () => {
      socket.off("alerta")
      socket.off("eliminarAlerta");
      socket.off("notificacion");
    }
    
  }, [])


  function handlePressButtons(nombre){

    switch(nombre){
      case "Crear2": {
        setIsVisibleAlertas2(true);
        setIsVisibleAlertas3(false);
        break;
      }
      case "...": {
        break;
      }
      case "Crear3": {
        setIsVisibleAlertas2(false);
        setIsVisibleAlertas3(true);
        
        break;
      }
    }
  }

  const pinTipoAlerta = (tipoAlerta) => {
    if(tipoAlerta === "Persona sospechosa"){
        return <IconFA5 name="circle" size={10} color="red"/>
    }
    if(tipoAlerta === "Actividad sospechosa"){
        return <IconFA5 name="circle" size={10} color="#ffc83e"/>
    }
    if(tipoAlerta === "Falla de iluminacion"){
        return <IconFA5 name="circle" size={10} color="#ef893c"/>
    }
    if(tipoAlerta === "Incidente de robo"){
        return <IconFA5 name="circle" size={10} color="green"/>
    }
    if(tipoAlerta === "Incidente de violencia"){
        return <IconFA5 name="circle" size={10} color="#ea75ea"/>
    }
    if(tipoAlerta === "Otros"){
        return <IconFA5 name="circle" size={10} color="#75b2ea"/>
    }
}

  return (

    <>
            
        
            {isVisibleAlertas2 ? (
              <Alerta2 handlePressButtons={handlePressButtons} navigation={navigation} setIsVisibleAlertas2={setIsVisibleAlertas2} Ubicacioncoord={Ubicacioncoord} setUbicacioncoord={setUbicacioncoord} ubicacion={ubicacion} setUbicacion={setUbicacion} descripcion_ubicacion={descrip_ubi} setdescripcion_ubicacion={setDescrip_ubi}/>
            ):(null)}

            {isVisibleAlertas3 ? (
              <Alerta3 handlePressButtons={handlePressButtons} navigation={navigation} tipoAlerta={tipoAlerta} socket={socket} Ubicacioncoord={Ubicacioncoord} ubicacion={ubicacion} descripcion_ubicacion={descrip_ubi} />
            ): (null)}

        
            {isModalOpen ? 
            <Modal
            setisModalOpen={setisModalOpen}
            setTipoAlerta={setTipoAlerta}
            tipoAlerta={tipoAlerta}
            >
            </Modal>
           :(null)}

            <View style={styles.containerModal}>
                <TouchableOpacity style={{width: '100%', marginTop:'16%', justifyContent: 'center', paddingLeft: '10%'}} onPress={()=>{navigation.navigate("Home")}}>
                    <Icon name="chevron-left" size={18} color='black'></Icon>
                        </TouchableOpacity>
                        <View style={{alignItems: 'center', width: '100%', paddingTop: "2%"}}>
                            <Text style={{fontSize: 23, fontWeight: 'bold',color: 'black'}}>Crear Alertas</Text>
                            <Text style={{fontSize: 20,color: 'black'}}>Paso 1 de 3</Text>
                        </View>
                        <View  style={styles.containerBotonesAlerta}>
                            <View style={{flex:2}}>
                                <Text style={styles.textAlertas}>Tipo de Alerta</Text>
                                <TouchableOpacity onPress={()=>setisModalOpen(true)}>
                                    {/* <View>
                                        {pinTipoAlerta(tipoAlerta)}
                                    </View> */}
                                    <View style={styles.textInput}>
                                        <View style={{justifyContent: "center",paddingRight:'5%'}}>
                                            {pinTipoAlerta(tipoAlerta)}
                                        </View>
                                        <Text style={styles.text}>{tipoAlerta}</Text>
                                        <View style={{justifyContent: "center",paddingRight:'5%'}}><Icon name="chevron-down" size={15} color="black"></Icon></View>
                                    </View>
                                </TouchableOpacity>
                                
                            </View>
                            <View style={{ flex: 2.25, padding:'2%',}}>
                                <TouchableOpacity style={styles.button} onPress={()=>{handlePressButtons("Crear2")}}>
                                    <Text style={{color: 'white', fontWeight: 'bold'}}>Siguiente</Text>
                                </TouchableOpacity>
                                <View style={{flex:3, flexDirection:'row', justifyContent: 'center',}}>
                                  <View style={{margin:'2%'}}><IconFA5 name="circle" size={10} color="#0140b1"/></View>
                                  <View style={{margin:'2%'}}><IconFA5 name="circle" size={10} color="#BFCEE7"/></View>
                                  <View style={{margin:'2%'}}><IconFA5 name="circle" size={10} color="#BFCEE7"/></View>
                                </View>
                            </View> 
                    </View>         
                </View> 
    </>
  );
}
