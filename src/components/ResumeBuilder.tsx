"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useUserResumeStore } from "@/store/userResumeStore";
import { Button } from "./ui/button";
import {
  BluetoothConnectedIcon,
  Cross,
  Delete,
  Pen,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PDFDownloadButton } from "./pdf/PDFPreviewer";

export default function ResumeBuilder() {
  const { userData, setUserData } = useUserResumeStore();
  const tabs = [
    { value: "personalInfo", label: "Personal Info" },
    { value: "education", label: "Education" },
    { value: "workExperience", label: "Work Experience" },
    { value: "projects", label: "Projects" },
    { value: "skills", label: "Skills" },
    { value: "achievements", label: "Achievements" },
    { value: "certifications", label: "Certifications" },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Resume Builder</h2>
        <PDFDownloadButton />
      </div>
      <div className="w-full">
        <Tabs defaultValue="personalInfo" className="w-full">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="personalInfo">
            <div className="border p-4 rounded shadow-lg">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={userData.personalInfo.name}
                    onChange={(e) =>
                      setUserData({
                        personalInfo: {
                          ...userData.personalInfo,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.personalInfo.email}
                    onChange={(e) =>
                      setUserData({
                        personalInfo: {
                          ...userData.personalInfo,
                          email: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={userData.personalInfo.phone}
                    onChange={(e) =>
                      setUserData({
                        personalInfo: {
                          ...userData.personalInfo,
                          phone: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={userData.personalInfo.location}
                    onChange={(e) =>
                      setUserData({
                        personalInfo: {
                          ...userData.personalInfo,
                          location: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={userData.personalInfo.website || ""}
                    onChange={(e) =>
                      setUserData({
                        personalInfo: {
                          ...userData.personalInfo,
                          website: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedIn">LinkedIn</Label>
                  <Input
                    id="linkedIn"
                    value={userData.personalInfo.linkedIn || ""}
                    onChange={(e) => {
                      setUserData({
                        personalInfo: {
                          ...userData.personalInfo,
                          linkedIn: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={userData.personalInfo.github || ""}
                    onChange={(e) =>
                      setUserData({
                        personalInfo: {
                          ...userData.personalInfo,
                          github: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="education">
            <div className="border p-4 rounded shadow-lg">
              <div className="space-y-4">
                {userData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="border p-4 flex justify-between shadow-xl rounded"
                  >
                    <div>
                      <p className="text-lg font-bold">{edu.institution}</p>
                      <p className="text-sm">{edu.degree}</p>
                      <p className="text-sm">
                        {edu.startDate}
                        {edu.endDate && ` - `}
                        {edu.endDate}
                      </p>
                    </div>
                    <div className="flex items-center self-start space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Pencil size={16} />
                          </Button>
                        </DialogTrigger>
                        <AddEducationDialog
                          type="edit"
                          index={index}
                          institution={edu.institution}
                          degree={edu.degree}
                          startDate={edu.startDate}
                          endDate={edu.endDate}
                        />
                      </Dialog>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          const updatedEducation = userData.education.filter(
                            (_, i) => i !== index
                          );
                          setUserData({ education: updatedEducation });
                        }}
                      >
                        <Delete />
                      </Button>
                    </div>
                  </div>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Education</Button>
                  </DialogTrigger>
                  <AddEducationDialog type="add" />
                </Dialog>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="workExperience">
            <div className="border p-4 rounded shadow-lg">
              <div className="space-y-4">
                {userData.workExperience.map((work, index) => (
                  <div
                    key={index}
                    className="border p-4 flex justify-between shadow-xl rounded"
                  >
                    <div>
                      <p className="text-lg font-bold">{work.company}</p>
                      <p className="text-sm">{work.position}</p>
                      <p className="text-sm">
                        {work.startDate} - {work.endDate || "Present"}
                      </p>
                      <p className="text-sm">{work.location}</p>
                      {work.achievements && work.achievements.length > 0 && (
                        <ul className="list-disc pl-5 mt-2">
                          {work.achievements.map((ach, i) => (
                            <li key={i}>{ach}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 self-start">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Pencil size={16} />
                          </Button>
                        </DialogTrigger>
                        <WorkExperienceDialog
                          index={index}
                          type="edit"
                          {...work}
                        />
                      </Dialog>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          const updatedWorkExperience =
                            userData.workExperience.filter(
                              (_, i) => i !== index
                            );
                          setUserData({
                            workExperience: updatedWorkExperience,
                          });
                        }}
                      >
                        <Delete />
                      </Button>
                    </div>
                  </div>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Work Experience</Button>
                  </DialogTrigger>
                  <WorkExperienceDialog type="add" />
                </Dialog>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="border p-4 rounded shadow-lg">
              <div className="space-y-4">
                {userData.projects.map((project, index) => (
                  <div
                    key={index}
                    className="border p-4 flex justify-between shadow-xl rounded"
                  >
                    <div>
                      <p className="text-lg font-bold">{project.title}</p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          {project.link}
                        </a>
                      )}
                      {project.skills && project.skills.length > 0 && (
                        <p className="text-sm mt-2">
                          Skills: {project.skills.join(", ")}
                        </p>
                      )}
                      {project.features && project.features.length > 0 && (
                        <ul className="list-disc pl-5 mt-2">
                          {project.features.map((ft, i) => (
                            <li key={i}>{ft}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 self-start">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Edit</Button>
                        </DialogTrigger>
                        <ProjectsDialog
                          index={index}
                          type="edit"
                          {...project}
                        />
                      </Dialog>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          const updatedProjects = userData.projects.filter(
                            (_, i) => i !== index
                          );
                          setUserData({ projects: updatedProjects });
                        }}
                      >
                        <Delete />
                      </Button>
                    </div>
                  </div>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Project</Button>
                  </DialogTrigger>
                  <ProjectsDialog type="add" />
                </Dialog>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <div className="border p-4 rounded shadow-lg">
              <div className="space-y-4">
                {userData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="border p-4 flex justify-between shadow-xl rounded"
                  >
                    <div>
                      <p className="text-lg font-bold">{skill.category}</p>
                      <ul className="list-disc pl-5 mt-2">
                        {skill.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center space-x-2 self-start">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Edit</Button>
                        </DialogTrigger>
                        <AddSkillsDialog
                          index={index}
                          type="edit"
                          category={skill.category}
                          items={skill.items}
                        />
                      </Dialog>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          const updatedSkills = userData.skills.filter(
                            (_, i) => i !== index
                          );
                          setUserData({ skills: updatedSkills });
                        }}
                      >
                        <Delete />
                      </Button>
                    </div>
                  </div>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Skills</Button>
                  </DialogTrigger>
                  <AddSkillsDialog type="add" />
                </Dialog>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="border p-4 rounded shadow-lg">
              <div className="space-y-4">
                {userData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="border p-4 flex justify-between shadow-xl rounded"
                  >
                    <div>
                      <p className="text-lg font-bold">
                        Position: {achievement.position}
                      </p>
                      <p className="text-sm">{achievement.event}</p>
                      <p className="text-sm">{achievement.heldAt}</p>
                    </div>
                    <div className="flex items-center space-x-2 self-start">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Edit</Button>
                        </DialogTrigger>
                        <AddAchievementsDialog
                          index={index}
                          type="edit"
                          {...achievement}
                        />
                      </Dialog>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          const updatedAchievements =
                            userData.achievements.filter((_, i) => i !== index);
                          setUserData({ achievements: updatedAchievements });
                        }}
                      >
                        <Delete />
                      </Button>
                    </div>
                  </div>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Achievement</Button>
                  </DialogTrigger>
                  <AddAchievementsDialog type="add" />
                </Dialog>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="certifications">
            <div className="border p-4 rounded shadow-lg">
              <div className="space-y-4">
                {userData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="border p-4 flex justify-between shadow-xl rounded"
                  >
                    <div>
                      <p className="text-lg font-bold">{cert.title}</p>
                      <p className="text-sm">Issuer: {cert.issuer}</p>
                      <p className="text-sm">Date: {cert.date}</p>
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          View Certificate
                        </a>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 self-start">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Edit</Button>
                        </DialogTrigger>
                        <AddCertificationsDialog
                          index={index}
                          type="edit"
                          {...cert}
                        />
                      </Dialog>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          const updatedCertifications =
                            userData.certifications.filter(
                              (_, i) => i !== index
                            );
                          setUserData({
                            certifications: updatedCertifications,
                          });
                        }}
                      >
                        <Delete />
                      </Button>
                    </div>
                  </div>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Certification</Button>
                  </DialogTrigger>
                  <AddCertificationsDialog type="add" />
                </Dialog>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function AddCertificationsDialog({
  index,
  title,
  issuer,
  date,
  link,
  type,
}: {
  index?: number;
  title?: string;
  issuer?: string;
  date?: string;
  link?: string;
  type?: "edit" | "add";
}) {
  const { userData, setUserData } = useUserResumeStore();
  const [certification, setCertification] = useState({
    title: title || "",
    issuer: issuer || "",
    date: date || "",
    link: link || "",
  });

  return (
    <DialogContent>
      <DialogTitle>
        {type === "edit" ? "Edit Certification" : "Add New Certification"}
      </DialogTitle>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={certification.title}
            onChange={(e) =>
              setCertification({ ...certification, title: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="issuer">Issuer</Label>
          <Input
            id="issuer"
            value={certification.issuer}
            onChange={(e) =>
              setCertification({ ...certification, issuer: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            value={certification.date}
            onChange={(e) =>
              setCertification({ ...certification, date: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link">Link</Label>
          <Input
            id="link"
            value={certification.link}
            onChange={(e) =>
              setCertification({ ...certification, link: e.target.value })
            }
          />
        </div>
        <Button
          onClick={() => {
            if (type === "edit" && index !== undefined) {
              const updatedCertifications = userData.certifications.map(
                (cert, i) => (i === index ? certification : cert)
              );
              setUserData({ certifications: updatedCertifications });
            } else {
              setUserData({
                certifications: [...userData.certifications, certification],
              });
              setCertification({
                title: "",
                issuer: "",
                date: "",
                link: "",
              });
            }
          }}
        >
          {type === "edit" ? "Update Certification" : "Add Certification"}
        </Button>
      </div>
    </DialogContent>
  );
}

function AddAchievementsDialog({
  index,
  position,
  event,
  heldAt,
  type,
}: {
  index?: number;
  position?: number;
  event?: string;
  heldAt?: string;
  type?: "edit" | "add";
}) {
  const { userData, setUserData } = useUserResumeStore();
  const [achievement, setAchievement] = useState({
    position: position || 1,
    event: event || "",
    heldAt: heldAt || "",
  });

  return (
    <DialogContent>
      <DialogTitle>
        {type === "edit" ? "Edit Achievement" : "Add New Achievement"}
      </DialogTitle>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            value={achievement.position}
            onChange={(e) =>
              setAchievement({ ...achievement, position: +e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="event">Event</Label>
          <Input
            id="event"
            value={achievement.event}
            onChange={(e) =>
              setAchievement({ ...achievement, event: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="heldAt">Held At</Label>
          <Input
            id="heldAt"
            value={achievement.heldAt}
            onChange={(e) =>
              setAchievement({ ...achievement, heldAt: e.target.value })
            }
          />
        </div>
        <Button
          onClick={() => {
            if (type === "edit" && index !== undefined) {
              const updatedAchievements = userData.achievements.map((ach, i) =>
                i === index ? achievement : ach
              );
              setUserData({ achievements: updatedAchievements });
            } else {
              setUserData({
                achievements: [...userData.achievements, achievement],
              });
              setAchievement({ position: 1, event: "", heldAt: "" });
            }
          }}
        >
          {type === "edit" ? "Update Achievement" : "Add Achievement"}
        </Button>
      </div>
    </DialogContent>
  );
}

function AddSkillsDialog({
  index,
  category,
  items,
  type,
}: {
  index?: number;
  category?: string;
  items?: string[];
  type?: "edit" | "add";
}) {
  const { userData, setUserData } = useUserResumeStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [skillCategory, setSkillCategory] = useState(category || "");
  const [skillItems, setSkillItems] = useState(items || []);

  return (
    <DialogContent>
      <DialogTitle>
        {type === "edit" ? "Edit Skills" : "Add New Skills"}
      </DialogTitle>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={skillCategory}
            onChange={(e) => setSkillCategory(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="items">Skills</Label>
          <div className="flex items-center space-x-2">
            <Input
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (inputRef.current && inputRef.current.value) {
                    setSkillItems([...skillItems, inputRef.current.value]);
                    inputRef.current.value = "";
                  }
                }
              }}
              placeholder="Add skill"
            />
            <Button
              onClick={() => {
                if (inputRef.current && inputRef.current.value) {
                  setSkillItems([...skillItems, inputRef.current.value]);
                  inputRef.current.value = "";
                }
              }}
            >
              <Plus />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {skillItems.map((skill, i) => (
            <div
              className="flex w-max text-sm items-center gap-1 bg-gray-200 rounded-lg px-2 py-1"
              key={i}
            >
              <p className="text-sm">{skill}</p>
              <X
                size={14}
                onClick={() => {
                  const updatedSkills = skillItems.filter((_, j) => j !== i);
                  setSkillItems(updatedSkills);
                }}
                className="cursor-pointer"
              />
            </div>
          ))}
        </div>
        <Button
          onClick={() => {
            if (type === "edit" && index !== undefined) {
              const updatedSkills = userData.skills.map((skill, i) =>
                i === index
                  ? { category: skillCategory, items: skillItems }
                  : skill
              );
              setUserData({ skills: updatedSkills });
            } else {
              setUserData({
                skills: [
                  ...userData.skills,
                  { category: skillCategory, items: skillItems },
                ],
              });
              setSkillCategory("");
              setSkillItems([]);
            }
          }}
        >
          {type === "edit" ? "Update Skills" : "Add Skills"}
        </Button>
      </div>
    </DialogContent>
  );
}

function AddEducationDialog({
  index,
  institution,
  degree,
  startDate,
  endDate,
  type,
}: {
  index?: number;
  institution?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  type?: "edit" | "add";
}) {
  const [education, setEducation] = useState({
    institution: institution || "",
    degree: degree || "",
    startDate: startDate || "",
    endDate: endDate || "",
  });
  const { userData, setUserData } = useUserResumeStore();

  return (
    <DialogContent>
      <DialogTitle>
        {type === "edit" ? "Edit Education" : "Add New Education"}
      </DialogTitle>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="institution">Institution</Label>
          <Input
            id="institution"
            value={education.institution}
            onChange={(e) =>
              setEducation({ ...education, institution: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="degree">Degree</Label>
          <Input
            id="degree"
            value={education.degree}
            onChange={(e) =>
              setEducation({ ...education, degree: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            value={education.startDate}
            onChange={(e) =>
              setEducation({ ...education, startDate: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            placeholder="Leave empty if ongoing"
            id="endDate"
            value={education.endDate}
            onChange={(e) =>
              setEducation({ ...education, endDate: e.target.value })
            }
          />
        </div>
        <Button
          onClick={() => {
            if (type === "edit" && index !== undefined) {
              const updatedEducation = userData.education.map((edu, i) =>
                i === index ? education : edu
              );
              setUserData({ education: updatedEducation });
            } else {
              setUserData({
                education: [...userData.education, education],
              });
              setEducation({
                institution: "",
                degree: "",
                startDate: "",
                endDate: "",
              });
            }
          }}
        >
          {type === "edit" ? "Update Education" : "Add Education"}
        </Button>
      </div>
    </DialogContent>
  );
}

function WorkExperienceDialog({
  index,
  company,
  location,
  position,
  startDate,
  endDate,
  achievements,
  type,
}: {
  index?: number;
  company?: string;
  location?: "Remote" | "On-site" | "Hybrid";
  position?: string;
  startDate?: string;
  endDate?: string;
  achievements?: string[];
  type?: "edit" | "add";
}) {
  const { userData, setUserData } = useUserResumeStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [workExperience, setWorkExperience] = useState({
    company: company || "",
    location: location || "Remote",
    position: position || "",
    startDate: startDate || "",
    endDate: endDate || "",
    achievements: achievements || [],
  });

  return (
    <DialogContent className="max-h-screen overflow-y-auto">
      <DialogTitle>
        {type === "edit" ? "Edit Work Experience" : "Add New Work Experience"}
      </DialogTitle>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={workExperience.company}
            onChange={(e) =>
              setWorkExperience({ ...workExperience, company: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            value={workExperience.position}
            onChange={(e) =>
              setWorkExperience({ ...workExperience, position: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select
            value={workExperience.location}
            onValueChange={(value: "Remote" | "On-site" | "Hybrid") => {
              setWorkExperience({ ...workExperience, location: value });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder="Select location"
                defaultValue={workExperience.location}
              />
            </SelectTrigger>
            <SelectContent>
              {["Remote", "On-site", "Hybrid"].map((loc) => (
                <SelectItem defaultChecked key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            value={workExperience.startDate}
            onChange={(e) =>
              setWorkExperience({
                ...workExperience,
                startDate: e.target.value,
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            placeholder="Leave empty if ongoing"
            id="endDate"
            value={workExperience.endDate}
            onChange={(e) =>
              setWorkExperience({ ...workExperience, endDate: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="achievements">Achivements</Label>
          {workExperience.achievements.map((ach, i) => (
            <div
              className="flex items-center justify-between bg-gray-200 rounded-lg p-2"
              key={i}
            >
              <p className="text-sm">{ach}</p>
              <Button
                variant="destructive"
                onClick={() => {
                  const updatedAchievements =
                    workExperience.achievements.filter((_, j) => j !== i);
                  setWorkExperience({
                    ...workExperience,
                    achievements: updatedAchievements,
                  });
                }}
              >
                <Delete />
              </Button>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Input
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (inputRef.current && inputRef.current.value) {
                    setWorkExperience({
                      ...workExperience,
                      achievements: [
                        ...workExperience.achievements,
                        inputRef.current.value,
                      ],
                    });
                    inputRef.current.value = "";
                  }
                }
              }}
              placeholder="Add achievement"
            />
            <Button
              onClick={() => {
                if (inputRef.current && inputRef.current.value) {
                  setWorkExperience({
                    ...workExperience,
                    achievements: [
                      ...workExperience.achievements,
                      inputRef.current.value,
                    ],
                  });
                  inputRef.current.value = "";
                }
              }}
            >
              <Plus />
            </Button>
          </div>
        </div>
        <Button
          onClick={() => {
            if (type === "edit" && index !== undefined) {
              const updatedWorkExperience = userData.workExperience.map(
                (work, i) => (i === index ? workExperience : work)
              );
              setUserData({ workExperience: updatedWorkExperience });
            } else {
              setUserData({
                workExperience: [...userData.workExperience, workExperience],
              });
              setWorkExperience({
                company: "",
                location: "Remote",
                position: "",
                startDate: "",
                endDate: "",
                achievements: [],
              });
            }
          }}
        >
          {type === "edit" ? "Update Work Experience" : "Add Work Experience"}
        </Button>
      </div>
    </DialogContent>
  );
}

function ProjectsDialog({
  index,
  title,
  link,
  skills,
  features,
  type,
}: {
  index?: number;
  title?: string;
  link?: string;
  skills?: string[];
  features?: string[];
  type?: "edit" | "add";
}) {
  const { userData, setUserData } = useUserResumeStore();
  const skillInputRef = useRef<HTMLInputElement>(null);
  const featuresInputRef = useRef<HTMLInputElement>(null);
  const [project, setProject] = useState({
    title: title || "",
    link: link || "",
    skills: skills || [],
    features: features || [],
  });

  return (
    <DialogContent className="max-h-screen overflow-y-auto">
      <DialogTitle>
        {type === "edit" ? "Edit Project" : "Add New Project"}
      </DialogTitle>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link">Project Link</Label>
          <Input
            id="link"
            value={project.link}
            onChange={(e) => setProject({ ...project, link: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skills">Skills Used</Label>
          <div className="flex items-center space-x-2">
            <Input
              ref={skillInputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (skillInputRef.current && skillInputRef.current.value) {
                    console.log("Adding skill:", skillInputRef.current.value);
                    setProject({
                      ...project,
                      skills: [...project.skills, skillInputRef.current.value],
                    });
                    skillInputRef.current.value = "";
                  }
                }
              }}
              placeholder="Add skill"
            />
            <Button
              onClick={() => {
                if (skillInputRef.current && skillInputRef.current.value) {
                  console.log("Adding skill:", skillInputRef.current.value);
                  setProject({
                    ...project,
                    skills: [...project.skills, skillInputRef.current.value],
                  });
                  skillInputRef.current.value = "";
                }
              }}
            >
              <Plus />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.skills.map((skill, i) => (
              <div
                className="flex w-max text-sm items-center gap-1 bg-gray-200 rounded-lg px-2 py-1"
                key={i}
              >
                <p className="text-sm">{skill}</p>
                <X
                  size={14}
                  onClick={() => {
                    const updatedSkills = project.skills.filter(
                      (_, j) => j !== i
                    );
                    setProject({ ...project, skills: updatedSkills });
                  }}
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="features">Features</Label>
          {project.features.map((ft, i) => (
            <div
              className="flex items-center justify-between bg-gray-200 rounded-lg p-2"
              key={i}
            >
              <p className="text-sm">{ft}</p>
              <Button
                variant="destructive"
                onClick={() => {
                  const updatedFeatures = project.features.filter(
                    (_, j) => j !== i
                  );
                  setProject({
                    ...project,
                    features: updatedFeatures,
                  });
                }}
              >
                <Delete />
              </Button>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Input
              ref={featuresInputRef}
              placeholder="Add feature"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (
                    featuresInputRef.current &&
                    featuresInputRef.current.value
                  ) {
                    setProject({
                      ...project,
                      features: [
                        ...project.features,
                        featuresInputRef.current.value,
                      ],
                    });
                    featuresInputRef.current.value = "";
                  }
                }
              }}
            />
            <Button
              onClick={() => {
                if (
                  featuresInputRef.current &&
                  featuresInputRef.current.value
                ) {
                  setProject({
                    ...project,
                    features: [
                      ...project.features,
                      featuresInputRef.current.value,
                    ],
                  });
                  featuresInputRef.current.value = "";
                }
              }}
            >
              <Plus />
            </Button>
          </div>
        </div>
        <Button
          onClick={() => {
            if (type === "edit" && index !== undefined) {
              const updatedProjects = userData.projects.map((proj, i) =>
                i === index ? project : proj
              );
              setUserData({ projects: updatedProjects });
            } else {
              setUserData({
                projects: [...userData.projects, project],
              });
              setProject({
                title: "",
                link: "",
                skills: [],
                features: [],
              });
            }
          }}
        >
          {type === "edit" ? "Update Project" : "Add Project"}
        </Button>
      </div>
    </DialogContent>
  );
}
