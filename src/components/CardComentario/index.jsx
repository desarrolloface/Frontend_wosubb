import React,{ useEffect, useState} from "react";
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {like, dislike} from "../../data/comentarios";
import { daLikeComentarioRedux, borrarLikeComentarioRedux } from "../../redux/actions/likesActions";
import { useSelector, useDispatch} from "react-redux";


export default function CardComentario({comentario, likes, todosLosLikes, socket}){
    const [liked, setLiked] = useState(false);
    const [contadorLikes, setContadorLikes] = useState(0);
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    const dispatch = useDispatch();
   
    useEffect(() => {
        if(likes !== null){
            setLiked(false);
            let cont=0;
            likes.map(like => {
                cont++;
                if(like.comentarioId === comentario.id && like.usuarioId === usuarioRedux.id){
                    setLiked(true)
                }
            })
            setContadorLikes(cont);
        }else{
            setLiked(false);
            setContadorLikes(0);
        }
    },[likes])

    const handleLike = async () => {
        const body = {  
            comentarioId: comentario.id,
            alertaId: comentario.alertaId,
            usuarioId: usuarioRedux.id
        }

        let positionArray = null;
        if(todosLosLikes !== null){
            for(let i=0 ; i < todosLosLikes.length ; i++){
                if(todosLosLikes[i].comentarioId === comentario.id && todosLosLikes[i].usuarioId === usuarioRedux.id){
                    positionArray=i;
                    break;
                }
            }

        }
        
        if(liked){
            dislike(body);
            dispatch(borrarLikeComentarioRedux(body, positionArray));
            await socket.emit("daDislikeComentario", body,positionArray);
            
        }else{
            like(body);
            dispatch(daLikeComentarioRedux(body));
            await socket.emit("daLikeComentario", body);
        }
    }
    

    return(
        <View style={styles.containerComentario}>
            <View style={styles.containerDatosComentario}>
                <View style={styles.containerUsuario}>
                    <Text style={styles.usuario}><Text style={styles.nombreUsuario}>{comentario.usuario.nombre} {comentario.usuario.apellido}</Text> </Text>
                    <Text style={styles.datoComentario}>{comentario.fecha.slice(11,16)}</Text>
                    <Text style={{marginRight: '9%'}}>{comentario.comentario}</Text>
                </View>
            </View>
            

            <View style={styles.containerBotonLike}>
                    <Pressable style={{marginHorizontal: '5%'}} onPress={handleLike}>
                        <MaterialCommunityIcons
                                    name={liked ? "heart" : "heart-outline"}
                                    size={20}
                                    color={liked ? "red" : "#AAAAAA"}
                        />
                    </Pressable>
                    <Text style={styles.datolike}>{contadorLikes}</Text>
            </View>
            
        
        </View>
        
    )
}