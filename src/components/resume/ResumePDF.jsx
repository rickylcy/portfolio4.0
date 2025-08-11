import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 28, fontSize: 11, lineHeight: 1.35 },
  h1: { fontSize: 20, marginBottom: 2, fontWeight: 700 },
  h2: { fontSize: 14, marginTop: 14, marginBottom: 6, fontWeight: 700 },
  meta: { fontSize: 9, opacity: 0.8, marginBottom: 8 },
  bold: { fontWeight: 700 },
  item: { marginBottom: 6 },
});

export default function ResumePDF({ data }) {
  const summaryLabel = data.header.title === "全端開發者" ? "摘要" : "Summary";
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>{data.header.name}</Text>
        <Text>{data.header.title}</Text>
        <Text style={styles.meta}>{data.header.meta}</Text>

        <Text style={styles.h2}>{summaryLabel}</Text>
        <Text>{data.summary}</Text>

        {data.sections.map((sec, i) => (
          <View key={i}>
            <Text style={styles.h2}>{sec.heading}</Text>
            {sec.items.map((it, j) => (
              <View key={j} style={styles.item}>
                <Text>
                  <Text style={styles.bold}>{it.title}</Text>
                  {it.period ? ` • ${it.period}` : ""}
                </Text>
                {it.bullets?.map((b, k) => (
                  <Text key={k}>• {b}</Text>
                ))}
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}
