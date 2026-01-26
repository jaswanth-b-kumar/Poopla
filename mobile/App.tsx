import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.bgGlow} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topbar}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>P</Text>
          </View>
          <View>
            <Text style={styles.brandTitle}>Poopla</Text>
            <Text style={styles.brandSub}>AI screening for infant stool patterns</Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Screening support, not a diagnosis</Text>
          <Text style={styles.title}>Calm clarity when you are unsure.</Text>
          <Text style={styles.subtitle}>
            Upload a single image. We run quality checks, explain what the AI
            focused on, and escalate uncertain results for clinician review.
          </Text>

          <View style={styles.pillRow}>
            <Text style={styles.pill}>On-device ready</Text>
            <Text style={styles.pill}>Consent-first</Text>
            <Text style={styles.pill}>Audit-friendly</Text>
          </View>
        </View>

        <View style={styles.uploadCard}>
          <View style={styles.cameraOrb}>
            <Text style={styles.cameraEmoji}>??</Text>
          </View>
          <Text style={styles.uploadTitle}>Upload a photo</Text>
          <Text style={styles.uploadCopy}>
            Clear, well-lit, and only the sample in view. We auto-reject faces or
            identifiers.
          </Text>
          <Pressable style={styles.cta}>
            <Text style={styles.ctaText}>Select image</Text>
          </Pressable>
          <Text style={styles.consent}>
            By uploading, you consent to processing.
          </Text>
          <View style={styles.qualityList}>
            <Text style={styles.qualityItem}>? Focused</Text>
            <Text style={styles.qualityItem}>? No flash glare</Text>
            <Text style={styles.qualityItem}>? No PII</Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Privacy-first</Text>
            <Text style={styles.featureCopy}>
              Images screened for identifiers before analysis.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Explainable output</Text>
            <Text style={styles.featureCopy}>
              Confidence and focus region are always visible.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Clinician escalation</Text>
            <Text style={styles.featureCopy}>
              Uncertain cases route to expert review.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerPill}>
            <Text style={styles.footerPillText}>Medical Disclaimer</Text>
          </View>
          <Text style={styles.footerCopy}>
            Poopla provides screening support only and does not replace clinician
            judgment.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0b0d14"
  },
  bgGlow: {
    position: "absolute",
    top: -180,
    left: -120,
    right: -120,
    height: 420,
    backgroundColor: "rgba(96,165,250,0.14)",
    borderBottomLeftRadius: 240,
    borderBottomRightRadius: 240
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 24 : 12,
    paddingBottom: 40,
    gap: 20
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  brandMark: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(52,211,153,0.8)",
    alignItems: "center",
    justifyContent: "center"
  },
  brandMarkText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0b0d14"
  },
  brandTitle: {
    color: "#F1F5F9",
    fontSize: 18,
    fontWeight: "700"
  },
  brandSub: {
    color: "#94A3B8",
    fontSize: 12
  },
  heroCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "rgba(15,20,34,0.75)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.2)",
    gap: 12
  },
  eyebrow: {
    color: "#9CA3AF",
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase"
  },
  title: {
    color: "#F8FAFC",
    fontSize: 28,
    fontWeight: "600"
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 20
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.25)",
    color: "#94A3B8",
    fontSize: 12
  },
  uploadCard: {
    padding: 22,
    borderRadius: 22,
    backgroundColor: "#101626",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.2)",
    alignItems: "center",
    gap: 10
  },
  cameraOrb: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "rgba(52,211,153,0.12)",
    borderWidth: 1,
    borderColor: "rgba(52,211,153,0.35)",
    alignItems: "center",
    justifyContent: "center"
  },
  cameraEmoji: {
    fontSize: 28
  },
  uploadTitle: {
    color: "#F8FAFC",
    fontSize: 18,
    fontWeight: "600"
  },
  uploadCopy: {
    color: "#94A3B8",
    fontSize: 13,
    textAlign: "center"
  },
  cta: {
    backgroundColor: "#34D399",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 14,
    width: "100%",
    alignItems: "center"
  },
  ctaText: {
    color: "#0b0d14",
    fontWeight: "700"
  },
  consent: {
    color: "#94A3B8",
    fontSize: 11,
    textAlign: "center"
  },
  qualityList: {
    width: "100%",
    gap: 6
  },
  qualityItem: {
    color: "#94A3B8",
    fontSize: 12
  },
  featureRow: {
    gap: 12
  },
  featureCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.2)",
    backgroundColor: "rgba(15,20,34,0.7)"
  },
  featureTitle: {
    color: "#F8FAFC",
    fontWeight: "600",
    marginBottom: 4
  },
  featureCopy: {
    color: "#94A3B8",
    fontSize: 12
  },
  footer: {
    alignItems: "center",
    gap: 8,
    paddingTop: 8
  },
  footerPill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(251,191,36,0.16)"
  },
  footerPillText: {
    color: "#FBBF24",
    fontSize: 11
  },
  footerCopy: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center"
  }
});
