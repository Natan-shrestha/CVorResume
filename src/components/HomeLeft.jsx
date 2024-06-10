import { myContext } from '../MyContext'
import { forwardRef, useContext, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Button } from "@material-tailwind/react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../../Style/button.css";
import "../../Style/remove.css";

const HomeLeft = (props, ref) => {
  console.log(ref.current);
  const navigate = useNavigate()
  let userData = useContext(myContext)
  let { state, setState, selectedImage, setSelectedImage, isLoggedIn, setIsLoggedIn } = userData

  const handleImage = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setSelectedImage(file);
  }

  let handleChangeString = (e) => {
    let { name, value } = e.target;
    // const pattern = /^[A-Za-z]+$/;
    const pattern = /^[A-Za-z\s]+$/;
    // Test the input value against the pattern
    if (pattern.test(value) || value === '') {
      setState({ ...state, [name]: value, loading: true });
    }
  };

  const [skillInput, setSkillInput] = useState('');

  const handleChangePhone = (event) => {

    const { name, value } = event.target;

    // Validate phone number format (10 digits starting with 7, 8, or 9)
    if (/^[789]\d{0,9}$/.test(value) || value === '') {
      setState(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };


  const handleChangeNumber = (event) => {
    const { name, value } = event.target;

    // Validate if the input is a number representing a percentage between 0 and 100
    if (/^\d+$/.test(value) || value === '') {
      const intValue = parseInt(value, 10);
      if (intValue >= 0 && intValue <= 100) {
        setState(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
    }
  };
  // const handleKeyPressPg = (event) => {
  //   if (event.key === 'Backspace' && state.pgPercentage.length === 2) {
  //     setState(prevState => ({
  //       ...prevState,
  //       pgPercentage: ''
  //     }));
  //   }
  // };


  const handleKeyPressGrad = (event) => {
    if (event.key === 'Backspace' && state.graduationPercentage.length === 2) {
      setState(prevState => ({
        ...prevState,
        graduationPercentage: ''
      }));
    }
  };


  const handleKeyPressDiploma = (event) => {
    if (event.key === 'Backspace' && state.diplomaPercentage.length === 2) {
      setState(prevState => ({
        ...prevState,
        diplomaPercentage: ''
      }));
    }
  };


  const handleKeyPresshsc = (event) => {
    if (event.key === 'Backspace' && state.hscPercentage.length === 2) {
      setState(prevState => ({
        ...prevState,
        hscPercentage: ''
      }));
    }
  };


  const handleKeyPressSsc = (event) => {
    if (event.key === 'Backspace' && state.sscPercentage.length === 2) {
      setState(prevState => ({
        ...prevState,
        sscPercentage: ''
      }));
    }
  };

  const handleKeyPressExp = (event) => {
    if (event.key === 'Backspace' && state.experienceInYears.length === 2) {
      setState(prevState => ({
        ...prevState,
        experienceInYears: ''
      }));
    }
  };


  const handleKeyPressTeam = (event) => {
    if (event.key === 'Backspace' && state.team.length === 2) {
      setState(prevState => ({
        ...prevState,
        team: ''
      }));
    }
  };

  //try wheather you can make number handling in that commented code or not otherwise we have created individual function for handling the numbers problem

  // const handleKeyPress = (event) => {
  //   if (event.key === 'Backspace') {
  //     setState(prevState => {
  //       switch (event.target.name) {
  //         case "pgPercentage":
  //           ({ ...prevState, pgPercentage: '' });
  //         case "graduationPercentage":
  //           ({ ...prevState, graduationPercentage: '' });
  //       }
  //     }
  //     )
  //   }
  // };

  let handleChange = (e) => {
    let { name, value } = e.target;
    let nameParts = name.split(".");
    if (nameParts.length === 3) {
      let [arrayName, index, fieldName] = nameParts;
      setState((prevState) => {
        let updatedArray = [...prevState[arrayName]];
        updatedArray[index] = { ...updatedArray[index], [fieldName]: value };
        return { ...prevState, [arrayName]: updatedArray };
      });
    } else {
      setState({ ...state, [name]: value, loading: true });
    }
  };

  let handleChangeArray = (e) => {
    let { name, value } = e.target;
    setState(prevState => {
      if (!Array.isArray(prevState[name])) {
        console.error(`State does not contain an array with name ${name}`);
        return prevState;
      }
      const newArray = value.split(',');
      return {
        ...prevState,
        [name]: newArray
      };
    });
  };


  let handleNavigate = () => {
    navigate("/")
    setIsLoggedIn(!isLoggedIn)
  }
  const downloadPDF = async (e) => {
    e.preventDefault()

    html2canvas(ref.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ imageCompression: false });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    });


    let resp = await fetch(`http://localhost:5000/addUser`, {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const result = await resp.json()
    if (resp.ok) {
      console.log(result)
    }
    if (!resp.ok) {
      console.log(resp.error)
    }
    // setState({
    //   name: "",
    //   email: "",
    //   age: "",
    //   password: ""
    // })
    // navigate("/read")


  };
  return (
    <div className='w-[65%] h-[100%]  p-5 overflow-y-auto border-r-2' id='homeLeftDiv'>
      <button className='inline-block p-2' onClick={handleNavigate}><IoChevronBackCircleSharp className='text-2xl text-blue-600' /></button>
      <h1 className='font-medium text-2xl text-center pb-5 text-blue-500'>Scroll Down And Know More</h1>
      <div>
        <form action="" >
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography><strong>Write About Your self</strong></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>

                  <div>
                    <label htmlFor="">Photo of Yourself</label>
                    <input type="file" name='img' onChange={handleImage} className='w-[95%]' />
                  </div>
                  <article className='w-[100%] flex' id='nameInputField' >
                    <input type="text" placeholder='Your name'
                      value={state.studentName}
                      name='studentName'
                      onChange={handleChangeString}
                    />
                    <input type="text" placeholder='Profession'
                      value={state.workingAs}
                      name='workingAs'
                      onChange={handleChangeString} />
                  </article>
                  <textarea id="" cols="75" rows="5" placeholder='Describe About Yourself' className='border-[1px] border-black ms-1 rounded w-[96%] p-2'
                    value={state.aboutSession}
                    name='aboutSession'
                    onChange={handleChange}
                  ></textarea>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography><strong>Qualification/Education</strong></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>

                  <div>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        <Typography>Bachelor</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div className='flex'>
                          <input
                            type="text"
                            placeholder="Percentage"
                            value={state.graduationPercentage}
                            name="graduationPercentage"
                            onChange={handleChangeNumber}
                            onKeyDown={handleKeyPressGrad}
                            className="w-[50%]"
                          />

                          <label htmlFor="hscYear" className="inline w-[20%] text-gray-400 pt-3" style={{ marginLeft: '10px' }}>
                            Year of Completion:
                          </label>

                          <input
                            type="date"
                            placeholder="passout year"
                            value={state.graduationYearOfPassout}
                            name="graduationYearOfPassout"
                            onChange={handleChange}
                            className="w-[45%] text-gray-400"
                          />
                          </div>
                          <div className="flex">
                          <input
                            type="text"
                            placeholder="University/College"
                            value={state.graduationUniversity}
                            name="graduationUniversity"
                            onChange={handleChangeString}
                            className="w-[45%]"
                          />
                          <input
                            type="text"
                            placeholder="Subject of Study"
                            value={state.graduationStream}
                            name="graduationStream"
                            onChange={handleChangeString}
                            className="w-[45%]"
                          />
                        </div>

                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        <Typography>Diploma/12th</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div className='flex'>
                            <input
                              type="text"
                              placeholder='Percentage'
                              value={state.hscPercentage}
                              name='hscPercentage'
                              onChange={handleChangeNumber}
                              onKeyDown={handleKeyPresshsc}
                              className='w-[45%]'
                            />
                            <input
                              type="text"
                              placeholder='University/College'
                              value={state.hscBoard}
                              name='hscBoard'
                              onChange={handleChangeString}
                              className='w-[45%]'
                            />

                          </div>
                          <label htmlFor="hscYear" className="block text-gray-400 pt-3">
                            Year of Completion:
                          </label>

                          <input
                            type="date"
                            placeholder="Passout year"
                            value={state.sscYearOfPassout}
                            name="sscYearOfPassout"
                            onChange={handleChange}
                            className="w-[50%] text-gray-400"
                          />
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        <Typography>10th</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div className='flex'>
                            <input
                              type="text"
                              placeholder='Percentage'
                              value={state.sscPercentage}
                              name='sscPercentage'
                              onChange={handleChangeNumber}
                              onKeyDown={handleKeyPressSsc}
                              className='w-[45%]'

                            />
                            <input
                              type="text"
                              placeholder='School'
                              value={state.sscBoard}
                              name='sscBoard'
                              onChange={handleChangeString}
                              className='w-[45%]'

                            />

                          </div>
                          <label htmlFor="hscYear" className="block text-gray-400 pt-3">
                            Year of Completion:
                          </label>

                          <input
                            type="date"
                            placeholder="Passout year"
                            value={state.sscYearOfPassout}
                            name="sscYearOfPassout"
                            onChange={handleChange}
                            className="w-[50%] text-gray-400"
                          />

                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography><strong>Personal Details</strong></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className='flex'>
                  <input
                      type="email"
                      placeholder="Enter your email address"
                      value={state.email}
                      name="email"
                      onChange={handleChange}
                      className="w-[45%]"
                    />
                    <input type="text" 
                      placeholder='Enter your phone number'
                      value={state.phoneNo}
                      name='phoneNo'
                      onChange={handleChangePhone}
                      className='w-[45%]'

                    />
                  </div>
                  <div className='flex'>
                     <input
                        type="text"
                        placeholder="Hobbies (comma-separated)"
                        value={state.otherSkills}
                        name="otherSkills"
                        onChange={handleChangeArray}
                        className="w-[45%]"
                      />

                    <input type="text" 
                      placeholder='Enter your address'
                      value={state.address}
                      name='address'
                      onChange={handleChange}
                      className='w-[45%]'
                    />
                  </div>

                </Typography>
              </AccordionDetails>
            </Accordion>


            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography><strong>Social Media</strong></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                <div className='flex'>
                  <div class="label-input">
                    <label for="linkedIn">LinkedIn ID:</label>
                    <input
                      type="text"
                      placeholder="Enter your LinkedIn ID"
                      value={state.linkedIn}
                      name="linkedIn"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="label-input">
                    <label for="facebook">Facebook ID:</label>
                    <input
                      type="text"
                      placeholder="Enter your Facebook ID"
                      value={state.facebook}
                      name="facebook"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="flex">
                  <div class="label-input">
                    <label for="twitter">Twitter ID:</label>
                    <input
                      type="text"
                      placeholder="Enter your Twitter ID"
                      value={state.twitter}
                      name="twitter"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="label-input">
                    <label for="instagram">Instagram ID:</label>
                    <input
                      type="text"
                      placeholder="Enter your Instagram ID"
                      value={state.instagram}
                      name="instagram"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Skills */}
            <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography><strong>Skills</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className='flex'>
                  <input
                    type="text"
                    placeholder='Enter a skill'
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className='w-[80%] rounded'
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (skillInput.trim() !== '') {
                        setState((prevState) => ({
                          ...prevState,
                          skills: [...prevState.skills, skillInput.trim()],
                        }));
                        setSkillInput('');
                      }
                    }}
                    title="Add New"
                    className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50px"
                      height="50px"
                      viewBox="0 0 24 24"
                      className="stroke-indigo-400 fill-none group-hover:fill-indigo-800 group-active:stroke-indigo-200 group-active:fill-indigo-600 group-active:duration-0 duration-300"
                    >
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        strokeWidth="1.5"
                      ></path>
                      <path d="M8 12H16" strokeWidth="1.5"></path>
                      <path d="M12 16V8" strokeWidth="1.5"></path>
                    </svg>
                  </button>
                </div>
                <div className='flex flex-wrap'>
                  {state.skills.map((skill, index) => (
                    <div key={index} className='flex items-center mb-2 ml-3 mr-2 w-full'>
                      <div className='border p-2 w-[80%] rounded'>{skill}</div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setState((prevState) => ({
                            ...prevState,
                            skills: prevState.skills.filter((_, i) => i !== index),
                          }));
                        }}
                        className='ml-2 deleteButton'
                      >
                        <span className="deleteText">Delete</span>
                        <span className="deleteIcon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Experience */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography><strong>Experience</strong></Typography>
              </AccordionSummary>
              <AccordionDetails>
          <Typography>
            {state.experiences.map((experience, index) => (
              <div key={index} className="shadow p-4 mb-4 rounded" style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px' }}>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Company name"
                    value={experience.companyName}
                    name={`experiences.${index}.companyName`}
                    onChange={handleChange}
                    className="w-[90%]"
                  />
                        <div className="flex w-[90%]">
                          <DatePicker
                            placeholderText="Start Date"
                            selected={experience.experienceStartDate ? new Date(experience.experienceStartDate) : null}
                            onChange={(date) =>
                              setState((prevState) => {
                                const updatedExperiences = [...prevState.experiences];
                                updatedExperiences[index] = {
                                  ...updatedExperiences[index],
                                  experienceStartDate: date ? date.toISOString().split('T')[0] : '',
                                };
                                return { ...prevState, experiences: updatedExperiences };
                              })
                            }
                            dateFormat="dd/MM/yyyy"
                            className="w-[90%] text-lg"
                          />
                          <DatePicker
                            placeholderText="End Date"
                            selected={experience.experienceEndDate ? new Date(experience.experienceEndDate) : null}
                            onChange={(date) =>
                              setState((prevState) => {
                                const updatedExperiences = [...prevState.experiences];
                                updatedExperiences[index] = {
                                  ...updatedExperiences[index],
                                  experienceEndDate: date ? date.toISOString().split('T')[0] : '',
                                };
                                return { ...prevState, experiences: updatedExperiences };
                              })
                            }
                            dateFormat="dd/MM/yyyy"
                            className="w-[90%] text-lg"
                          />
                        </div>
                      </div>
                      <input
                      type="text"
                      placeholder="Key responsibilities"
                      value={experience.keyResponsibility.join(", ")}
                      name={`experiences.${index}.keyResponsibility`}
                      onChange={(e) => {
                        const value = e.target.value;
                        setState((prevState) => {
                          const updatedExperiences = [...prevState.experiences];
                          updatedExperiences[index].keyResponsibility = value.split(",").map((item) => item.trim());
                          return { ...prevState, experiences: updatedExperiences };
                        });
                      }}
                      className="w-[90%]"
                    />
                  </div>
                  ))}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setState((prevState) => ({
                        ...prevState,
                        experiences: [
                          ...prevState.experiences,
                          {
                            companyName: "",
                            experienceStartDate: "",
                            experienceEndDate: "",
                            keyResponsibility: [],
                          },
                        ],
                      }));
                    }}
                  >
                    Add Experience
                  </button>
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Projects */}
            <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography><strong>Project</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {state.projects.map((project, index) => (
                  <div
                    key={index}
                    className="shadow p-4 mb-4 rounded"
                    style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px' }}
                  >
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Project name"
                        value={project.projectName}
                        name={`projects.${index}.projectName`}
                        onChange={handleChange}
                        className="w-[45%]"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={project.description}
                        name={`projects.${index}.description`}
                        onChange={handleChange}
                        className="w-[45%]"
                      />
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Technologies used"
                        value={project.technologiesUsed.join(", ")}
                        name={`projects.${index}.technologiesUsed`}
                        onChange={(e) => {
                          const value = e.target.value;
                          setState((prevState) => {
                            const updatedProjects = [...prevState.projects];
                            updatedProjects[index].technologiesUsed = value.split(",").map((item) => item.trim());
                            return { ...prevState, projects: updatedProjects };
                          });
                        }}
                        className="w-[45%]"
                      />
                      <input
                        type="text"
                        placeholder="Team size"
                        value={project.team}
                        name={`projects.${index}.team`}
                        onChange={handleChange}
                        className="w-[45%]"
                      />
                    </div>
                  </div>
                      ))}
                      <button
                  onClick={(e) => {
                    e.preventDefault();
                    setState((prevState) => ({
                      ...prevState,
                      projects: [
                        ...prevState.projects,
                        {
                          projectName: "",
                          description: "",
                          technologiesUsed: [],
                          team: "",
                        },
                      ],
                    }));
                  }}
                >
                  Add Project
                </button>
                    </Typography>
                  </AccordionDetails>
                </Accordion>


                {/* Achivements */}
                <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography><strong>Other Achievements</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {state.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="number"
                          placeholder="Year"
                          value={achievement.year}
                          name={`achievements.${index}.year`}
                          onChange={handleChange}
                          className="w-20 mr-2"
                          min={1900}
                          max={2100}
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Achievement"
                            value={achievement.description}
                            name={`achievements.${index}.description`}
                            onChange={handleChange}
                            className="w-full"
                          />
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setState((prevState) => ({
                            ...prevState,
                            achievements: [
                              ...prevState.achievements,
                              { year: "", description: "" },
                            ],
                          }));
                        }}
                        className="mr-2"
                      >
                        Add Achievement
                      </button>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
          </div>
            <button className="button" type="button" onClick={downloadPDF}>
            <span className="button__text">Download</span>
            <span className="button__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className="svg">
                <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
                <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
                <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
              </svg>
            </span>
          </button>

        </form>
      </div>
    </div>
  )
}

export default forwardRef(HomeLeft)
