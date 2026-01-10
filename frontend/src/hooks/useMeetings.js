import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export const useMeetings = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [ready, setReady] = useState(true);
  const [aviso, setAviso] = useState(false);
  const [textoAviso, setTextoaviso] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  const showError = (message) => {
    setTextoaviso(message);
    setAviso(true);
    setReady(true);
  };

  const showSuccess = (message) => {
    setTextoaviso(message);
    setSucesso(true);
    setAviso(true);
    setReady(true);
  };

  const clickOk = () => {
    setAviso(false);
    setTextoaviso("");
    setSucesso(false);
    if (sessionExpired) navigate("/login");
    setSessionExpired(false);
  };

  const deletePeopleinMutation = useMutation({
    mutationFn: async ({ meetId, id, username, profilePic }) => {
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
      
      if (res.status === 400) {
        setSessionExpired(true);
        showError("Session expired");
        throw new Error("Session expired");
      } else if (res.status !== 200) {
        showError("Error removing user");
        throw new Error("Error");
      }
      
      return { id, username, profilePic };
    },
    onSuccess: (data) => {
      if (data.id === user.id) {
        showSuccess("You left the meet successfully!");
      } else {
        showSuccess("Removed successfully!");
      }
      queryClient.invalidateQueries({ queryKey: ["meeting"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (meetId) => {
      setReady(false);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/meets/delete/${meetId}`,
        {
          method: "delete",
          credentials: "include",
        }
      );
      
      if (res.status === 400) {
        setSessionExpired(true);
        showError("Session expired");
        throw new Error("Session expired");
      } else if (res.status !== 200) {
        showError("Error deleting meeting");
        throw new Error("Error");
      }
      
      return meetId;
    },
    onSuccess: () => {
      showSuccess("Meeting deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["meeting"] });
    },
  });

  const joinMutation = useMutation({
    mutationFn: async (meetId) => {
      setReady(false);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/meets/join/${user.id}`,
        {
          method: "post",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ meetId, dateJoined: Date.now() }),
        }
      );
      
      if (res.status === 400) {
        setSessionExpired(true);
        showError("Session expired");
        throw new Error("Session expired");
      } else if (res.status !== 200) {
        showError("Error joining meeting");
        throw new Error("Error");
      }
      
      return meetId;
    },
    onSuccess: () => {
      showSuccess("Joined meeting successfully!");
      queryClient.invalidateQueries({ queryKey: ["meeting"] });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (post) => {
      setReady(false);
      const segundos = calculaSegundos(post.duration);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/meets/create/${user.id}`,
        {
          method: "post",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title: post.title,
            description: post.description,
            maxNumber: post.max,
            dateCreated: Date.now(),
            dateEnd: Date.now() + segundos,
          }),
        }
      );
      
      if (res.status === 400) {
        const errorData = await res.json();
        showError(errorData.error || "Session expired");
        throw new Error("Validation error");
      } else if (res.status !== 200) {
        showError("Error creating meeting");
        throw new Error("Error");
      }
      
      return res.json();
    },
    onSuccess: () => {
      showSuccess("Meeting created successfully!");
      queryClient.invalidateQueries({ queryKey: ["meeting"] });
    },
  });

  const calculaSegundos = (duration) => {
    const durations = {
      "2 hours": 2 * 60 * 60 * 1000,
      "8 hours": 8 * 60 * 60 * 1000,
      "1 day": 24 * 60 * 60 * 1000,
      "3 days": 3 * 24 * 60 * 60 * 1000,
      "1 week": 7 * 24 * 60 * 60 * 1000,
      "2 weeks": 14 * 24 * 60 * 60 * 1000,
      "1 month": 30 * 24 * 60 * 60 * 1000,
      "3 months": 3 * 30 * 24 * 60 * 60 * 1000,
    };
    return durations[duration] || 0;
  };

  const handleDeletePeopleinMeet = async (e, username, meetId, profilePic) => {
    e.preventDefault();
    try {
      const data = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/getUser/${username}`,
        {
          credentials: "include",
        }
      );
      if (data.status !== 200) {
        showError("Error fetching user data");
        return;
      }
      const json = await data.json();
      deletePeopleinMutation.mutate({ meetId, id: json.id_users, username, profilePic });
    } catch (err) {
      showError("Error removing user");
    }
  };

  const handleDelete = (e, meet) => {
    e.preventDefault();
    if (meet.username_users === user.username) {
      deleteMutation.mutate(meet.meetId_meeting);
    } else {
      showError("Only the owner can delete the meeting!");
    }
  };

  const handleJoinMeet = (e, meet) => {
    e.preventDefault();

    if (meet.username_users === user.username) {
      showError("The creator can't participate in its own meeting");
      return;
    }
    
    if (meet.currentNumber >= meet.maxNumber_meeting) {
      showError("Number of participants exceeded");
      return;
    }

    const alreadyJoined = meet.people.some(person => person.username === user.username);
    if (alreadyJoined) {
      showError("You have already joined this meeting");
      return;
    }

    joinMutation.mutate(meet.meetId_meeting);
  };

  const handleCreateMeet = (post) => {
    if (!post.title || !post.description || !post.max) {
      showError("Please fill all fields");
      return;
    }
    createMutation.mutate(post);
  };

  return {
    ready,
    aviso,
    textoAviso,
    sucesso,
    clickOk,
    handleDeletePeopleinMeet,
    handleDelete,
    handleJoinMeet,
    handleCreateMeet,
  };
};
