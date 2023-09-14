import React,{useState, useRef, useEffect} from "react"
import { View, Text, TouchableOpacity, Alert} from "react-native"
import styles from "./styles"
import { Button, Dialog, Portal, Provider } from 'react-native-paper';
import {obtenerAlertasPorFechaYTipo} from "../../data/alertas";
import MapaProblematico from "../MapaProblematico";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Icons from '@expo/vector-icons/FontAwesome5';
import IconFA5 from 'react-native-vector-icons/FontAwesome';
import { AlertTriangle } from 'lucide-react-native';
import Modal from "../modalSelectAlerta";
import ModalFecha from "./modalFecha";
import ModalHora from "./modalHora";

export default function GenerarReporte({navigation, setModalLugaresProblematicos}) {

    const [valorSeleccionado, setValorSeleccionado] = useState("Persona sospechosa");
    const [mostrarMapa, setMostrarMapa] = useState(false);
    const [alertas, setAlertas] = useState(null);
    const [visibleAlertaFaltaDatos, setVisibleAlertaFaltaDatos] = useState(false);
    const [visibleAlertaInicialMayor, setVisibleAlertaInicialMayor] = useState(false);
    const [isModalOpen, setisModalOpen] = useState(false);
    const [fechai, setFechai] = useState('')
    const [fechaf, setFechaf] = useState('')
    const [fechaInicialSeleccinada, setFechaInicialSeleccinada] = useState({
        fecha: "",
        hora: ""
    });
    const [fechaFinalSeleccinada, setFechaFinalSeleccinada] = useState({
        fecha: "",
        hora: ""
    })

    const [abrirCalendarioFechaInicial, setAbrirCalendarioFechaInicial] = useState(false);
    const [abrirCalendarioFechaFinal, setAbrirCalendarioFechaFinal] = useState(false);
    const [abrirHoraInicial, setAbrirHoraInicial] = useState(false);
    const [abrirHoraFinal, setAbrirHoraFinal] = useState(false);

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
    
    useEffect (()=>{
        let nDate = new Date().toLocaleString('es-CL', {
            timeZone: 'America/Santiago'
        });
        let fechaYhora = nDate.split(" ");
        let fechaComa = fechaYhora[0].split(",");
        let fechaBarra = fechaComa[0].split("-");      
        let fechaSeparada = fechaBarra[0] + "/" + fechaBarra[1] + "/" + fechaBarra[2];
        let horaSeparada = fechaYhora[1];
        setFechaInicialSeleccinada({fecha: fechaSeparada, hora: horaSeparada});
        setFechai(fechaBarra[0] + "/" + fechaBarra[1] + "/" + fechaBarra[2])
        setFechaFinalSeleccinada({fecha: fechaSeparada, hora: horaSeparada})
        setFechaf(fechaBarra[0] + "/" + fechaBarra[1] + "/" + fechaBarra[2])
    },[]) 
    
    
    const pickerRef = useRef(null);

    function open() {
      pickerRef.current.focus();
    }
    
    function close() {
      pickerRef.current.blur();
    } 

    const guardarFecha = (date,tiempo) => {       
            setAbrirCalendarioFechaInicial(false);
            setAbrirCalendarioFechaFinal(false)
            if(date.day<10){
                newDay= "0" + date.day
            }else{
                newDay= date.day
            }
            if(date.month<10){
                newMonth= "0" + date.month
            }else{
                newMonth= date.month
            }
            const fechaCortada =  newDay  + "/" + newMonth + "/" + date.year;
            if(tiempo === "inicial"){  
                setFechai(fechaCortada) 
                setFechaInicialSeleccinada({...fechaInicialSeleccinada, fecha: fechaCortada})
            }else{
                setFechaf(fechaCortada) 
                setFechaFinalSeleccinada({...fechaFinalSeleccinada, fecha: fechaCortada})
            }
    }

    const obtenerAlertas = () => {
       
        if(fechaInicialSeleccinada.fecha === "" || fechaInicialSeleccinada.hora === "" || fechaFinalSeleccinada.fecha === "" || fechaFinalSeleccinada.hora === ""){
            setVisibleAlertaFaltaDatos(true);
        }else{

            const fechaInicialDividida = fechaInicialSeleccinada.fecha.split("/");
            const fechaFinalDividida = fechaFinalSeleccinada.fecha.split("/");
            const horaInicalDividida = fechaInicialSeleccinada.hora.split(":");
            const horaFinalDividida = fechaFinalSeleccinada.hora.split(":");

            if(parseInt(fechaInicialDividida[1]) > parseInt(fechaFinalDividida[1])){
                setVisibleAlertaInicialMayor(true)
                return null;
            }
            if (parseInt(fechaInicialDividida[1]) === parseInt(fechaFinalDividida[1]) && parseInt(fechaInicialDividida[0]) > parseInt(fechaFinalDividida[0])) {
                setVisibleAlertaInicialMayor(true)
                return null;
            } 
            if (parseInt(fechaInicialDividida[1]) === parseInt(fechaFinalDividida[1]) && parseInt(fechaInicialDividida[0]) === parseInt(fechaFinalDividida[0]) 
            && parseInt(horaInicalDividida[0]) > parseInt(horaFinalDividida[0])){
                setVisibleAlertaInicialMayor(true)
                return null;
            }
            if (parseInt(fechaInicialDividida[1]) === parseInt(fechaFinalDividida[1]) && parseInt(fechaInicialDividida[0]) === parseInt(fechaFinalDividida[0]) 
            && parseInt(horaInicalDividida[1]) > parseInt(horaFinalDividida[1])){
                setVisibleAlertaInicialMayor(true)
                return null;
            }
           
            const fechaInicialModificada = fechaInicialDividida[2] + "-" + fechaInicialDividida[1] + "-" + fechaInicialDividida[0]+"T"+fechaInicialSeleccinada.hora+".000Z";
            const fechaFinalModificada = fechaFinalDividida[2] + "-" + fechaFinalDividida[1] + "-" + fechaFinalDividida[0]+"T"+fechaFinalSeleccinada.hora+".000Z";
            valorSeleccionado.replace(" ","%20");

           
            obtenerAlertasPorFechaYTipo(valorSeleccionado,fechaInicialModificada,fechaFinalModificada).then((result) => { 
                setAlertas(result);       
                setMostrarMapa(true);
            }).catch((err) => {
                if(err.response.status === 404){
                    Toast.show({   
                        type: "error",
                        position: "top",
                        text1: "No se encontraron alertas.",
                        visibilityTime: 3000,
                    })
                }else{
                    Toast.show({
                        type: "error",
                        position: "top",
                        text1: "Ocurrió un error al obtener las alertas.",
                        visibilityTime: 3000,
                    })
                }
            }); 
        } 
    }

    const guardarHora = (hora,tiempo) => {
            setAbrirHoraInicial(false);
            setAbrirHoraFinal(false);
            if(tiempo === "inicial"){
                setAbrirHoraInicial(false);
                setFechaInicialSeleccinada({...fechaInicialSeleccinada, hora: hora})
            }else{
                setAbrirHoraFinal(false); 
                setFechaFinalSeleccinada({...fechaFinalSeleccinada, hora: hora})
            }
    }

    
    return (
        <> 
        {
            mostrarMapa ? <MapaProblematico setMostrarMapa={setMostrarMapa} alertas={alertas} navigation={navigation}/> : null
        }
        {isModalOpen ? 
            <Modal 
            setisModalOpen={setisModalOpen}
            setTipoAlerta={setValorSeleccionado}
            tipoAlerta={valorSeleccionado}
            >
            </Modal>
        :(null)}
        {
            abrirCalendarioFechaInicial ? 
            <ModalFecha 
            setisModalOpen={setAbrirCalendarioFechaInicial}
            tiempo={"inicial"}
            guardarDatos={guardarFecha}
            >

            </ModalFecha>
            :(null)
        }
        {
            abrirCalendarioFechaFinal ? 
            <ModalFecha 
            setisModalOpen={setAbrirCalendarioFechaFinal}
            tiempo={"final"}
            guardarDatos={guardarFecha}
            >

            </ModalFecha>
            :(null)
        }
        {
            abrirHoraInicial ? 
            <ModalHora
            setisModalOpen={setAbrirHoraInicial}
            tiempo={"inicial"}
            guardarDatos={guardarHora}
            >

            </ModalHora>
            :(null)
        }
        {
            abrirHoraFinal ? 
            <ModalHora
            setisModalOpen={setAbrirHoraFinal}
            tiempo={"final"}
            guardarDatos={guardarHora}
            >

            </ModalHora>
            :(null)
        }


         <View style={styles.containerModalLugaresProblematicos}>
         <Provider >
             <View style={{height: '13%', width: '100%', flexDirection: 'row'}}>
                <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', marginRight: '55%', alignItems: 'center'}} onPress={()=>{setModalLugaresProblematicos(false)}}>
                    <Icons name="chevron-left" size={20} color='#ffffff'></Icons>
                </TouchableOpacity>
                
                <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', alignItems: 'center'}} onPress={()=>{navigation.navigate("Home")}}>
                    <Icons name="times" size={20} color='#ffffff'></Icons>
                </TouchableOpacity>
            </View>
            <View style={styles.modalLugares}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Generar reporte</Text>
                </View>
                
                <View style={styles.containerLugares}>
                    <Text style={styles.tituloSelect}>Tipo de alerta</Text>
                    <TouchableOpacity onPress={()=>setisModalOpen(true)}>
                        <View style={styles.textInput}>
                            <View style={{justifyContent: "center",paddingRight:'5%', alignItems:'flex-start'}}>
                                {pinTipoAlerta(valorSeleccionado)}
                            </View>
                                <Text style={styles.text}>{valorSeleccionado}</Text>
                            <View style={{justifyContent: "center",paddingRight:'5%'}}><Icons name="chevron-down" size={15} color="black"></Icons></View>
                        </View>
                    </TouchableOpacity>
                </View >
                <View style={styles.containerInputFechas}>
                    <View style={styles.containerTituloFecha}>
                        <Text style={styles.tituloFecha}>Fecha inicial</Text>
                        <Text style={styles.tituloHora}>Hora inicial</Text>
                    </View>
                    <View style={styles.containerFechaInicio}>
                       <TouchableOpacity style={{width: "40%",height: "80%",
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#ffffff',
                            borderRadius: 13,
                            paddingLeft: "5%",
                            }} onPress={()=>setAbrirCalendarioFechaInicial(true)}>
                            <Text style={{color: '#ffffff'}}> {fechai} </Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={{width: "40%",height: "80%",
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#ffffff',
                            borderRadius: 13,
                            paddingLeft: "5%",
                            }} onPress={()=>setAbrirHoraInicial(true)}>
                            <Text style={{color: '#ffffff'}}> {fechaInicialSeleccinada.hora} </Text>
                       </TouchableOpacity>
                    </View>
                    <View style={styles.containerTituloFecha}>
                        <Text style={styles.tituloFecha}>Fecha final</Text>
                        <Text style={styles.tituloHora}>Hora final</Text>
                    </View>
                    <View style={styles.containerFechaFinal}>
                        <TouchableOpacity style={{width: "40%", height: "80%",
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#ffffff',
                            borderRadius: 13,
                            paddingLeft: "5%",
                            }} onPress={()=>setAbrirCalendarioFechaFinal(true)}>
                            <Text style={{color: '#ffffff'}}> {fechaf} </Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={{width: "40%", height: "80%",
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#ffffff',
                            borderRadius: 13,
                            paddingLeft: "5%",
                            }} onPress={()=>setAbrirHoraFinal(true)}>
                            <Text style={{color: '#ffffff'}}> {fechaFinalSeleccinada.hora} </Text>
                       </TouchableOpacity>
                    </View>
                </View>
                
                
            </View> 
            <View style={styles.containerBotonMostrarLugares}>
                <TouchableOpacity style={styles.botonMostrarMapa} onPress={obtenerAlertas} >
                    <Text style={styles.textoBoton}>Generar</Text>
                </TouchableOpacity> 
            </View> 
            <Provider >
                    <Portal>
                        <Dialog style={{backgroundColor: "white"}} visible={visibleAlertaFaltaDatos} onDismiss={()=>setVisibleAlertaFaltaDatos(false)}>
                            <Dialog.Icon icon="alert-circle-outline" />
                            <Dialog.Title>
                                <Text style={styles.textoAlerta}>Por favor, rellene las fechas y horas.</Text>
                            </Dialog.Title>
                            <Dialog.Actions>
                                <Button onPress={()=>setVisibleAlertaFaltaDatos(false)}>
                                    <Text style={styles.textoBotonAlerta}>Volver</Text>
                                </Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
            </Provider>

            
                    <Portal>
                        <Dialog visible={visibleAlertaInicialMayor} onDismiss={()=>setVisibleAlertaInicialMayor(false)}>
                            <Dialog.Content style={{ flex:1,width: '100%', justifyContent: "center", alignItems: 'center', paddingBottom: '20%', paddingTop: '15%'}}>
                                <View style={{width: '13%',
                                    height: '15%',
                                    padding :'13%',
                                    marginTop: '6%',
                                    justifyContent: "center",
                                    backgroundColor: 'red',
                                    alignItems: 'center',
                                    borderRadius: 100,}}>
                                    <AlertTriangle size={60} color='#ffffff'></AlertTriangle>
                                </View>   
                            </Dialog.Content>
                            <Dialog.Content style={styles.containerAlerta}>
                                <Text style={styles.textoAlerta}>La fecha inicial no puede ser</Text>
                                <Text style={styles.textoAlerta}>mayor a la fecha final</Text>
                            </Dialog.Content>
                            <Dialog.Actions style={{justifyContent:'center',alignItems:'center', marginBottom:'5%'}}>
                                <Button style={styles.BotonSi} onPress={()=>setVisibleAlertaInicialMayor(false)}>
                                    <Text style={styles.textoBotonAlerta}>Volver</Text>
                                </Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
            </Provider>
        </View>
        </>

       
    )
}