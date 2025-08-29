import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Post from "@/components/Post";
import { PostData } from "@/types/post";
import { Stack } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
  const [posts, setPosts] = useState<PostData[]>  ([
    {
      title: "Mitt første innlegg",
      description: "Sensasjonelt!",
    },
    {
      title: "Mitt andre innlegg",
      description: "Ubeskrivelig flott",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const addPost = () => {
    if (newTitle && newDescription) {
      const newPost: PostData = {
        title: newTitle,
        description: newDescription,
      };
      setPosts([newPost, ...posts]);
      setNewTitle("");
      setNewDescription("");
      setIsModalVisible(false);
    }
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={() => setIsModalVisible(true)}>
              <Text>Knapp</Text>
            </Pressable>
          ),
        }}
      />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.post}>
          <TextInput
            placeholder="Tittel"
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <TextInput
          placeholder="Beskrivelse"
          value={newDescription}
          onChangeText={setNewDescription}
          />
          <Pressable onPress={addPost}>
            <Text>Lagre</Text>
          </Pressable>
          <Pressable onPress={() => setIsModalVisible(false)}>
            <Text>Lukk</Text>
          </Pressable>
        </View>
      </Modal>
      <FlatList
        data={posts}
        ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
        renderItem={(post) => <Post postData={post.item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  post: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
