import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
   
    containerModal: {
        //position: "absolute",
        width: "100%",
        zIndex: 3,
        height: "100%"
    },
    containerTitle: {
        width: "100%",
        justifyContent: "center",
        height: "100%",
    },
    title: {
        fontSize: wp(10),
        paddingTop: hp(2.5),
        paddingLeft: wp(2)
    },
    containerBotonesAlerta: {
        width: "100%",
        height: "100%",
        backgroundColor: 'pink'
        //flexDirection: "column",
        
    },
    fila: {
        marginTop: "8%",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    containerAlerta:{
        justifyContent: "center",
        alignItems: "center",
        width: "36%",
    },
    alertaLuz: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 8,
        paddingHorizontal: 14,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
    },
    
    alertaSospechoso: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#E5E5E5",
        shadowColor: "#000",
        shadowOffset: {
            width: 0, 
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    alertaActividadSospechosa: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    alertaEscasaIluminacion: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        shadowColor: "#000",
        borderWidth: 1,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ModalReportarAlerta: {
        width: "100%",
        height: "100%",
    },
    textAlertas: {
        //textAlign: "center",
        marginLeft: "10%",
        marginTop: "10%",
        marginBottom: "2%",
        fontWeight: 'bold',
        
    },
    text: {
        //textAlign: "center",
        //marginLeft: "10%",
        flex: 2,
        marginTop: "5%",
        color:'grey'
    },
    containerAlertaSola: {
        backgroundColor: "red"
    },
    alertaViolencia: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 13,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    alertaRobo: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textInput:{
        height: 52,
        flexDirection: 'row',
        //justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#1c405f',
        marginHorizontal: '5%',
        marginVertical: '1%',
        borderRadius: 13,
        paddingLeft: "5%",
        color: 'black',
        
      },
      textInput2:{
        height: '75%', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#1c405f',
        marginHorizontal: '5%',
        marginVertical: '1%',
        borderRadius: 13,
        paddingLeft: "5%",
        color: 'black',
        //backgroundColor: 'orange'
        
      },
      button:{
        width: "55%",
        height: 45,
        backgroundColor: '#0140b1',
        alignSelf: "center",
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        margin:'1%'
      },
      containerFoto: {
        //backgroundColor:'yellow',
        //flex: 2,
        width: "100%",
        height: 550,
        //marginVertical: '50%',
        /* justifyContent: 'center',
        alignItems: "center", */
        marginHorizontal: '5%',
        marginTop: "5%",
    },
    foto: {
        //flex:1,
        width: "90%",
        height: '100%',
        borderRadius: 20
    },
    botonCrearAlerta: {
        width: wp(55)
    },
    containerTituloAlerta: {
        alignItems: "center",
        marginTop: hp(2),
        
    },
    tituloAlerta: {
        fontSize: wp(5),
    },
    containerTextoAlerta: {
        alignItems: "center",
    },
    textoAlerta:{
        fontSize: wp(3.5),
    },
    containerBotonAlerta: {
        justifyContent: "center",
    },
    textoBotonAlerta: {
        color: "#01579b"
    },
    containerAlertaCerrarSesion: {
        marginTop: hp(1),
        marginBottom: hp(2),
        justifyContent: 'center',
        alignItems: "center",
    },
    textoAlertaCerrarSesion: {
        fontSize: wp(5),
        fontWeight: 'bold'
    },
    BotonSi: {
        paddingHorizontal: '19%',
        paddingVertical: '3%',
        backgroundColor: "#0140b1",
        borderRadius: 15
    }, 
    BotonNo: {
        paddingHorizontal: '19%',
        paddingVertical: '3%',
        backgroundColor: "#BFCEE6",
        borderRadius: 15
    },
    containerError: {
        width: wp(88),
        marginTop: hp(1),
        marginLeft: wp(8)
    },
    textoError: {
        color: "red"
    }, 
})

export default styles;