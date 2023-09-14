import React,{useEffect, useState, useRef} from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView} from "react-native"
import { ActivityIndicator  } from 'react-native-paper'
import styles from "./styles"
import { URL_CONNECT_BACKEND } from '../../../env';
import {obtenerImagen} from "../../data/imagenes"
import Comentarios from '../Comentarios';
import { crearComentario } from "../../data/comentarios";
import { guardarComentarioRedux, editarComentarioRedux } from "../../redux/actions/comentariosActions";
import Toast from 'react-native-toast-message';
import Icons from '@expo/vector-icons/FontAwesome5';
import formatText from "../../utils/modificarPrimeraLetra";
import {like,dislike} from "../../data/alertas";
import { daLikeAlertaRedux, borrarLikeAlertaRedux } from "../../redux/actions/likesActions";
import { useSelector, useDispatch } from "react-redux";
import { MessageSquare, ArrowUp } from 'lucide-react-native';
import { Footprints, LightbulbOff, MoreHorizontal, CheckCheck,  } from 'lucide-react-native';
import { Running } from 'iconoir-react-native';
import { Detective } from 'phosphor-react-native';

export default function DetallesAlerta({map, handlePressButtons, setIsVisibleAlerta, setVerAlerta ,verAlerta, socket, permisos, todosLosLikes, notlike}){
   
    const [spinnerFoto, setSpinnerFoto] = useState(true);
    const [verComentarios, setVerComentarios] = useState(false);
    const [errorImagen, setErrorImagen] = useState(false);
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    const alertasRedux = useSelector(state => state.alertas.alertas);
    const [likesAlertas, setLikesAlertas] = useState(null);
    const [imagen, setImagen] = useState();
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const [inputComentario, setInputComentario] = useState("");
    const [contadorLikes, setContadorLikes] = useState(0);
    const [cantidadComentarios, setCantidadComentarios] = useState(0);
    const [confirmacion, setConfirmacion] = useState(false);
    const likesAlertaRedux = useSelector(state => state.likesAlerta.usuarios)
    const comentariosRedux = useSelector(state => state.comentarios.comentarios)
    const [comentariosAlertas, setComentariosAlertas] = useState(null);
    
    
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

    useEffect(() => {
        if(filtrarLikesAlerta(verAlerta.id) !== null){
            setLiked(false);
            let cont=0;
            filtrarLikesAlerta(verAlerta.id).map(like => {
                cont++;
                if(like.alertaId === verAlerta.id && like.usuarioId === usuarioRedux.id){
                    setLiked(true)
                }
            })
            setContadorLikes(cont);
        }else{
            setLiked(false);
            setContadorLikes(0);
        }
    },[filtrarLikesAlerta])

    

    useEffect(() => {
        if(filtrarComentariosAlerta(verAlerta.id) !== null){
            let cont=0;
            filtrarComentariosAlerta(verAlerta.id).map(comentario => {
                if(comentario.alertaId === verAlerta.id){
                    cont++;
                }
            })
            setCantidadComentarios(cont);
        }else{
            setCantidadComentarios(0);
        }
    }, [filtrarComentariosAlerta])

    const crearUnComentario = async () => {
        let inputComentarioEditado = inputComentario.replace("  ", '_');
        if(inputComentario !== "" && inputComentario !== " "){
            if(!inputComentarioEditado.includes("_")){
                const body = {
                    alertaId: verAlerta.id,
                    comentario: formatText(inputComentario),
                    usuarioId: usuarioRedux.id,
        
                }
        
                let comentario = null;
                await crearComentario(body).then((result) => {
                    comentario=result.nuevoComentario;
                  }).catch((err) => {
                    console.log(err);
                }); 
        
                await socket.emit("comentario", comentario);
                dispatch(guardarComentarioRedux(comentario));
        
                setInputComentario("");
                setConfirmacion(false)
            }else{
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Elimine los espacios seguidos.',
                    visibilityTime: 3000,
                });
            }
            
        }else{
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Introduzca su comentario.',
                visibilityTime: 3000,
            });
        }
        setVerComentarios(true);
    }

    const handleLike = async () => {

        const body = {  
            alertaId: verAlerta.id,
            usuarioId: usuarioRedux.id
        }

        let positionArray = null;
        if(todosLosLikes !== null){
            for(let i=0; i<todosLosLikes.length; i++){
                if(todosLosLikes[i].alertaId === verAlerta.id && todosLosLikes[i].usuarioId === usuarioRedux.id){
                    positionArray = i;
                    break;
                }
            }
        } 

        if(liked){
           dislike(body);
           dispatch(borrarLikeAlertaRedux(body, positionArray));
            await socket.emit("daDislikeAlerta", body, positionArray);
        }else{
            like(body);
            dispatch(daLikeAlertaRedux(body));
            await socket.emit("daLikeAlerta", body);
        }
        console.log(liked)
    }


    useEffect(() => {
       const getImagen = async() => {
        setSpinnerFoto(true);
            await obtenerImagen(verAlerta.id).then((result) => {
                setImagen(result.url.replace(/\\/g, "/"));
           }).catch((err) => {
                setErrorImagen(true)
           });
       }
       getImagen();

    }, [])


    useEffect(() => {
        if(alertasRedux !== null){
            const alerta = alertasRedux.find(alerta => alerta.id === verAlerta.id);
           if(alerta === undefined){
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'La alerta fue eliminada o desactivada',
                    visibilityTime: 2000,
                });
            } 
            
        }else{
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'La alerta fue eliminada o desactivada',
                visibilityTime: 2000,
            });
        }
      
    }, [alertasRedux])  
    
    const pinTipoAlerta = (tipo) => {
        if(tipo === "Persona sospechosa"){
            return <View style={{height:50, width: 50, borderRadius:100, margin: '1%', alignItems:'center', justifyContent:'center',backgroundColor:'red'}}>
                        <Detective size={25} color='#ffffff'></Detective>
                    </View>
            
        }
        if(tipo === "Actividad sospechosa"){
            return <View style={{height:50, width: 50, borderRadius:100, margin: '1%', alignItems:'center', justifyContent:'center',backgroundColor:'#FFC83E'}}>
                <Footprints size={25} color='#ffffff'></Footprints>
            </View>
            
        }
        if(tipo === "Falla de iluminacion"){
            return <View style={{height:50, width: 50, borderRadius:100, margin: '1%', alignItems:'center', justifyContent:'center',backgroundColor:'#EF893C'}}>
                <LightbulbOff size={25} color='#ffffff'></LightbulbOff>
            </View>
            
        }
        if(tipo === "Incidente de robo"){
            return <View style={{height:50, width: 50, borderRadius:100, margin: '1%', alignItems:'center', justifyContent:'center',backgroundColor:'#5FC14D'}}>
            <Running height={30} width={30} color='#ffffff'></Running>
        </View>
            
        }
        if(tipo === "Incidente de violencia"){
            return <View style={{height:50, width: 50, borderRadius:100, margin: '1%', alignItems:'center', justifyContent:'center',backgroundColor:'#EA75EA'}}>
            <Image source={require('../../assets/Vector.png')}></Image>
        </View>
            
        }
        if(tipo === "Otros"){
            return <View style={{height:50, width: 50, borderRadius:100, margin: '1%', alignItems:'center', justifyContent:'center',backgroundColor:'#75B2EA'}}>
            <MoreHorizontal size={25} color='#ffffff'></MoreHorizontal>
        </View>
            
        }
        if(tipo === "Lugar con escasa iluminacion"){
            return <View style={{height:50, width: 50, borderRadius:100, margin: '1%', alignItems:'center', justifyContent:'center',backgroundColor:'#75B2EA'}}>
            <MoreHorizontal size={25} color='#ffffff'></MoreHorizontal>
        </View>
        }
    }
     
    return(

        <>
            {verComentarios ? <Comentarios socket={socket} setVerComentarios={setVerComentarios} alertaId={verAlerta.id} permisos={permisos} notlike={notlike}/> : (null)}  

            <View style={styles.containerAlerta}>
                             
                    {
                        map !== false ? <View style={{height: '13%', width: '100%', flexDirection: 'row'}}>
                            <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', marginRight: '55%', alignItems: 'center'}} onPress={()=>{setIsVisibleAlerta(false)}}>
                                <Icons name="chevron-left" size={20} color='black'></Icons>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', alignItems: 'center'}} onPress={()=>{handlePressButtons("mapa")}}>
                                <Icons name="times" size={20} color='black'></Icons>
                            </TouchableOpacity>
                        </View> 
                            : <View style={{height: '13%', width: '100%', flexDirection: 'row'}}>
                            <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', marginRight: '80%', alignItems: 'center'}} onPress={()=>{setIsVisibleAlerta(false)}}>
                                <Icons name="chevron-left" size={20} color='black'></Icons>
                            </TouchableOpacity>
                        </View>
                        }
                    <View style={styles.containerUsuario}>  
                        <View style={{height:40, width: 40, borderRadius:100, margin: '1%', alignItems:'center', justifyContent:'center',backgroundColor:'#BFCEE6'}}>
                            <Image source={require('../../assets/Vector_User.png')} style={{height:25, width: 19}} ></Image>
                        </View>
                        <View style={{paddingRight:'2%', marginVertical: '2%', alignItems:'flex-end'}}>
                            <Text style={styles.nombre}>{verAlerta.usuario.nombre} {verAlerta.usuario.apellido}</Text>
                            <Text style={styles.correo}>{verAlerta.usuario.correo}</Text> 
                        </View>
                    </View> 
                
                <View style={styles.alerta} >
                    <View style={{flex:0.3,  flexDirection: 'row', marginBottom:'5%'}}>
                        <View style={{flex: 1, height:'100%', paddingHorizontal:'5%', alignItems:'center', justifyContent:'center', marginLeft:'5%'}}>
                            {pinTipoAlerta(verAlerta.tipo)}
                        </View>
                        <View style={styles.containerTituloAlerta}>
                    
                            {
                                verAlerta.tipo === "Falla de iluminacion" ? (
                                    <Text style={styles.tituloAlerta}>Falla de iluminación</Text>
                                ):(
                                verAlerta.tipo === "Lugar con escasa iluminacion" ? 
                                    <Text style={styles.tituloAlerta}>Lugar con escasa iluminación</Text> :
                                    <Text style={styles.tituloAlerta}>{verAlerta.tipo}</Text>
                                )
                            }
                                <View style={styles.containerFecha}>
                                    <Text style={styles.fecha}>Fecha: {verAlerta.fecha.slice(8,10)}/{verAlerta.fecha.slice(5,7)}</Text>
                                    <Text style={styles.fecha}>Hora: {verAlerta.fecha.slice(11,16)}</Text>
                                </View>
                        </View>
                        <View style={{width:'20%', height: '100%', alignItems:'center', marginVertical: '7%'}}>
                            <View style={{width:'100%',justifyContent:'center', justifyContent:'flex-start',flexDirection:'row'}}>
                                <CheckCheck size={20} color="black"></CheckCheck>
                                <Text style={{fontSize: 15, fontWeight:'bold',marginHorizontal:'10%'}}>{contadorLikes}</Text>
                            </View>
                            <View style={{width:'100%',justifyContent:'center', justifyContent:'flex-start',flexDirection:'row'}}>
                                <MessageSquare size={20} color="black"></MessageSquare>
                                <Text style={{fontSize: 15, fontWeight:'bold',marginHorizontal:'10%'}}>{cantidadComentarios}</Text>
                            </View>  
                        </View>
                    </View>
                    <ScrollView style={{flex:1}} >
                        <View style={styles.containerUbicacion}>
                            <Text style={styles.atributoAlerta}>Ubicación:</Text>
                            <Text style={styles.ubicacion}>{verAlerta.ubicacion}</Text>
                        </View>

                        {
                            verAlerta.descripcion_ubicacion !== "" ? (
                            <View style={styles.containerDescripcionUbicacion}>
                                <Text style={styles.descripcion}>{verAlerta.descripcion_ubicacion}</Text>
                            </View>
                            ):(null)
                        }

                        <View style={styles.containerDescripcion}>
                            <Text style={styles.atributoAlerta}>Descripción</Text>
                            <Text style={styles.descripcion}>{verAlerta.descripcion}</Text>
                        </View>

                        
                    
                        {
                            errorImagen !== true ? (
                                <>
                                    <View style={styles.containerImagen}>
                                        {spinnerFoto && 
                                            <View style={styles.contenedorSpinner}>
                                                <ActivityIndicator color='#01579b' size={30}/>
                                            </View> }
                                        <Image style={styles.imagen} onLoad={()=>{setSpinnerFoto(false)}} source={{uri: `${URL_CONNECT_BACKEND}/${imagen}`}} />
                                    </View>
                                </>
                            ):
                            (null)
                        } 
                    </ScrollView >
                    {notlike !== false ? <TouchableOpacity style={[styles.BotonLikes, liked ? {backgroundColor:'#0140b1', borderColor: "#0140b1",}:{backgroundColor: '#ffffff', borderColor: "#E5E5E5",}]} onPress={handleLike}>
                        {liked ? <CheckCheck size={28} color="#ffffff"></CheckCheck>: <CheckCheck size={28} color="black"></CheckCheck>}
                    </TouchableOpacity>
                    :(null)}
                    <TouchableOpacity style={styles.botonComentarios} onPress={()=>{setVerComentarios(true);}}>
                        <MessageSquare size={25} color="black"></MessageSquare>
                    </TouchableOpacity>
                    
                    
                    {notlike !== false ? <KeyboardAvoidingView style={{flex:0.2}}  behavior='height'>
                        <View style={styles.containerTextInputComentario} > 
                            <TextInput 
                                style={styles.textInput} 
                                placeholder='Deja tu comentario' 
                                maxLength={100}
                                value={inputComentario} 
                                onChangeText={(text) => setInputComentario(text)}/>
                            <View style={styles.containerBotonEnviar}>
                                <TouchableOpacity style={styles.botonEnviar} onPress={crearUnComentario}>
                                    <ArrowUp size={25} color="#ffffff"></ArrowUp>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    :(null)}
                    
                    <View style={{flex:0.3}}></View> 
                </View>
            </View>
        </>
        
    )
}