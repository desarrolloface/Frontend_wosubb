import React,{useState,useEffect} from "react"
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import styles from "./styles"
import CardAlerta from "../CardAlerta"
import { useSelector } from "react-redux";
import Alerta from "../DetallesAlerta"
import Comentarios from "../Comentarios";
import Icons from '@expo/vector-icons/FontAwesome5';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

export default function Alertas({handlePressButtons,socket,navigation}) {

    const [alertas, setAlertas] = useState([])
    const [likesAlertas, setLikesAlertas] = useState(null);
    const [comentariosAlertas, setComentariosAlertas] = useState(null);
    const alertasRedux = useSelector(state => state.alertas.alertas)
    const [alertaSeleccionada, setAlertaSeleccionada] = useState(null)
    const [verAlerta, setVerAlerta] = useState(null)
    const [verComentarios, setVerComentarios] = useState(false);
    const [isVisibleAlerta, setIsVisibleAlerta] = useState(false);
    const dimensionesPantalla = Dimensions.get("window");
    const comentariosRedux = useSelector(state => state.comentarios.comentarios)
    const likesAlertaRedux = useSelector(state => state.likesAlerta.usuarios)
    
    useEffect(() => {
        if(alertasRedux !== undefined){
            setAlertas(alertasRedux);
        }
    },[alertasRedux]) 

    useEffect(() => {
      if(likesAlertaRedux !== null){
        setLikesAlertas(likesAlertaRedux);
      }else{
        setLikesAlertas(null);
      }
    }, [likesAlertaRedux,alertasRedux])
    
    useEffect(() => {
        if(comentariosRedux !== null){
            setComentariosAlertas(comentariosRedux);
          }else{
            setComentariosAlertas(null);
          }
    }, [comentariosRedux,alertasRedux])
    
    const filtrarLikesAlerta = (alertaId) => {
        if(likesAlertas !== null && likesAlertas !== undefined){
            const likes = [];
            likesAlertas.map(like => {
                if(like.alertaId === alertaId){
                    likes.push(like)
                }
            })
            return likes;
        }else{
            return null
        }
    }

    const filtrarComentariosAlerta = (alertaId) => {
        if(comentariosAlertas !== null && comentariosAlertas !== undefined){
            const comentarios = [];
            comentariosAlertas.map(comentario => {
                if(comentario.alertaId === alertaId){
                    comentarios.push(comentario)
                }
            })
            return comentarios;
        }else{
            return null
        }
    }



    return(
        <>
            {isVisibleAlerta ? <Alerta handlePressButtons={handlePressButtons} socket={socket} setIsVisibleAlerta={setIsVisibleAlerta} verAlerta={verAlerta} permisos={true} todosLosLikes={likesAlertas}/> : null }
            {verComentarios ? <Comentarios socket={socket} setVerComentarios={setVerComentarios} alertaId={alertaSeleccionada.id} /> : (null)}  

            <View style={styles.containerAlertas} >
                <TouchableOpacity style={{width: '100%', marginTop:'16%', justifyContent: 'center', paddingLeft: '10%'}} onPress={()=>{handlePressButtons("mapa")}}>
                    <Icons name="chevron-left" size={18} color='black'></Icons>
                </TouchableOpacity>
                <View style={{alignItems: 'center', width: '100%', paddingTop: "2%"}}>
                    <Text style={{fontSize: 23, fontWeight: 'bold',color: 'black'}}>Alertas</Text>
                </View>
                
                <Animatable.View animation='fadeInUpBig' style={dimensionesPantalla.height < 700 ? styles.alertasPantallaPeque: styles.alertasPantallaGrand}>
                    <View style={{marginLeft: '10%',justifyContent: 'center', width: '100%', marginTop: "5%",}}>
                        <Text style={{fontWeight: 'bold',color: 'black'}}>Más recientes</Text>
                    </View>
                    <ScrollView style={styles.containerAlertasActuales}> 
                       {alertas !== null ? (
                            alertas.map((alerta, i) => (
                            
                               alerta.activa === true ? 
                                    i!==0 && alerta.id === alertas[i-1].id ?
                                        (null)
                                    :<CardAlerta socket={socket} alerta={alerta} likes={filtrarLikesAlerta(alerta.id)} todosLosLikes={likesAlertas} comentarios={filtrarComentariosAlerta(alerta.id)} setIsVisibleAlerta={setIsVisibleAlerta} setVerAlerta={setVerAlerta} key={alerta.id} setVerComentarios={setVerComentarios} setAlertaSeleccionada={setAlertaSeleccionada}/>
                                    
                               :(null)   
                            ))
                        ):(
                            <View style={styles.containerNoAlertas}>
                                <Text style={styles.textoNoAlertas}>No se encontraron alertas.</Text>
                            </View>
                        )}     
                    </ScrollView> 
                    <TouchableOpacity style={styles.botonPlusPantallaPeque} onPress={()=>{navigation.navigate("Alerta")}}> 
                        <Ico
                            name="plus"
                            color="#ffffff"
                            size= {40}
                        />
                    </TouchableOpacity>  
                </Animatable.View>  
            </View>
        </>
        
    )
}