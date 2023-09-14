import React,{useState, useEffect} from "react"
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from "./styles"
import {like,dislike} from "../../data/alertas";
import { useSelector, useDispatch } from "react-redux";
import { daLikeAlertaRedux, borrarLikeAlertaRedux } from "../../redux/actions/likesActions";
import { MessageSquare} from 'lucide-react-native';
import { Footprints, LightbulbOff, MoreHorizontal, CheckCheck } from 'lucide-react-native';
import { Running } from 'iconoir-react-native';
import { Detective } from 'phosphor-react-native';

export default function CardAlerta({socket, alerta, setIsVisibleAlerta, setVerAlerta, setVerComentarios,setAlertaSeleccionada, likes, todosLosLikes, comentarios}){
    const [liked, setLiked] = useState(false);
    const [cantidadComentarios, setCantidadComentarios] = useState(0);
    const [contadorLikes, setContadorLikes] = useState(0);
    const dispatch = useDispatch();
    const usuarioRedux = useSelector(state => state.usuario.usuario)

    useEffect(() => {
        if(likes !== null){
            setLiked(false);
            let cont=0;
            likes.map(like => {
                cont++;
                if(like.alertaId === alerta.id && like.usuarioId === usuarioRedux.id){
                    setLiked(true)
                }
            })
            setContadorLikes(cont);
        }else{
            setLiked(false);
            setContadorLikes(0);
        }
    },[likes])

    useEffect(() => {
        if(comentarios !== null){
            let cont=0;
            comentarios.map(comentario => {
                if(comentario.alertaId === alerta.id){
                    cont++;
                }
            })
            setCantidadComentarios(cont);
        }else{
            setCantidadComentarios(0);
        }
    }, [comentarios])
    

    const seleccionarAlerta = () => {
        setVerAlerta(alerta)
        setIsVisibleAlerta(true) 
    }

    const handleLike = async () => {

        const body = {  
            alertaId: alerta.id,
            usuarioId: usuarioRedux.id
        }

        let positionArray = null;
        if(todosLosLikes !== null){
            for(let i=0; i<todosLosLikes.length; i++){
                if(todosLosLikes[i].alertaId === alerta.id && todosLosLikes[i].usuarioId === usuarioRedux.id){
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
    }


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
        
             <View style={styles.containerAlerta} >
                <TouchableOpacity style={styles.AlertaCard} onPress={seleccionarAlerta} >
                    <View style={{flex:0.1, alignItems: 'center',justifyContent: 'center', paddingHorizontal:'10%'}}>
                        {pinTipoAlerta(alerta.tipo)}
                    </View> 
                    <View style={styles.containerTipo}>
                        <Text style={styles.textoTipo}>{alerta.tipo}</Text>
                        <View style={styles.containerDescripcion}>
                            <Text style={styles.descripcion} numberOfLines={2} >{alerta.descripcion}</Text>
                        </View>
                    </View>
                      
                    <View style={styles.containerBotones}>
                        <View style={styles.containerBotonLike}>
                            <View style={styles.botonLike} /* onPress={handleLike} */>
                                {liked ? <CheckCheck size={17} color="#0140b1"></CheckCheck>: <CheckCheck size={17} color="black"></CheckCheck>}
                            </View>
                            <Text style={styles.likes}>{contadorLikes}</Text>
                        </View>
                        
                        <View style={styles.containerBotonComentario}>
                            <View style={styles.botonComentarios}>
                                <MessageSquare size={17} color="black"></MessageSquare>
                            </View>
                            <Text style={styles.comentarios}>{cantidadComentarios}</Text>
                        </View>      
                    </View>
                    <View style={styles.containerFecha}>
                        <Text style={styles.textoHora}>{alerta.fecha.slice(11,16)}</Text> 
                        <Text style={styles.textoHora}>{alerta.fecha.slice(8,10)}/{alerta.fecha.slice(5,7)}</Text> 
                    </View>
                </TouchableOpacity>
            </View> 
        </>
            
    )
}