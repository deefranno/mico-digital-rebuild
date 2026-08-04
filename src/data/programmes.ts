import type { AcademicProgramme } from "@/types";

/**
 * Mock programme directory.
 *
 * PLACEHOLDER NOTICE: every entry is illustrative. Award types, durations,
 * entry requirements, fees and deadlines must be verified against the
 * institution's official publications before launch. Structure mirrors the
 * future WordPress `programme` custom post type (see README).
 */
export const programmes: AcademicProgramme[] = [
  {
    id: "b-ed-primary",
    slug: "bachelor-of-education-primary",
    title: "Bachelor of Education (Primary)",
    awardType: "Bachelor of Education",
    faculty: "Faculty of Education",
    facultySlug: "faculty-of-education",
    duration: "4 years (full-time)",
    studyMode: ["Full-time", "Part-time"],
    campus: "Mico College Campus, Kingston",
    level: "Undergraduate",
    subjectArea: "Education & Teaching",
    overview:
      "The B.Ed. (Primary) prepares teachers to lead primary classrooms across Jamaica with confidence, creativity and a firm grounding in child development, literacy and numeracy pedagogy.",
    highlights: [
      "Supervised teaching practicum in partner schools",
      "Specialist pathways in literacy, numeracy and inclusive education",
      "Research-informed curriculum co-designed with practising teachers",
    ],
    entryRequirements: [
      "Five (5) CSEC/CXC subjects including English A and Mathematics, or equivalent (placeholders)",
      "Minimum of two (2) CAPE subjects or GCE A-levels, or equivalent",
      "Satisfactory performance at interview and aptitude assessment",
      "Medical clearance and police record check",
    ],
    courseStructure: [
      {
        label: "Years One & Two",
        description: "Foundations of teaching, child psychology, literacy and numeracy methods.",
        modules: [
          "Foundations of Education",
          "Child & Adolescent Development",
          "Language Arts Methods",
          "Mathematics Methods",
        ],
      },
      {
        label: "Years Three & Four",
        description: "Specialisation, school experience and research project.",
        modules: [
          "Inclusive Education",
          "Classroom Management",
          "Teaching Practicum",
          "Action Research Project",
        ],
      },
    ],
    careerOpportunities: [
      "Primary school teacher (public and private)",
      "Curriculum developer",
      "Education officer (with further study)",
      "Early intervention specialist",
    ],
    fees: {
      note: "Placeholder — official tuition figures to be confirmed.",
      details: [
        "Tuition quoted per academic year and varies by study mode.",
        "Additional charges apply for practicum and examination fees.",
      ],
    },
    applicationDeadlines: [
      {
        term: "September 2026 intake",
        deadline: "31 July 2026",
        note: "Placeholder date — confirm with the Admissions Office.",
      },
      {
        term: "January 2027 intake",
        deadline: "30 November 2026",
        note: "Placeholder date.",
      },
    ],
    brochureUrl: "/programmes/bachelor-of-education-primary",
    relatedSlugs: [
      "bachelor-of-education-early-childhood",
      "bachelor-of-education-secondary",
    ],
  },
  {
    id: "b-ed-early-childhood",
    slug: "bachelor-of-education-early-childhood",
    title: "Bachelor of Education (Early Childhood)",
    awardType: "Bachelor of Education",
    faculty: "Faculty of Education",
    facultySlug: "faculty-of-education",
    duration: "4 years (full-time)",
    studyMode: ["Full-time", "Part-time"],
    campus: "Mico College Campus, Kingston",
    level: "Undergraduate",
    subjectArea: "Education & Teaching",
    overview:
      "Focused on children from birth to eight years, this programme blends developmental theory with play-based practice to prepare early-childhood educators for Jamaican nurseries, basic schools and infant departments.",
    highlights: [
      "Practicum across early-childhood settings",
      "Emphasis on play, language and social development",
      "Partnerships with early-childhood networks",
    ],
    entryRequirements: [
      "Five (5) CSEC/CXC subjects including English A and Mathematics (placeholders)",
      "Two (2) CAPE subjects or equivalent",
      "Interview and aptitude assessment",
    ],
    courseStructure: [
      {
        label: "Foundation",
        description: "Child development, health and early learning theory.",
        modules: ["Early Childhood Development", "Health & Nutrition", "Play & Learning"],
      },
      {
        label: "Professional",
        description: "Curriculum methods, family engagement and practicum.",
        modules: ["Early Literacy & Numeracy", "Family & Community", "Teaching Practicum"],
      },
    ],
    careerOpportunities: [
      "Early-childhood educator",
      "Nursery or basic-school principal",
      "Early-intervention practitioner",
      "Child-development consultant",
    ],
    fees: {
      note: "Placeholder — official tuition figures to be confirmed.",
    },
    applicationDeadlines: [
      { term: "September 2026 intake", deadline: "31 July 2026", note: "Placeholder date." },
    ],
    brochureUrl: "/programmes/bachelor-of-education-early-childhood",
    relatedSlugs: ["bachelor-of-education-primary", "certificate-early-childhood"],
  },
  {
    id: "b-ed-secondary",
    slug: "bachelor-of-education-secondary",
    title: "Bachelor of Education (Secondary)",
    awardType: "Bachelor of Education",
    faculty: "Faculty of Education",
    facultySlug: "faculty-of-education",
    duration: "4 years (full-time)",
    studyMode: ["Full-time", "Part-time"],
    campus: "Mico College Campus, Kingston",
    level: "Undergraduate",
    subjectArea: "Education & Teaching",
    overview:
      "Prepare to teach a specialist subject at the secondary level, with pathways in English, Mathematics, Science, Social Studies, Modern Languages and Business Studies (subject to demand).",
    highlights: [
      "Teaching specialisation plus education studies",
      "Extended school-based teaching practice",
      "Pathways into postgraduate study",
    ],
    entryRequirements: [
      "Five (5) CSEC/CXC subjects including English A and Mathematics (placeholders)",
      "Two (2) CAPE subjects in the intended teaching area or equivalent",
      "Interview and subject aptitude assessment",
    ],
    courseStructure: [
      {
        label: "Years One & Two",
        description: "Education foundations alongside subject specialisation.",
        modules: ["Adolescent Development", "Subject Methods I", "Educational Psychology"],
      },
      {
        label: "Years Three & Four",
        description: "Advanced methods, practicum and research.",
        modules: ["Subject Methods II", "Teaching Practicum", "Action Research"],
      },
    ],
    careerOpportunities: [
      "Secondary school teacher",
      "Subject coordinator",
      "Education officer",
      "Graduate researcher",
    ],
    fees: { note: "Placeholder — official tuition figures to be confirmed." },
    applicationDeadlines: [
      { term: "September 2026 intake", deadline: "31 July 2026", note: "Placeholder date." },
    ],
    brochureUrl: "/programmes/bachelor-of-education-secondary",
    relatedSlugs: ["bachelor-of-education-primary", "master-of-education-leadership"],
  },
  {
    id: "bsc-information-technology",
    slug: "bachelor-of-science-information-technology",
    title: "Bachelor of Science in Information Technology",
    awardType: "Bachelor of Science",
    faculty: "Faculty of Science and Technology",
    facultySlug: "faculty-of-science-and-technology",
    duration: "3–4 years (full-time)",
    studyMode: ["Full-time", "Part-time", "Online"],
    campus: "Mico College Campus, Kingston",
    level: "Undergraduate",
    subjectArea: "Science & Technology",
    overview:
      "Build the technical and problem-solving skills to design, build and manage modern information systems — with a strong emphasis on applying technology to education and national development.",
    highlights: [
      "Hands-on labs in networking, databases and web development",
      "Capstone project with a community or education partner",
      "Internship opportunities",
    ],
    entryRequirements: [
      "Five (5) CSEC/CXC subjects including English A and Mathematics (placeholders)",
      "Two (2) CAPE subjects, ideally including a science or computing subject",
      "Interview for applicants without formal computing background",
    ],
    courseStructure: [
      {
        label: "Years One & Two",
        description: "Programming, mathematics and systems foundations.",
        modules: ["Programming Fundamentals", "Database Systems", "Computer Networks", "Discrete Mathematics"],
      },
      {
        label: "Years Three & Four",
        description: "Specialisation, project management and capstone.",
        modules: ["Software Engineering", "Cybersecurity Essentials", "Capstone Project", "Internship"],
      },
    ],
    careerOpportunities: [
      "Software developer",
      "Systems analyst",
      "IT project coordinator",
      "Educational technologist",
      "Data analyst",
    ],
    fees: { note: "Placeholder — official tuition figures to be confirmed." },
    applicationDeadlines: [
      { term: "September 2026 intake", deadline: "31 July 2026", note: "Placeholder date." },
    ],
    brochureUrl: "/programmes/bachelor-of-science-information-technology",
    relatedSlugs: ["bachelor-of-science-mathematics", "professional-development-educational-technology"],
  },
  {
    id: "bsc-mathematics",
    slug: "bachelor-of-science-mathematics",
    title: "Bachelor of Science in Mathematics",
    awardType: "Bachelor of Science",
    faculty: "Faculty of Science and Technology",
    facultySlug: "faculty-of-science-and-technology",
    duration: "3–4 years (full-time)",
    studyMode: ["Full-time", "Part-time"],
    campus: "Mico College Campus, Kingston",
    level: "Undergraduate",
    subjectArea: "Science & Technology",
    overview:
      "A rigorous grounding in pure and applied mathematics, preparing graduates for careers in teaching, finance, statistics, analytics and further research.",
    highlights: [
      "Small-group tutorials",
      "Mathematical modelling and statistics strands",
      "Clear route into mathematics teaching",
    ],
    entryRequirements: [
      "Five (5) CSEC/CXC subjects including English A and Mathematics (placeholders)",
      "Two (2) CAPE subjects including Mathematics or equivalent",
      "Interview and mathematics placement assessment",
    ],
    courseStructure: [
      {
        label: "Foundation",
        description: "Calculus, algebra and proof.",
        modules: ["Calculus I & II", "Linear Algebra", "Discrete Structures"],
      },
      {
        label: "Advanced",
        description: "Applied mathematics, statistics and modelling.",
        modules: ["Mathematical Modelling", "Probability & Statistics", "Research Project"],
      },
    ],
    careerOpportunities: [
      "Mathematics teacher",
      "Statistician or analyst",
      "Actuarial trainee",
      "Graduate researcher",
    ],
    fees: { note: "Placeholder — official tuition figures to be confirmed." },
    applicationDeadlines: [
      { term: "September 2026 intake", deadline: "31 July 2026", note: "Placeholder date." },
    ],
    brochureUrl: "/programmes/bachelor-of-science-mathematics",
    relatedSlugs: ["bsc-information-technology", "bachelor-of-education-secondary"],
  },
  {
    id: "ba-humanities",
    slug: "bachelor-of-arts-humanities",
    title: "Bachelor of Arts in Humanities",
    awardType: "Bachelor of Arts",
    faculty: "Faculty of Humanities and Liberal Arts",
    facultySlug: "faculty-of-humanities-and-liberal-arts",
    duration: "3–4 years (full-time)",
    studyMode: ["Full-time", "Part-time"],
    campus: "Mico College Campus, Kingston",
    level: "Undergraduate",
    subjectArea: "Humanities & Social Sciences",
    overview:
      "Explore language, literature, history and the arts through a Caribbean lens, developing the critical thinking and communication skills valued across every profession.",
    highlights: [
      "Caribbean literature and Jamaican cultural studies",
      "Creative writing and media strands",
      "Research-intensive final year",
    ],
    entryRequirements: [
      "Five (5) CSEC/CXC subjects including English A (placeholders)",
      "Two (2) CAPE subjects or equivalent",
      "Writing sample and interview",
    ],
    courseStructure: [
      {
        label: "Foundation",
        description: "Critical reading, writing and cultural studies.",
        modules: ["Caribbean Literature", "Academic Writing", "World History"],
      },
      {
        label: "Specialisation",
        description: "Focused electives and a final dissertation.",
        modules: ["Jamaican Cultural Studies", "Creative Writing", "Research Dissertation"],
      },
    ],
    careerOpportunities: [
      "Teacher of language, literature or social studies",
      "Communications professional",
      "Cultural heritage officer",
      "Graduate researcher",
    ],
    fees: { note: "Placeholder — official tuition figures to be confirmed." },
    applicationDeadlines: [
      { term: "September 2026 intake", deadline: "31 July 2026", note: "Placeholder date." },
    ],
    brochureUrl: "/programmes/bachelor-of-arts-humanities",
    relatedSlugs: ["bachelor-of-education-secondary", "master-of-education-leadership"],
  },
  {
    id: "m-ed-leadership",
    slug: "master-of-education-educational-leadership",
    title: "Master of Education (Educational Leadership)",
    awardType: "Master of Education",
    faculty: "Graduate Studies and Research",
    facultySlug: "graduate-studies-and-research",
    duration: "2 years (part-time)",
    studyMode: ["Part-time", "Online"],
    campus: "Mico College Campus, Kingston",
    level: "Graduate",
    subjectArea: "Education & Teaching",
    overview:
      "Develop the strategic, instructional and people leadership needed to lead schools and education systems — designed for practising teachers and education professionals.",
    highlights: [
      "Practitioner-focused modules and school-based projects",
      "Cohort model that builds a professional network",
      "Route to doctoral study",
    ],
    entryRequirements: [
      "Bachelor's degree in education or a related field (placeholders)",
      "Two (2) years' relevant professional experience",
      "Professional references and interview",
    ],
    courseStructure: [
      {
        label: "Year One",
        description: "Leadership theory, policy and instructional leadership.",
        modules: ["Educational Leadership Theory", "Education Policy", "Instructional Leadership"],
      },
      {
        label: "Year Two",
        description: "Applied research and school improvement project.",
        modules: ["Research Methods", "School Improvement Project", "Dissertation"],
      },
    ],
    careerOpportunities: [
      "School principal or vice-principal",
      "Education officer",
      "Curriculum leader",
      "Policy analyst",
    ],
    fees: { note: "Placeholder — official tuition figures to be confirmed." },
    applicationDeadlines: [
      { term: "September 2026 intake", deadline: "30 June 2026", note: "Placeholder date." },
    ],
    brochureUrl: "/programmes/master-of-education-educational-leadership",
    relatedSlugs: ["mphil-phd-education", "professional-development-educational-technology"],
  },
  {
    id: "mphil-phd-education",
    slug: "mphil-and-phd-education",
    title: "M.Phil. and Ph.D. in Education",
    awardType: "Master of Philosophy / Doctor of Philosophy",
    faculty: "Graduate Studies and Research",
    facultySlug: "graduate-studies-and-research",
    duration: "M.Phil. 2 years · Ph.D. 3–4 years",
    studyMode: ["Full-time", "Part-time"],
    campus: "Mico College Campus, Kingston",
    level: "Graduate",
    subjectArea: "Education & Teaching",
    overview:
      "Undertake original research that advances education in Jamaica and the wider Caribbean, supervised by experienced researchers in our graduate faculty.",
    highlights: [
      "Supervision in teacher education, special education and curriculum",
      "Research seminars and writing retreats",
      "Partnerships with regional education bodies",
    ],
    entryRequirements: [
      "Strong master's degree in education or a related field (placeholders)",
      "Research proposal reviewed by the Graduate Studies Committee",
      "Interview and academic references",
    ],
    courseStructure: [
      {
        label: "Coursework",
        description: "Advanced research methods and scholarly writing.",
        modules: ["Advanced Research Methods", "Scholarly Writing", "Literature Review"],
      },
      {
        label: "Research",
        description: "Thesis research, seminars and examination.",
        modules: ["Thesis Research", "Research Seminars", "Thesis Defence"],
      },
    ],
    careerOpportunities: [
      "University lecturer",
      "Education researcher",
      "Senior education policy adviser",
      "Consultant",
    ],
    fees: { note: "Placeholder — official tuition figures to be confirmed." },
    applicationDeadlines: [
      { term: "Rolling admission", deadline: "Ongoing", note: "Placeholder — confirm with Graduate Studies." },
    ],
    brochureUrl: "/programmes/mphil-and-phd-education",
    relatedSlugs: ["master-of-education-educational-leadership"],
  },
  {
    id: "diploma-teaching",
    slug: "diploma-in-teaching",
    title: "Diploma in Teaching",
    awardType: "Diploma",
    faculty: "Professional and Continuing Education",
    facultySlug: "professional-and-continuing-education",
    duration: "2 years (part-time)",
    studyMode: ["Part-time", "Blended"],
    campus: "Mico College Campus, Kingston",
    level: "Certificate",
    subjectArea: "Education & Teaching",
    overview:
      "A practical qualification for classroom assistants and teaching aides who wish to build a formal foundation in teaching practice.",
    highlights: [
      "Evening and weekend classes",
      "School-based practice",
      "Articulation into the B.Ed. programmes",
    ],
    entryRequirements: [
      "Five (5) CSEC/CXC subjects including English A (placeholders)",
      "Currently employed or volunteering in a school setting is an advantage",
      "Interview",
    ],
    courseStructure: [
      {
        label: "Both Years",
        description: "Teaching foundations with supervised practice.",
        modules: ["Child Development", "Teaching Methods", "Classroom Practice", "Literacy Support"],
      },
    ],
    careerOpportunities: [
      "Classroom assistant",
      "Teaching aide",
      "Pathway to B.Ed. study",
    ],
    fees: { note: "Placeholder — official tuition figures to be confirmed." },
    applicationDeadlines: [
      { term: "September 2026 intake", deadline: "31 July 2026", note: "Placeholder date." },
    ],
    brochureUrl: "/programmes/diploma-in-teaching",
    relatedSlugs: ["bachelor-of-education-primary", "certificate-early-childhood"],
  },
  {
    id: "certificate-early-childhood",
    slug: "certificate-in-early-childhood-education",
    title: "Certificate in Early Childhood Education",
    awardType: "Certificate",
    faculty: "Faculty of Education",
    facultySlug: "faculty-of-education",
    duration: "1 year (part-time)",
    studyMode: ["Part-time"],
    campus: "Mico College Campus, Kingston",
    level: "Certificate",
    subjectArea: "Education & Teaching",
    overview:
      "A one-year professional certificate for practitioners working in nurseries, basic schools and infant departments who want a recognised qualification.",
    highlights: [
      "Practical, classroom-ready content",
      "Taught by experienced early-childhood educators",
      "Credit pathway into the B.Ed. (Early Childhood)",
    ],
    entryRequirements: [
      "Four (4) CSEC/CXC subjects including English A (placeholders)",
      "Currently working with young children is an advantage",
      "Interview",
    ],
    courseStructure: [
      {
        label: "Programme",
        description: "Core early-childhood studies with supervised practice.",
        modules: ["Child Development", "Early Learning Environments", "Family Partnerships", "Practicum"],
      },
    ],
    careerOpportunities: [
      "Early-childhood practitioner",
      "Nursery teacher",
      "Pathway to degree study",
    ],
    fees: { note: "Placeholder — official tuition figures to be confirmed." },
    applicationDeadlines: [
      { term: "January 2027 intake", deadline: "30 November 2026", note: "Placeholder date." },
    ],
    brochureUrl: "/programmes/certificate-in-early-childhood-education",
    relatedSlugs: ["bachelor-of-education-early-childhood", "diploma-in-teaching"],
  },
  {
    id: "pd-educational-technology",
    slug: "professional-development-educational-technology",
    title: "Professional Development: Educational Technology",
    awardType: "Professional Development",
    faculty: "Professional and Continuing Education",
    facultySlug: "professional-and-continuing-education",
    duration: "6 weeks (evenings)",
    studyMode: ["Online", "Blended"],
    campus: "Online",
    level: "Professional Development",
    subjectArea: "Science & Technology",
    overview:
      "Equip yourself to integrate digital tools into teaching and learning — from learning management systems to interactive content and assessment.",
    highlights: [
      "Fully online with live workshops",
      "Certification of completion",
      "Open to teachers and trainers across the region",
    ],
    entryRequirements: [
      "Open admission — basic computer literacy required (placeholder)",
      "Access to a computer and internet connection",
    ],
    courseStructure: [
      {
        label: "Weeks 1–6",
        description: "Weekly modules with practical assignments.",
        modules: ["Digital Pedagogy", "LMS Essentials", "Interactive Content", "Online Assessment"],
      },
    ],
    careerOpportunities: [
      "Enhanced classroom practice",
      "Educational technology coordinator",
      "E-learning developer",
    ],
    fees: { note: "Placeholder — course fees to be confirmed." },
    applicationDeadlines: [
      { term: "October 2026 cohort", deadline: "15 September 2026", note: "Placeholder date." },
    ],
    brochureUrl: "/programmes/professional-development-educational-technology",
    relatedSlugs: ["bsc-information-technology", "master-of-education-educational-leadership"],
  },
  {
    id: "short-course-data-literacy",
    slug: "short-course-data-literacy-for-educators",
    title: "Short Course: Data Literacy for Educators",
    awardType: "Short Course",
    faculty: "Professional and Continuing Education",
    facultySlug: "professional-and-continuing-education",
    duration: "4 weeks (weekends)",
    studyMode: ["Online"],
    campus: "Online",
    level: "Short Course",
    subjectArea: "Science & Technology",
    overview:
      "Learn to read, interpret and use school and classroom data to inform decisions — a practical short course for school leaders and teachers.",
    highlights: [
      "Real school datasets used throughout",
      "Certificate of completion",
      "Suitable for non-specialists",
    ],
    entryRequirements: [
      "Open admission (placeholder)",
      "Basic spreadsheet familiarity recommended",
    ],
    courseStructure: [
      {
        label: "Weeks 1–4",
        description: "From raw data to insight.",
        modules: ["Reading Data", "Visualisation", "Interpreting Results", "Action Planning"],
      },
    ],
    careerOpportunities: [
      "Evidence-informed teaching",
      "School improvement planning",
    ],
    fees: { note: "Placeholder — course fees to be confirmed." },
    applicationDeadlines: [
      { term: "November 2026 cohort", deadline: "31 October 2026", note: "Placeholder date." },
    ],
    brochureUrl: "/programmes/short-course-data-literacy-for-educators",
    relatedSlugs: ["professional-development-educational-technology"],
  },
];

export const programmeLevels = [
  "Undergraduate",
  "Graduate",
  "Certificate",
  "Professional Development",
  "Short Course",
] as const;

export const subjectAreas = [
  "Education & Teaching",
  "Science & Technology",
  "Humanities & Social Sciences",
] as const;

export const deliveryMethods = ["Full-time", "Part-time", "Online", "Blended"] as const;
