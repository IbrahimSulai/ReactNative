/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import theme from './theme';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issuesList: [
        { title: "Symptom Improvement", id: "Symptom1", note: "" },
        { title: "Functional Improvement", id: "Function1", note: "" },
        { title: "Function Worsening", id: "Function2", note: "" },
      ],
      issuesUpdatesNote: "",
      selectedIssueId: null
    }
  }

  UNSAFE_componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {

  }

  _keyboardDidHide() {
    this.setState({
      selectedIssueId: null
    })
  }

  renderIssuesList() {
    let issuesList = [];
    this.state.issuesList.forEach((issue) => {
      issuesList.push(
        <TouchableOpacity key={"issueList" + issue.id} activeOpacity={0.9} onPress={() => {
          this.setState({
            selectedIssueId: this.state.selectedIssueId === issue.id ? null : issue.id
          })
        }}>
          <View style={[styles.issuesList, {
            backgroundColor: this.state.selectedIssueId == issue.id ? theme.primary : theme.white
          }]}>
            <Text style={styles.issueLabel} numberOfLines={1}>{issue.title}</Text>
          </View>
        </TouchableOpacity>
      )
    });
    return issuesList;
  }

  updateItem(id, itemAttributes) {
    var index = this.state.issuesList.findIndex(x => x.id === id);
    if (index === -1) {

    }
    else {
      this.setState({
        issuesList: [
          ...this.state.issuesList.slice(0, index),
          Object.assign({}, this.state.issuesList[index], itemAttributes),
          ...this.state.issuesList.slice(index + 1)
        ]
      });
    }
  }

  render() {
    var selectedIssue = this.state.issuesList.find((issue) => { return issue.id === this.state.selectedIssueId; });
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1, marginTop: 100, marginHorizontal: 50 }}
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps={'handled'}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Text style={styles.issueTitle}> Issues Updates * </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", borderColor: theme.borderGrey, borderWidth: 2, borderRadius: 10, height: 100 }}>
            {this.renderIssuesList()}
          </View>
          <Text style={styles.issueSubTitle}> Issues Update Notes </Text>
          <TextInput
            placeholder="Type here..."
            style={styles.textBox}
            placeholderTextColor={theme.gray}
            onChangeText={(text) => this.setState({ issuesUpdatesNote: text })}
            value={this.state.issuesUpdatesNote}
          />
          <View style={{ backgroundColor: "red", height: 100, marginVertical: 50 }} />
          <View style={{ backgroundColor: "blue", height: 100, marginVertical: 50 }} />
          {this.state.selectedIssueId != null && selectedIssue && <TextInput
            placeholder="Add NotesType here..."
            style={[styles.textBox, styles.notes]}
            autoFocus={true}
            placeholderTextColor={theme.gray}
            onChangeText={(text) => this.updateItem(this.state.selectedIssueId, { note: text })}
            value={selectedIssue.note}
          />}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  issueTitle: {
    textAlign: 'center',
    fontFamily: "bold",
    fontSize: 21,
    lineHeight: 21,
    letterSpacing: 2,
    color: theme.gray,
    marginVertical: 20
  },
  issueSubTitle: {
    textAlign: 'center',
    fontFamily: "bold",
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 1.5,
    color: theme.gray,
    marginVertical: 20
  },
  issueLabel: {
    textAlign: 'center',
    fontFamily: "regular",
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0.54,
    color: theme.gray,
  },
  issuesList: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  textBox: {
    backgroundColor: theme.white,
    borderRadius: 2,
    color: theme.gray,
    borderColor: theme.black,
    borderWidth: 2,
    borderRadius: 10,
    fontFamily: "regular",
    fontSize: 15,
    letterSpacing: 0.34,
    padding: 10,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: theme.black,
    shadowOffset: {
      height: 1,
      width: 0
    },
    elevation: 1,
    minHeight: 100
  },
  notes: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});

export default App;
