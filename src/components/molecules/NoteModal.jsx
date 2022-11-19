import { View, TextInput, Modal, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../theme";
import Heading from "../atoms/Heading";
import MainButton from "../atoms/MainButton";
import { getUser } from "../../utils/api";

const { colors } = theme;

const NoteModal = ({
  type,
  setState,
  handleOnSubmit,
  noteState,
  deleteNote,
}) => {
  const { note, setNote } = noteState;
  const [userSettings, setUserSettings] = useState(null);

  useEffect(() => {
    getUser().then((res) => {
      if (res.data?.user) {
        setUserSettings(res.data.user);
      }
    });
  });
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={type !== null}
      onRequestClose={() => setState(null)}
    >
      <View style={styles.wrapper}>
        <View style={styles.backdrop} />
        <View style={styles.modal}>
          <Heading type="h3">
            {userSettings?.language === "sv" ? (
              <>
                {type.type === "edit"
                  ? "Redigera anteckning"
                  : "Lägg till anteckning"}
              </>
            ) : (
              <>{type.type === "edit" ? "Edit note" : "Add note"}</>
            )}
          </Heading>
          <TextInput
            style={styles.input}
            placeholder={
              userSettings?.language === "sv" ? "Skriv här..." : "Write here..."
            }
            value={note}
            onChangeText={(e) => {
              setNote(e);
            }}
            multiline={true}
          />
          <MainButton
            title={
              type.type === "edit" && userSettings?.language === "sv"
                ? "Spara anteckning"
                : type.type === "edit" && userSettings?.language === "en"
                ? "Save note"
                : userSettings?.language === "sv"
                ? "Lägg till"
                : "Add"
            }
            bgColor="orange"
            event={() => handleOnSubmit(note)}
            my={5}
          />
          {type.type === "edit" && (
            <MainButton
              title={
                userSettings?.language === "sv"
                  ? "Ta bort anteckning"
                  : "Delete note"
              }
              bgColor="cancel"
              event={deleteNote}
              my={5}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: colors.black,
    opacity: 0.5,
  },
  modal: {
    height: "90%",
    width: "90%",
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
    elevation: 10,
  },
  input: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
    flex: 1,
    textAlignVertical: "top",
  },
  container: {
    flexDirection: "row",
  },
});

export default NoteModal;
