import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CameraScan() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState(false);
  const { bottom } = useSafeAreaInsets();

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

  if (uri) {
    return (
      <View style={s.center}>
        <Image
          source={{ uri }}
          contentFit="contain"
          style={{ width: 300, aspectRatio: 1 }}
        />
        <Button onPress={() => setUri(null)} title="Retake" />
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
            {/* Corner brackets */}
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
        <TouchableOpacity style={s.sideBtn}>
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
