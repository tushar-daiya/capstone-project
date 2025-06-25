"use client";
import {
  Document,
  Font,
  Image as PDFImage,
  Page,
  StyleSheet,
  Text,
  View,
  Link,
} from "@react-pdf/renderer";
import type { PDFViewer as PDFViewerType } from "@react-pdf/renderer";
import type { PDFDownloadLink as PDFDownloadLinkType } from "@react-pdf/renderer";
import { icons } from "../icons";
import { generateAchievement } from "@/lib/lib";
import { useUserResumeStore } from "@/store/userResumeStore";
import { useDebounce } from "@/lib/hooks";
import { memo, useEffect, useState } from "react";
import { Resume } from "@/lib/types";
import { Button } from "../ui/button";

export const PDFPreviewer = () => {
  const [PDFViewer, setPDFViewer] = useState<typeof PDFViewerType | null>(null);

  useEffect(() => {
    import("@react-pdf/renderer").then((mod) => {
      setPDFViewer(() => mod.PDFViewer);
    });
  }, []);
  const userData = useUserResumeStore((state) => state.userData);
  const debouncedData = useDebounce(userData, 500);
  if (!PDFViewer) return null;
  return (
    <PDFViewer
      key={JSON.stringify(debouncedData)}
      width={"100%"}
      style={{ height: "100%", padding: "20px 0px 20px 20px" }}
      showToolbar={false}
    >
      <PDFDoc userData={debouncedData} />
    </PDFViewer>
  );
};

const PDFDocComponnet = ({ userData }: { userData: Resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.userName}>{userData.personalInfo.name}</Text>
      <View style={styles.socialsDiv}>
        {userData.personalInfo.email.length > 0 && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "0px 8px",
              borderRight: "1px solid #000",
              gap: 4,
            }}
          >
            <PDFImage
              src={icons.Email}
              style={{ width: 11, height: 11, marginTop: 3 }}
            />
            <Text>{userData.personalInfo.email}</Text>
          </View>
        )}
        {userData.personalInfo.location?.length > 0 && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0px 8px",
              borderRight: "1px solid #000",
              gap: 4,
              justifyContent: "center",
            }}
          >
            <PDFImage
              src={icons.Location}
              style={{ width: 11, height: 11, marginTop: 3 }}
            />
            <Text>{userData.personalInfo.location}</Text>
          </View>
        )}
        {userData.personalInfo.phone.length > 0 && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0px 8px",
              borderRight: "1px solid #000",
              gap: 4,
              justifyContent: "center",
            }}
          >
            <PDFImage
              src={icons.Phone}
              style={{ width: 11, height: 11, marginTop: 3 }}
            />
            <Text>{userData.personalInfo.phone}</Text>
          </View>
        )}
        {userData.personalInfo?.website && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0px 8px",
              borderRight: "1px solid #000",
              gap: 4,
              justifyContent: "center",
            }}
          >
            <PDFImage
              src={icons.Website}
              style={{ width: 11, height: 11, marginTop: 3 }}
            />
            <Text>
              <Link
                src={userData.personalInfo.website}
                style={{ textDecoration: "none", color: "black" }}
              >
                Portfolio
              </Link>
            </Text>
          </View>
        )}
        {userData.personalInfo?.linkedIn && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0px 8px",
              borderRight: "1px solid #000",
              gap: 4,
              justifyContent: "center",
            }}
          >
            <PDFImage
              src={icons.LinkedIn}
              style={{ width: 11, height: 11, marginTop: 3 }}
            />
            <Link
              src={userData.personalInfo.linkedIn}
              style={{ textDecoration: "none", color: "black" }}
            >
              LinkedIn
            </Link>
          </View>
        )}
        {userData.personalInfo?.github && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0px 8px",
              gap: 4,
              justifyContent: "center",
            }}
          >
            <PDFImage
              src={icons.GitHub}
              style={{ width: 11, height: 11, marginTop: 3 }}
            />
            <Link
              src={userData.personalInfo.github}
              style={{ textDecoration: "none", color: "black" }}
            >
              GitHub
            </Link>
          </View>
        )}
      </View>
      {userData.education?.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={{ paddingLeft: 5, paddingRight: 5 }}>
            {userData.education.map((edu, index) => (
              <View
                wrap={false}
                key={index}
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View>
                  <Text style={{ fontWeight: "bold", lineHeight: 0.8 }}>
                    {edu.institution}
                  </Text>
                  <Text style={styles.italicText}>{edu.degree}</Text>
                </View>
                <Text style={[styles.italicText, { textAlign: "right" }]}>
                  {edu.startDate} - {edu.endDate || "Present"}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
      {userData.workExperience?.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <View style={{ paddingLeft: 5, paddingRight: 5 }}>
            {userData.workExperience?.map((exp, index) => (
              <View wrap={false} key={index} style={{ marginBottom: 10 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "bold", lineHeight: 0.8 }}>
                      {exp.company}
                    </Text>
                    <Text style={styles.italicText}>{exp.position}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.italicText}>{exp.location}</Text>
                    <Text style={styles.italicText}>
                      {exp.startDate} - {exp.endDate || "Present"}
                    </Text>
                  </View>
                </View>

                {exp.achievements && (
                  <View style={{ marginLeft: 5, marginTop: 2 }}>
                    {exp.achievements.length > 0 &&
                      exp.achievements.map((achievement, idx) => (
                        <Text key={idx} style={{ marginBottom: 2 }}>
                          o {achievement}
                        </Text>
                      ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      )}
      {userData.projects?.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <Text style={styles.sectionTitle}>Projects</Text>
          <View style={{ paddingLeft: 5, paddingRight: 5 }}>
            {userData.projects.map((project, index) => (
              <View key={index} wrap={false} style={{ marginBottom: 10 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "bold" }}>
                      <Link
                        src={project.link || "#"}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {project.title}
                      </Link>
                    </Text>
                  </View>
                  <View style={{ alignItems: "flex-end", maxWidth: "60%" }}>
                    {project.skills && (
                      <Text style={[styles.italicText, { textAlign: "right" }]}>
                        {project.skills.join(", ")}
                      </Text>
                    )}
                  </View>
                </View>
                {project.features && (
                  <View style={{ marginLeft: 5, marginTop: 2 }}>
                    {project.features.length > 0 &&
                      project.features.map((feat, idx) => (
                        <Text key={idx} style={{ marginBottom: 2 }}>
                          o {feat}
                        </Text>
                      ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      )}
      {userData.achievements.length > 0 && (
        <View wrap={false} style={{ marginTop: 10 }}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={{ paddingLeft: 5, paddingRight: 5 }}>
            {userData.achievements?.map((achievement, index) => (
              <Text key={index} style={{ marginBottom: 5 }}>
                {generateAchievement(achievement)}
              </Text>
            ))}
          </View>
        </View>
      )}
      {userData.certifications.length > 0 && (
        <View wrap={false} style={{ marginTop: 10 }}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          <View style={{ paddingLeft: 5, paddingRight: 5 }}>
            {userData.certifications?.map((cert, index) => (
              <View
                key={index}
                style={{
                  marginBottom: 10,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ fontWeight: "bold" }}>{cert.title}</Text>
                  <Text style={styles.italicText}>{cert.issuer}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.italicText}>{cert.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
      {userData.skills.length > 0 && (
        <View wrap={false} style={{ marginTop: 10 }}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {userData.skills?.map((skill, index) => (
            <Text key={index} style={{ marginLeft: 5 }}>
              <Text style={{ fontWeight: "bold" }}>{skill.category}</Text>
              {skill.items && skill.items.length > 0 ? (
                <Text> - {skill.items.join(", ")}</Text>
              ) : (
                <Text> - No skills listed</Text>
              )}
            </Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
);
const PDFDoc = memo(PDFDocComponnet);
PDFDoc.displayName = "PDFDoc";

Font.registerHyphenationCallback((word) => [word]);
Font.register({
  family: "New Computer Modern",
  fonts: [
    { src: "/fonts/NewCM10-Regular.otf" },
    { src: "/fonts/NewCM10-Bold.otf", fontWeight: "bold" },
    { src: "/fonts/NewCM10-Italic.otf", fontStyle: "italic" },
    {
      src: "/fonts/NewCM10-BoldItalic.otf",
      fontStyle: "italic",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "New Computer Modern",
    fontSize: 11,
  },
  userName: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  socialsDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // gap: 10,
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    borderBottom: "1px solid #000",
    marginBottom: 5,
  },
  italicText: {
    fontStyle: "italic",
  },
});

export function PDFDownloadButton() {
  const userData = useUserResumeStore((state) => state.userData);
  const debouncedData = useDebounce(userData, 500);
  const [PDFDownloadLink, setPDFDownloadLink] = useState<
    typeof PDFDownloadLinkType | null
  >(null);

  useEffect(() => {
    import("@react-pdf/renderer").then((mod) => {
      setPDFDownloadLink(() => mod.PDFDownloadLink);
    });
  }, []);

  if (!PDFDownloadLink) return null;
  return (
    <Button asChild>
      <PDFDownloadLink
        document={<PDFDoc userData={debouncedData} />}
        fileName="resume.pdf"
      >
        {({ loading }: { loading: boolean }) =>
          loading ? (
            <button disabled>Loading PDF...</button>
          ) : (
            <button>Download PDF</button>
          )
        }
      </PDFDownloadLink>
    </Button>
  );
}
