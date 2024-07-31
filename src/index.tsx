import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  SharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { getRandomColor, getRandomWidth } from "./utlities";

const App = () => {
  const progress = useSharedValue(0);
  return (
    <View
      style={styles.container}
      onTouchStart={() => {
        progress.value = withSpring(1);
      }}
      onTouchEnd={() => {
        progress.value = withSpring(0);
      }}
    >
      {new Array(4).fill(null).map((_, index) => (
        <Card key={index} progress={progress} index={index} />
      ))}
      <StatusBar style="auto" />
    </View>
  );
};

export default App;

type CardProps = {
  index: number;
  progress: SharedValue<number>;
};

const Card: React.FC<CardProps> = ({ index, progress }) => {
  const rStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [0, 30 * index],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      progress.value,
      [0, 1],
      [0, -2 * index],
      Extrapolation.CLAMP
    );
    const rotate = interpolate(
      progress.value,
      [0, 1],
      [-index * 10, index * 10],
      Extrapolation.CLAMP
    );
    return {
      transform: [
        {
          translateX: translateX,
        },
        {
          translateY: translateY,
        },
        {
          rotate: `${rotate}deg`,
        },
      ],
    };
  });

  const views: JSX.Element[] = [];

  for (let i = 0; i < 9; i++) {
    views.push(
      <View
        key={i}
        style={[
          styles.view,
          {
            backgroundColor: getRandomColor(),
            width: getRandomWidth(),
          },
        ]}
      />
    );
  }

  return (
    <Animated.View
      key={index}
      style={[
        styles.card,
        {
          zIndex: -index,
        },
        rStyle,
      ]}
    >
      {views}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9 ",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    height: 250,
    aspectRatio: 2.5 / 4,
    backgroundColor: "white",
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
    borderColor: "#c9c9c9",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 25,
    borderCurve: "continuous",
    borderWidth: 1,
    position: "absolute",
    paddingHorizontal: 10,
    paddingVertical: 20,
    overflow: "hidden",
  },
  view: {
    height: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
});
