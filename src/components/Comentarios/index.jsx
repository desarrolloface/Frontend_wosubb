import React, {useEffect, useState, useRef} from "react"
import { View, Text, TouchableOpacity, Keyboard,ScrollView, Dimensions, TextInput } from "react-native"
import CardComentario from '../CardComentario';
import styles from "./styles"
/* import {editarComentario} from "../../data/comentarios";
import {  Dialog, Portal, Paragraph, Button, Provider } from 'react-native-paper'; */
import { useSelector, useDispatch } from "react-redux";
import { crearComentario } from "../../data/comentarios";
import { guardarComentarioRedux, editarComentarioRedux } from "../../redux/actions/comentariosActions";
import Toast from 'react-native-toast-message';
import formatText from "../../utils/modificarPrimeraLetra";
import Icons from '@expo/vector-icons/FontAwesome5';
import {ArrowUp } from 'lucide-react-native';



export default function Comentarios({setVerComentarios, socket, alertaId, notlike}) {

    const [inputComentario, setInputComentario] = useState("");
    const [comentarios, setComentarios] = useState(null);
    const [iconoInput, setIconoInput] = useState(false);
    /* const [confirmacion, setConfirmacion] = useState(false); */
    const comentariosRedux = useSelector(state => state.comentarios.comentarios);
    const likesComentariosRedux = useSelector(state => state.likesComentario.usuarios);
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    const [likesComentarios, setLikesComentarios] = useState(null);
    /* const [comentarioEditado, setComentarioEditado] = useState(null);
    const [modalEditar, setModalEditar] = useState(false); */
    const dispatch = useDispatch();
    const dimensionesPantalla = Dimensions.get("window");  
    const scrollRef = useRef(null);
   
    useEffect(() => {
        const backAction = () => {
          setVerComentarios(false);
          return true;
        };
        
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setIconoInput(false)
        });

        /* const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        ); */
    
        return () => {
            //backHandler.remove(); 
            hideSubscription.remove();
        };
    }, []);

      useEffect(() => {
        if(comentariosRedux !== null){
            let comentariosFiltrados = comentariosRedux.filter(comentario => comentario.alertaId === alertaId);
            let comentariosOrdenados = comentariosFiltrados.sort((a, b) => a.id > b.id);
            setComentarios(comentariosOrdenados);
        }

      }, [comentariosRedux])

      useEffect(() => {
        if(likesComentariosRedux !== null){
            setLikesComentarios(likesComentariosRedux);
        }else{
            setLikesComentarios(null);
        }

      },[likesComentariosRedux,comentariosRedux])

      const filtrarLikesComentarios = (comentarioId) => {
        if(likesComentarios !== null && likesComentarios !== undefined){
            const likes = [];
            likesComentarios.map(like => {
                if(like.comentarioId === comentarioId){
                    likes.push(like)
                }
            })
            return likes;
        }else{
            return null
        }
    }
      
      const crearUnComentario = async () => {
        let inputComentarioEditado = inputComentario.replace("  ", '_');
        if(inputComentario !== "" && inputComentario !== " "){
            if(!inputComentarioEditado.includes("_")){
                const body = {
                    alertaId: alertaId,
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
        
                Keyboard.dismiss()
                if (scrollRef && scrollRef.current) {
                    scrollRef.current?.scrollToEnd();
                }
                setInputComentario("");
                /* setConfirmacion(true) */
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
      }

    return (
    <View style={styles.containerComentarios} >
        <View style={{flexDirection:'row', paddingBottom: '10%'}}>
            <TouchableOpacity style={{marginTop:'18%', paddingLeft: '10%', paddingRight: '10%'}} onPress={()=>{setVerComentarios(false)}}>
                <Icons name="chevron-left" size={18} color='black'></Icons>
            </TouchableOpacity>
            <View style={{marginTop:'16%'}}>
                <Text style={styles.title}>Comentarios</Text> 
            </View>
        </View>
            <ScrollView style={dimensionesPantalla.height < 700 ? styles.containerCardComentarioPantallaPeque:styles.containerCardComentarioPantallaGrand} >
                    {
                        comentarios !== null && comentarios[0] !== undefined ? (
                            comentarios.map((comentario, index) => {
                                return (
                                    <View style={styles.containerUniqueCardComentario} key={index}>
                                        <CardComentario comentario={comentario} todosLosLikes={likesComentarios} socket={socket} likes={filtrarLikesComentarios(comentario.id)} alertaId={alertaId}/>
                                     </View>
                                )
                            })
                        ) : (
                            <View style={styles.containerErrorComentarios}> 
                                <Text style={styles.textoErrorComentario}>No se encontraron comentarios.</Text>
                            </View>
                        )
                    }
            </ScrollView>    

            {notlike !== false ? <View style={styles.containerTextInputComentario}> 
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
            :(null)}
            
            <View style={{flex:2}}></View> 

        {/* <Provider>
            <Portal>
            <Dialog style={{backgroundColor: "white"}} visible={confirmacion} onDismiss={()=>setConfirmacion(false)}>
                <Dialog.Title>¿Estas seguro que quieres comentar lo siguiente?</Dialog.Title>
                <Dialog.Content>
                <Paragraph>{inputComentario}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                <Button onPress={()=>setConfirmacion(false)}>Cancelar</Button>
                <Button onPress={crearUnComentario}>Confirmar</Button>
                </Dialog.Actions>
            </Dialog>
            </Portal>
        </Provider> */}
        
    </View>
    )
}
