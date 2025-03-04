/* eslint-disable react/jsx-no-undef */
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube, FaBold, FaItalic, FaPlus, FaMinus, FaAlignLeft , FaAlignCenter, FaAlignRight,
  FaUnderline,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import Skills from "./Skills";
import DateRange from "../utility/DateRange";
import ContactInfo from "./ContactInfo";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { ResumeContext } from "../../pages/builder";
import dynamic from "next/dynamic";
import Language from "./Language";
import Certification from "./Certification";
import { HighlightMenu } from "react-highlight-menu";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

// Importing draggable components dynamically
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false });

const Preview = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [content, setContent] = useState(resumeData);
  const [selectedTemplate, setSelectedTemplate] = useState('template1'); // State to hold the selected template

  const icons = [
    { name: "github", icon: <FaGithub /> },
    { name: "linkedin", icon: <FaLinkedin /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "youtube", icon: <FaYoutube /> },
    { name: "website", icon: <CgWebsite /> },
  ];

  // Sample templates
  const templates = {
    template1: (
      <div>
        <h1>Template 1</h1>
        <div className="">
      <A4PageWrapper>
        <HighlightMenu
          styles={{
            borderColor: "#C026D3",
            backgroundColor: "#C026D3",
            boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
            zIndex: 10,
            borderRadius: "5px",
            padding: "3px",
          }}
          target="body"
          menu={() => (
            <>
              <MenuButton
        title="Bold (Ctrl+B)"
        icon={<FaBold />}
        onClick={toggleBold}
      />
      <MenuButton 
        title="Italic (Ctrl+I)"
        icon={<FaItalic />}
        onClick={toggleItalic}
      />
      <MenuButton
        title="Underline (Ctrl+U)"
        icon={<FaUnderline />}
        onClick={toggleUnderline}
      />
      <MenuButton
        title="Increase Font Size"
        icon={<FaPlus/>}
        onClick={() => changeFontSize(4)} 
      />
      <MenuButton
        title="Decrease Font Size"
        icon={<FaMinus/>}
        onClick={() => changeFontSize(2)} 
      />

      <MenuButton
        title="Align Left"
        icon={<FaAlignLeft/>}
        onClick={() => alignText('Left')}
      />
      <MenuButton
        title="Align Center"
        icon={<FaAlignCenter/>}
        onClick={() => alignText('Center')}
      />
      <MenuButton
        title="Align Right"
        icon={<FaAlignRight/>}
        onClick={() => alignText('Right')}
      />
            </>
          )}
        />
    
          <div className="f-col items-center mb-1">
            {resumeData.profilePicture.length > 0 && (
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black">
                <Image
                  src={resumeData.profilePicture}
                  alt="profile"
                  width={100}
                  height={100}
                  className="object-cover h-full w-full"
                />
              </div>
            )}
            <h1 className="name">{resumeData.name}</h1>
            <p className="profession">{resumeData.position}</p>
            <ContactInfo
              mainclass="flex flex-row gap-1 mb-1 contact"
              linkclass="inline-flex items-center gap-1"
              teldata={resumeData.contactInformation}
              emaildata={resumeData.email}
              addressdata={resumeData.address}
              telicon={<MdPhone />}
              emailicon={<MdEmail />}
              addressicon={<MdLocationOn />}
            />
            <div className="grid grid-cols-3 gap-1">
              {resumeData.socialMedia.map((socialMedia, index) => {
                return (
                  <a
                    href={`http://${socialMedia.link}`}
                    aria-label={socialMedia.socialMedia}
                    key={index}
                    title={socialMedia.socialMedia}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 social-media align-center justify-center "
                    // Prevent text overflowing, If the socialMedia.link string is longer than 32 characters, apply the wordWrap and display styles to this <a> tag.
                    // wordWrap: "break-word" breaks the text onto the next line if it's too long,
                    // display: "inline-block" is necessary for wordWrap to work on an inline element like <a>.
                    
                  >
                    {icons.map((icon, index) => {
                      if (icon.name === socialMedia.socialMedia.toLowerCase()) {
                        return <span key={index}>{icon.icon}</span>;
                      }
                    })}
                    {socialMedia.link}
                  </a>
                );
              })}
            </div>
          </div>
          <hr className="border-dashed my-2" />
          {/* two column start */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1 space-y-2">
              {resumeData.summary.length > 0 && (
                <div className="mb-1">
                  <h2 className="section-title mb-1 border-b-2 border-gray-300">
                    Summary
                  </h2>
                  <p className="content break-words">{resumeData.summary}</p>
                </div>
              )}
              <div>
                {resumeData.education.length > 0 && (
                  <div className="mb-1">
                    <h2 className="section-title mb-1 border-b-2 border-gray-300">
                      Education
                    </h2>
                    {resumeData.education.map((item, index) => (
                      <div key={index} className="mb-1">
                        <p className="content i-bold">{item.degree}</p>
                        <p className="content">{item.school}</p>
                        <DateRange
                          startYear={item.startYear}
                          endYear={item.endYear}
                          id={`education-start-end-date`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Droppable droppableId="skills" type="SKILLS">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {resumeData.skills.map((skill, index) => (
                      <Draggable
                        key={`SKILLS-${index}`}
                        draggableId={`SKILLS-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-1 ${
                              snapshot.isDragging &&
                              "outline-dashed outline-2 outline-gray-400 bg-white"
                            }`}
                          >
                            <Skills title={skill.title} skills={skill.skills} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Language title="Languages" languages={resumeData.languages} />
              <Certification
                title="Certifications"
                certifications={resumeData.certifications}
              />
            </div>
            
            <div className="col-span-2 space-y-2">
              {resumeData.workExperience.length > 0 && (
                <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <h2
                        className="section-title mb-1 border-b-2 border-gray-300 editable"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        Work Experience
                      </h2>
                      {resumeData.workExperience.map((item, index) => (
                        <Draggable
                          key={`${item.company}-${index}`}
                          draggableId={`WORK_EXPERIENCE-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-1 ${
                                snapshot.isDragging &&
                                "outline-dashed outline-2 outline-gray-400 bg-white"
                              }`}
                            >
                              <div className="flex flex-row justify-between space-y-1">
                                <p className="content i-bold">{item.company}</p>
                                <DateRange
                                  startYear={item.startYear}
                                  endYear={item.endYear}
                                  id={`work-experience-start-end-date`}
                                />
                              </div>
                              <p className="content">{item.position}</p>
                              <p className="content hyphens-auto">
                                {item.description}
                              </p>
                              <Droppable
                                droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                              >
                                {(provided) => (
                                  <ul
                                    className="list-disc ul-padding content"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                  >
                                    {typeof item.keyAchievements === "string" &&
                                      item.keyAchievements
                                        .split("\n")
                                        .map((achievement, subIndex) => (
                                          <Draggable
                                            key={`${item.company}-${index}-${subIndex}`}
                                            draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                            index={subIndex}
                                          >
                                            {(provided, snapshot) => (
                                              <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`
                                          hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                          ${
                                            snapshot.isDragging &&
                                            "outline-dashed outline-2 outline-gray-400 bg-white"
                                          }`}
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: achievement,
                                                  }}
                                                  contentEditable
                                                />
                                              </li>
                                            )}
                                          </Draggable>
                                        ))}
                                    {provided.placeholder}
                                  </ul>
                                )}
                              </Droppable>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
              {resumeData.projects.length > 0 && (
                <Droppable droppableId="projects" type="PROJECTS">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <h2
                        className="section-title mb-1 border-b-2 border-gray-300 editable"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        Projects
                      </h2>
                      {resumeData.projects.map((item, index) => (
                        <Draggable
                          key={`${item.name}-${index}`}
                          draggableId={`PROJECTS-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-1 ${
                                snapshot.isDragging &&
                                "outline-dashed outline-2 outline-gray-400 bg-white"
                              }`}
                            >
                              <div className="flex flex-row justify-between space-y-1">
                                <p className="content i-bold">{item.name}</p>
                                <DateRange
                                  startYear={item.startYear}
                                  endYear={item.endYear}
                                  id={`work-experience-start-end-date`}
                                />
                              </div>
                             
                              <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="content"
                              >
                                {item.link}
                              </Link>
                              <p className="content">{item.description}</p>
                              <Droppable
                                droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                                type="PROJECTS_KEY_ACHIEVEMENT"
                              >
                                {(provided) => (
                                  <ul
                                    className="list-disc ul-padding content"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                  >
                                    {typeof item.keyAchievements === "string" &&
                                      item.keyAchievements
                                        .split("\n")
                                        .map((achievement, subIndex) => (
                                          <Draggable
                                            key={`${item.name}-${index}-${subIndex}`}
                                            draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                            index={subIndex}
                                          >
                                            {(provided, snapshot) => (
                                              <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`
                                          hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                          ${
                                            snapshot.isDragging &&
                                            "outline-dashed outline-2 outline-gray-400 bg-white"
                                          }`}
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: achievement,
                                                  }}
                                                  contentEditable
                                                />
                                              </li>
                                            )}
                                          </Draggable>
                                        ))}
                                    {provided.placeholder}
                                  </ul>
                                )}
                              </Droppable>
                            </div>
                            
                          )}
                          
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </div>
            
          </div>
       
      </A4PageWrapper>
    </div>
      </div>
    ),

    template2: (
      <div>
       <div className=" border p-2">
      <A4PageWrapper>
        <HighlightMenu
          styles={{
            borderColor: "#C026D3",
            backgroundColor: "#C026D3",
            boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
            zIndex: 10,
            borderRadius: "5px",
            padding: "3px",
          }}
          target="body"
          menu={() => (
            <>
              <MenuButton
        title="Bold (Ctrl+B)"
        icon={<FaBold />}
        onClick={toggleBold}
      />
      <MenuButton 
        title="Italic (Ctrl+I)"
        icon={<FaItalic />}
        onClick={toggleItalic}
      />
      <MenuButton
        title="Underline (Ctrl+U)"
        icon={<FaUnderline />}
        onClick={toggleUnderline}
      />
      <MenuButton
        title="Increase Font Size"
        icon={<FaPlus/>}
        onClick={() => changeFontSize(4)} 
      />
      <MenuButton
        title="Decrease Font Size"
        icon={<FaMinus/>}
        onClick={() => changeFontSize(2)} 
      />

      <MenuButton
        title="Align Left"
        icon={<FaAlignLeft/>}
        onClick={() => alignText('Left')}
      />
      <MenuButton
        title="Align Center"
        icon={<FaAlignCenter/>}
        onClick={() => alignText('Center')}
      />
      <MenuButton
        title="Align Right"
        icon={<FaAlignRight/>}
        onClick={() => alignText('Right')}
      />
            </>
          )}
        />
      
          <div className="f-col  mb-1">
            {resumeData.profilePicture.length > 0 && (
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black">
                <Image
                  src={resumeData.profilePicture}
                  alt="profile"
                  width={100}
                  height={100}
                  className="object-cover h-full w-full"
                />
              </div>
            )}
            <h1 className="name">{resumeData.name}</h1>
            <p className="profession">{resumeData.position}</p>
            <ContactInfo
              mainclass=" flex-col gap-1 mb-1 contact"
              linkclass=" gap-1"
             
              teldata={`Phone: ${resumeData.contactInformation}`}
              
              emaildata={`| Email: ${resumeData.email}`}
            
              
             
             
              
            />
            <div className="grid grid-row-3 gap-1">
              {resumeData.socialMedia.map((socialMedia, index) => {
                return (
                  <a
                    href={`http://${socialMedia.link}`}
                    aria-label={socialMedia.socialMedia}
                    key={index}
                    title={socialMedia.socialMedia}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex  gap-1 social-media align-center  "
                    // Prevent text overflowing, If the socialMedia.link string is longer than 32 characters, apply the wordWrap and display styles to this <a> tag.
                    // wordWrap: "break-word" breaks the text onto the next line if it's too long,
                    // display: "inline-block" is necessary for wordWrap to work on an inline element like <a>.
                    
                  >
                    {icons.map((icon, index) => {
                      if (icon.name === socialMedia.socialMedia.toLowerCase()) {
                        return <span key={index}>{icon.icon}</span>;
                      }
                    })}
                    {socialMedia.link}
                  </a>
                );
              })}
            </div>
          </div>
          <hr className="border-dashed my-2" />
          {/* two column start */}
          <div className="">
            <div className="col-span-1 space-y-2">
              {resumeData.summary.length > 0 && (
                <div className="mb-1">
                  <h2 className="section-title mb-1 border-b-2 border-gray-300">
                    Summary
                  </h2>
                  <p className="content break-words border-l-4 border-l-gray-800 p-2" style={{background: "#eee"}}>{resumeData.summary}</p>
                </div>
              )}
              <div>
                {resumeData.education.length > 0 && (
                  <div className="mb-1">
                    <h2 className="section-title mb-1 border-b-2 border-gray-300">
                      Education
                    </h2>
                    {resumeData.education.map((item, index) => (
                      <div key={index} className="border-l-4 border-l-gray-800 " style={{background: "#eee",padding: "10px"}}>
                        <p className="content i-bold">{item.degree}</p>
                        <p className="content">{item.school}</p>
                        <DateRange
                          startYear={item.startYear}
                          endYear={item.endYear}
                          id={`education-start-end-date`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Droppable droppableId="skills" type="SKILLS">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}  >
                    {resumeData.skills.map((skill, index) => (
                      <Draggable
                        key={`SKILLS-${index}`}
                        draggableId={`SKILLS-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-1  ${
                              snapshot.isDragging &&
                              "outline-dashed outline-2 outline-gray-400 bg-white "
                            }`}
                          >
                            {skill.skills.length > 0 && (
      <>
        <h2 className="section-title mb-1 border-b-2 border-gray-300 editable" contentEditable suppressContentEditableWarning >
          {skill.title}
        </h2>
        <p className="sub-content border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2">{skill.skills.join(", ")}</p>
      </>
    )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
             {resumeData.languages.length > 0 && (
      <div >
        <h2 className="section-title mb-1 border-b-2 border-gray-300" title="lan">
         Language
        </h2>
        <p className="sub-content border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2">{resumeData.languages.join(", ")}</p>
      </div>
    )}
              {resumeData.certifications.length > 0 &&
      <div>
        <h2 className="section-title mb-1 border-b-2 border-gray-300">Certifications</h2>
        <ul className="sub-content border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2 my-2">
            {resumeData.certifications.map((certification, index) => (
                <li key={index}>{certification}</li>
            ))}
        </ul>
      </div>}
            </div>
            
            <div className="col-span-2 space-y-2">
              {resumeData.workExperience.length > 0 && (
                <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} >
                      <h2
                        className="section-title mb-1 border-b-2 border-gray-300 editable"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        Work Experience
                      </h2>
                      {resumeData.workExperience.map((item, index) => (
                        <Draggable
                          key={`${item.company}-${index}`}
                          draggableId={`WORK_EXPERIENCE-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-1 border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2 ${
                                snapshot.isDragging &&
                                "outline-dashed outline-2 outline-gray-400 bg-white"
                              }`}
                            >
                              <div className="flex flex-row justify-between space-y-1">
                                <p className="content i-bold">{item.company}</p>
                                <DateRange
                                  startYear={item.startYear}
                                  endYear={item.endYear}
                                  id={`work-experience-start-end-date`}
                                />
                              </div>
                              <p className="content">{item.position}</p>
                              <p className="content hyphens-auto">
                                {item.description}
                              </p>
                              <Droppable
                                droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                              >
                                {(provided) => (
                                  <ul
                                    className="list-disc ul-padding content"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                  >
                                    {typeof item.keyAchievements === "string" &&
                                      item.keyAchievements
                                        .split("\n")
                                        .map((achievement, subIndex) => (
                                          <Draggable
                                            key={`${item.company}-${index}-${subIndex}`}
                                            draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                            index={subIndex}
                                          >
                                            {(provided, snapshot) => (
                                              <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`
                                          hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                          ${
                                            snapshot.isDragging &&
                                            "outline-dashed outline-2 outline-gray-400 bg-white"
                                          }`}
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: achievement,
                                                  }}
                                                  contentEditable
                                                />
                                              </li>
                                            )}
                                          </Draggable>
                                        ))}
                                    {provided.placeholder}
                                  </ul>
                                )}
                              </Droppable>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
              {resumeData.projects.length > 0 && (
                <Droppable droppableId="projects" type="PROJECTS">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <h2
                        className="section-title mb-1 border-b-2 border-gray-300 editable"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        Projects
                      </h2>
                      {resumeData.projects.map((item, index) => (
                        <Draggable
                          key={`${item.name}-${index}`}
                          draggableId={`PROJECTS-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-1 border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2 ${
                                snapshot.isDragging &&
                                "outline-dashed outline-2 outline-gray-400 bg-white"
                              }`}
                            >
                              <div className="flex flex-row justify-between space-y-1">
                                <p className="content i-bold">{item.name}</p>
                                <DateRange
                                  startYear={item.startYear}
                                  endYear={item.endYear}
                                  id={`work-experience-start-end-date`}
                                />
                              </div>
                             
                              <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="content"
                              >
                                {item.link}
                              </Link>
                              <p className="content">{item.description}</p>
                              <Droppable
                                droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                                type="PROJECTS_KEY_ACHIEVEMENT"
                              >
                                {(provided) => (
                                  <ul
                                    className="list-disc ul-padding content"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                  >
                                    {typeof item.keyAchievements === "string" &&
                                      item.keyAchievements
                                        .split("\n")
                                        .map((achievement, subIndex) => (
                                          <Draggable
                                            key={`${item.name}-${index}-${subIndex}`}
                                            draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                            index={subIndex}
                                          >
                                            {(provided, snapshot) => (
                                              <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`
                                          hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                          ${
                                            snapshot.isDragging &&
                                            "outline-dashed outline-2 outline-gray-400 bg-white"
                                          }`}
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: achievement,
                                                  }}
                                                  contentEditable
                                                />
                                              </li>
                                            )}
                                          </Draggable>
                                        ))}
                                    {provided.placeholder}
                                  </ul>
                                )}
                              </Droppable>
                            </div>
                            
                          )}
                          
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </div>
            
          </div>
      
      </A4PageWrapper>
    </div>
      </div>
    ),
    // Add more templates here
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (source.droppableId === "work-experience") {
      const newWorkExperience = [...resumeData.workExperience];
      const [removed] = newWorkExperience.splice(source.index, 1);
      newWorkExperience.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    }

    if (source.droppableId.includes("WORK_EXPERIENCE_KEY_ACHIEVEMENT")) {
      const newWorkExperience = [...resumeData.workExperience];
      const workExperienceIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements =
        newWorkExperience[workExperienceIndex].keyAchievements.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newWorkExperience[workExperienceIndex].keyAchievements =
        keyAchievements.join("\n");
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    }

    if (source.droppableId === "skills") {
      const newSkills = [...resumeData.skills];
      const [removed] = newSkills.splice(source.index, 1);
      newSkills.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, skills: newSkills });
    }

    if (source.droppableId.includes("projects")) {
      const newProjects = [...resumeData.projects];
      const [removed] = newProjects.splice(source.index, 1);
      newProjects.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, projects: newProjects });
    }

    if (source.droppableId.includes("PROJECTS_KEY_ACHIEVEMENT")) {
      const newProjects = [...resumeData.projects];
      const projectIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements =
        newProjects[projectIndex].keyAchievements.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newProjects[projectIndex].keyAchievements = keyAchievements.join("\n");
      setResumeData({ ...resumeData, projects: newProjects });
    }
  };

  const MenuButton = ({ title, icon, onClick }) => (
    <button 
      onClick={onClick} 
      title={title}
      className="p-2 hover:bg-gray-200 rounded font-semibold"
    >
      {icon}
    </button>
  );

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };
  
  const toggleBold = () => formatText('bold');
  const toggleItalic = () => formatText('italic');
  const toggleUnderline = () => formatText('underline');
  const changeFontSize = (size) => formatText('fontSize', size);
  const alignText = (alignment) => formatText(`justify${alignment}`);

  useKeyboardShortcut('b', true, toggleBold);
  useKeyboardShortcut('i', true, toggleItalic);
  useKeyboardShortcut('u', true, toggleUnderline);

  return (
    <div className="md:max-w-[60%] sticky top-0 preview rm-padding-print p-6 md:overflow-y-scroll md:h-screen">
      <div className="mb-4">
        <select 
          value={selectedTemplate} 
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="p-2 border rounded"
        >
          {Object.keys(templates).map((templateKey) => (
            <option key={templateKey} value={templateKey}>
              {templateKey}
            </option>
          ))}
        </select>
      </div>

      <A4PageWrapper>
        <HighlightMenu
          styles={{
            borderColor: "#C026D3",
            backgroundColor: "#C026D3",
            boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
            zIndex: 10,
            borderRadius: "5px",
            padding: "3px",
          }}
          target="body"
          menu={() => (
            <>
              <MenuButton
                title="Bold (Ctrl+B)"
                icon={<FaBold />}
                onClick={toggleBold}
              />
              <MenuButton 
                title="Italic (Ctrl+I)"
                icon={<FaItalic />}
                onClick={toggleItalic}
              />
              <MenuButton
                title="Underline (Ctrl+U)"
                icon={<FaUnderline />}
                onClick={toggleUnderline}
              />
              <MenuButton
                title="Increase Font Size"
                icon={<FaPlus/>}
                onClick={() => changeFontSize(4)} 
              />
              <MenuButton
                title="Decrease Font Size"
                icon={<FaMinus/>}
                onClick={() => changeFontSize(2)} 
              />
              <MenuButton
                title="Align Left"
                icon={<FaAlignLeft/>}
                onClick={() => alignText('Left')}
              />
              <MenuButton
                title="Align Center"
                icon={<FaAlignCenter/>}
                onClick={() => alignText('Center')}
              />
              <MenuButton
                title="Align Right"
                icon={<FaAlignRight/>}
                onClick={() => alignText('Right')}
              />
            </>
          )}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          {templates[selectedTemplate]}
        </DragDropContext>
      </A4PageWrapper>
    </div>
  );
};

const A4PageWrapper = ({ children }) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    const previewHeight = preview.offsetHeight;
    console.log(previewHeight);
    if (previewHeight > 1122) {
      alert("A4 size exceeded");
    }
  };

  return (
    <div className="w-8.5in border p-3" onLoad={alertA4Size}>
      {children}
    </div>
  );
};

export default Preview;
