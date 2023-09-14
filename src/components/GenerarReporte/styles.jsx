import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerModalLugaresProblematicos:{
        backgroundColor: "#0140b1",
        width: "100%",
        zIndex: 7,
        height: "100%"
    },
    modalLugares: {
        flex: 10,
        width: "100%",
    },
   
    containerTitle: {
        width: "100%",
        marginTop: hp(5),
        marginBottom: hp(7),
        alignItems: "center",
    },
    title: {
        fontSize: wp(5.6),
        color: '#ffffff',
        fontWeight: 'bold'
    },
    containerLugares: {
        width: "100%",
        height: "20%",
        marginLeft: hp(2.5),
        //marginTop: hp(10),
        //marginBottom: hp(1),
        //justifyContent: "center",
        //alignItems: "center",
        //backgroundColor: "pink",
        //zIndex: 7
    },
    tituloSelect: {
        marginLeft: wp(5),
        fontSize: wp(4),
        color: '#ffffff',
    },
    
    select: {
        marginTop: hp(1),
        width: "88%",
        backgroundColor: "#E5E5E5",
        zIndex: 20,
        
    },
    containerInputFechas: {
        width: "100%",
        //marginTop: hp(4),
        //backgroundColor: 'green'
    },
    containerTituloFecha: {
        flexDirection: "row",
        width: "100%",
        marginTop: hp(2),
        paddingLeft: wp(5),
        //backgroundColor: 'grey'
    },
    tituloFecha: {
        flex: 1,
        marginLeft: hp(2),
        fontSize: wp(3.7),
        color: '#ffffff',
    },
    tituloHora: {
        flex:1,
        marginLeft: hp(5),
        fontSize: wp(3.7),
        color: '#ffffff',
    },
    containerFechaInicio: {
        marginTop: hp(1),
        width: "100%",
        height: 70,
        flexDirection: "row",
        justifyContent: "space-around",
        //marginBottom: hp(2),
        //backgroundColor: 'pink'
    },
    containerInputFecha: {
        width: wp(40),
    },
    containerFechaFinal: {
        marginTop: hp(1.3),
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: hp(2),
        //backgroundColor: 'yellow',
        height: 70,
    },
    containerBotonMostrarLugares: {
        flex: 1,
        width: "100%",
        paddingTop: hp(1), 
        //marginBottom: hp(3),
        /* height: 100, */
        alignItems: "center",
        //backgroundColor: 'yellow',
    },
    botonMostrarMapa: {
        width: wp(55),
        //padding: hp(0.4),
        height: 60,
        backgroundColor: "#ffffff",
        borderRadius:20,
        justifyContent: 'center',
        alignItems:'center'
    },
    textoBoton: {
        fontSize: wp(3.5),
        color: "#01579b",
    },
    textoAlerta: {
        fontSize: wp(4),
    },
    textoBotonAlerta:{
        fontSize: wp(3.5),
        color: "#ffffff",
    },
    textInput:{
        width:'90%',
        height: "65%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1c405f',
        //marginHorizontal: '5%',
        marginVertical: '1%',
        borderRadius: 13,
        paddingLeft: "5%",
        backgroundColor: '#ffffff'
        
    },
      text: {
        //textAlign: "center",
        //marginLeft: "10%",
        flex: 2,
        //marginTop: "5%",
    },
    containerAlerta: {
        marginTop: hp(1),
        marginBottom: hp(2),
        justifyContent: 'center',
        alignItems: "center",
    },
    BotonSi: {
        paddingHorizontal: '19%',
        paddingVertical: '3%',
        backgroundColor: "#0140b1",
        borderRadius: 15
    },
})

export default styles;