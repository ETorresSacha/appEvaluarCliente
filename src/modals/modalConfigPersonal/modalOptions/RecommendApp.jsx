import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Share,
  Button,
} from "react-native";
import React from "react";

const RecommendApp = ({ enablerRec, setEnableRec }) => {
  const url =
    "https://www.youtube.com/watch?v=FzxZtbpJ6P0&list=RDFzxZtbpJ6P0&index=1";

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "link como prueba para compartir: " + url,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("share with activity type of: ", result.activityType);
        } else {
          console.log("share");
        }
      } else if (result.action == Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      // style={styles.container}
      transparent={true}
      visible={enablerRec}
      onRequestClose={() => setEnableRec(false)}
    >
      <TouchableWithoutFeedback onPress={() => setEnableRec(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <TouchableOpacity style={styles.modalContent} onPress={onShare}>
        <Text
          style={{
            color: "black",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Recomendar app
        </Text>
      </TouchableOpacity>

      <Button title="share" onPress={onShare} />
    </Modal>
  );
};

export default RecommendApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "beige",
    borderRadius: 2,
    position: "absolute",
    top: "15%",
    left: "10%",
    right: "10%",
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 10,
  },

  containerText: {
    marginTop: 10,
    //gap: 5,
  },
  titleText: {
    paddingLeft: 20,
    fontSize: 18,
    color: "black",
  },
  text: {
    height: 40,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "grey",
    padding: 2,
    marginVertical: 5,
    marginHorizontal: 25,
    paddingLeft: 10,
    fontSize: 16,
    color: "black",
  },
  buttonContainer: {
    marginVertical: 30,
    alignItems: "center",
    width: 250,
    height: 40,
    marginLeft: 40,
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#4ecb71",
  },
  textGuardar: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  containerConfiguration: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
