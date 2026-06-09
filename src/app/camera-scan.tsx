import NutritionScreen from "@/components/add-meal/nutrition-screen";
import ScanningScreen from "@/components/add-meal/scanning-screen";
import { uriToBase64 } from "@/helper/helper";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? "";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export type NutritionResult = {
  food: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  summary: string;
};

const analyzeFood = async (imageUri: string): Promise<NutritionResult> => {
  const base64 = await uriToBase64(imageUri);

  const body = {
    contents: [
      {
        parts: [
          {
            text: `You are a nutrition expert. Analyze this food image and respond ONLY with a valid JSON object (no markdown, no explanation) in this exact format:
{
  "food": "name of the food",
  "calories": "estimated kcal per serving",
  "protein": "grams of protein",
  "carbs": "grams of carbohydrates",
  "fat": "grams of fat",
  "summary": "one sentence description"
}
If no food is detected, still return the JSON with "Unknown" values.`,
          },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: base64,
            },
          },
        ],
      },
    ],
  };

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Gemini error: ${res.status}`);

  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean) as NutritionResult;
};

export default function CameraScan() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<NutritionResult | null>(null);
  const { bottom } = useSafeAreaInsets();

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!res.canceled) setUri(res.assets[0].uri);
  };

  const scanFood = async () => {
    if (!uri) return;
    if (!GEMINI_API_KEY) {
      Alert.alert(
        "Missing API Key",
        "Add EXPO_PUBLIC_GEMINI_API_KEY to your .env file.",
      );
      return;
    }
    setScanning(true);
    try {
      const nutrition = await analyzeFood(uri);
      setResult(nutrition);
    } catch (e) {
      Alert.alert("Error", "Could not analyze the image. Please try again.");
      console.error(e);
    } finally {
      setScanning(false);
    }
  };

  const retake = () => {
    setUri(null);
    setResult(null);
    setScanning(false);
  };

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={s.center}>
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Camera permission required
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) setUri(photo.uri);
  };

  if (scanning && uri) return <ScanningScreen uri={uri} />;

  if (result && uri) {
    return <NutritionScreen uri={uri} result={result} onRetake={retake} />;
  }

  if (uri) {
    return (
      <View style={s.center}>
        <Image
          source={{ uri }}
          contentFit="contain"
          style={{ width: 300, aspectRatio: 1, borderRadius: 16 }}
        />
        <View style={{ flexDirection: "row", gap: 16 }}>
          <Button onPress={retake} title="Retake" />
          <Button onPress={scanFood} title="Scan Food" />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFill}
        ref={ref}
        facing={facing}
        enableTorch={flash}
        mode="picture"
      />

      {/* Overlay */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={{ flex: 0.4, backgroundColor: "rgba(0,0,0,0.55)" }} />
        <View style={{ flexDirection: "row", height: 260 }}>
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.55)" }} />
          <View style={{ width: 290 }}>
            {[
              { top: 0, left: 0 },
              { top: 0, right: 0 },
              { bottom: 0, left: 0 },
              { bottom: 0, right: 0 },
            ].map((pos, i) => (
              <View
                key={i}
                style={[
                  s.corner,
                  pos,
                  {
                    borderTopWidth: i < 2 ? 3 : 0,
                    borderBottomWidth: i >= 2 ? 3 : 0,
                    borderLeftWidth: i % 2 === 0 ? 3 : 0,
                    borderRightWidth: i % 2 === 1 ? 3 : 0,
                  },
                ]}
              />
            ))}
            <Text style={s.frameLabel}>
              Place Food{"\n"}Inside{"\n"}Frame
            </Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.55)" }} />
        </View>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.55)" }} />
      </View>

      {/* Top bar */}
      <View style={s.topBar}>
        <TouchableOpacity>
          <FontAwesome6
            name="xmark"
            size={22}
            color="#fff"
            onPress={() => router.back()}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={s.flashBtn}
          onPress={() => setFlash((f) => !f)}
        >
          <FontAwesome6
            name="bolt"
            size={16}
            color={flash ? "#FFD600" : "#fff"}
          />
          <Text style={{ color: flash ? "#FFD600" : "#fff", fontSize: 14 }}>
            Flash
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom bar */}
      <View style={[s.bottomBar, { paddingBottom: Math.max(bottom, 12) }]}>
        <TouchableOpacity style={s.sideBtn} onPress={pickImage}>
          <FontAwesome6 name="image" size={22} color="#fff" />
          <Text style={s.sideLabel}>Gallery</Text>
        </TouchableOpacity>
        <Pressable onPress={takePicture}>
          {({ pressed }) => (
            <View style={[s.shutter, { opacity: pressed ? 0.6 : 1 }]}>
              <View style={s.shutterInner} />
            </View>
          )}
        </Pressable>
        <TouchableOpacity
          style={s.sideBtn}
          onPress={() => setFacing((f) => (f === "back" ? "front" : "back"))}
        >
          <FontAwesome6 name="rotate-left" size={22} color="#fff" />
          <Text style={s.sideLabel}>Flip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  corner: { position: "absolute", width: 28, height: 28, borderColor: "#fff" },
  frameLabel: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: "rgba(255,255,255,0.75)",
    fontSize: 16,
    lineHeight: 26,
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  flashBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.75)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 36,
    paddingTop: 16,
  },
  sideBtn: { alignItems: "center", gap: 5, width: 70 },
  sideLabel: { color: "#fff", fontSize: 12 },
  shutter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#fff",
  },
});
