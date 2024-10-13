import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import ip from "../../constants/Url";

// Note: You'll need to replace these with actual image imports or use a library like react-native-vector-icons
import AddWhiteIcon from "../../assets/imgs/add-white.png";
import MessengerIcon from "../../assets/imgs/messenger.png";
import XIcon from "../../assets/imgs/x.png";
import MoreIcon from "../../assets/imgs/more.png";
import TrashIcon from "../../assets/imgs/trash.png";
import ReportIcon from "../../assets/imgs/report.png";

// Assume these contexts are properly set up for React Native
import { UserContext } from "../context/userContext";
import { DarkModeContext } from "../context/darkModeContext";

const Feed = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { changeUser, user } = useContext(UserContext);
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [descAberta, setDescAberta] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [ready, setReady] = useState(true);
  const [aviso, setAviso] = useState(false);
  const [textoAviso, setTextoaviso] = useState("");
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
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const clickOk = () => {
    setAviso(false);
    setTextoaviso("");
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

  function detalhesMeet() {
    return (
      <View style={{ flex: 1 }}>
        {/* Parte superior dos detalhes */}
        <View style={styles.cimaDetalhes}>
          <Text style={styles.title}>{meetDetails.title_meeting}</Text>
          <TouchableOpacity onPress={handleX}>
            <Image
              source={
                darkMode
                  ? require("../../assets/imgs/x-white.png")
                  : require("../../assets/imgs/x.png")
              } // Substitua pelos caminhos corretos das imagens
              style={styles.xPost}
            />
          </TouchableOpacity>
        </View>

        {/* Parte do meio com a lista de pessoas */}
        <ScrollView style={styles.meioDetalhes}>
          {meetDetails.people.length < 1 ? (
            <Text style={{ marginTop: "8%" }}>
              There is no one in the meeting
            </Text>
          ) : (
            meetDetails.people.map((username) => (
              <View style={styles.someoneDiv} key={username.username}>
                <TouchableOpacity
                  style={styles.userDetails}
                  onPress={() =>
                    navigation.navigate("Profile", {
                      username: username.username,
                    })
                  }
                >
                  <Image
                    source={{ uri: username.profilePic }}
                    style={styles.homem}
                  />
                  <Text style={{ color: darkMode ? "#f2f2f2" : "#222" }}>
                    {username.username}
                  </Text>
                </TouchableOpacity>
                {meetDetails.username_users === user.username && (
                  <TouchableOpacity
                    style={styles.canDelete}
                    onPress={(e) =>
                      handleDeletePeopleinMeet(
                        e,
                        username.username,
                        meetDetails.meetId_meeting,
                        username.profilePic
                      )
                    }
                  >
                    <Text>delete</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          )}
        </ScrollView>

        {/* Parte inferior com a data */}
        <View style={styles.baixoDetalhes}>
          <Text>Ends at: {dateLegivel}</Text>
        </View>
      </View>
    );
  }

  function calculaSegundos() {
    let duration = post.duration;
    let segundos;

    switch (duration) {
      case "2 hours":
        segundos = 2 * 60 * 60 * 1000;
        break;
      case "8 hours":
        segundos = 8 * 60 * 60 * 1000;
        break;
      case "1 day":
        segundos = 24 * 60 * 60 * 1000;
        break;
      case "3 days":
        segundos = 3 * 24 * 60 * 60 * 1000;
        break;
      case "1 week":
        segundos = 7 * 24 * 60 * 60 * 1000;
        break;
      case "2 weeks":
        segundos = 14 * 24 * 60 * 60 * 1000;
        break;
      case "1 month":
        segundos = 30 * 24 * 60 * 60 * 1000; // 30 dias
        break;
      case "3 months":
        segundos = 3 * 30 * 24 * 60 * 60 * 1000; //  90 dias
        break;
      default:
        segundos = 0; // Valor padrão caso não corresponda a nenhum dos casos
        break;
    }

    return segundos;
  }

  async function orderMeets() {
    if (data?.length !== 0) {
      const upcomingMeetings = data?.filter(
        (meeting) => meeting.dateEnd_meeting > Date.now()
      );
      upcomingMeetings?.sort((a, b) => {
        const maxDiff =
          b.maxNumber_meeting -
          b.currentNumber -
          (a.maxNumber_meeting - a.currentNumber);
        if (maxDiff !== 0) {
          return maxDiff;
        }

        const popularityDiff = b.currentNumber - a.currentNumber;
        if (popularityDiff !== 0) {
          return popularityDiff;
        }

        return b.dateCreated_meeting - a.dateCreated_meeting;
      });
      setMeetsOrdered(upcomingMeetings);
    } else {
      setMeetsOrdered([]);
    }
  }

  async function getData() {
    try {
      const res = await fetch(`${ip}/api/meets/getAll`, {
        credentials: "include",
      });
      if (res.status != 200) {
        console.log(res);
      } else {
        const data = await res.json();
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleJoinMeet(e, meet) {
    e.preventDefault();

    let passou = true;

    if (meet.username_users == user.username) {
      setTextoaviso("The creater can't participate in its own meeting");
      setAviso(true);
      setReady(true);
      passou = false;
    } else if (meet.currentNumber >= meet.maxNumber) {
      setTextoaviso("Number of participants exceeded");
      setAviso(true);
      setReady(true);
      passou = false;
    }

    if (passou == true) {
      for (let i = 0; i < meet.currentNumber; i++) {
        if (meet.people[i].username == user.username) {
          setTextoaviso("You have already joined this meeting");
          setAviso(true);
          setReady(true);
          passou = false;
        }
      }
    }

    if (passou == true) {
      joinMutation.mutate(meet.meetId_meeting);
    }
  }

  async function handleDeletePeopleinMeet(e, username, meetId, profilePic) {
    e.preventDefault();
    let id;
    try {
      const data = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/getUser/${username}`,
        {
          credentials: "include",
        }
      );
      if (data.status != 200) console.log(data);
      let json = await data.json();
      id = json.id_users;
    } catch (err) {
      console.log(err);
    }
    deletePeopleinMutation.mutate({ meetId, id, username, profilePic });
  }

  async function handleDelete(e, meet) {
    e.preventDefault();
    setMore(false);

    if (meet.username_users == user.username) {
      deleteMutation.mutate(meet.meetId_meeting);
    } else {
      setTextoaviso("Only the owner can delete the meeting!");
      setAviso(true);
      setReady(true);
    }
  }

  function handleCreateMeeting(e) {
    e.preventDefault();

    let segundos = calculaSegundos();
    let dateCreated = Date.now();
    let dateEnd = dateCreated + segundos;

    const data = {
      maxNumber: post.max,
      title: post.title,
      description: post.description,
      dateCreated,
      dateEnd,
    };
    mutation.mutate(data);
  }

  const joinMutation = useMutation({
    mutationFn: async (meetId) => {
      let dateJoined = Date.now();

      try {
        setReady(false);
        const res = await fetch(`${ip}/api/meets/join/${user.id}`, {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ meetId, dateJoined }),
          credentials: "include",
        });
        if (res.status == 400) {
          setSessionExpired(true);
          setTextoaviso("Session expired");
          setAviso(true);
          setReady(true);
        } else if (res.status != 200) {
          setTextoaviso("Error");
          setAviso(true);
          setReady(true);
          console.log(res);
        } else {
          setTextoaviso("Joined with success!");
          setSucesso(true);
          setAviso(true);
          setReady(true);
          setSucesso(true);
        }
      } catch (err) {
        console.log(err);
        setTextoaviso("Error");
        setAviso(true);
        setReady(true);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meeting"] });
    },
  });

  const deletePeopleinMutation = useMutation({
    mutationFn: async ({ meetId, id, username, profilePic }) => {
      try {
        setReady(false);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/meets/deleteUser/${meetId}`,
          {
            method: "delete",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ userId: id }),
          }
        );
        console.log(res);
        if (res.status == 400) {
          setSessionExpired(true);
          setTextoaviso("Session expired");
          setAviso(true);
          setReady(true);
        } else if (res.status != 200) {
          setTextoaviso("Error");
          setAviso(true);
          setReady(true);
          console.log(res);
        } else {
          if (id == user.id) setTextoaviso("You leaved the meet with success!");
          setTextoaviso("Removed with success!");
          setSucesso(true);
          setAviso(true);
          setReady(true);
          setSucesso(true);
          let i = meetDetails.people.indexOf({
            username,
            profilePic,
          });
          meetDetails.people.splice(i, 1);
          //setMeetDetails(meetDetails)
        }
      } catch (err) {
        console.log(err);
        setTextoaviso("Error");
        setAviso(true);
        setReady(true);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "meeting" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (meetId) => {
      try {
        setReady(false);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/meets/delete/${meetId}`,
          {
            method: "delete",
            headers: { "Content-type": "application/json" },
            credentials: "include",
          }
        );
        if (res.status == 400) {
          setSessionExpired(true);
          setTextoaviso("Session expired");
          setAviso(true);
          setReady(true);
        } else if (res.status != 200) {
          setTextoaviso("Error");
          setAviso(true);
          setReady(true);
          console.log(res);
        } else {
          setTextoaviso("Meet deleted with success!");
          setSucesso(true);
          setAviso(true);
          setReady(true);
          setSucesso(true);
        }
      } catch (err) {
        console.log(err);
        setTextoaviso("Error");
        setAviso(true);
        setReady(true);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "meeting" });
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        setReady(false);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/meets/create/${user.id}`,
          {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
          }
        );
        if (res.status == 400) {
          setSessionExpired(true);
          setTextoaviso("Session expired");
          setAviso(true);
          setReady(true);
        } else if (res.status != 200) {
          setTextoaviso("Error");
          setAviso(true);
          setReady(true);
        } else {
          setTextoaviso("Post create with success!");
          setSucesso(true);
          setAviso(true);
          setReady(true);
          setSucesso(true);
        }
      } catch (err) {
        console.log(err);
        setTextoaviso("Email already registered");
        setAviso(true);
        setReady(true);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meeting"] });
    },
  });

  const renderMeetItem = ({ item: meet }) => (
    <View style={styles.post}>
      <View
        style={[
          styles.parteCima,
          { borderColor: darkMode ? "lightgray" : "black" },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", { username: meet.username_users })
          }
        >
          <Image
            source={{ uri: meet.profilePic_meeting }}
            style={styles.userPic}
          />
          <Text style={styles.username}>{meet.username_users}</Text>
        </TouchableOpacity>
        <Text style={styles.tempo}>
          {moment(meet?.dateCreated_meeting).fromNow()}
        </Text>
      </View>

      <View
        style={[
          styles.parteMeio,
          { borderColor: darkMode ? "lightgray" : "black" },
        ]}
      >
        <View style={styles.ladoEsquerdo}>
          <Text style={styles.titulo}>{meet.title_meeting}</Text>
          <Text style={styles.descricao}>{meet.description_meeting}</Text>
        </View>
      </View>

      <View
        style={[
          styles.parteBaixo,
          { borderColor: darkMode ? "lightgray" : "black" },
        ]}
      >
        <View style={styles.pessoasBaixo}>
          <View style={styles.imagensPessoas}>
            {/* Render participant images here */}
          </View>
          <Text style={styles.maximo}>
            {meet.people.length}/{meet.maxNumber_meeting}
          </Text>
        </View>
        {meet.people.length < meet.maxNumber_meeting && (
          <TouchableOpacity
            style={styles.juntar}
            onPress={(e) => handleJoinMeet(e, meet)}
          >
            <Text style={styles.juntarText}>Join!</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.moreDiv}
          onPress={() => handleMore(meet.meetId_meeting)}
        >
          <Image source={MoreIcon} style={styles.moreImg} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.principalDiv,
        { borderColor: darkMode ? "lightgray" : "black" },
      ]}
    >
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
      </View>

      {createPost && (
        <ScrollView
          style={[
            styles.createPost,
            { backgroundColor: darkMode ? "#2b2b2b" : "#f2f2f2" },
          ]}
        >
          <TouchableOpacity
            onPress={() => setCreatePost(false)}
            style={styles.xPost}
          >
            <Image source={XIcon} style={styles.xPostImg} />
          </TouchableOpacity>
          {/* Form inputs for creating a post */}
          {/* ... */}
          <TouchableOpacity
            style={styles.postMeeting}
            onPress={handleCreateMeeting}
          >
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
        <View style={styles.detalhesMeet}>{/* Render meet details */}</View>
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
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 20,
    borderRadius: 15,
  },
  parteCima: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "600",
    fontSize: 20,
    marginLeft: 10,
  },
  tempo: {
    flex: 1,
    textAlign: "right",
    fontWeight: "600",
    color: "gray",
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
    fontWeight: "bold",
    fontSize: 18,
  },
  descricao: {
    fontSize: 16,
    marginTop: 10,
  },
  parteBaixo: {
    flexDirection: "row",
    padding: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
  },
  pessoasBaixo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  imagensPessoas: {
    marginLeft: 10,
    position: "relative",
    height: 40,
    width: 120,
  },
  maximo: {
    fontSize: 20,
    fontWeight: "600",
  },
  juntar: {
    backgroundColor: "#00bf62",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  juntarText: {
    color: "white",
    fontSize: 16,
  },
  moreDiv: {
    justifyContent: "center",
    marginLeft: 10,
  },
  moreImg: {
    width: 24,
    height: 24,
  },
  divAbs: {
    position: "absolute",
    bottom: 40,
    right: 40,
    flexDirection: "row",
  },
  abs: {
    width: 50,
    height: 50,
    backgroundColor: "#5a5cde",
    borderRadius: 25,
    marginLeft: 10,
  },
  msg: {
    padding: 12,
  },
  createPost: {
    position: "absolute",
    left: "10%",
    top: "20%",
    width: "80%",
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "darkgray",
  },
  xPost: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  xPostImg: {
    width: 24,
    height: 24,
  },
  postMeeting: {
    backgroundColor: "#00bf62",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  postMeetingText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  warning: {
    position: "absolute",
    top: "40%",
    left: "10%",
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  warningBtn: {
    backgroundColor: "#5a5cde",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  detalhesMeet: {
    position: "absolute",
    top: "20%",
    left: "10%",
    width: "80%",
    backgroundColor: "rgb(235, 235, 235)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  cimaDetalhes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  xPost: {
    width: 24,
    height: 24,
  },
  meioDetalhes: {
    flex: 1,
    padding: 16,
  },
  someoneDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  canDelete: {
    paddingHorizontal: 10,
  },
  baixoDetalhes: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});

export default Feed;
