import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

// Note: You'll need to replace these with actual image imports or use a library like react-native-vector-icons
import AddWhiteIcon from '../../assets/imgs/add-white.png';
import MessengerIcon from '../../assets/imgs/messenger.png';
import XIcon from '../../assets/imgs/x.png';
import MoreIcon from '../../assets/imgs/more.png';
import TrashIcon from '../../assets/imgs/trash.png';
import ReportIcon from '../../assets/imgs/report.png';

// Assume these contexts are properly set up for React Native
import { UserContext } from '../context/userContext';

const Feed = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { darkMode } = useContext(DarkModeContext);
  const { chatAberto, setChatAberto, user } = useContext(UserContext);
  
  const [descAberta, setDescAberta] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [ready, setReady] = useState(true);
  const [aviso, setAviso] = useState(false);
  const [textoAviso, setTextoAviso] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [meetsOrdered, setMeetsOrdered] = useState([]);
  const [more, setMore] = useState(false);
  const [meetMexido, setMeetMexido] = useState();
  const [meetDetails, setMeetDetails] = useState("");

  const [post, setPost] = useState({
    title: "",
    description: "",
    max: "",
    duration: "2 hours",
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["meeting"],
    queryFn: getData,
  });

  useEffect(() => {
    orderMeets();
  }, [data]);

  const handleChange = (name, value) => {
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const clickOk = () => {
    setAviso(false);
    setTextoAviso("");
    if (sucesso) setCreatePost(false);
    if (sessionExpired) navigation.navigate("Login");
    setSessionExpired(false);
  };

  const handleMore = (idMeet) => {
    setMore(!more);
    setMeetMexido(idMeet);
    setMeetDetails("");
  };

  const handleX = () => {
    setMore(false);
    setMeetDetails("");
  };

  const muda = () => {
    setChatAberto(true);
  };

  // ... (other functions remain largely the same, adjust API calls for React Native environment)

  const renderMeetItem = ({ item: meet }) => (
    <View style={styles.post}>
      <View style={[styles.parteCima, { borderColor: darkMode ? "lightgray" : "black" }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { username: meet.username_users })}>
          <Image source={{ uri: meet.profilePic_meeting }} style={styles.userPic} />
          <Text style={styles.username}>{meet.username_users}</Text>
        </TouchableOpacity>
        <Text style={styles.tempo}>{moment(meet?.dateCreated_meeting).fromNow()}</Text>
      </View>
      
      <View style={[styles.parteMeio, { borderColor: darkMode ? "lightgray" : "black" }]}>
        <View style={styles.ladoEsquerdo}>
          <Text style={styles.titulo}>{meet.title_meeting}</Text>
          <Text style={styles.descricao}>{meet.description_meeting}</Text>
        </View>
      </View>
      
      <View style={[styles.parteBaixo, { borderColor: darkMode ? "lightgray" : "black" }]}>
        <View style={styles.pessoasBaixo}>
          <View style={styles.imagensPessoas}>
            {/* Render participant images here */}
          </View>
          <Text style={styles.maximo}>{meet.people.length}/{meet.maxNumber_meeting}</Text>
        </View>
        {meet.people.length < meet.maxNumber_meeting && (
          <TouchableOpacity style={styles.juntar} onPress={(e) => handleJoinMeet(e, meet)}>
            <Text style={styles.juntarText}>Join!</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.moreDiv} onPress={() => handleMore(meet.meetId_meeting)}>
          <Image source={MoreIcon} style={styles.moreImg} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.principalDiv, { borderColor: darkMode ? "lightgray" : "black" }]}>
      <FlatList
        data={meetsOrdered}
        renderItem={renderMeetItem}
        keyExtractor={(item) => item.meetId_meeting}
        contentContainerStyle={styles.posts}
      />
      
      <View style={styles.divAbs}>
        <TouchableOpacity onPress={() => setCreatePost(true)}>
          <Image source={AddWhiteIcon} style={styles.abs} />
        </TouchableOpacity>
        {!chatAberto && (
          <TouchableOpacity onPress={muda}>
            <Image source={MessengerIcon} style={[styles.abs, styles.msg]} />
          </TouchableOpacity>
        )}
      </View>

      {createPost && (
        <ScrollView style={[styles.createPost, { backgroundColor: darkMode ? "#2b2b2b" : "#f2f2f2" }]}>
          <TouchableOpacity onPress={() => setCreatePost(false)} style={styles.xPost}>
            <Image source={XIcon} style={styles.xPostImg} />
          </TouchableOpacity>
          {/* Form inputs for creating a post */}
          {/* ... */}
          <TouchableOpacity style={styles.postMeeting} onPress={handleCreateMeeting}>
            <Text style={styles.postMeetingText}>Post meeting</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {aviso && (
        <View style={styles.warning}>
          <Text>{textoAviso}</Text>
          <TouchableOpacity style={styles.warningBtn} onPress={clickOk}>
            <Text>Ok</Text>
          </TouchableOpacity>
        </View>
      )}

      {meetDetails !== "" && (
        <View style={styles.detalhesMeet}>
          {/* Render meet details */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  principalDiv: {
    flex: 1,
  },
  posts: {
    paddingVertical: 20,
  },
  post: {
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 20,
    borderRadius: 15,
  },
  parteCima: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
  },
  userPic: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  username: {
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 10,
  },
  tempo: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '600',
    color: 'gray',
    fontSize: 17,
  },
  parteMeio: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  ladoEsquerdo: {
    padding: 20,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  descricao: {
    fontSize: 16,
    marginTop: 10,
  },
  parteBaixo: {
    flexDirection: 'row',
    padding: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
  },
  pessoasBaixo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagensPessoas: {
    marginLeft: 10,
    position: 'relative',
    height: 40,
    width: 120,
  },
  maximo: {
    fontSize: 20,
    fontWeight: '600',
  },
  juntar: {
    backgroundColor: '#00bf62',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  juntarText: {
    color: 'white',
    fontSize: 16,
  },
  moreDiv: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  moreImg: {
    width: 24,
    height: 24,
  },
  divAbs: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    flexDirection: 'row',
  },
  abs: {
    width: 50,
    height: 50,
    backgroundColor: '#5a5cde',
    borderRadius: 25,
    marginLeft: 10,
  },
  msg: {
    padding: 12,
  },
  createPost: {
    position: 'absolute',
    left: '10%',
    top: '20%',
    width: '80%',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'darkgray',
  },
  xPost: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  xPostImg: {
    width: 24,
    height: 24,
  },
  postMeeting: {
    backgroundColor: '#00bf62',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  postMeetingText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  warning: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  warningBtn: {
    backgroundColor: '#5a5cde',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  detalhesMeet: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '80%',
    backgroundColor: 'rgb(235, 235, 235)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
});

export default Feed;