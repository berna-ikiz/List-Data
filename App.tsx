import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';


type itemType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
};

type renderProps = {
  item: itemType;
};
const renderItem = ({item}: renderProps) => {
  return (
    <View style={styles.listItemCard}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.email}</Text>
      <Text>{item.phone}</Text>
      <Text>{item.website}</Text>
    </View>
  );
};

const App = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      ); //get data with axios
      setUserData(response.data);
    } catch (error) {
      console.error('Hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.button} onPress={fetchUsers}>
        <Text style={styles.text}>Get users</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="coral" />
      ) : (
        <FlatList data={userData} renderItem={({item}) => renderItem({item})} />
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  button: {
    borderColor: 'coral',
    borderWidth: 1,
    margin: 64,
    borderRadius: 8,
    backgroundColor: 'coral',
    shadowColor: 'coral',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 28,
    color: 'white',
  },
  listItem: {
    fontSize: 18,
    padding: 10,
    borderBottomColor: '#ddd',
    borderWidth: 1,
    color: 'gray',
  },
  listItemCard: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: 'coral',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'gray',
  },
});

export default App;
