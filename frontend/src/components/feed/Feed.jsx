import React, { useContext, useEffect, useState, useCallback } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { UserContext } from "../../context/userContext";
import { useQuery } from "@tanstack/react-query";
import { useMeetings } from "../../hooks/useMeetings";
import AddWhite from "../../assets/imgs/add-white.png";
import Messenger from "../../assets/imgs/message.png";
import MeetCard from "./components/MeetCard";
import CreateMeetModal from "./components/CreateMeetModal";
import MeetDetailsModal from "./components/MeetDetailsModal";
import MeetOptions from "./components/MeetOptions";
import AlertModal from "./components/AlertModal";
import LoadingSpinner from "./components/LoadingSpinner";
import "./feed.css";

async function getData() {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/meets/getAll`,
    {
      credentials: "include",
    }
  );
  
  if (!res.ok) {
    throw new Error("Failed to fetch meetings");
  }
  
  return res.json();
}

export default function Feed() {
  const { darkMode } = useContext(DarkModeContext);
  const { chatAberto, setChatAberto } = useContext(UserContext);
  const [createPost, setCreatePost] = useState(false);
  const [meetsOrdered, setMeetsOrdered] = useState([]);
  const [more, setMore] = useState(false);
  const [meetMexido, setMeetMexido] = useState();
  const [meetDetails, setMeetDetails] = useState(null);

  const [post, setPost] = useState({
    title: "",
    description: "",
    max: "",
    duration: "2 hours",
  });

  const {
    ready,
    aviso,
    textoAviso,
    sucesso,
    clickOk,
    handleDeletePeopleinMeet,
    handleDelete,
    handleJoinMeet,
    handleCreateMeet,
  } = useMeetings();

  const { isLoading, error, data } = useQuery({
    queryKey: ["meeting"],
    queryFn: getData,
    refetchInterval: 30000, // Refetch a cada 30 segundos para evitar dados desaparecendo
    refetchOnWindowFocus: true,
    staleTime: 10000, // Considera dados frescos por 10 segundos
  });

  useEffect(() => {
    orderMeets();
  }, [data]);

  const orderMeets = useCallback(() => {
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
  }, [data]);

  const handleChange = useCallback((e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleMore = useCallback((idMeet) => {
    setMore((prev) => !prev);
    setMeetMexido(idMeet);
    setMeetDetails(null);
  }, []);

  const handleCloseMore = useCallback(() => {
    setMore(false);
    setMeetDetails(null);
  }, []);

  const handleShowDetails = useCallback((meet) => {
    setMeetDetails(meet);
    setMore(false);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setMeetDetails(null);
  }, []);

  const handleOpenChat = useCallback(() => {
    setChatAberto(true);
  }, [setChatAberto]);

  const handleSubmitCreate = useCallback(() => {
    handleCreateMeet(post);
    if (sucesso) {
      setCreatePost(false);
      setPost({
        title: "",
        description: "",
        max: "",
        duration: "2 hours",
      });
    }
  }, [post, handleCreateMeet, sucesso]);

  const handleCloseCreate = useCallback(() => {
    setCreatePost(false);
    setPost({
      title: "",
      description: "",
      max: "",
      duration: "2 hours",
    });
  }, []);

  if (isLoading) {
    return (
      <div
        className="principalDiv"
        style={{ backgroundColor: darkMode ? "#181818" : "#f2f2f2" }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="principalDiv"
        style={{ backgroundColor: darkMode ? "#181818" : "#f2f2f2" }}
      >
        <div className="error-container">
          <p>Error loading meetings. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="principalDiv"
      style={{ backgroundColor: darkMode ? "#181818" : "#f2f2f2" }}
    >
      <div className="posts">
        {!ready && (
          <div className="loading-overlay">
            <LoadingSpinner />
          </div>
        )}

        {meetsOrdered?.length === 0 ? (
          <div className="no-meetings">
            <h3>No meetings available</h3>
            <p>Be the first to create one!</p>
          </div>
        ) : (
          meetsOrdered?.map((meet) => (
            <div key={meet.meetId_meeting} style={{ position: "relative" }}>
              <MeetCard
                meet={meet}
                onJoin={handleJoinMeet}
                onMore={handleMore}
              />
              {more && meetMexido === meet.meetId_meeting && (
                <MeetOptions
                  meet={meet}
                  onDelete={handleDelete}
                  onDetails={handleShowDetails}
                />
              )}
            </div>
          ))
        )}
      </div>

      <div className="divAbs">
        <img
          src={AddWhite}
          alt="Create meeting"
          className="abs"
          id="add"
          onClick={() => setCreatePost(true)}
        />
        {!chatAberto && (
          <img
            src={Messenger}
            alt="Open chat"
            className="abs"
            id="msg"
            onClick={handleOpenChat}
          />
        )}
      </div>

      {createPost && (
        <CreateMeetModal
          post={post}
          onChange={handleChange}
          onSubmit={handleSubmitCreate}
          onClose={handleCloseCreate}
          ready={ready}
        />
      )}

      {aviso && (
        <AlertModal
          message={textoAviso}
          isSuccess={sucesso}
          onClose={clickOk}
        />
      )}

      {meetDetails && (
        <MeetDetailsModal
          meetDetails={meetDetails}
          onClose={handleCloseDetails}
          onDeletePerson={handleDeletePeopleinMeet}
        />
      )}

      {(more || createPost || meetDetails || aviso) && (
        <div
          className="backdrop"
          onClick={() => {
            handleCloseMore();
            handleCloseCreate();
            handleCloseDetails();
          }}
        />
      )}
    </div>
  );
}
