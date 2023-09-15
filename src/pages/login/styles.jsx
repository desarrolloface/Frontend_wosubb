import { StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const styles = StyleSheet.create({
  container: {
    flex:1,
    // width: '100%',
    // height: '100%',
    backgroundColor: '#0140b1',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container1: {
    flex:0.81, 
    backgroundColor: '#ffffff', 
    width: '100%', 
    borderTopRightRadius: 50, 
    borderTopLeftRadius: 50,  
  },
  text1:{
    color:'#ffffff',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: '25%'
  },
  text:{
    color: '#0140b1',
    fontWeight: 'bold',
    //padding: 5
  },
  textInput:{
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1c405f',
    marginHorizontal: '5%',
    marginVertical: '1%',
    borderRadius: 13,
    paddingLeft: "5%",
    color: 'black',
    
  },
  textTitle:{
    fontWeight: "700",
    fontSize: 28,
    color: '#0140b1',
    fontWeight: 'bold',
    fontStyle: 'normal'
  },
  title:{
    flex:1,
    alignItems: "center",
    paddingTop: '10%',
  }, 
  button:{
    width: 200,
    height: 50,
    backgroundColor: '#0140b1',
    alignSelf: "center",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    //margin:'7%'
  },
  imegen:{
    width: 50,
    height: 85,
    marginHorizontal: '1.5%',
    //marginTop: '1%'
  },
  containerError: {
    width: "100%",
    paddingLeft: '6%',
  },
  textoError: {
    color: "red"
  }
});

export default styles;
  