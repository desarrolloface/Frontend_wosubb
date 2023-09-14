import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerModificarContraseña: {
        position: "absolute",
        backgroundColor: "#0140b1",
        width: "100%",
        zIndex: 8,
        height: "100%"
    },
    modificarContraseña: {
        width: "100%",
        height: "100%",
    },
    containerTitle: {
        width: "100%",
        marginTop: hp(4),
        alignItems: "center",
    },
    title: {
        fontSize: wp(6),
        color: '#ffffff',
        fontWeight: 'bold'
    },
    containerInputsModificarContra: {
        width: "100%",
        alignItems: "center",
        marginTop: hp(16)
    },
    input: {
        width: "88%",
        marginTop: hp(4),
        backgroundColor: "#0140b1",
        
    },
    textInput:{
        flexDirection: 'row',
        height: 50,
        borderWidth: 1,
        borderColor: '#ffffff',
        //color: '#ffffff',
        marginHorizontal: '5%',
        marginVertical: '1%',
        justifyContent: 'center',
        paddingLeft: "5%",
        borderRadius: 13
    },
    containerError: {
        width: wp(100),
        marginTop: hp(0.5),
        paddingLeft: wp(6.5),
    },
    textoError: {
        color: "red",
    },
    containerBoton: {
        width: "100%",
        marginTop: hp(18),
        marginBottom: hp(10),
        alignItems: "center",
    },
    botonCambiar: {
        width: wp(55),
    },
    button:{
        width: "55%",
        height: "60%",
        backgroundColor: '#ffffff',
        alignSelf: "center",
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        marginTop: '10%',
        margin:'1%'
      },
    
})

export default styles;