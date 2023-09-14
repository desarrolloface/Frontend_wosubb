import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerComentarios: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 10
    },
    containerNav: {
        width: "100%",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "#E5E5E5",
        
    },
    containerTitle: {
        flex: 2,
        width: "100%",
        marginTop: hp(2),
        paddingBottom: hp(1),
        alignItems: "center",
        backgroundColor: 'pink'
    },
    title: {
        fontWeight: 'bold',
        fontSize: wp(7),       
    },
     botonCerrar: {
        borderRadius: 100,
        marginLeft: wp(2)
    },
    iconCerrar: {
        borderRadius: 100,
    },
    containerErrorComentarios: {
        width: "100%",
        marginTop: hp(4),
        paddingLeft: wp(5),
    },
    textoErrorComentario: {
        fontSize: wp(5)
    },
    containerCardComentarioPantallaGrand: {
        width: "100%",
        marginBottom: hp(6),
        height: hp(59),
    },
     containerCardComentarioPantallaPeque: {
        width: "100%",
        marginBottom: hp(6),
        height: hp(60),
    },
    containerUniqueCardComentario: {
        width: "100%",
        marginTop: hp(-2),
        alignItems: "center",
        marginBottom: hp(2),
    },
    containerTextInputComentario: {
        flex:0.3,
        width: "100%", 
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: "row",  
    },
    textInput: {
        width: wp(73),
        height: hp(7),
        marginLeft: wp(5),
        paddingLeft: wp(4),  
        backgroundColor: '#f2f5fb',
        borderRadius: 100, 
    },
    containerBotonEnviar: {
        width: wp(18),
        height: "100%",
        justifyContent: "center"
       
    },
    botonEnviar: {
        width: 50,
        height: 50,
        marginLeft: wp(5),
        backgroundColor: '#01579b',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
    textoBotonEnviar: {
        fontSize: wp(4)
    },
    containerInputEditComentario: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    containerTituloAlerta: {
        alignItems: "center",
    },
    textoAlertaEditar: {
        fontSize: wp(5),
    },
    textoBotonAlertaEditar: {
        color: "#01579b",
    }

})
export default styles