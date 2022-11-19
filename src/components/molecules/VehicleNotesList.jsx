import { View, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../atoms/Heading";
import theme from "../theme";
import { createNote, getVehicleNotes, updateNote } from "../../utils/api";
import RegularText from "../atoms/RegularText";
import IconButton from "./IconButton";
import { deleteNote } from "../../utils/api";
import NoteModal from "./NoteModal";

const { colors } = theme;

const formatDate = (date) => {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
};

const VehicleNotesList = ({ vehicle, userSettings }) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [updateList, setUpdateList] = useState(false);
  const [typeOfNoteModal, setTypeOfNoteModal] = useState(null);

  useEffect(() => {
    try {
      getVehicleNotes(vehicle._id).then((res) => {
        if (res.data) {
          setNotes(res.data.notes);
        }
      });
    } catch (err) {
      console.log("handling", err.message);
    }
  }, [updateList]);

  const submitNote = async (note) => {
    if (typeOfNoteModal.type === "add") {
      await createNote({ vehicleId: vehicle._id, text: note });
    } else if (typeOfNoteModal.type === "edit") {
      await updateNote(typeOfNoteModal.id, { text: note });
    }
    setTypeOfNoteModal(null);
    setNote("");
    setUpdateList(!updateList);
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    setUpdateList(!updateList);
    setNote("");
    setTypeOfNoteModal(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addButton}>
        <IconButton
          icon="add"
          event={() => setTypeOfNoteModal({ type: "add" })}
        />
      </View>
      <Heading type="h3" color="orange">
        {userSettings?.language === "sv" ? "Anteckningar" : "Notes"}
      </Heading>
      {notes.map((noteItem) => {
        return (
          <Pressable
            key={noteItem._id}
            style={styles.listItem}
            onLongPress={() => {
              setNote(noteItem.text);
              setTypeOfNoteModal({ type: "edit", id: noteItem._id });
            }}
          >
            <Heading>{formatDate(noteItem.createdAt)}</Heading>
            <RegularText>{noteItem.text}</RegularText>
          </Pressable>
        );
      })}
      {typeOfNoteModal && (
        <NoteModal
          type={typeOfNoteModal}
          setState={setTypeOfNoteModal}
          handleOnSubmit={submitNote}
          noteState={{ note, setNote }}
          deleteNote={() => handleDeleteNote(typeOfNoteModal.id)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "auto",
    backgroundColor: colors.white,
    paddingBottom: 10,
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  header: {
    marginTop: 20,
  },
  list: {
    margin: 10,
    width: "100%",
  },
  listItem: {
    borderBottomColor: colors.darkGrey,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  addButton: {
    position: "absolute",
    right: 10,
  },
});

export default VehicleNotesList;
