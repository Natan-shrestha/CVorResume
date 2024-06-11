import React, { Fragment, forwardRef, useContext } from 'react'
import { myContext } from '../MyContext'
import { BiLogoGmail } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { FaLinkedin, FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";

const HomeRight = (props, ref) => {
  let userData = useContext(myContext)
  let { state, selectedImage } = userData

  return (
    <div className='w-[35%] h-[100%] px-2 overflow-y-auto text-[7px]' id='homeRightDiv'>
      <div ref={ref}>
        <div className='border-2 p-2 px-1'>
          <div className='w-[100%] border-b-2 pb-1 flex justify-center'>
            <section className='flex justify-start w-[100%]'>
              <article className='w-[20%]'>
                {selectedImage && (
                  <div
                    className='rounded-full h-[90%] me-3 border border-blue-500 overflow-hidden'
                    style={{ aspectRatio: `${selectedImage.width} / ${selectedImage.height}` }}
                  >
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      className='w-full h-full object-cover'
                    />
                  </div>
                )}
              </article>
              <article className='ps-5'>
                <p className='font-bold text-xl text-center text-blue-700'>{state.studentName}</p>
                <p className='font-bold text-base'>{state.workingAs}</p>
              </article>
            </section>
          </div>

          <div>
            <article className='text-[8px] font-bold text-blue-700 text-center pt-1'>Summary About Me</article>
            <p className='indent-20'>{state.aboutSession}</p>
          </div>

          <div>
            <p className='text-[8px] font-bold text-blue-700 pt-1'>Qualification/Education:</p>
            <table className='text-[7px] w-[100%] border-[1px] mt-1'>
              <thead className='bg-lime-200'>
                <tr>
                  <th className='w-[6vw] align-text-top h-[3vh]'></th>
                  <th className='w-[2vw] align-text-top h-[3vh]'>Percentage</th>
                  <th className='w-[3vw] align-text-top h-[3vh]'>Year of Completion</th>
                  <th className='w-[9vw] align-text-top h-[3vh]'>University/College/School Name</th>
                  <th className='w-[6vw] align-text-top h-[3vh]'>Subject of Study</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className='h-[3vh] align-text-top'>Bachelor</th>
                  <td className='h-[3vh] align-text-top'>{state.graduationPercentage}%</td>
                  <td className='h-[3vh] align-text-top'>{state.graduationYearOfPassout}</td>
                  <td className='h-[3vh] align-text-top'>{state.graduationUniversity}</td>
                  <td className='h-[3vh] align-text-top'>{state.graduationStream}</td>
                </tr>
                <tr>
                  <th className='h-[3vh] align-text-top'>Diploma/High School</th>
                  <td className='h-[3vh] align-text-top'>{state.hscPercentage}%</td>
                  <td className='h-[3vh] align-text-top'>{state.hscYearOfPassout}</td>
                  <td className='h-[3vh] align-text-top'>{state.hscBoard}</td>
                  <td className='h-[3vh] align-text-top'>{state.hscStream}</td>
                </tr>
                <tr>
                  <th className='h-[3vh] align-text-top'>SLC/SEE</th>
                  <td className='h-[3vh] align-text-top'>{state.sscPercentage}%</td>
                  <td className='h-[3vh] align-text-top'>{state.sscYearOfPassout}</td>
                  <td className='h-[3vh] align-text-top'>{state.sscBoard}</td>
                  <td className='h-[3vh] align-text-top'>{state.sscStream}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <section className='flex w-[100%] mt-2'>
            <div className='w-[30%] border-e-2 pe-3'>
              <article className='text-[8px] font-bold text-black-700'>Personal Details</article>
              <p className='w-[95%] overflow-x-hidden text-[7px] noScrollBar mt-1'>
                <span className='text-blue-400 py-2'><BiLogoGmail className='text-[13px] inline' />:</span> {state.email}
              </p>
              <p className='w-[95%] overflow-x-hidden noScrollBar'>
                <span className='text-blue-400 py-2'><FaPhoneAlt className='text-[12px] inline' />:</span> {state.phoneNo}
              </p>
              <p className='w-[95%] overflow-x-hidden noScrollBar'>
                <span className='text-blue-400 py-2'><MdHome className='text-[13px] inline' />:</span> {state.address}
              </p>
              <article>
                <p className='text-[8px] font-bold text-black-700 pt-3'>Social Links</p>
                <p><span className='text-blue-400 pt-3'><FaLinkedin className='text-[13px] inline' />:</span> {state.linkedIn}</p>
                <p><span className='text-blue-400'><FaFacebookSquare className='text-[13px] inline' />:</span> {state.facebook}</p>
                <p><span className='text-blue-400'><IoLogoTwitter className='text-[13px] inline' />:</span> {state.twitter}</p>
                <p><span className='text-blue-400'><FaInstagramSquare className='text-[13px] inline' />:</span> {state.instagram}</p>
              </article>
            </div>

            <div className='w-[70%] ps-3'>
              <article>
                <p className='text-[12px] font-bold text-black-700'>Skills</p>
                {state.skills.map((skill, index) => (
                  <div key={index} className='flex items-center'>
                    <span>{skill.name}</span>
                    <div className='ml-2'>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${skill.rating >= i + 1 ? 'text-yellow-500' : 'text-gray-300'}`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </article>

              <article>
                <p className="text-[12px] font-bold text-black-700 pt-3">Experience</p>
                {state.experiences.map((experience, index) => (
                  <div key={index}>
                    <p><span className="text-black-400">Company:</span> {experience.companyName}</p>
                    <p><span className="text-black-400">Experience Duration:</span> {experience.experienceStartDate} to {experience.experienceEndDate}</p>
                    <div>
                      <span className="text-black-400">Key responsibilities:</span> {experience.keyResponsibility.join(', ')}
                    </div>
                  </div>
                ))}
              </article>

              <article>
                <p className='text-[12px] font-bold text-black-700 pt-3'>Projects</p>
                {state.projects.map((project, index) => (
                  <div key={index}>
                    <p><span className='text-black-400'>Project Name:</span> {project.projectName}</p>
                    <p><span className='text-black-400'>Description:</span> {project.description}</p>
                    <div>
                      <span className="text-black-400">Technologies Used:</span> {project.technologiesUsed.join(', ')}
                    </div>
                    <div><span className='text-black-400'>Team Size:</span> {project.team}</div>
                  </div>
                ))}
              </article>

              <article className="pt-3">
                <p>
                  <span className="text-[12px] font-bold text-black-700 pt-3">Achievements:</span> 
                  {state.achievements.map((achievement, index) => (
                    <span key={index} className="flex items-center">
                      <span className="mr-8">{achievement.year}</span>
                      <span>• {achievement.description}</span>
                    </span>
                  ))}
                </p>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(HomeRight)
