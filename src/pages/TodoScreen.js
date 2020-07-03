import  React , { useState , useEffect} from 'react';
import {View,Image, Text, StyleSheet, FlatList, Button} from 'react-native';
import { ListItem, Icon, Overlay, Input } from 'react-native-elements';
import { database } from '../config/firebase';


const TodoScreen = ({ navigation, route }) => {
  const { current, next } = route.params;

  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [visible, setVisible] = useState(false);
 
  const table ='task';

  const toggleOverlay = () => {
    setVisible(!visible);
    setTitle('');

  };
  const addItem = async  () => {
    
       try{ 
         database.collection(table).add({
            title: title,
            status: current
        });
        setVisible(false);
      } catch(error){
         alert(error.message);
      }
      
  };
  const removeItem = async (id) => {
    try {
        database.collection(table).doc(id).delete();
    } catch (error) {
        alert(error.message);

    }

   
};
const updateItem = async (id) => {
  try {
      database.collection(table).doc(id).update({
        status: 'next'
      });
  } catch (error) {
      alert(error.message);

  }

 
};

  useEffect(() => {
    database
        .collection(table)
        .where('status', '==', current)
        .onSnapshot((query) => {
            const items = [];
            query.forEach((doc) => {
                items.push({ ...doc.data(), id: doc.id });
            });
            setData(items);
            
            
        });
  }, []);

  const renderItem = ({ item }) => (

   <ListItem 
   bottomDivider 
   title={item.title}
   rightElement={
     <View style={{ flexDirection: 'row'}}>
      
        <Icon color="#0000CD" name="delete"  reverse size={18}  onPress={() => removeItem(item.id)}/>

      {next &&(
      <Icon color="#FF0000" 
        name="arrow-forward" 
        reverse size={18} 
        onPress={() => updateItem(item.id)}/>
     
   
  
     )}
     </View>}
/>
);
  

    return (
      
        <View style={styles.container}>
          <FlatList data={data} renderItem={renderItem}/>
          <Icon onPress={toggleOverlay} name="add" color="#0000CD" containerStyle={styles.fab} reverse />

          <Overlay
            overlayStyle={styles.overlayStyle} 
          isVisible={visible} 
          onBackdropPress={toggleOverlay}>
                <Text styles={styles.title}>Cadastrar a tarefa</Text>
                <Input value={title} onChangeText={setTitle} placeholder="Escreva sua tarefa"/>
                <Button title="Adicionar" onPress={addItem}></Button>
                
            </Overlay>
          
        </View>
      );
    };

    export default TodoScreen;

    const styles = StyleSheet.create({
        container: { 
            flex: 1
        },
        title:{
          fontWeight: 'bold',
          marginBottom: 20
        },
        overlayStyle:{
          width: 300

        },
        fab: {
          position: 'absolute',
          right: 20,
          bottom: 20
        },
        
    });