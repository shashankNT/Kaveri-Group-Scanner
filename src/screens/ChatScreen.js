import React, { useRef, useEffect, useState } from "react";
import { appTheme } from "../colors";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
const { height, width } = Dimensions.get("window");
import { ActivityIndicator } from "react-native-paper";

const jobData = [
  {
    id: "1",
    type: "options",
    title: "New Job Request",
    fields: [
      { label: "Quality Expert Name", value: "Abhishek" },
      { label: "Date of Visit", value: "21/06/2024" },
      { label: "Place of Visit", value: "Place One" },
      { label: "Ginning Name", value: "Ginning One" },
      { label: "Purpose of Visit", value: "For Crop Analysis" },
      { label: "Remarks", value: "Testing Job feature" },
    ],
    actions: [
      { label: "Accept Job", nextStep: "2" },
      { label: "Reject Job", nextStep: "9" },
    ],
  },
  {
    id: "2",
    type: "options",
    title: "Review the bales checked",
    fields: [],
    actions: [
      { label: "Approve", nextStep: "3" },
      { label: "Partially Approve", nextStep: "3" },
      { label: "Reject", nextStep: "3" },
    ],
  },
  {
    id: "3",
    type: "question",
    title: "Enter Number of bales checked",
    fields: [
      {
        label: "Number of bales checked",
        inputType: "number",
        key: "balesChecked",
      },
    ],
    actions: [{ label: "Next", nextStep: "4" }],
  },
  {
    id: "4",
    type: "question",
    title: "Enter Staple",
    fields: [{ label: "Staple", inputType: "number", key: "staple" }],
    actions: [{ label: "Next", nextStep: "5" }],
  },
  {
    id: "5",
    type: "question",
    title: "Enter Micronaire",
    fields: [{ label: "Micronaire", inputType: "number", key: "micronaire" }],
    actions: [{ label: "Next", nextStep: "6" }],
  },
  {
    id: "6",
    type: "question",
    title: "Enter RD",
    fields: [{ label: "RD", inputType: "number", key: "rd" }],
    actions: [{ label: "Next", nextStep: "7" }],
  },
  {
    id: "7",
    type: "question",
    title: "Enter Trash",
    fields: [{ label: "Trash", inputType: "number", key: "trash" }],
    actions: [{ label: "Next", nextStep: "9" }],
  },
  // {
  //   id: '8',
  //   type: 'imageUpload',
  //   title: 'Upload Images',
  //   fields: [],
  //   actions: [{ label: 'Upload', nextStep: null }]
  // },
  {
    id: "9",
    type: "completed",
    title: "Completed",
    fields: [],
    actions: [],
  },
];

const ChatScreen = () => {
  const [jobSteps, setJobSteps] = useState(jobData);
  const [currentStep, setCurrentStep] = useState("1");
  const [responses, setResponses] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loader, showLoader] = useState(false);

  const flatlistRef = useRef(null);

  useEffect(() => {
    if (flatlistRef.current) {
      flatlistRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleReset = () => {
    setCurrentStep("1");
    setResponses([]);
    setMessages([]);
    setSelectedOptions({});
    setInputValue("");
  };

  const clearScreen = () => {
    setCurrentStep("");
    setResponses([]);
    setMessages([]);
    setSelectedOptions({});
    setInputValue("");
  };

  const handleSubmit = () => {
    showLoader(true);
    console.log("submitting response: ", responses);

    setTimeout(() => {
      clearScreen();
      showLoader(false);
    }, 850);
  };

  const handleActionPress = (action, step) => {
    if (!selectedOptions[step.id]) {
      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [step.id]: action.label,
      }));
    }

    const updatedResponses = [
      ...responses,
      { key: step.title, value: action.label },
    ];

    setResponses(updatedResponses);

    setMessages((prevMessages) => [
      ...prevMessages,
      step,
      { type: "user", text: action.label },
    ]);
    // console.log("action from handleActionPress: ", action);
    if (action.nextStep) {
      setCurrentStep(action.nextStep);
    } else {
      setCurrentStep(null);
      console.log("All responses:", responses);
      setMessages((prevMsgs) => [
        ...prevMsgs,
        { type: "completed", text: "Completed" },
      ]);
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleNextField = () => {
    const step = jobSteps.find((step) => step.id === currentStep);
    const currentField = step.fields[0];

    const updatedResponses = [
      ...responses,
      { key: currentField.key, value: inputValue },
    ];

    setResponses(updatedResponses);

    setMessages((prevMessages) => [
      ...prevMessages,
      step,
      { type: "user", text: inputValue },
    ]);
    setInputValue("");

    const nextStep = step.actions[0].nextStep;

    // console.log(`STEP: ${JSON.stringify(step)}, CURRENTFIELD: ${JSON.stringify(currentField)}, UPDATEDRES: ${JSON.stringify(updatedResponses)}, NEXTSTEP: ${nextStep}`);

    if (nextStep) {
      setCurrentStep(nextStep);
    } else {
      console.log("All responses:", updatedResponses);
      setMessages((prevMsgs) => [
        ...prevMsgs,
        { type: "completed", text: "Completed" },
      ]);
    }
  };

  const renderStep = (step) => {
    switch (step.type) {
      case "options":
        return (
          <View style={styles.messageContainer}>
            <Text style={styles.title}>{step.title}</Text>
            {step.fields.length > 0 &&
              step.fields.map((field, index) => (
                <Text key={index} style={styles.field}>
                  {field.label}: {field.value}
                </Text>
              ))}
            <View style={styles.actionsContainer}>
              {step.actions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleActionPress(action, step)}
                  style={[
                    !!selectedOptions[step.id]
                      ? styles.actionButtonDisabled
                      : styles.actionButton,
                    selectedOptions[step.id] === action.label &&
                      styles.selectedActionButton,
                  ]}
                  disabled={!!selectedOptions[step.id]}
                >
                  <Text style={styles.buttonText}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case "question":
        const currentField = step.fields[0];
        return (
          <View style={styles.messageContainer}>
            <Text style={styles.title}>{step.title}</Text>
            <Text style={styles.field}>{currentField.label}</Text>
          </View>
        );
      case "imageUpload":
        return (
          <View style={styles.messageContainer}>
            <Text style={styles.title}>{step.title}</Text>
            <Button
              title="Upload"
              onPress={() => console.log("Upload image")}
            />
          </View>
        );
      case "completed":
        return (
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>
              You have answered all the questions, do you want to submit?
            </Text>
            <View style={styles.confirmationButtonContainer}>
              <TouchableOpacity
                onPress={handleReset}
                style={styles.confirmationButton}
              >
                <Text style={styles.confirmationButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.confirmationButton}
              >
                <Text style={styles.confirmationButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const currentStepData = jobSteps.find((step) => step.id === currentStep);
  const inputType = currentStepData?.fields[0]?.inputType || "default";
  // console.log(currentStepData);
  const tabbarHeight = useBottomTabBarHeight();
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? tabbarHeight : 0}
      >
        {!loader ? (
          currentStepData ? (
            <View style={styles.container}>
              <FlatList
                ref={flatlistRef}
                data={[...messages, currentStepData]}
                renderItem={({ item }) => {
                  if (item.type === "user") {
                    return (
                      <View style={styles.userMessageContainer}>
                        <Text style={styles.userMessage}>{item.text}</Text>
                      </View>
                    );
                  }
                  return renderStep(item);
                }}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.chatContainer}
                onContentSizeChange={() => flatlistRef.current.scrollToEnd()}
                onLayout={() => flatlistRef.current.scrollToEnd()}
                showsVerticalScrollIndicator={false}
              />
              {currentStepData &&
                currentStepData.type !== "imageUpload" &&
                currentStepData.type !== "completed" &&
                currentStepData.type !== "options" && (
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      keyboardType={
                        inputType === "number"
                          ? "numeric"
                          : inputType === "decimal"
                          ? "decimal-pad"
                          : "default"
                      }
                      onChangeText={handleInputChange}
                      value={inputValue}
                      placeholder={
                        currentStepData
                          ? currentStepData?.title
                          : "Type a message"
                      }
                    />
                    <TouchableOpacity
                      onPress={handleNextField}
                      disabled={inputValue == ""}
                    >
                      <FontAwesome
                        name="send"
                        size={24}
                        color={
                          inputValue == ""
                            ? appTheme.disabled
                            : appTheme.primaryColor
                        }
                      />
                    </TouchableOpacity>
                  </View>
                )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: appTheme.backgroundColor,
              }}
            >
              {/* <ActivityIndicator animating={true} color={appTheme.primaryColor} /> */}
              <Text style={styles.emptyMsg}>No new jobs for you</Text>
            </View>
          )
        ) : (
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator animating={true} color={appTheme.primaryColor} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: "#dbc9c5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  chatContainer: {
    padding: 16,
  },
  messageContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  userMessageContainer: {
    backgroundColor: "#dcf8c6",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
  userMessage: {
    fontSize: height * 0.016,
  },
  title: {
    fontSize: height * 0.018,
    fontWeight: "500",
    marginBottom: 10,
    color: appTheme.primaryColor,
  },
  field: {
    fontSize: height * 0.016,
    marginBottom: 4,
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  actionButton: {
    backgroundColor: "#007aff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    marginRight: 10,
    borderRadius: 5,
  },
  completedStatus: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "center",
    width: "100%",
    // backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedActionButton: {
    backgroundColor: appTheme.primaryColor,
  },
  actionButtonDisabled: {
    backgroundColor: appTheme.disabled,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  confirmationContainer: {
    backgroundColor: appTheme.backgroundColor,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  confirmationText: {
    fontSize: height * 0.016,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
  },
  confirmationButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  confirmationButton: {
    backgroundColor: "#007aff",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmationButtonText: {
    color: "white",
    textAlign: "center",
  },
  emptyMsg: {
    fontSize: height * 0.025,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
    color: appTheme.disabled,
  },
});

export default ChatScreen;

// TODO:
// render question according to type, make a component of each type, this should be aligned left like chat -> done
//make a input box for user to enter text, and in next phase the image as well -> done
//input box should be disabled when there is no previous question, or when previous question does not require input box answers, like selecting option, etc. -> done
// make it look like chat ChatScreen -> done
// option to reset and submit -> done
// improve button ui -> done
// image upload functionality
// auto scroll (smoothly) to latest message -> done
// when no question show a placeholder
// input placeholder to be a question -> done
// send button to icon and disable send when input is null -> done
// check keyboard hinderence if any -> done
// frontend validation for type of text entered
// add header with ks avatar
