import { createContext, useRef, useState } from "react";

export let myContext = createContext()
import React from 'react'

const MyContext = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [skillRating, setSkillRating] = useState(0);
  let [state, setState] = useState(
    {
      img: "",
      studentName: "",
      workingAs: "",
      aboutSession: "",

      pgPercentage: "",
      pgYearOfPassout: "",
      pgStream: "",
      pgUniversity: "",

      graduationPercentage: "",
      graduationYearOfPassout: "",
      graduationStream: "",
      graduationUniversity: "",

      diplomaPercentage: "",
      diplomaYearOfPassout: "",
      diplomaStream: "",
      diplomaUniversity: "",

      hscPercentage: "",
      hscYearOfPassout: "",
      hscBoard: "",
      hscStream: "-",

      sscPercentage: "",
      sscYearOfPassout: "",
      sscBoard: "",
      sscStream: "-",

      email: "",
      phoneNo: "",
      address: "",
      linkedIn: "",
      facebook: "",
      twitter: "",
      instagram: "",
      otherSkills: [],
      

      skills: [],

      experiences: [
        {
          companyName: "",
          experienceStartDate: "",
          experienceEndDate: "",
          keyResponsibility: [],
        },
      ],

      projects: [],

      
    achievements: [
      {
        year: "",
        description: "",
      },
    ],
    }
  )
  
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <myContext.Provider value={{ state, setState, selectedImage, setSelectedImage, isLoggedIn, setIsLoggedIn, skillRating, setSkillRating }}>{children}</myContext.Provider>
  )
}

export default MyContext
