import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   containerModificarTipos:{
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "#0140b1",
        zIndex: 10,
   },
   modificarTipos: {
      flex: 10,
      width: "100%",
      /* height: "%", */
   },
   containerTitle: {
      width: "100%",
      marginTop: hp(4.5),
      marginBottom: hp(5.5),
      alignItems: "center",
   },
   title: {
      fontSize: wp(5.6),
      color: '#ffffff',
      fontWeight: 'bold'
   },
   containerInputs: {
      width: "100%",
      marginTop: hp(16),
   },
   containerSelect: {
      width: "100%",
      alignItems: "center",
      flexDirection: 'row'
   },
   tituloSelect: {
      fontSize: wp(4.5),
   },
   select: {
      width: wp(70),
      backgroundColor: "#E5E5E5",
      marginTop: hp(2),
   },
   containerInputCorreo: {
      width: "100%",
      marginTop: hp(3),
      alignItems: "center",
   },
   textoInputCorreo: {
      fontSize: wp(4.5),
   },
   inputCorreo: {
      width: wp(88),
      height: 50,
      justifyContent:'center',
      backgroundColor: "#0140b1",
      borderWidth: 1,
      borderColor: "#ffffff",
      borderRadius: 15,

   },
   containerError: {
      width: wp(100),
      paddingLeft: wp(6),
   }, 
   textoError: {
      color: "red",
   },
   containerBotonModificar: {
      flex: 2,
      width: "100%",
      marginTop: hp(8),
      //marginBottom: hp(15),
      justifyContent:'center',
      alignItems: "center",
      /* backgroundColor: 'pink' */
   },
   boton: {
      width: wp(50),
      height: 45,
      borderRadius: 15,
      backgroundColor: "#ffffff",
      justifyContent:'center',
      alignItems: "center",
   },
   botonUsuario: {
      width: wp(25),
      height: 35,
      marginLeft: '7%',
      justifyContent: 'center',
      alignItems: "center",
      borderRadius: 20
   },
   botonAdmin: {
      width: wp(35),
      height: 35,
      marginLeft: '3%',
      justifyContent: 'center',
      alignItems: "center",
      borderRadius: 20, 
   },
})

export default styles;