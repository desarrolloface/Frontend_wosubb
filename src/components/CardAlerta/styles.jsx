import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerAlerta: {
        width: "100%",
        marginVertical: hp(0.5),       
        alignItems: "center",
        justifyContent: "center",
    },
    AlertaCard: {
        width: "94%",
        backgroundColor: "#f2f5fb",
        paddingVertical: hp(1.2),
        borderRadius: 20,
        flexDirection: "row",
    },
    containerTipo:{
        width: wp(43),
        paddingHorizontal: wp(2),
        paddingBottom: hp(0.5),
        
    },
    textoTipo:{
        fontSize: wp(3.5),
        marginTop: hp(3),
        fontWeight: 'bold'
    },
    textoHora: {
        fontSize: wp(3),
    },
    containerDescripcion: {
        width: "100%",
        marginTop: hp(0.5),
        
    },
    containerImagen: {
        width: "yellow"
    },
    containerBotones: {
        marginVertical: hp(3.5),
        marginHorizontal: wp(3),
    },
    containerBotonLike: {
        flexDirection: "row",
    },
    containerFecha: {
        flex: 1,
        marginVertical: hp(4),
        marginHorizontal: wp(3),
    },
    likes: {
        fontSize: wp(3.5),
        marginLeft: wp(0.8)
    },
    containerBotonComentario: {
        flexDirection: "row",
    },
    comentarios: {
        fontSize: wp(3.5),
        marginLeft: wp(0.8)
    },
    botonComentarios: {
        flexDirection: "row"
    },
    descripcion: {
        fontSize: wp(3),
        width: wp(40)
    }

})

export default styles;