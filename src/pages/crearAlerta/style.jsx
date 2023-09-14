import { StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
      
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      height: "100%"
      
    },
    containerMapa: {
        width: "100%",
        height: "100%",
        backgroundColor: 'pink',
    },
    containerBotones: {
        position: "absolute",
        backgroundColor: "black",
        borderTopWidth: 1,
        borderColor: "#E5E5E5",
        bottom: hp(0),
        width: "100%",
        height: hp(8),
        flexDirection: "row",
        justifyContent: "space-around",
        zIndex: 6,
        /* borderTopRightRadius: 50,
        borderTopLeftRadius: 50 */
    },
    containerBoton: {
        borderRadius: 100,
        paddingTop: hp(0.5),
        width: 55,
        height: 55,
        marginTop: "1%",
        alignItems: "center",
    },
     
    boton: {
        alignItems: "center",
        justifyContent: "center"
       
    },
    textBoton: {
        fontSize: 12, 
    },
    containerTituloAlerta: {
        marginTop: hp(2),
        alignItems: "center",
    },
    textoTituloAlerta: {
        fontSize: wp(4)
    },
    containerTextoAlerta: {
        alignItems: "center",
        marginBottom: hp(2),
    },
    containerModal: {
        width: "100%",
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
        flexDirection: "column"
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

    textAlertas: {
        //textAlign: "center",
        marginLeft: "10%",
        marginTop: "10%",
        marginBottom: "4%",
        fontWeight: 'bold'
    },
    text: {
        //textAlign: "center",
        //marginLeft: "10%",
        flex: 2,
        //marginTop: "4%",
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
        height: "36%",
        flexDirection: 'row',
        //justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#1c405f',
        marginHorizontal: '5%',
        marginVertical: '1%',
        borderRadius: 13,
        paddingLeft: "5%",
        color: 'black',
        /* justifyContent:'center', */
        alignItems:'center'
      },
      button:{
        width: "55%",
        height: "10%",
        backgroundColor: '#0140b1',
        alignSelf: "center",
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        margin:'2%'
      },

});

export default styles;
  